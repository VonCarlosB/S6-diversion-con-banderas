const countryList = document.getElementById('countries-list')
const floatingWindow = document.getElementById('floating-window')
let countryId = -1

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
        const countries = await response.json()
        
        let ans = countries.sort((a, b) => a.name.common > b.name.common)
        ans = ans.map((country) => template(country))
        localStorage.setItem('countries', ans.join(""))
        countryList.innerHTML = ans.join("")
    }catch(err){
        console.error(err)
    }
}

localStorage.clear()

if(localStorage.getItem('countries') == null){
    getCountries()
}else{
    countryList.innerHTML = localStorage.getItem('countries')
    console.log(localStorage)
}

function popUp(Id) {
    let data = JSON.parse(localStorage.getItem(Id))
    if(data.capital === undefined){
        data.capital = ['No tiene']
    }
    console.log(data)
    floatingWindow.style.display = "block"
    floatingWindow.innerHTML = `
        <div class="floatingContent">
            <div>
                <img src="${data.flags[1]}">
                <div class="info">
                    <h2>${data.name.common}</h2>
                    <p>Capital: ${data.capital[0]}</p>
                    <p>Población: ${data.population}</p>
                    <p>Lado de la carretera: ${data.car.side}</p>
                </div>
            </div>
            <button id="closeBtn">Cerrar</button>
        </div>
    `
    document.getElementById('closeBtn').addEventListener('click', close)
}

function close() {
    floatingWindow.style.display = "none"
    floatingWindow.innerHTML = ''
}