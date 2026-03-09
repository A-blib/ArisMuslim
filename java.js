function setActiveMenu(pageId){

document.querySelectorAll(".menu-navigation a").forEach(link=>{
link.classList.remove("active")

if(link.dataset.page === pageId){
link.classList.add("active")
}

})

}



/* =========================
PAGE ROUTER
========================= */

function showPage(pageId){

    console.log("open page:", pageId)

const validPages = ["home","cv","portfolio","game","contact"]

if(!validPages.includes(pageId)){
return
}

window.location.hash = pageId

const pages = document.querySelectorAll("main section")

pages.forEach(page=>{
page.classList.remove("active")
})

const activePage = document.getElementById(pageId)

if(activePage){

activePage.classList.add("active")

/* reset scroll */

activePage.scrollTop = 0
document.querySelector("main").scrollTop = 0

observeReveal(activePage)

}

setActiveMenu(pageId)

if(pageId === "portfolio"){
startTyping()
}

}



/* load page */

const currentPage = window.location.hash.replace("#","") || "home"
showPage(currentPage)

/* listen change */

window.addEventListener("hashchange", () => {

const page = window.location.hash.replace("#","")

showPage(page)

})

/* =========================
REVEAL SCROLL ANIMATION
========================= */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active")

}

})

},{
threshold:0.2
})

function observeReveal(container){

const reveals = container.querySelectorAll(".reveal")

reveals.forEach(el=>{
observer.observe(el)
})

}

/* =========================
HOBBY CLICK EFFECT
========================= */

const hobbies = document.querySelectorAll(".hobby-item")

hobbies.forEach(hobby=>{

hobby.addEventListener("click",()=>{
hobby.classList.toggle("active")
})

})

/* =========================
HERO TYPING EFFECT
========================= */

const text = "Hi, I'm Aris"
let index = 0

function startTyping(){

const heroTitle = document.getElementById("hero-title")

if(!heroTitle) return

heroTitle.innerHTML = ""
index = 0

typeWriter(heroTitle)

}

function typeWriter(element){

if(index < text.length){

element.innerHTML += text.charAt(index)

index++

setTimeout(() =>{
typeWriter(element)
},80)

}

}


const showBtn = document.querySelector(".btn-show-project")

if(showBtn){

showBtn.addEventListener("click",()=>{

document.querySelectorAll(".hidden-project").forEach(card=>{
card.style.display="flex"
})

showBtn.style.display="none"

})

}





const exploreBtn = document.getElementById("exploreBtn")

if(exploreBtn){

exploreBtn.addEventListener("click",()=>{

showPage("portfolio")

})

}



// quick game 

const startBtn = document.getElementById("startGame")
const gamePlay = document.getElementById("game-play")
const gameStart = document.getElementById("game-start")
const gameResult = document.getElementById("game-result")

const questionText = document.getElementById("questionText")
const answerInput = document.getElementById("answerInput")
const submitBtn = document.getElementById("submitAnswer")

const timerEl = document.getElementById("timer")
const questionNumber = document.getElementById("questionNumber")

const resultTable = document.getElementById("resultTable")
const scoreText = document.getElementById("scoreText")

let questions = []
let current = 0
let score = 0
let time = 10
let timer
let results = []

function randomQuestion(){

let a = Math.floor(Math.random()*20)+1
let b = Math.floor(Math.random()*20)+1

let ops = ["+","-","*"]

let op = ops[Math.floor(Math.random()*ops.length)]

let answer

if(op==="+") answer = a+b
if(op==="-") answer = a-b
if(op==="*") answer = a*b

return {
text: `${a} ${op} ${b}`,
answer: answer
}

}

function startGame(){

questions = []

for(let i=0;i<10;i++){

questions.push(randomQuestion())

}

current = 0
score = 0
results = []

gameStart.style.display="none"
gamePlay.style.display="block"

showQuestion()

}

function showQuestion(){

let q = questions[current]

questionText.textContent = q.text

questionNumber.textContent = `Question ${current+1}/10`

answerInput.value=""

time = 10

timerEl.textContent = `Time: ${time}`

timer = setInterval(()=>{

time--

timerEl.textContent = `Time: ${time}`

if(time===0){

submitAnswer()

}

},1000)

}

function submitAnswer(){

clearInterval(timer)

let q = questions[current]

let user = Number(answerInput.value)

let correct = user === q.answer

if(correct) score++

results.push({
question:q.text,
user:user,
correct:correct
})

current++

if(current<10){

showQuestion()

}else{

endGame()

}

}

submitBtn.addEventListener("click",submitAnswer)

function endGame(){

gamePlay.style.display="none"
gameResult.style.display="block"

scoreText.textContent = `Correct ${score} / 10`

resultTable.innerHTML=""

results.forEach((r,i)=>{

let row = `
<tr>
<td>${i+1}</td>
<td>${r.question}</td>
<td>${r.user}</td>
<td>${r.correct ? "✔" : "✖"}</td>
</tr>
`

resultTable.innerHTML += row

})

}

startBtn.addEventListener("click",startGame)

document.getElementById("restartGame").addEventListener("click",()=>{

gameResult.style.display="none"
gameStart.style.display="block"

})


/* =========================
SIDEBAR TOGGLE WITH CLOSE FUNCTIONALITY
========================= */

const menuToggle = document.getElementById("menuToggle")
const sidebar = document.querySelector("nav")

// Create overlay element for closing sidebar by clicking outside
let overlay = document.createElement('div')
overlay.className = 'sidebar-overlay'
overlay.style.cssText = `
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background: rgba(0,0,0,0);
    z-index: 1400;
    display: none;
`
document.body.appendChild(overlay)

// Function to open sidebar
function openSidebar(){
    sidebar.classList.add('active')
    
    if(window.innerWidth <= 900){  
        overlay.style.display = 'block'
        setTimeout(() => {  
            overlay.style.background = 'rgba(0,0,0,0.5)'
        },10)   
    }    
}

// Function to close sidebar
function closeSidebar(){     
    sidebar.classList.remove('active') 
    
    if(window.innerWidth <= 900){   
        setTimeout(() => {      
            overlay.style.display = 'none'       
        },300)
        
        setTimeout(() => {
            overlay.style.background = 'rgba(0,0,0,0)'
        },350)
    }
}

// Toggle function combined with overlay logic
menuToggle.addEventListener('click', ()=>{     
    if(sidebar.classList.contains('active')){          
        closeSidebar()      
    }else{         
        openSidebar()       
    }       
})      


// Close sidebar when user clicks on the overlay area
overlay.addEventListener('click', ()=>{           
    closeSidebar()
})         


// Close sidebar when pressing ESC key
document.addEventListener('keydown', (e)=>{           
    if(e.key === 'Escape' && window.innerWidth <= 900 && sidebar.classList.contains('active')){             
        closeSidebar()              
    }
}) 


// Close sidebar when menu link is clicked (mobile)
document.querySelectorAll(".menu-navigation a").forEach(link=>{

link.addEventListener("click",()=>{

if(window.innerWidth <= 900){
closeSidebar()
}

})

})
