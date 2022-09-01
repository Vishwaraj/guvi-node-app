import express from "express";
const router = express.Router();
import {client} from '../index.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


router.get('/', async function(request, response) {
    response.send({message: 'Hello User'})
})


router.post('/', async function(request, response) {
    const user = request.body;
    
    const addUser = await client.db("guvi-db").collection("new-users").insertOne(user)

    response.send(addUser);
})








export const registerRouter = router;