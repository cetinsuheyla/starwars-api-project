// selecting and assigning html elements

const results = document.querySelector("#results")

const buttons = document.querySelectorAll(".options")

const loader  = document.querySelector(".loader")

const cards   = document.querySelector(".cards")

// defining functions for showong and hiding loader

function hideLoader() {
    loader.style.display = "none"
}
function showLoader() {
    loader.style.display = "block"
}

hideLoader()

//fetching and displaying the data according to the button clicked

async function asyncFetch(value){
    showLoader()
    cards.style.display = "none"
    const response      = await fetch(`https://swapi.dev/api/${value}/`)
    const data          = await response.json()
    await showResults(data, value)   
}

async function showResults(data, value){
    
    let resultsSection = ''
    if(value === 'people'){

        document.querySelector("#people").classList.add("active")
        document.querySelector("#planets").classList.remove("active")
        

        for (let person of data.results){

                const response  = await fetch(person.homeworld)
                const homeWorld = await response.json()

                const splittedURL = person.homeworld.split("/")
                const id          = splittedURL[splittedURL.length - 2]
                const url         = `homeworld.html?id=${id}`


            resultsSection += `
                <div class="card">
                    <h2>${person.name}</h2>
                    <p>Birth Year: ${person.birth_year}</p>
                    <p>Gender: ${person.gender}</p>
                    <p>Home World: <a href=${url}>${homeWorld.name}</a></p>
                    
                </div>
            `
        }
    }

    if(value === 'planets'){

        document.querySelector("#people").classList.remove("active")
        document.querySelector("#planets").classList.add("active")

        for(let planet of data.results){
            
            //accumulating the residents data of each planet

            let acc = `<div>`

            if(planet.residents.length == 0){
                    acc += `<p>"This planet does not have any resident."</p>`
                }

            for(let resident of planet.residents){
                const response       = await fetch(resident)
                const residentDetail = await response.json()
            
                const splittedURL = residentDetail.url.split("/")
                const id          = splittedURL[splittedURL.length - 2]
                const url         = `residents.html?id=${id}`
                

                acc += `<section id="residentNames"><span><a href="${url}">${residentDetail.name} </a></span></section>`
            }
            
            acc += "</div>"
            resultsSection += ` <div class="card">
            <h2>${planet.name}</h2>
            <p>Diameter: ${planet.diameter}</p>
            <p>Climate: ${planet.climate}</p>
            <p>Residents:</p>
            ${acc}
            </div>`       
        }
    }

    hideLoader()

    cards.style.display = "flex"

    results.innerHTML = resultsSection
}



//event listener for buttons
buttons.forEach(item => item.addEventListener('click', e => {
    asyncFetch(e.target.textContent.trim().toLowerCase())
}))




