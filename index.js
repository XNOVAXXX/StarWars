const tableBody = document.querySelector('tbody')
const tableHead = document.querySelector('thead')

const API_URL = `https://swapi.dev/api/`

console.log(tableBody)
console.log(tableHead)

document.addEventListener('DOMContentLoaded', () => {
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
            <td>${result[0]}</th>
            <td>${result[1]}</th>
            `
            tableBody.appendChild(row)
        })       
    })
})