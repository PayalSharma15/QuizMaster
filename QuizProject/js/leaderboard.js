const leaderboardBody = document.getElementById("leaderboardBody");

async function loadLeaderboard() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/results/leaderboard"
        );

        if (!response.ok) {
            throw new Error("Failed to load leaderboard");
        }

        const data = await response.json();

        leaderboardBody.innerHTML = "";

        if (data.length === 0) {
            leaderboardBody.innerHTML =
                '<p class="loading">No quiz results available.</p>';
            return;
        }

        data.forEach(function(result, index) {

            const row = document.createElement("div");

            row.classList.add("leaderboard-row");

            let rank = index + 1;

            let rankDisplay = rank;

            if (rank === 1) {
                rankDisplay = "🥇";
            } else if (rank === 2) {
                rankDisplay = "🥈";
            } else if (rank === 3) {
                rankDisplay = "🥉";
            }

            row.innerHTML = `
                <span class="rank">${rankDisplay}</span>

                <span class="user">
                    ${result.email}
                </span>

                <span class="category">
                    ${result.category}
                </span>

                <span class="score">
                    ${result.score}/${result.totalQuestions}
                </span>
            `;

            leaderboardBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        leaderboardBody.innerHTML =
            '<p class="error">Unable to load leaderboard.</p>';
    }
}


document.getElementById("goHome")
    .addEventListener("click", function() {

        window.location.href = "index.html";

    });


loadLeaderboard();