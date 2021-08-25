const people_url = "https://swapi.dev/api/people"

// assigning a function to get people's data from the api

async function getData(url, renderData) {
    const response = await fetch(url)
    var data       = await response.json()
    renderData(data.results)   
}

getData(people_url, renderResidentData)

async function renderResidentData(personData){
    const urlParams = new URLSearchParams(location.search);
    residentSection = ''

    for (const [key, value] of urlParams) {
        const response   = await fetch(`${people_url}/${value}/`)
        const personData = await response.json()

        const homeWorldData = await fetch(personData.homeworld)
        const homeWorld     = await homeWorldData.json()

        const splittedURL = homeWorld.url.split("/")
                const id  = splittedURL[splittedURL.length - 2]
                const url = `homeworld.html?id=${id}`

        residentSection += `<div class="container">
                    <h1>${personData.name}</h1>
                    <p>Height: ${personData.height}</p>
                    <p>Mass: ${personData.mass}</p>
                    <p>Hair Color: ${personData.hair_color}</p>
                    <p>Eye Color: ${personData.eye_color}</p>
                    <p>Birth Year: ${personData.birth_year}</p>
                    <p>Gender: ${personData.gender}</p> 
                    <p>Home World: <a href="${url}">${homeWorld.name}</a></p>     
                    <button id="backButton"><a href="index.html">Back to home</a></button>

                    </div>`
    }
    document.querySelector("#residentDetail").innerHTML = residentSection
}