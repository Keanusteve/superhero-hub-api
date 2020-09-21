const express = require("express"); //comon JS import
const cors = require("cors");
//installing us (the server) to respond to requests from a different origin (URL)than the server
const bodyParser = require("body-parser"); //middleware that allows us to read JSON from requests
// const { response } = require("express");
// const fs = require;  //needed for readFileSync only used when tied to a json file instead of a
//real DB - this is why it was here but is now commented out

const dataAccessLayer = require("./dataAccessLayer");
dataAccessLayer.connect();
//CREATE SERVER
const app = express(); // app equals my server here
app.use(cors());
// cors, body-parser
//once you have the webapp hosted online you may want to comment cors out

//middleware
app.use(bodyParser.json());
// app.use((request, response, next) => {
// console.log("Time:", Date.now());
//     next();
// });
// const characters= require("./characters.json");
const { ObjectId, ObjectID } = require("mongodb");

// when reading from a file using a try catch is a good idea.

// try {
//     characters = JSON.parse(fs.readFileSync("characters.json")).characters;
//     } catch (error){
// console.log("No existing file.");
// }

//console.log(characters);

//TODO add the endpoints e.g. app.get('/path, ()=> { ... })
//routes /endpoints

//Get ALL characters
// GET /api/characters
app.get("/api/characters", async (request, response) => {
  const characters = await dataAccessLayer.findAll();

  response.send(characters);
});

//Get Character by ID
app.get("/api/characters/:id", async (request, response) => {
  const characterId = request.params.id;

  if (!ObjectID.isValid(characterId)) {
    response.status(400).send(`CharacterID ${characterId} is incorrect.`);
    return;
  }
  const characterQuery = { _id: new ObjectId(characterId) };

  let character;
  try {
    character = await dataAccessLayer.findOne(characterQuery);
  } catch (error) {
    response.send(`Character with id ${characterId} not found!`);
    return;
  }
  response.send(character);
});

//    const character = await dataAccessLayer.findOne(characterQuery);

//     if (!character) {
//         response.send (`Character with id ${characterId} not found!`);
// return;
//     }
//     response.send(character);
// });
//CREATE VALIDATION

//
//Create new Character
app.post("/api/characters", async (request, response) => {
  const body = request.body;
  //console.log(body); //optional when testing

  if (
    !body.name ||
    !body.strength ||
    !body.durability ||
    !body.speed ||
    !body.power_level ||
    !body.fighting_skill ||
    !body.xfactor ||
    !body.alignment ||
    !body.universe
  ) {
    response
      .status(400)
      .send("Bad Request. Validation Error. Missing name or required statistic field input.");
    return;
  }

   
    // const doesCharacterAlreadyExist = await doesCharacterAlreadyExist(body.name)
    // if (doesCharacterAlreadyExist){
    //   response.status(400).send("BAD REQUEST.CHARACTER WITH NAME ALREADY EXISTS")
    //   return;
    // }
  
  //validate data types of properties
  //numbers need to be greater than 0
  //strings should not be empty except image url
  if (typeof body.name && typeof body.name !== "string") {
    response.status(400).send("The name parameter must by of type string");
    return;
  }
  if (isNaN(Number(body.strength)) || body.strength <= 0) {
    response.status(400)(
      "The Strength parameter must be of type strength and greater than 0"
    );
    return;
  }
  if (isNaN(Number(body.durability)) || body.durability < 0) {
    response.status(400).send(
      "The durability parameter must be of type Number and greater than 0"
    );
    return;
  }
  if (isNaN(Number(body.speed)) || body.speed < 0) {
    response.status(400).send(
      "The speed parameter must be of type Number and greater than 0"
    );
    return;
  }
  if (isNaN(Number(body.power_level)) || body.power_level < 0) {
    response.status(400).send(
      "The power level parameter must be of type Number and greater than 0"
    );
    return;
  }
  if (isNaN(Number(body.fighting_skill)) || body.fighting_skill < 0) {
    response.status(400).send(
      "The fighting_skill parameter must be of type Number and greater than 0"
    );
    return;
  }
  if (isNaN(Number(body.xfactor)) || body.xfactor < 0) {
    response.status(400).send(
      "The xfactor parameter must be of type Number and greater than 0"
    );
    return;
  }
  if ( body.alignment && typeof body.alignment !== "string") {
    response.status(400).send("The alignment parameter must by of type string");
    return;
  }
  if ( body.universe && typeof body.universe !== "string") {
    response.status(400).send("The universe parameter must by of type string");
    return;
  }
  // if(typeof body.image_url!== "string") {
  //         response.status(400).send("the image url paramter must be of type string");
  //         return;
  // }

  await dataAccessLayer.insertOne(body);

  response.status(201).send();
});

//Add new character to existing charcter array in the included JSON FILE
// characters.push(body);

// //commit new character to DB
// const jsonPayload ={
//     characters: characters,
// };
// fs.writeFileSync("characters.json", JSON.stringify(characters));

// response.send();

//POST /api/characters

//Update existing Character
app.put("/api/characters/:id", async (request, response) => {
  const characterId = request.params.id;
  const body = request.body;

  if (!ObjectID.isValid(characterId)) {
    response.status(400).send(`CharacterID ${characterId} is incorrect.`);
    return;
  }
  // if (body.name){
  //   const doesCharacterAlreadyExist = await doesCharacterAlreadyExist(body.name, characterId)
  //   if (doesCharacterAlreadyExist){
  //     response.status(400).send("BAD REQUEST.CHARACTER WITH NAME ALREADY EXISTS")
  //     return;
  //   }
  // }
 

  const characterQuery = {
    _id: new ObjectId(characterId),
  };

  try {
    await dataAccessLayer.updateOne(characterQuery, body);
  } catch (error) {
    response.send(`Character with id ${productId} not found!`);
    return;
  }

  response.send();
});

//Delete Existing Charcter by ID
app.delete("/api/characters/:id", async (request, response) => {
  const characterId = request.params.id;

  if (!ObjectID.isValid(characterId)) {
    response.status(400).send(`CharacterID ${characterId} is incorrect.`);
    return;
  }
  const characterQuery = {
    _id: new ObjectId(characterId),
  };
  try {
    await dataAccessLayer.deleteOne(characterQuery);
  } catch (error) {
    response.status(404).send(`Character with id ${characterId} not found!`);
    return;
  }

  response.send();
});

//first read Json body from the request and validate the body with required properties
//required properties will be the character stats
// add new chacter to the DB array (json file)

// Starting the server
const port = process.env.PORT ? process.env.PORT : 3005;
app.listen(port, () => {
  console.log("CHARACTERS API STARTED!");
});

async function  doesCharacterAlreadyExist(name, characterId) {
  const query={name:name};
  try {
  const existingCharacter = await dataAccessLayer.findOne(query);
  if(existingCharacter && existingCharacter._id){
  if(characterId && characterId===existingCharacter._id){
  }

  }
  if (existingCharacter === "No Document Found!"){
    return false;
  }
  else{
    return true;
  }
} catch (error) {
  throw error;
  
}
 

}


