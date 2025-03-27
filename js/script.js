const countryList = document.getElementById('countries-list')
const floatingWindow = document.getElementById('floating-window')
let reference = []
let countryId = -1

localStorage.clear()

if(localStorage.getItem('countries') == null){
    fetch('https://restcountries.com/v3/all').then((response) => {
        if(!response.ok){
            throw new Error('Ha sucedido un error con la petición ', response.status)
        }
        return response.json()
    }).then((data) => {
        let ans = data.sort((a, b) => a.name.official > b.name.official)
        ans = ans.map((country) => template(country))
        localStorage.setItem('countries', ans.join(""))
        countryList.innerHTML = ans.join("")
        console.log(localStorage)
    }).catch((err) => console.error(err))
}else{
    countryList.innerHTML = localStorage.getItem('countries')
    console.log(localStorage)
}

const template = (country) => {
    countryId++
    reference.push(country)
    localStorage.setItem(countryId, country)
    return `
        <div class="country" id="${countryId}" onclick="popUp(${countryId})">
            <img src = ${country.flags[1]}>
            <p>${country.name.official}</p>
        </div>
    `
}

function popUp(Id) {
    let data = reference[Id]
    floatingWindow.style.display = "block"
    floatingWindow.innerHTML = `
        <div class="floatingContent">
            <div>
                <img src="${data.flags[1]}">
                <div class="info">
                    <h2>${data.name.official}</h2>
                </div>
            </div>
            <button onclick="close()">Cerrar</button>
        </div>
    `
    console.log(data)
}

function close() {
    floatingWindow.style.display = "none"
    floatingWindow.innerHTML = ''
}