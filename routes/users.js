import express from "express";
const router = express.Router();
import {client} from '../index.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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
            var token = jwt.sign({ id: checkUsername._id }, process.env.SECRET_KEY);

            //This is to save token locally.
            // localStorage.setItem('token', token);

            response.send({msg: "Successful Log In", token: token});
        } else {
            response.send({msg: "Invalid Credentials"});
        }
    }
})







//  -->
//In react following code is used , write the following code.
// localStorage.setItem('token', the token that is generated here)
// when making api calls that require token, write the following code.
// localStorage.getItem('token');
// when logging out, to delete the token from local memory write the following code.
// localStorage.removeItem('token');




  
export const usersRouter = router;