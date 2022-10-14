(function(){

    "use strict"
    const renderCoffee = (coffee) => {        
        let coffeeElement = document.createElement('div')
        coffeeElement.id = `coffee_${coffee.id}`
        coffeeElement.classList.add('coffee')

        let coffeeTitle = document.createElement('h3')
        coffeeTitle.innerText = coffee.name
        coffee.id = coffee.id + '_name'
        
        let coffeeRoast = document.createElement('p')
        coffeeRoast.innerText = coffee.roast

        coffeeElement.appendChild(coffeeTitle)
        coffeeElement.appendChild(coffeeRoast)

        return coffeeElement
    }

    const renderCoffees = (coffees) => {
        coffees.sort((a,b)=>a.id < b.id ? 0 : -1)
        let coffee_elements = []
        let element = null
        for(let i = coffees.length - 1; i >= 0; i--) {
            if (i % 2 == 0) {
                element = renderCoffee(coffees[i])
            } else {
                element = renderCoffee(coffees[i])
            }
            coffee_elements.push(element)
        }  
        return coffee_elements

    }

    const updateCoffees = (e) => {
        if(e){ 
            e.preventDefault()
        }

        let selectedRoast = localStorage.getItem('roast_selection')

        if(!selectedRoast){ 
            localStorage.setItem('roast_selection','all roasts') 
            selectedRoast = 'all roasts' 
        } 


        let filteredCoffees = []
        coffees.forEach(function(coffee) {
            let searchTerm = localStorage.getItem('search_term')
            if(coffee.roast === selectedRoast || selectedRoast === 'all roasts'){  
                if(searchTerm){ 
                    if(searchTerm.toLowerCase().includes(coffee.name.toLowerCase())){
                        filteredCoffees.push(coffee)
                    }
                }else{
                    filteredCoffees.push(coffee)
                }
            }
        })
        let elements = renderCoffees(filteredCoffees)
        coffees_container.innerHTML = ""
        elements.forEach(elem => coffees_container.appendChild(elem))
        // coffees_container.appendChild(renderCoffees(filteredCoffees))

    }

    let default_coffees = [
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
        {id: 15, name: 'Cowboy Coffee', roast: 'dark'},
        {id: 16, name: 'Unicorn Piss', roast: 'light'},
        {id: 17, name: 'JP-10', roast: 'medium'},
    ]

    let coffees = [
    
    ]

    let localStorageCoffees = JSON.parse(localStorage.getItem('coffees'))
    console.log(localStorageCoffees)

    if(!localStorageCoffees){
        coffees = default_coffees
        localStorage.setItem('coffees',JSON.stringify(coffees))
    }else{
        coffees = localStorageCoffees
    }

    let coffees_container = document.querySelector('#coffees')
    let submitButton = document.querySelector('#submit')
    let roastSelection = document.querySelector('#roast-selection')


    roastSelection.value = localStorage.getItem('roast_selection')

    roastSelection.addEventListener('change',e=>{
        localStorage.setItem('roast_selection',e.target.value)
        console.log(e.target.value)
        updateCoffees(e)
    })

    updateCoffees()

    submitButton.addEventListener('click', updateCoffees)

    const searchInput = document.querySelector('#search_input')
    searchInput.value = localStorage.getItem('search_term')

    searchInput.addEventListener('keyup',(e)=>{
        localStorage.setItem('search_term',e.target.value)
        updateCoffees(e)
    })

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

}());