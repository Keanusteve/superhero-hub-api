

const url = "http:localhost:3005/api/products";

//note: the http or https is required with axios for local developement.
axios
        .get(apiURL)
        .then((response) => {

            const characters = response.data;
            for (const characters of characters) {
                console.log(product.name);

                const listElement = document.getElementById("characterAttributes");
                const newListItemElement = document.createElement("li");
                newListItemElement.classList.add("character")
                const newImageElement = document.createElement("img");
                newImageElement.src = `./thumbnails/${character.imageUrl}`;
                //j.pg should be appended on image url, or it would need to be added with interpolation
                newImageElement.alt =character.name;

                const newImageElement = document.createElement("div");
                nameElement.innerText=character.name;
                const strengthElement = document.createElement("div");
                strengthElement.innerText = character.strength;
                
                const durabilityElement = document.createElement("div");
                durabilityElement.innerText = character.durability;

                const speedElement = document.createElement("div");
                speedElement.innerText = character.speed;

                const powerLevelElement= document.createElement("div");
                powerLevelElement.innerText = character.power_level;

                const fightingSkillElement = document.createElement("div");
                fightingSkillElement.innerText = fighting_skill;

                const xFactorElement = document.createElement("div");
                xFactorElement.innerText = character.xfactor;
                
                const alignmentElement = document.createElement("div");
                alignmentElement.innerText = character.alignment;

                const universeElement = document.createElement("div");
                universeElement.innerText = character.universe;

                newListItemElement.appendChild(newImageElement);
                newListItemElement.appendChild(strengthElement);
                newListItemElement.appendChild(speedElement);
                newListItemElement.appendChild(powerLevelElement);
                newListItemElement.appendChild(fightingSkillElement);
                newListItemElement.appendChild(xFactorElement);
                newListItemElement.appendChild(alignmentElement);
                newListItemElement.appendChild(universeElement);
                
                listElement.appendChild(newListItemElement);
                
            }


        })
        .catch((error) => {
          debugger;
        });
