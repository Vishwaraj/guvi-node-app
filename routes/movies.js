import express from "express";
const router = express.Router();
import {client} from '../index.js'
import { ObjectId } from "mongodb"; // this is needed to fetch data using object id as we have to convert it to


// All Movie Routes


//------- get movies route and search functionality--------------------
router.get("/", async function (request, response) {
    console.log(request.query);
    if (request.query.rating) {
      request.query.rating = +request.query.rating;
    }
  
    const allMovies = await client
      .db("guvi-db")
      .collection("movies")
      .find(request.query)
      .toArray();
    response.send(allMovies);
  });
  
  //--------THIS REQUEST IS GETTING MOVIE DATA FROM MONGODB----------------
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(request.params);
    // const movie = movieData.find((movie) => movie.id === id);
    console.log(id);
    //this code fetches single movie data from mongoDB
    const movie = await client
      .db("guvi-db")
      .collection("movies")
      .findOne({ _id: ObjectId(id) });
  
    movie ? response.send(movie) : response.status(404).send("Not Found");
  });
  
  //POST REQUEST TO MONGODB
  
  router.post("/", express.json(), async function (request, response) {
    const data = request.body;
  
    const status = await client
      .db("guvi-db")
      .collection("movies")
      .insertOne(data);
  
    response.send(status);
  });
  
  //DELETE REQUEST TO MONGO DB
  
  router.delete("/:id", async function (request, response) {
    const { id } = request.params;
  
    const deleted = await client
      .db("guvi-db")
      .collection("movies")
      .deleteOne({ id: id });
  
    deleted.result > 0
      ? response.send(deleted)
      : response.send({ msg: "no movie found" });
  });
  
  //UPDATE MOVIE REQUEST TO MONGODB
  
  router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
  
    const updated = await client
      .db("guvi-db")
      .collection("movies")
      .updateOne({ id: id }, { $set: data });
  
    response.send(updated);
  });
  

  export const moviesRouter = router;