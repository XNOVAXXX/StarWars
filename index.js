const tableBody = document.querySelector('tbody')
const tableHead = document.querySelector('thead')
const btnNext = document.querySelector('#next')
const btnPrevious = document.querySelector('#previous')

const API_URL = `https://swapi.dev/api/`

const END_POINTS = {
    people: {
        apiURL: `${API_URL}/people`,
        endpoint: 'people',
        data: [
            "Name",
            "Birth Year",
            "Height",
            "Mass"
        ],
        Values: [
            "name",
            "birth_year",
            "height",
            "mass"
        ]    
    },
    planets: {
        apiURL: `${API_URL}/planets`,
        endpoint: 'planets',
        data: [
            "Name",
            "Population",
            "Orbital_Period",
            "Gravity",
            "Climate"
        ],
        Values: [
            "name",
            "population",
            "orbital_period",
            "gravity",
            "climate"
        ]
    },
    films:{
        apiURL: `${API_URL}/films`,
        endpoint: 'films',
        data: [
            "Title",
            "Episode",
            "Director",
            "Praducer",
            "Release_Date"
        ],
        Values: [
            "title",
            "episode_id",
            "director",
            "producer",
            "release_date"
        ]
    },
    species: {
        apiURL: `${API_URL}/species`,
        endpoint: 'species',
        data: [
            "Name",
            "Classification",
            "Designation",
            "Height",
            "Language"
        ],
        Values: [
            "name",
            "classification",
            "designation",
            "average_height",
            "language"
        ]
    },
    vehicles: {
        apiURL: `${API_URL}/vehicles`,
        endpoint: 'vehicles',
        data: [
            "Name",
            "Model",
            "Manufacturer",
            "Cost",
            "Max Speed",
            "Passengers",
            "Class",
            "Capacity"
        ],
        Values: [
            "name",
            "model",
            "manufacturer",
            "cost_in_credits",
            "max_atmosphering_speed",
            "passengers",
            "vehicles_class",
            "cargo_capacity"
        ]
    }, 
    starships: {
        apiURL: `${API_URL}/starships`,
        endpoint: 'starships',
        data: [
            "Name",
            "Model",
            "Manufacturer",
            "Cost",
            "Max Speed",
            "Passengers",
            "Class",
            "Capacity"
        ],
        Values: [
            "name",
            "model",
            "manufacturer",
            "cost_in_credits",
            "max_atmosphering_speed",
            "passengers",
            "starship_class",
            "cargo_capacity"
        ]
    }
}

btnNext.addEventListener('click', () => {
    const apiURL = btnNext.dataset['url']
    const endpoint = btnNext.dataset['endpoint']

    if(apiURL !== 'null'){
        END_POINTS[endpoint].apiURL = apiURL
        drawDataTable(endpoint)
    }
})

btnPrevious.addEventListener('click', () => {
    const apiURL = btnPrevious.dataset['url']
    const endpoint = btnPrevious.dataset['endpoint']

    if(apiURL !== 'null'){
        END_POINTS[endpoint].apiURL = apiURL
        drawDataTable(endpoint)
    }
})


document.addEventListener('DOMContentLoaded', () => {
btnNext.style.display  = 'none'
btnPrevious.style.display = 'none'

    const head = document.createElement('tr')
    head.innerHTML = `
        <th>Resources</th>
        <th>Endpoint</th>
    `
    tableHead.appendChild(head)

fetch(`${API_URL}/`)
    .then(response => response.json())
    .then(data => {
        const result = Object.entries(data)
        result.forEach(result => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${result[0]}</td>
                <td>
                    <a href="#" class="${result[0]}">${result[1]}</a>
                </td>
            `
            tableBody.appendChild(row)
        })       
    })
})

const drawEndpoints = () => {
    btnNext.style.display  = 'none'
btnPrevious.style.display = 'none'

    const head = document.createElement('tr')
    head.innerHTML = `
        <th>Resources</th>
        <th>Endpoint</th>
    `
    tableHead.appendChild(head)

fetch(`${API_URL}/`)
    .then(response => response.json())
    .then(data => {
        const result = Object.entries(data)
        result.forEach(result => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${result[0]}</td>
                <td>
                    <a href="#" class="${result[0]}">${result[1]}</a>
                </td>
            `
            tableBody.appendChild(row)
        })       
    })
}

tableBody.addEventListener('click', (e) => {
    const endpoint = e.target.classList[0]
    drawTable(endpoint)
    drawDataTable(endpoint)
})

const drawTable = (endpoint) => {

    btnNext.style.display  = 'block'
    btnPrevious.style.display = 'block'

    tableHead.innerHTML = ''
    tableBody.innerHTML = ''

    const {data} = END_POINTS[endpoint]

    const head = document.createElement('tr')

    data.forEach(infoData => {
        const th = document.createElement('th')
        th.innerHTML = `${infoData}`
        head.appendChild(th)
    })
    tableHead.appendChild(head)
}

const drawDataTable = (endpoint) => {

    tableBody.innerHTML = ''
    const {apiURL, Values} = END_POINTS[endpoint]

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const {next, previous, results} = data

        btnNext.setAttribute('data-url', next)
        btnNext.setAttribute('data-endpoint', endpoint)

        btnPrevious.setAttribute('data-url', previous)
        btnPrevious.setAttribute('data-endpoint', endpoint)
        
        results.forEach(result => {
            const row = document.createElement('tr')
            Values.forEach(value => {
                const td = document.createElement('td')
                td.innerHTML = `${result[value]}`
                row.appendChild(td)
            })
            tableBody.appendChild(row)
        })
    })
}