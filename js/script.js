const countryList = document.getElementById('countries-list')
const floatingWindow = document.getElementById('floating-window')

//Template of a div with id, name and flag
const template = (country) => {
    return `
        <div class="country">
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
        const countries = await response.json()
        //Sort countries
        countries.sort((a, b) => a.name.common > b.name.common)
        //Create divs
        let ans = countries.map((country) => template(country))
        //Update HTML
        countryList.innerHTML = ans.join("")
        //Add Event Listeners to the countries
        const cards = document.querySelectorAll('.country')
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const data = countries[index]
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
                        <button onclick="closeInfo()">Cerrar</button>
                    </div>
                `
            })
        })

    }catch(err){
        console.error(err)
    }
}

getCountries()

//Closes the popUp window
function closeInfo(){
    floatingWindow.style.display = 'none'
    floatingWindow.innerHTML = ''
}