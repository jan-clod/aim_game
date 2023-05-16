const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const startBtnZanavo = document.querySelector('#startNow')
const timeList = document.querySelector('#time-list')
const timeEL = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ffb5ea', '#a392ff', '#a2d2ff', '#f8ff8f', '#ff98a9', '#ff85ec', '#a8ff88', '#d8efff', '#fffa7f']
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault() // когда нажимаем на ссылку в строке появляется # 
    screens[0].classList.add('up')
})//кнопка начать игру
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
}) //клик на шарик
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
function finishGame() {
    board.innerHTML = `<h1>Score: ${score}</h1>`
}
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    board.append(circle)
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}




startBtnZanavo.addEventListener('click', (event) => {
    event.preventDefault()
    finishGame()
    t = -1
    score = 0
    screens[1].classList.remove('up')
    timeEL.parentNode.classList.remove('hide')
    board.replaceChildren()
})  //занаво

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        t = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame(t)
    }
})//клик на время в меню

function startGame(t) {
    setInterval(timeIsOver, 1000)
    createRandomCircle()
    let deadline = new Date(Date.parse(new Date()) + t * 1000); // for endless timer
    initializeClock("countdown", deadline);
}

function timeIsOver() {//конец игры когда время вышло
    setInterval(() => {
        if (t === 0) {
            finishGame()
        }
    }, 1000);
}


let t
let seconds
let minutes

function getTimeRemaining(endtime) {
    t = Date.parse(endtime) - Date.parse(new Date());
    seconds = Math.floor((t / 1000) % 60);
    minutes = Math.floor((t / 1000 / 60) % 60);

    return {
        total: t,
        minutes: minutes,
        seconds: seconds
    };
}

function initializeClock(id, endtime) {
    console.log(endtime);
    let clock = document.getElementById(id);
    let secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.total < 0) {
            clearInterval(timeinterval);
            return true;
        }
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}