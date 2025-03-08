const questions = [
    {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Mercúrio", "Vênus", "Terra", "Marte"],
        answer: 0
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        options: ["1965", "1969", "1972", "1959"],
        answer: 1
    },
    {
        question: "Qual é o maior animal terrestre?",
        options: ["Elefante Africano", "Rinoceronte", "Girafa", "Hipopótamo"],
        answer: 0
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: 2
    },
    {
        question: "Qual elemento químico tem o símbolo 'O'?",
        options: ["Ouro", "Oxigênio", "Prata", "Hidrogênio"],
        answer: 1
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: 2
    },
    {
        question: "Qual é a língua mais falada no mundo?",
        options: ["Inglês", "Mandarim", "Espanhol", "Hindi"],
        answer: 1
    },
    {
        question: "Qual é o maior oceano da Terra?",
        options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        answer: 3
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Gabriel García Márquez", "Jorge Luis Borges"],
        answer: 0
    },
    {
        question: "Qual é o símbolo químico da água?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timePerQuestion = 20;
let timeLeft = timePerQuestion;

const startScreen = document.getElementById("start-screen");
const questionContainer = document.getElementById("question-container");
const resultsScreen = document.getElementById("results-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumberText = document.getElementById("question-number");
const timerText = document.getElementById("timer");
const timeBar = document.getElementById("time-bar");
const progressBar = document.getElementById("progress-bar");
const scoreValue = document.getElementById("score-value");
const scoreFill = document.getElementById("score-fill");
const scoreText = document.getElementById("score-text");
const resultsMessage = document.getElementById("results-message");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = timePerQuestion;
    progressBar.style.width = "0%";
    gsap.to(startScreen, {
        duration: 0.5, opacity: 0, y: -20, onComplete: () => {
            startScreen.classList.remove("active");
            questionContainer.classList.add("active");
            gsap.from(questionContainer, { duration: 0.5, opacity: 0, y: 20 });
            showQuestion();
        }
    });
}

function showQuestion() {
    clearInterval(timerInterval);
    timeLeft = timePerQuestion;
    updateTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionNumberText.textContent = `Pergunta ${currentQuestionIndex + 1}/${questions.length}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = option;
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });
    startTimer();
    updateProgressBar();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            disableOptions();
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

function updateTimer() {
    timerText.textContent = `${timeLeft}s`;
    const percentage = (timeLeft / timePerQuestion) * 100;
    timeBar.style.width = `${percentage}%`;
}

function disableOptions() {
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach(btn => btn.disabled = true);
}

function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    disableOptions();
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll("button");
    if (selectedIndex === currentQuestion.answer) {
        optionButtons[selectedIndex].classList.add("correct");
        score++;
    } else {
        optionButtons[selectedIndex].classList.add("wrong");
        optionButtons[currentQuestion.answer].classList.add("correct");
    }
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function showResults() {
    clearInterval(timerInterval);
    scoreValue.textContent = score;
    const percentage = Math.round((score / questions.length) * 100);
    scoreFill.style.height = `${percentage}%`;
    let message = "";
    if (percentage >= 80) {
        message = "Excelente! Você é um gênio cósmico!";
    } else if (percentage >= 50) {
        message = "Muito bom! Seu conhecimento está nas estrelas!";
    } else {
        message = "Continue estudando – o universo é vasto e cheio de descobertas!";
    }
    resultsMessage.textContent = message;
    gsap.to(questionContainer, {
        duration: 0.5, opacity: 0, y: -20, onComplete: () => {
            questionContainer.classList.remove("active");
            resultsScreen.classList.add("active");
            gsap.from(resultsScreen, { duration: 0.5, opacity: 0, y: 20 });
        }
    });
    progressBar.style.width = "100%";
}

function restartQuiz() {
    gsap.to(resultsScreen, {
        duration: 0.5, opacity: 0, y: -20, onComplete: () => {
            resultsScreen.classList.remove("active");
            startScreen.classList.add("active");
            gsap.from(startScreen, { duration: 0.5, opacity: 0, y: 20 });
        }
    });
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

gsap.to(".container", { duration: 1, opacity: 1, y: 0, ease: "power2.out" });