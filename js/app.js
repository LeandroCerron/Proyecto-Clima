const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);
});

function searchWeather(e){
    e.preventDefault();

    //Validar.
    const city = document.querySelector('#ciudad').value;
    const country = document.querySelector('#pais').value;
    if(city === '' || country === ''){
        printAlert('There was an error, check the form fields');
    }else{
        //Consultar a la API.
        checkAPI(city, country);
    }
}

function printAlert(message){
    const alert = document.querySelector('.bg-red-100');
    if(!alert){
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alert.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${message}</span>
        `;
        container.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 4000);
    }
}

function checkAPI(city, country){
    const appId = '2d99adc36ef6cb9e00935ec1479f4bee';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

    spinner();

    fetch(url)
        .then( answer => answer.json() )
        .then( data => {
            checkCod(data);
        } )
}

function checkCod(data){
    cleanHTML();
    if(data.cod === "404"){
        printAlert('City not found');
    }else{
        const { sys: {country} ,name, main: {temp, temp_max, temp_min} } = data;

        const nameCity = document.createElement('h1');
        nameCity.textContent = name;
        nameCity.classList.add('font-bold', 'text-2xl');

        const nameCountry = document.createElement('h1');
        nameCountry.textContent = identifyCountry(country);
        nameCountry.classList.add('font-bold' ,'text-6xl');

        const centigrade = kelvinToCentigrade(temp);
        const maxTemp = kelvinToCentigrade(temp_max);
        const minTemp = kelvinToCentigrade(temp_min);

        const actual = document.createElement('p');
        actual.innerHTML = `<p>${centigrade}&#8451</p>`;
        actual.classList.add('font-bold', 'text-6xl');

        const max = document.createElement('p');
        max.innerHTML = `<p>Máxima: ${maxTemp}&#8451</p>`;
        max.classList.add('text-xl');

        const min = document.createElement('p');
        min.innerHTML = `<p>Mínima: ${minTemp}&#8451</p>`;
        min.classList.add('text-xl');

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('text-center', 'text-white');
        resultDiv.appendChild(nameCountry);
        resultDiv.appendChild(nameCity);
        resultDiv.appendChild(actual);
        resultDiv.appendChild(max);
        resultDiv.appendChild(min);
        
        result.appendChild(resultDiv);
    }
}

const kelvinToCentigrade = degrees => parseInt(degrees - 273.15);

function cleanHTML(){
    while( result.firstChild ){
        result.removeChild(result.firstChild);
    }
}

function identifyCountry(country){
    let selected = '';
    switch (country) {
        case 'AR':
            selected = 'Argentina';
            break;
        case 'CO':
            selected = 'Colombia';
            break;
        case 'CR':
            selected = 'Costa Rica';
            break;
        case 'ES':
            selected = 'España';
            break;
        case 'US':
            selected = 'Estados Unidos';
            break;
        case 'MX':
            selected = 'México';
            break;
        case 'PE':
            selected = 'Perú';    
        default:
            break;
    }
    return selected;
}

function spinner(){
    cleanHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    result.appendChild(divSpinner);
}