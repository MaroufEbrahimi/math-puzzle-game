
// #----------- Loader -----------#
var loader = document.querySelector('.loadding');
var main = document.querySelector('.main');

function loadding() {
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
        // showcase
        main.style.display = 'block';
        setTimeout(() => (main.style.opacity = 1), 40);
    }, 2000);
}
loadding();
// End of Loader

// Open and Close slide menu
function openMenu() {
    document.getElementById('side-menu').style.width = '150px';
}
function closeMenu() {
    document.getElementById('side-menu').style.width = '0';
}
// End of Open and Close slide menu

// #---------- Time function -----------#
setInterval(() => {
    addTime();
}, 1000);

function addTime() {
    var btn = document.getElementById('btn');
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes()
    var second = date.getSeconds();

    var am_pm = (hour >= 12) ? "PM" : "AM";

    // convert 24hr to 12hr
    if (hour > 12) {
        hour = hour - 12;
    }

    // add 0 before single digits
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;

    btn.innerHTML = hour + ":" + minute + ":" + second + " " + am_pm;
}
// End of Time function

// Background color
function bg_color() {
    var colorBg = document.getElementById('show-page');
    colorBg.style.backgroundColor = "rgba(" + rand(100, 250) + ", " + rand(100, 250) + ", " + rand(0, 250) + ", 0.7)";
    var btn = document.getElementById('btn');
    btn.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    btn.style.color = '#fff';
}
function rand(start, end) {
    var ran = start + Math.floor(Math.random() * (end - start));
    return ran;
}
// End of Background color


// #---------- Puzzle game -----------#
// variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
let shuffledQuestion, currentQuestionIndex;

// Event
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// functions
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2 ?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'What is 3 + 2 ?',
        answers: [
            { text: '4', correct: false },
            { text: '5', correct: true }
        ]
    },
    {
        question: 'What is 5 + 3 ?',
        answers: [
            { text: '8', correct: true },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'What is 9 + 3 ?',
        answers: [
            { text: '8', correct: false },
            { text: '12', correct: true }
        ]
    },
    {
        question: 'What is 5 + 13 ?',
        answers: [
            { text: '18', correct: true },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'What is 6 + 3 ?',
        answers: [
            { text: '9', correct: true },
            { text: '3', correct: false }
        ]
    },
    {
        question: 'What is 20 + 10 ?',
        answers: [
            { text: '2', correct: false },
            { text: '30', correct: true }
        ]
    },
    {
        question: 'What is 50 + 3 ?',
        answers: [
            { text: '53', correct: true },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'What is 7 + 8 ?',
        answers: [
            { text: '78', correct: false },
            { text: '15', correct: true }
        ]
    },
    {
        question: 'What is 19 + 3 ?',
        answers: [
            { text: '22', correct: true },
            { text: '15', correct: false }
        ]
    }
]

