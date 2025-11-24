const scoutgroup = document.querySelectorAll(".scout-group")
const cubs = document.getElementById("cubs")
const scouts = document.getElementById("scouts") 
const rovers = document.getElementById("rovers")
const cubName = cubs.children[1]
const scoutName = scouts.children[1]
const roverName = rovers.children[1]
const cubAge = cubs.children[2]
const scoutAge = scouts.children[2]
const roverAge = rovers.children[2]

const cubsShirt = cubs.children[0]
const scoutsShirt = scouts.children[0]
const roversShirt = rovers.children[0]

 let opacity = 0
    const interval = 10
    const steps = 800
    const opacityDecrement = 1/800



function resetElement(e1, e2 , e3){

    e1.style.opacity = 0
    e2.style.top = '400px' 
    e3.style.top = '440px' 
    
}

function setElement(e1, e2 , e3,){

    e1.style.opacity = 1
    e2.style.top = '500px' 
    e3.style.top = '540px'

}


cubs.addEventListener('click', ()=>{



    setElement(cubsShirt, cubName, cubAge)    
    resetElement(scoutsShirt, scoutName, scoutAge)
    resetElement(roversShirt, roverName, roverAge)

})
scouts.addEventListener('click',()=>{

    setElement(scoutsShirt, scoutName, scoutAge, scoutsShirt) 
    resetElement(cubsShirt, cubName, cubAge)
    resetElement(roversShirt, roverName, roverAge)


})
rovers.addEventListener('click',()=>{

    setElement(roversShirt, roverName, roverAge, roversShirt) 
    resetElement(cubsShirt, cubName, cubAge)
    resetElement(scoutsShirt, scoutName, scoutAge)
})

scoutsShirt.addEventListener('dblclick', ()=>{

    window.location.href = "profile.html"


})