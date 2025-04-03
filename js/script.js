const countryList = document.getElementById('countries-list')
const floatingWindow = document.getElementById('floating-window')
let countryId = -1

//Template of a div with id, name and flag
const template = (country) => {
    countryId++
    localStorage.setItem(countryId, JSON.stringify(country))
    return `
        <div class="country" id="${countryId}" onclick="popUp(${countryId})">
            <img src = ${country.flags[1]}>
            <h4>${country.name.common}</h4>
        </div>
    `
}

const getCountries = async () => {
    try{
        const response = await fetch('https://restcountries.com/v3/all')
        if(!response.ok){
            throw new Error('Error: '+response.status)
        }
        //Get countries
        let countries = await response.json()
        //Sort countries
        countries.sort((a, b) => a.name.common > b.name.common)
        //Create divs
        countries = countries.map((country) => template(country))
        //Save divs as string
        localStorage.setItem('countries', countries.join(""))
        //Update HTML
        countryList.innerHTML = countries.join("")
    }catch(err){
        console.error(err)
    }
}

//Check for countries in localStorage
if(localStorage.getItem('countries') == null){
    getCountries()
}else{
    countryList.innerHTML = localStorage.getItem('countries')
}

//Creates a popUp window with info of the selected country
function popUp(Id) {
    let data = JSON.parse(localStorage.getItem(Id))
    console.log(data)
    floatingWindow.style.display = "block"
    floatingWindow.innerHTML = `
        <div class="floatingContent">
            <div>
                <img src="${data.flags[1]}">
                <div class="info">
                    <h2>${data.name.common}</h2>
                    <p>Capital: ${data.capital ? data.capital[0] : 'No tiene'}</p>
                    <p>Población: ${data.population}</p>
                    <p>Lado de la carretera: ${data.car.side}</p>
                </div>
            </div>
            <button id="closeBtn">Cerrar</button>
        </div>
    `
    document.getElementById('closeBtn').addEventListener('click', close)
}

//Closes the popUp window
function close() {
    floatingWindow.style.display = "none"
    floatingWindow.innerHTML = ''
}