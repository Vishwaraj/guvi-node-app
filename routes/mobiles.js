import express from "express";
const router = express.Router();
import {client} from '../index.js'
import { ObjectId } from "mongodb"; // this is needed to fetch data using object id as we have to convert it to

// const mobiles = [
//     {
//       model: "OnePlus 9 5G",
//       img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//       company: "Oneplus"
//     },
//     {
//       model: "Iphone 13 mini",
//       img:
//         "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//       company: "Apple"
//     },
//     {
//       model: "Samsung s21 ultra",
//       img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//       company: "Samsung"
//     },
//     {
//       model: "Xiomi mi 11",
//       img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//       company: "Xiomi"
//     }
//   ];


router.get("/", async function (request, response) {
    console.log(request.query);
    if (request.query.rating) {
      request.query.rating = +request.query.rating;
    }

    const allMobiles = await client.db("guvi-db").collection("mobiles").find({}).toArray()

    response.send(allMobiles);


  });


// to send cart items
router.get('/cart', async function(request, response) {
  const query = {
    inCart: true
  }
  const result = await client.db("guvi-db").collection("mobiles").find(query).toArray();
  response.send(result);

})


// to remove mobile from cart

router.delete('/cart', async function(request, response) {
const data = request.body;
const mobileId = data.id;

const result = await client.db("guvi-db").collection("mobiles").updateOne({_id: ObjectId(mobileId)}, {$set: {inCart: false}})
response.send(result);

});

router.post("/", async function(request, response) {
    const data = request.body;
    
    const status = await client.db("guvi-db").collection("mobiles").insertMany(data);

    response.send(status);

})

router.put('/', async function(request, response) {
  const data = await request.body;
  const mobileId = data.id;
  const update = data.inCart;
  
  const result = await client.db("guvi-db").collection("mobiles").updateOne({_id: ObjectId(mobileId)}, {$set: {inCart: true}});
  response.send(result);


});





export const mobilesRouter = router;