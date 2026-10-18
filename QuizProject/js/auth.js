
const API_URL = "http://localhost:8080/api/users";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// ==================== REGISTER ====================

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        const registerMessage =
            document.getElementById("registerMessage");

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
                registerMessage.textContent =
                    "Registration successful!";

                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);

            } else {
                registerMessage.textContent =
                    responseText || "Registration failed.";
            }

        } catch (error) {
            console.error(error);

            registerMessage.textContent =
                "Unable to connect to server. Please try again.";
        }
    });
}

// ==================== LOGIN ====================

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const loginMessage =
            document.getElementById("loginMessage");

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

                // Save login information
                localStorage.setItem("isLoggedIn", "true");

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data)
                );

                loginMessage.textContent = "Login successful!";

                // Redirect according to user role
                setTimeout(function () {
                    if (data.role === "ADMIN") {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }, 1000);

            } else {
                loginMessage.textContent =
                    responseText || "Invalid email or password.";
            }

        } catch (error) {
            console.error(error);

            loginMessage.textContent =
                "Unable to connect to server. Please try again.";
        }
    });
}
