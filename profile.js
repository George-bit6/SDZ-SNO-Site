const date = document.getElementById('date')
const dateList = document.getElementById('date-list')
const week1 = document.getElementById('week1')
const week2 = document.getElementById('week2')
const week3 = document.getElementById('week3')
const week4 = document.getElementById('week4')
const week5 = document.getElementById('week5')
const left_arr = document.querySelector('.left-arrow')
const right_arr = document.querySelector('.right-arrow')

const home = document.getElementById('title');

home.addEventListener('click', () => {

    window.location.href = 'index.html';
})


const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth

monthIndex = 0

left_arr.addEventListener('click', function(){

    monthIndex = (monthIndex + 11) % 12
    setCalendar(2025 ,months[monthIndex], month_days[monthIndex])  
    console.log(monthIndex)  
 

})

right_arr.addEventListener('click', function(){

    monthIndex = (monthIndex + 1) % 12
    setCalendar(2025 ,months[monthIndex], month_days[monthIndex])
  

})

function FebDays(year){
    
    if(year % 4 == 0 || year % 400 == 0){
        return 29
    } 
    else{
        return 28
    }


}


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month_days = [31, FebDays(currentYear), 31, 30, 31, 30, 31, 31 ,30 , 31 , 30, 31]



function generateDays(year, month, numOfDays){

    for(i = 0; i < numOfDays; i++){
        let day = document.createElement("div")
        day.classList.add('days')
        day.id = `${month}-day-${i + 1}-${year}`
        day.textContent = i + 1
        if(i < 7){
            week1.appendChild(day)
        }
        else if(i < 14){
            week2.appendChild(day)
        } 
        else if(i < 21){
            week3.appendChild(day)
        }
        else if(i < 28){
            week4.appendChild(day)
        }
        else{
            week5.appendChild(day)
        }

        

    }
}

function setCalendar(year, month, numOfDays){

    const days = document.querySelectorAll('.days')
    if(days){
        days.forEach(element => {
            element.remove()
        })
    }
    date.textContent = `${month} ${year}`
    generateDays(year, month, numOfDays)


}

setCalendar(2025 ,months[0], month_days[0])