const category = localStorage.getItem("quizCategory") || "Java";

let questionList = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let userAnswers = [];

let timeLeft = 30;
let timerInterval;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const timerElement = document.getElementById("timer");
const timerContainer = document.querySelector(".timer");
const progressBar = document.getElementById("progressBar");
const quizCategory = document.getElementById("quizCategory");


// ==================== SHUFFLE ====================

function shuffleArray(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// ==================== LOAD QUESTIONS FROM API ====================

async function loadQuestions() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/questions/category/" +
            encodeURIComponent(category)
        );

        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        const data = await response.json();

        questionList = shuffleArray(data);

        if (questionList.length === 0) {

            questionText.textContent =
                "No questions available for this category.";

            nextButton.disabled = true;

            return;
        }

        quizCategory.textContent = category;

        loadQuestion();

    } catch (error) {

        console.error(error);

        questionText.textContent =
            "Unable to load questions from server.";

        nextButton.disabled = true;
    }
}


// ==================== LOAD QUESTION ====================

function loadQuestion() {

    const current = questionList[currentQuestion];

    selectedAnswer = "";

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questionList.length}`;

    questionText.textContent = current.question;

    optionsContainer.innerHTML = "";

    const options = [
        current.option1,
        current.option2,
        current.option3,
        current.option4
    ];

    options.forEach(function (option) {

        const button = document.createElement("button");

        button.classList.add("option");

        button.textContent = option;

        button.addEventListener("click", function () {

            const allOptions =
                document.querySelectorAll(".option");

            allOptions.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedAnswer = option;
        });

        optionsContainer.appendChild(button);
    });

    const progress =
        ((currentQuestion + 1) / questionList.length) * 100;

    progressBar.style.width = progress + "%";

    startTimer();
}


// ==================== TIMER ====================

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 30;

    timerElement.textContent = timeLeft;

    timerContainer.classList.remove("warning");
    timerContainer.classList.remove("danger");

    timerInterval = setInterval(function () {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 10 && timeLeft > 5) {

            timerContainer.classList.add("warning");
        }

        if (timeLeft <= 5) {

            timerContainer.classList.remove("warning");
            timerContainer.classList.add("danger");
        }

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            moveToNextQuestion();
        }

    }, 1000);
}


// ==================== NEXT QUESTION ====================

nextButton.addEventListener("click", function () {

    if (selectedAnswer === "") {

        alert("Please select an answer.");

        return;
    }

    moveToNextQuestion();
});


// ==================== MOVE TO NEXT ====================

function moveToNextQuestion() {

    const current = questionList[currentQuestion];

    userAnswers.push({

        question: current.question,

        selectedAnswer: selectedAnswer,

        correctAnswer: current.answer
    });

    if (selectedAnswer === current.answer) {

        score++;
    }

    currentQuestion++;

    if (currentQuestion < questionList.length) {

        loadQuestion();

    } else {

        clearInterval(timerInterval);

        localStorage.setItem(
            "quizScore",
            score
        );

        localStorage.setItem(
            "totalQuestions",
            questionList.length
        );

        localStorage.setItem(
            "userAnswers",
            JSON.stringify(userAnswers)
        );

        window.location.href = "result.html";
    }
}


// ==================== START QUIZ ====================

loadQuestions();