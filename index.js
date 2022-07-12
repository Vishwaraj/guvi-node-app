import express, { application } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { ObjectId } from "mongodb"; // this is needed to fetch data using object id as we have to convert it to
import {moviesRouter} from './routes/movies.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World !!!");
});

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
  console.log("MongoDB is connected");
  return client;
}

//mongo db connection function call --
export const client = await createConnection();

//----------MONGODB CONNECTION CODE ENDS-------------------------------


// for movie routes
app.use("/movies", moviesRouter);