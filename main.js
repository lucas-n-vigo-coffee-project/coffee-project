(function(){

    "use strict"
    const renderCoffee = (coffee) => {        
        let coffeeElement = document.createElement('div')
        coffeeElement.onclick = () => {
            console.log("Coffee clicked")
            console.log(coffees[Number(coffee.id.split('_')[0]) - 1])
            showDialog(
                "You Clicked a Coffee",
                `You've clicked the ${coffee.id.split('_')[0]} coffe on the list.`,
                [
                    {
                        dialogActionText : "Ok",
                        dialogActionCallback : () => {
                            dialogContainer.style.display = 'none'
                        }
                    }
                ]
            )
        }
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
        let searchTerm = localStorage.getItem('search_term')
        coffees.forEach(function(coffee) {
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

    //NEW CODE
    const mainContainer = document.getElementById('container')
    mainContainer.style.opacity = '0%'
    mainContainer.height = '100vh'
    mainContainer.style.overflowY = 'scroll'
    let selectedCup = null
    let conveyerPiece = document.getElementById('conveyerPiece')
    let conveyerPieceStyle = window.getComputedStyle(conveyerPiece)

    let velocity = 20
    let distance = Number(conveyerPieceStyle.width.split('px')[0]) / 3
    // console.log("velocity: " + velocity)
    // console.log("distance: " + distance)
    //d = v / t
    //t = d * v

    let t = distance * velocity
    
    let conveyerPieces = []
    let cups = []


    //Intialize Cup
    const initializeCup = () => {
        let cup = document.getElementById('cup')
        cup.style.transition = 'all 1s'
        let cupStyle = window.getComputedStyle(cup)

        let cupHeight =  Number(cupStyle.height.split('px')[0])
        let cupWidth = Number(cupStyle.width.split('px')[0])
        // console.log(cupHeight)
        // console.log(cupWidth)
        const sizes = {
            short : {
                width : cupWidth * 0.28,
                height : cupHeight * 0.28,
                left : window.innerWidth < 600 ? window.innerWidth * 0.012 : window.innerWidth * 0.15
            },
            tall : {
                width : cupWidth * 0.4,
                height : cupHeight * 0.4,
                left : window.innerWidth < 600 ? window.innerWidth * 0.17 : window.innerWidth * 0.32
            },
            grande : {
                width : cupWidth * 0.6,
                height : cupHeight * 0.6,
                left : window.innerWidth < 600 ? window.innerWidth * 0.37 : window.innerWidth * 0.53
            },
            venty : {
                width : cupWidth * 0.8,
                height : cupHeight * 0.8,
                left : window.innerWidth < 600 ? window.innerWidth * 0.65 : window.innerWidth * 0.75
            }
        }

        const selectedCupScale = 1.4

        const cupClicked = (cup,type) => {
            if(selectedCup) return
            conveyerPaused = true
            // let rusure = confirm(`Are you sure you want a ${type} cup?`) 
            showDialog(
                "Are You Sure?",
                `Are you sure you want a ${type} cup?`,
                [
                    {
                        dialogActionText : 'No',
                        dialogActionCallback : () => {
                            dialogContainer.style.display = 'none'
                        }
                    },
                    {
                        dialogActionText : 'Yes',
                        dialogActionCallback : () => {
                            dialogContainer.style.display = 'none'
                            document.getElementById('whatSizeLabel').style.display = 'none'
                            selectedCup = type
                            mainContainer.style.opacity = '100%'
                            mainContainer.style.display = 'block'
                            cup.style.transform = `scale(${selectedCupScale})`
                            let cupNewLeft = window.innerWidth > 600 ? Number((window.innerWidth / 2) - (sizes[type].width / 2) - sizes[type].width) + 'px' : Number((window.innerWidth / 2) - (sizes[type].width / 2) + sizes[type].width - 30) + 'px';
                            cup.style.left = cupNewLeft
                            cups.filter(c=>c != cup).forEach(c=>{ //Filter out the clicked cup and iterate through the rest
                                c.style.animation = 'hide 2s forwards' //Hide it
                                setTimeout(()=>{ //Wait for 2 secs for the hiding animation to complete
                                    c.onclick = null //Remove the onclick event, no need to remove cup in case we want to refactor later to let them change their mind
                                },2000)
                            })
                            cup.style.zIndex = -1
                            setTimeout(()=>{
                                conveyerPaused = false
                            },2000)
                        }
                    },
                    
                ]
            )
        }

        //Make the short cup
        let shortCup = cup.cloneNode(true)
        shortCup.style.visibility = 'visible'
        shortCup.style.position = 'absolute'
        shortCup.style.width = sizes.short.width + 'px'
        shortCup.style.height = sizes.short.height + 'px'
        shortCup.style.left = sizes.short.left
        shortCup.style.top = 330;
        shortCup.style.zIndex = 100;
        document.body.appendChild(shortCup)
        shortCup.onclick = () => cupClicked(shortCup,'short')
        cups.push(shortCup)
        if(selectedCup == 'short'){
            var evObj = document.createEvent('Events')
            evObj.initEvent('click', true, false)
            shortCup.dispatchEvent(evObj)
        }

        //Make the tall cup
        let tallCup = cup.cloneNode(true)
        tallCup.style.visibility = 'visible'
        tallCup.style.position = 'absolute'
        tallCup.style.width = sizes.tall.width + 'px'
        tallCup.style.height = sizes.tall.height + 'px'
        tallCup.style.left = sizes.tall.left
        tallCup.style.top = 330;
        tallCup.style.zIndex = 100;
        document.body.appendChild(tallCup)
        tallCup.onclick = () => cupClicked(tallCup,'tall')
        cups.push(tallCup)
        if(selectedCup == 'tall'){
            var evObj = document.createEvent('Events')
            evObj.initEvent('click', true, false)
            tallCup.dispatchEvent(evObj)
        }

        //Make the grande cup
        let grandeCup = cup.cloneNode(true)
        grandeCup.style.visibility = 'visible'
        grandeCup.style.position = 'absolute'
        grandeCup.style.width = sizes.grande.width + 'px'
        grandeCup.style.height = sizes.grande.height + 'px'
        grandeCup.style.left = sizes.grande.left
        grandeCup.style.top = 330;
        grandeCup.style.zIndex = 100;
        document.body.appendChild(grandeCup)
        grandeCup.onclick = () => cupClicked(grandeCup,'grande')
        cups.push(grandeCup)
        if(selectedCup == 'grande'){
            var evObj = document.createEvent('Events')
            evObj.initEvent('clicked', true, false)
            grandeCup.dispatchEvent(evObj)
        }

        //Make the venty cup
        let ventyCup = cup.cloneNode(true)
        ventyCup.style.visibility = 'visible'
        ventyCup.style.position = 'absolute'
        ventyCup.style.width = sizes.venty.width + 'px'
        ventyCup.style.height = sizes.venty.height + 'px'
        ventyCup.style.left = sizes.venty.left
        ventyCup.style.top = 330;
        ventyCup.style.zIndex = 100;
        document.body.appendChild(ventyCup)
        ventyCup.onclick = () => cupClicked(ventyCup,'venty')
        cups.push(ventyCup)
        if(selectedCup == 'venty'){
            var evObj = document.createEvent('Events')
            evObj.initEvent('click', true, false)
            ventyCup.dispatchEvent(evObj)
        }
        
    }

    let conveyerNewPieceTimer = null
    let conveyerMovePiecesTimer = null
    let conveyerPaused = false
    const createConveyerPiece = () => {
        if(conveyerPaused) return
        let newPiece = conveyerPiece.cloneNode(true)
        // newPiece.style.visibility = 'visible'
        newPiece.style.position = 'absolute'
        newPiece.style.top = 0;
        newPiece.style.left = 0;
        newPiece.style.top = 500;
        conveyerPieces.push(newPiece)
        // console.log(conveyerPieces)
        document.body.appendChild(newPiece)

    }

    window.onblur = () => {
        clearInterval(conveyerNewPieceTimer)
        conveyerPaused = true
    }

    window.onfocus = () => {
        conveyerNewPieceTimer = setInterval(createConveyerPiece,t)
        conveyerPaused = false
    }

    window.onresize = () => {
        if(!selectedCup){
            cups.forEach(cup=>{
                cup.remove()
            })

            initializeCup()
        }
    }

    const animateConveyer = () => {
        //Conveyer New Piece Timer
        conveyerNewPieceTimer = setInterval(createConveyerPiece,t)
        
        
        //Conveyer Move Pieces Timer
        conveyerMovePiecesTimer = () => {
            if(!conveyerPaused){
                conveyerPieces.forEach(piece=>{
                    let pieceLeft = Number(piece.style.left.split('px')[0])
                    if(piece.style.animation == ''){
                        piece.style.animation = 'display 2s forwards'
                    }
                    let pieceStyle = window.getComputedStyle(piece)
                    let pieceWidth =  Number(pieceStyle.width.split('px')[0])
                    let rightPieceLimit = (window.innerWidth - pieceWidth)
                    if(pieceLeft > rightPieceLimit){
                        if(pieceStyle.animation == 'display 2s forwards'){
                            piece.style.animation = 'hide 2s forwards'
                        }
                        let newPieceLeft = pieceLeft + Math.floor(distance / 30)
                        piece.style.left = newPieceLeft
                        setTimeout(()=>{
                            piece.remove()
                            setTimeout(()=>{
                                delete conveyerPieces[conveyerPieces.indexOf(piece)]
                            },1000)
                        },1000)
                    }else{
                        let newPieceLeft = pieceLeft + (distance / 30)
                        piece.style.left = newPieceLeft
                    }
                })  
            } 
            
            setTimeout(()=>{
                requestAnimationFrame(conveyerMovePiecesTimer)
            },(t  / (30)))
        }
        conveyerMovePiecesTimer()

    }

    let cupMovementTimer = null
    const animateCup = () =>{
        cupMovementTimer = setInterval(()=>{
            let cupLeft = Number(cup.style.left.split('px')[0])
            let newCupLeft = cupLeft + (distance / 30)
            cup.style.left = newCupLeft   
        },(t / (30 - 10)))
    }

    initializeCup()
    animateConveyer()

    const dialogContainer = document.querySelector('.dialog-container')
    const dialogCloseBtn = document.querySelector('.dialog-close-btn')
    const dialogContent = document.querySelector('.dialog-content')
    const dialogFooter = document.querySelector('.dialog-footer')
    const dialogTitle = document.querySelector('.dialog-title')

    const showDialog = (title,content,actions) => {   
        dialogContainer.style.zIndex = 10000000; 
        //Set the dialog title
        dialogTitle.innerText = title

        //Set the dialog content
        dialogContent.innerText = content

        const actionElems = []
        //Set the dialog actions
        actions.forEach(action=>{
            let actionBtn = document.createElement('button')
            actionBtn.innerText = action.dialogActionText
            actionBtn.style.marginTop = '8px'
            actionBtn.style.marginBottom = '8px'
            actionBtn.style.marginRight = '8px'
            actionBtn.classList.add('dialog-action')
            actionBtn.onclick = () => action.dialogActionCallback()
            actionElems.push(actionBtn)
        })
        
        dialogFooter.innerHTML = ''
        
        for(let elem of actionElems){
            dialogFooter.appendChild(elem)
        }
        dialogContainer.style.display = 'flex'

    }

    //Listen for dialog close button
    dialogCloseBtn.onclick = () => {
        dialogContainer.style.display = 'none'
    }

    showDialog(
        "Select a Size",
        "Select a size cup for your joe.",
        [
            {
                dialogActionText : "Ok",
                dialogActionCallback : () => {
                    dialogContainer.style.display = 'none' //Hide the dialog
                    mainContainer.style.display = 'block' //Show the coffee selector
                }
            },
        ]
    )
}());