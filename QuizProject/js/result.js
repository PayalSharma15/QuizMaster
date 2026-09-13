const score =
    Number(localStorage.getItem("quizScore")) || 0;

const totalQuestions =
    Number(localStorage.getItem("totalQuestions")) || 10;

const percentage =
    Math.round((score / totalQuestions) * 100);

const wrong =
    totalQuestions - score;


// ==================== DISPLAY RESULT ====================

document.getElementById("score").textContent =
    score;

document.getElementById("total").textContent =
    totalQuestions;

document.getElementById("correct").textContent =
    score;

document.getElementById("wrong").textContent =
    wrong;

document.getElementById("percentage").textContent =
    percentage + "%";


// ==================== SAVE RESULT TO BACKEND ====================

async function saveQuizResult() {

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    const category =
        localStorage.getItem("quizCategory") || "Java";

    if (!loggedInUser) {
        console.log("User not logged in. Result not saved.");
        return;
    }

    const result = {
        email: loggedInUser.email,
        category: category,
        score: score,
        totalQuestions: totalQuestions
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/results",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to save quiz result");
        }

        const savedResult = await response.json();

        console.log("Quiz result saved:", savedResult);

    } catch (error) {

        console.error("Result save error:", error);

    }
}

saveQuizResult();


// ==================== PLAY AGAIN ====================

document.getElementById("playAgain")
    .addEventListener("click", function() {

        window.location.href = "quiz.html";

    });


// ==================== GO HOME ====================

document.getElementById("goHome")
    .addEventListener("click", function() {

        window.location.href = "index.html";

    });


// ==================== REVIEW ANSWERS ====================

const reviewContainer =
    document.getElementById("reviewContainer");

const userAnswers =
    JSON.parse(localStorage.getItem("userAnswers")) || [];

userAnswers.forEach(function(item, index) {

    const reviewCard =
        document.createElement("div");

    reviewCard.classList.add("review-card");

    const isCorrect =
        item.selectedAnswer === item.correctAnswer;

    reviewCard.innerHTML = `
        <h3>Question ${index + 1}</h3>

        <p class="review-question">
            ${item.question}
        </p>

        <p class="${isCorrect ? "correct-answer" : "wrong-answer"}">
            Your Answer: ${item.selectedAnswer || "Not Answered"}
        </p>

        <p class="correct-answer">
            Correct Answer: ${item.correctAnswer}
        </p>
    `;

    reviewContainer.appendChild(reviewCard);
});


// ==================== PERFORMANCE ====================

const performanceTitle =
    document.getElementById("performanceTitle");

const performanceMessage =
    document.getElementById("performanceMessage");

const scoreProgress =
    document.getElementById("scoreProgress");

scoreProgress.style.width =
    percentage + "%";


if (percentage >= 80) {

    performanceTitle.textContent =
        "Excellent! 🎉";

    performanceMessage.textContent =
        "Great job! You have a very good understanding of this topic.";

} else if (percentage >= 60) {

    performanceTitle.textContent =
        "Good Job! 👍";

    performanceMessage.textContent =
        "Nice work! Keep practicing to improve your score.";

} else if (percentage >= 40) {

    performanceTitle.textContent =
        "Keep Practicing!";

    performanceMessage.textContent =
        "You are improving. Practice more and try again.";

} else {

    performanceTitle.textContent =
        "Try Again!";

    performanceMessage.textContent =
        "Don't give up. Review the answers and practice again.";

}