const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

const welcomeMessage =
    document.getElementById("welcomeMessage");

const userEmail =
    document.getElementById("userEmail");

const totalQuizzes =
    document.getElementById("totalQuizzes");

const averageScore =
    document.getElementById("averageScore");

const bestScore =
    document.getElementById("bestScore");

const recentCategory =
    document.getElementById("recentCategory");


async function loadDashboard() {

    if (!loggedInUser) {

        welcomeMessage.textContent =
            "Please login to view your dashboard.";

        userEmail.textContent = "-";

        return;
    }

    const email = loggedInUser.email;

    welcomeMessage.textContent =
        "Welcome, " + loggedInUser.name + "!";

    userEmail.textContent = email;

    try {

        const response = await fetch(
            "http://localhost:8080/api/results/dashboard/" +
            encodeURIComponent(email)
        );

        if (!response.ok) {
            throw new Error("Failed to load dashboard");
        }

        const data = await response.json();

        if (data.length === 0) {
            totalQuizzes.textContent = "0";
            averageScore.textContent = "0%";
            bestScore.textContent = "0/0";
            recentCategory.textContent = "-";
            return;
        }

        totalQuizzes.textContent = data.length;

        let totalPercentage = 0;

        let highestScore = data[0];

        data.forEach(function(result) {

            const percentage =
                (result.score / result.totalQuestions) * 100;

            totalPercentage += percentage;

            if (result.score > highestScore.score) {
                highestScore = result;
            }
        });

        const average =
            Math.round(totalPercentage / data.length);

        averageScore.textContent =
            average + "%";

        bestScore.textContent =
            highestScore.score +
            "/" +
            highestScore.totalQuestions;

        recentCategory.textContent =
            data[0].category;

    } catch (error) {

        console.error(error);

        welcomeMessage.textContent =
            "Unable to load dashboard data.";
    }
}


document.getElementById("goHome")
    .addEventListener("click", function() {

        window.location.href = "index.html";

    });


loadDashboard();