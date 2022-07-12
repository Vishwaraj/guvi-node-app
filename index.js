
import express, { application } from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import { ObjectId } from "mongodb"; // this is needed to fetch data using object id as we have to convert it to


dotenv.config();


const app = express()

const PORT = process.env.PORT;

app.get('/', function (req, res) {
  res.send('Hello World !!!')
})

app.listen(PORT, () => console.log(`App started at ${PORT}`));

// control + c stops the server //



// Express middleware to convert data to json

//this is the middleware and now we are using it globally for the app.


app.use(express.json());




// ----------MONGO DB CONNECTION---------------------------------

// -----------mongo db url --
const MONGO_URL = process.env.MONGO_URL;


//mongo db connection function --
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log('MongoDB is connected');
  return client;
}


//mongo db connection function call --
const client = await createConnection();
  

//----------MONGODB CONNECTION CODE ENDS-------------------------------



//------- get movies route and search functionality--------------------
app.get('/movies', async function(request, response) {

  console.log(request.query);
  if(request.query.rating) {
    request.query.rating = +request.query.rating;
  }


const allMovies = await client.db("guvi-db").collection("movies").find(request.query).toArray();
response.send(allMovies);

})



//--------THIS REQUEST IS GETTING MOVIE DATA FROM MONGODB----------------
app.get('/movies/:id', async function(request, response) {
    const {id} = request.params;
    console.log(request.params);
    // const movie = movieData.find((movie) => movie.id === id);


    //this code fetches single movie data from mongoDB
    const movie = await client.db("guvi-db").collection("movies").findOne({id: id});


    movie ? response.send(movie) : response.status(404).send('Not Found');
})


//POST REQUEST TO MONGODB

app.post("/movies",express.json(), async function(request, response) {

  const data = request.body;

  const status = await client.db("guvi-db").collection("movies").insertMany(data);

  response.send(status);
});


//DELETE REQUEST TO MONGO DB

app.delete('/movies/:id', async function(request, response) {
  const {id} = request.params;

  const deleted = await client.db("guvi-db").collection("movies").deleteOne({id : id});

  deleted.result > 0 ? response.send(deleted) : response.send({msg: 'no movie found'});
  
});


//UPDATE MOVIE REQUEST TO MONGODB

app.put('/movies/:id', async function (request, response) {
  const {id} = request.params;
  const data = request.body;

  const updated = await client.db("guvi-db").collection("movies").updateOne({id : id}, {$set: data});

  

  response.send(updated);
})