const historyBody = document.getElementById("historyBody");

async function loadQuizHistory() {

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        historyBody.innerHTML =
            '<p class="error">Please login to view your quiz history.</p>';
        return;
    }

    const email = loggedInUser.email;

    try {

        const response = await fetch(
            "http://localhost:8080/api/results/history/" +
            encodeURIComponent(email)
        );

        if (!response.ok) {
            throw new Error("Failed to load quiz history");
        }

        const data = await response.json();

        historyBody.innerHTML = "";

        if (data.length === 0) {
            historyBody.innerHTML =
                '<p class="loading">No quiz history available.</p>';
            return;
        }

        data.forEach(function(result) {

            const row = document.createElement("div");

            row.classList.add("history-row");

            const percentage =
                Math.round(
                    (result.score / result.totalQuestions) * 100
                );

            row.innerHTML = `
                <span class="category">
                    ${result.category}
                </span>

                <span class="score">
                    ${result.score}/${result.totalQuestions}
                </span>

                <span class="result">
                    ${percentage}%
                </span>
            `;

            historyBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        historyBody.innerHTML =
            '<p class="error">Unable to load quiz history.</p>';
    }
}


document.getElementById("goHome")
    .addEventListener("click", function() {
        window.location.href = "index.html";
    });


loadQuizHistory();