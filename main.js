"use strict"

function renderCoffee(coffee) {
    let html = `<div class="coffee" id="coffee_${coffee.id}">`
    html += `<h3 id='${coffee.id + '_name'}'>${coffee.name}</h3>`
    html += `<p id='${coffee.id + '_roast'}'>${coffee.roast}</p>`
    html += '</div>'

    return html;
}

function renderCoffees(coffees) {
    coffees.sort((a,b)=>a.id < b.id ? 0 : -1);

    let htmlCol1 = '<div class="col">';
    let htmlCol2 = '<div class="col">';
    for(let i = coffees.length - 1; i >= 0; i--) {
        if (i % 2 == 0) {
            htmlCol1 += renderCoffee(coffees[i]);
        } else {
            htmlCol2 += renderCoffee(coffees[i]);
        }
    }
    htmlCol1 += '</div>';
    htmlCol2 += '</div>';
    let finalHtml = '<div class="row">' + htmlCol1 + htmlCol2 + '</div>';
    return finalHtml;
}
//selecting coffee code
const updateCoffees = (e) => {

    if(e){
        e.preventDefault();
    }

    let selectedRoast = localStorage.getItem('roast_selection');


    if(!selectedRoast){
        localStorage.setItem('roast_selection','all roasts')
        selectedRoast = 'all roasts'
    }

    console.log(selectedRoast)


    // let filteredCoffees = [];
    // coffees.forEach(function(coffee) {
    let searchTerm = localStorage.getItem('search_term')
    //     if(coffee.roast === selectedRoast || selectedRoast === 'all roasts'){
    //         if(searchTerm){
    //
    //             if(searchTerm.toLowerCase().includes(coffee.name.toLowerCase())){
    //                 filteredCoffees.push(coffee)
    //             }
    //         }else{
    //             filteredCoffees.push(coffee)
    //         }
    //     }
    // })
    const searchFilter = new RegExp(`^${searchTerm}`, 'g')
    const filteredCoffees = coffees.filter(coffee => coffee.name.match(searchFilter) && (coffee.roast === selectedRoast || selectedRoast == 'all roasts'))

    if(filteredCoffees.length == 0){
        coffeesContainer.innerHTML = "<div style='display: flex; align-items-center; justify-content: center;'><em>Search Not Found</em></div>"
    }else{
        coffeesContainer.innerHTML = renderCoffees(filteredCoffees);
    }
}
// coffee list
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
//updating selecting coffee code
let coffeesContainer = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');


roastSelection.value = localStorage.getItem('roast_selection')

roastSelection.addEventListener('change',e=>{
    localStorage.setItem('roast_selection',e.target.value)
    console.log(e.target.value)
    updateCoffees(e)
})

updateCoffees()

// submitButton.addEventListener('click', updateCoffees);



const searchInput = document.querySelector('#search_input')
searchInput.value = localStorage.getItem('search_term')
let searchTerm = null


searchInput.addEventListener('keyup',(e)=>{

    localStorage.setItem('search_term',e.target.value)

    updateCoffees(e)
})
//adding coffee code
let newRoastSelection = document.querySelector('#new_roast_selection')
let submitNewCoffee = document.querySelector('#submit_new')
let newCoffeeName = document.querySelector('#new_coffee_name_input')
submitNewCoffee.addEventListener('click',(e)=>{
    e.preventDefault()
    let roast = newRoastSelection.value
    let name = newCoffeeName.value
    let id = coffees.length + 1
    let newCofee = {
        id,
        name,
        roast
    }
    coffees.push(newCofee)
    localStorage.setItem('coffees',JSON.stringify(coffees))
    newCoffeeName.value = ''
    updateCoffees()
})