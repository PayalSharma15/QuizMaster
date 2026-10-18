
const API_URL = "http://localhost:8080/api/users";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

async function readResponse(response) {
    const text = await response.text();

    if (!text) return {};

    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

// ==================== REGISTER ====================

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const registerMessage =
            document.getElementById("registerMessage");

        registerMessage.textContent = "";

        if (!name || !email || !password) {
            registerMessage.textContent =
                "Please fill in all fields.";
            return;
        }

        const user = { name, email, password };

        try {
            const response = await fetch(
                API_URL + "/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            const data = await readResponse(response);

            if (response.status === 409) {
                registerMessage.textContent =
                    data.message ||
                    "This email is already registered. Please login.";

                alert(
                    "This email is already registered. Please login."
                );
                return;
            }

            if (response.ok) {
                registerMessage.textContent =
                    "Registration successful! Please login.";

                registerForm.reset();

                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);

            } else {
                registerMessage.textContent =
                    data.message ||
                    "Registration failed. Please try again.";
            }

        } catch (error) {
            console.error("Registration error:", error);

            registerMessage.textContent =
                "Unable to connect to server. Check that the backend is running.";
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

        loginMessage.textContent = "";

        if (!email || !password) {
            loginMessage.textContent =
                "Please enter email and password.";
            return;
        }

        try {
            const response = await fetch(
                API_URL + "/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await readResponse(response);

            if (response.ok) {
                localStorage.setItem("isLoggedIn", "true");

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data)
                );

                loginMessage.textContent = "Login successful!";

                setTimeout(function () {
                    if (data.role === "ADMIN") {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }, 700);

            } else {
                loginMessage.textContent =
                    data.message ||
                    "Invalid email or password.";
            }

        } catch (error) {
            console.error("Login error:", error);

            loginMessage.textContent =
                "Unable to connect to server. Check that the backend is running.";
        }
    });
}
