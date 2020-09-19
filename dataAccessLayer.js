//TODO: 'require' mongodb
//TODO: 'require env file 
const MongoClient = require("mongodb").MongoClient;
const ObjectId =require("mongodb").ObjectId;


//TODO REad those env variables from process.env.VAR_NAME
require("dotenv").config(); // this reads in our dotenvfile.

//TODO: Define all functions that talk to the database
const url = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE;

// console.log(url); this log is for testing only
// console.log(databaseName);   this log is for testing only

collectionName = "characters";
const settings = {
    useUnifiedTopology: true,
    }; 

    let databaseClient;
    let characterCollection;

const connect = function() {
    return new Promise((resolve, reject) =>{
        MongoClient.connect(url, settings, (error, client)=> {
            if(error) {
             console.log(error);
             reject(error);
             return;
            }

            databaseClient = client.db(databaseName);
            characterCollection = databaseClient.collection(collectionName);
            console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
            resolve();
        });
    });
};

//INSERT ONE document (CREATE - C CRUD)
const insertOne = function (character) {
    return new Promise ((resolve, reject) =>{
        characterCollection.insertOne(character, (error, result) =>{
            if (error) {
               // console.log(error);
                reject (error);
                return;
            }
            console.log ("SUCCESSFULLY INSERTED A NEW CHARACTER");
            resolve();
        });    
    });
};

//FIND ALL documents (READ R- CRUD)

const findAll = function(){
    //the 'shape' of the object we are looking for.
    const query ={ };   
return new Promise((resolve, reject)=> {
characterCollection.find(query).toArray((error, documents)=> {
    if(error) {
       // console.log(error);
        reject(error);
        return;
    }
    //console.log(`SUECCESSFULLY FOUND  ${characters.length} CHARACTERS`);
    resolve(documents);
    });
    });
};

// -FIND ONE document (READ One, also R- optional)
const findOne = function(query) {
    return new Promise((resolve, reject) => {
        characterCollection.find(query).toArray((error, documents) => {
        
            if(error) {
               // console.log(error);
                reject(error);
                return;
            }

            if(documents.length > 0) {
                console.log("SUCCESSFULY FOUND DOCUMENT!");
                const document = documents[0];
                resolve(document);
            } else {
                reject("No Document Found!");
            }
        });
    })
}; 

// -updateOne document (UPDATE - CRUD)


const updateOne = function(query, newCharacter) {
    const newCharacterQuery = {}

        if(newCharacter.name) {
            newCharacterQuery.name = newCharacter.name;
        }

        if(newCharacter.strength) {
            newCharacterQuery.strength = newCharacter.strength;
        }

        if(newCharacter.durability) {
            newCharacterQuery.durability = newCharacter.durability;
        }

        if(newCharacter.speed) {
            newCharacterQuery.speed = newCharacter.speed;
        }


        if(newCharacter.power_level) {
            newCharacterQuery.power_level = newCharacter.power_level;
        }


        if(newCharacter.fighting_skill) {
            newCharacterQuery.fighting_skill = newCharacter.fighting_skill;
        }


        if(newCharacter.xfactor) {
            newCharacterQuery.xfactor = newCharacter.xfactor;
        }


        if(newCharacter.alignment) {
            newCharacterQuery.alignment = newCharacter.alignment;
        }


        if(newCharacter.universe) {
            newCharacterQuery.universe = newCharacter.universe;
        }

        if(newCharacter.image_url) {
            newCharacterQuery.image_url = newCharacter.image_url;
        }
        return new Promise((resolve, reject)=> {
            characterCollection.updateOne
            (query, { $set: newCharacterQuery},
                (error, result) => {
                if(error) {
                    console.log(error);
                    reject(error);
                    return;
                } else if (result.modifiedCount === 0) {
                    console.log("No Document Found");
                    reject("No Document Found");
                    return;
                }
                   
                console.log("SUCCESSFULLY UPDATED DOCUMENT!");
                    resolve();
                
            });
        });
    };


// -deleteOne Document (DELETE - D from CRUD)

const deleteOne = function (query) {
    return new Promise ((resolve, reject) => {
        characterCollection.deleteOne(query, (error, result)=> {
            if(error) {
                //console.log(error);
                reject(error);
                return;
            } else if (result.modifiedCount === 0) {
                console.log("No Document Found");
                reject("No Document Found");
                return;
            }
            
            console.log("SUCCESSFULLY DELETE DOCUMENT");
            resolve();
        });

    });
};


//TESTS 
(async () => {
// run `node dataAccessLayer.js`

await connect();


const newCharacter = {
    name: "Doctor Doom",
    "strength": 9000,
    "durability": 9000,
    "speed": 9000,
    "power_level":9000,
    "fighting_skill":6000,
    "xfactor": 2000,
    "Alignment": "Villian",
    "Universe": "Marvel",
    "image_url": ""
};
// await insertOne(newCharacter)
//console.log("END");
// process.exit(0);
});


//TODO: module.export ={ connect, ...}
module.exports={ connect, insertOne, findAll, findOne, updateOne, deleteOne };

// it can be helpful to build from back to front. the api and webapp are built. 
//then start with an operation from CRUD ( start with CREATE, then GET, then add DELETE, READ can be started if you create the document manually in Mongo) 
//interact with CRUD with postman to test the API that it is returning items and validation is correct. 