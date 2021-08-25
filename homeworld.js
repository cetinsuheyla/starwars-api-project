const planets_url = "https://swapi.dev/api/planets"


async function getData(url, renderData) {
    const response = await fetch(url)
    var data       = await response.json()
    renderData(data.results)   
}

getData(planets_url, renderPlanetDetail)



async function renderPlanetDetail(planetData){
    const urlParams      = new URLSearchParams(location.search);
    let homeWorldSection = ''
    
    for (const [key, value] of urlParams) {
        const response   = await fetch(`${planets_url}/${value}/`)
        const planetData = await response.json()

        let acc = ``
            for(let resident of planetData.residents){
                const response       = await fetch(resident)
                const residentDetail = await response.json()
                
            
                const splittedURL = residentDetail.url.split("/")
                const id  = splittedURL[splittedURL.length - 2]
                const url = `residents.html?id=${id}`

                acc += `<span><a href=${url}>${residentDetail.name},    </a></span>`
            }
            
            acc += ""
            

        homeWorldSection += `<div class="container">
                    <h1>${planetData.name}</h1>
                    <p>Residents: ${acc}</p>
                    <p>Population: ${planetData.population}</p>
                    <p>Climate: ${planetData.climate}</p>
                    <p>Terrain: ${planetData.terrain}</p>
                    <p>Gravity: ${planetData.gravity}</p>
                    <p>Rotation Period: ${planetData.rotation_period}</p>
                    <p>Orbital Period: ${planetData.orbital_period}</p>
                    <p>Diameter: ${planetData.diameter}</p>
                    <button id="backButton"><a href="index.html">Back to home</a></button>
                    
        </div>`
    
    }
    document.querySelector("#planetDetail").innerHTML = homeWorldSection
}



