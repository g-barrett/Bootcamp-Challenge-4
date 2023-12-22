const questions = [
    {
        question: 'Which of these is NOT primitive?',
        answers: [
            { text: 'Boolean', correct: false},
            { text: 'Object', correct: true},
            { text: 'Number', correct: false},
            { text: 'Undefined', correct: false}
        ]
    },
    {
        question: 'What values can a Boolean be?',
        answers: [
            { text: 'True or false', correct: true},
            { text: 'Yes or no', correct: false},
            { text: 'Numeric', correct: false},
            { text: 'Text', correct: false}
        ]
    },
    {
        question: 'How do you connect your JavaScript file to your HTML file?',
        answers: [
            { text: 'With a js tag', correct: false},
            { text: 'With a javascript tag', correct: false},
            { text: 'With a style tag', correct: false},
            { text: 'With a script tag', correct: true}
        ]
    },
    {
        question: 'How would you store multiple values in a single variable?',
        answers: [
            { text: 'With an if/else statement', correct: false},
            { text: 'With a string', correct: false},
            { text: 'With an array', correct: true},
            { text: 'With a function', correct: false}
        ]
    },
    {
        question: 'The entire object must be enclosed in a _________.',
        answers: [
            { text: 'Bracket', correct: true},
            { text: 'Parenthesis', correct: false},
            { text: 'Curly bracket', correct: false},
            { text: 'Quotation marks', correct: false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerBtnsElement = document.getElementById('answer-buttons');
const startBtnElement = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const headerElement = document.getElementById('header');
const boxElement = document.querySelector('.quiz');

answerBtnsElement.style.display = 'none';

let currentQuestionIndex = 0;
let count = 60;

startBtnElement.addEventListener('click', startQuiz);

function startQuiz() {
    startBtnElement.style.display = 'none';
    showQuestion();
    startTimer();
};

function startTimer() {
    timerFunc = setInterval(function () {
        timerElement.textContent = "Time Left: " + count;
        count --
    }, 1000);
};

function showQuestion() {
    reset();
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + questions[currentQuestionIndex].question;
    headerElement.innerHTML = "Quiz Time!"
    questions[currentQuestionIndex].answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerBtnsElement.appendChild(button);
        answerBtnsElement.style.display = 'block'
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
        count -= 10;
    };
    currentQuestionIndex ++;
    console.log(currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
        nextDelay();
    } else {
        quizEnd();
    };
};

function nextDelay() {
    delayFunc = setInterval(function () {
        showQuestion();
    }, 500);
};

function quizEnd() {
    clearInterval(timerFunc);
    let score = count + 11;
    let quizzler = prompt('What is your name, bold quizzler?', 'Name');
    let data = {name: quizzler, score: score};
    questionElement.textContent = "Scores:";
    headerElement.textContent = quizzler + " , your score was: " + score + ". Refresh the page to try again!";
    answerBtnsElement.style.display = 'block';
    saveScoreboard(data);
    displayScoreboard();
};

function saveScoreboard(data) {
    const scoreboard = localStorage.getItem('scoreboard');
    const parseScoreboard = scoreboard ? JSON.parse(scoreboard) : [];
    parseScoreboard.push(data);
    localStorage.setItem('scoreboard', JSON.stringify(parseScoreboard));
};

function displayScoreboard() {
    const scoreboard = localStorage.getItem('scoreboard');
    const parseScoreboard = scoreboard ? JSON.parse(scoreboard) : [];
    parseScoreboard.sort((a, b) => b.score - a.score);
    const scoreElement = document.createElement('ol');
    scoreElement.classList.add('list');
    boxElement.append(scoreElement);
    parseScoreboard.forEach((data) => {
        const list = document.createElement('li');
        list.textContent = data.name + ": " + data.score;
        console.log(list);
        scoreElement.append(list);
    });
};

function reset() {
    while (answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild(answerBtnsElement.firstChild);
    }
};

