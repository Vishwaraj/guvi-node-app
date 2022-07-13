import express from "express";
const router = express.Router();
import {client} from '../index.js'
import bcrypt from "bcrypt";



 async function genHashPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

 async function checkUserExists(username) {
    const result = await client.db("guvi-db").collection("users").findOne({username : username});
    return result;
 }



//---------------for sign up--------------------------
router.post("/signup", async function (request, response) {
    const {username, password} = request.body;

    const searchUsername = await checkUserExists(username);
    

    if(searchUsername) {
        response.send({msg: "Username already exists"});
    } else if (password.length < 8) {
        response.send({msg: "Required Password length is 8"});
    } else {
        const hashPassword = await genHashPassword(password);
  

        const userCreation = await client
          .db("guvi-db")
          .collection("users")
          .insertOne({
            username: username,
            password: hashPassword
          });
      
        response.send(userCreation);
    }


  });


//---------------for log in---------------------------
router.post("/login", async function(request, response) {
    const {username, password} = request.body;

    const checkUsername = await checkUserExists(username);

    if(!checkUsername) {
     response.send({msg: "Invalid Credentials"});
    } else {
        const storedPassword = checkUsername.password;

        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        if(isPasswordMatch) {
            response.send({msg: "Successful Log In"});
        } else {
            response.send({msg: "Invalid Credentials"});
        }
    }
})


  
export const usersRouter = router;