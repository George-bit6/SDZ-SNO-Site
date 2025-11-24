const scoutgroup = document.querySelectorAll(".scout-group")
const cubs = document.getElementById("cubs")
const scouts = document.getElementById("scouts") 
const rovers = document.getElementById("rovers")
const cubName = cubs.children[0]
const scoutName = scouts.children[0]
const roverName = rovers.children[0]
const cubAge = cubs.children[1]
const scoutAge = scouts.children[1]
const roverAge = rovers.children[1]



function resetElement(e1, e2 , e3){

    e1.style.backgroundColor = '#fff'
    e2.style.top = '400px' 
    e3.style.top = '440px' 
    e2.style.color = '#000'
    e3.style.color = '#000'
}

function setElement(e1, e2 , e3, color){

    e1.style.backgroundColor = color
    e2.style.top = '640px' 
    e3.style.top = '680px'
    e2.style.color = '#fff'
    e3.style.color = '#fff'
}


cubs.addEventListener('click', ()=>{



    setElement(cubs, cubName, cubAge, 'yellow')    
    resetElement(scouts, scoutName, scoutAge)
    resetElement(rovers, roverName, roverAge)

})
scouts.addEventListener('click',()=>{

    setElement(scouts, scoutName, scoutAge, 'green') 
    resetElement(cubs, cubName, cubAge)
    resetElement(rovers, roverName, roverAge)


})
rovers.addEventListener('click',()=>{

    setElement(rovers, roverName, roverAge, 'red') 
    resetElement(cubs, cubName, cubAge)
    resetElement(scouts, scoutName, scoutAge)
})