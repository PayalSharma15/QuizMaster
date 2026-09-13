const API_URL = "http://localhost:8080/api/users";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


// ==================== REGISTER ====================

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        try {

            const response = await fetch(API_URL + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const responseText = await response.text();

            if (response.ok) {

                document.getElementById("registerMessage").textContent =
                    "Registration successful!";

                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);

            } else {

                document.getElementById("registerMessage").textContent =
                    responseText || "Registration failed.";

            }

        } catch (error) {

            console.error(error);

            document.getElementById("registerMessage").textContent =
                "Error: " + error.message;

        }

    });

}


// ==================== LOGIN ====================

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const user = {
            email: email,
            password: password
        };

        try {

            const response = await fetch(API_URL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const responseText = await response.text();

            if (response.ok) {

                const data = JSON.parse(responseText);

                localStorage.setItem("isLoggedIn", "true");

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data)
                );

                document.getElementById("loginMessage").textContent =
                    "Login successful!";

                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1000);

            } else {

                document.getElementById("loginMessage").textContent =
                    responseText || "Invalid email or password.";

            }

        } catch (error) {

            console.error(error);

            document.getElementById("loginMessage").textContent =
                "Error: " + error.message;

        }

    });

}