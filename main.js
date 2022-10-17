"use strict"

function renderCoffee(coffee) {
    let html = `<div class="coffee" id="coffee_${coffee.id}">`
    html += `<h3 id='${coffee.id + '_name'}'>${coffee.name}</h3>`
    html += `<p id='${coffee.id + '_roast'}'>${coffee.roast}</p>`
    html += '</div>'

    return html;
}

function renderCoffees(coffees) {
    coffees.sort((a,b)=>a.id < b.id ? 0 : -1); //Sort by id in asc order

    let htmlCol1 = '<div class="col-sm-6 col-md-6">';//Smith - Left column
    let htmlCol2 = '<div class="col-sm-6 col-md-6">';//Smith - Right column
    for(let i = coffees.length - 1; i >= 0; i--) {
        if (i % 2 == 0) {
            htmlCol1 += renderCoffee(coffees[i]);
        } else {
            htmlCol2 += renderCoffee(coffees[i]);
        }
    }
    htmlCol1 += '</div>';
    htmlCol2 += '</div>';
    let finalHtml = '<div class="row">' + htmlCol1 + htmlCol2 + '</div>';  //Smith - mash columns into one html
    return finalHtml;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
