const categories = document.querySelectorAll(".category");
const startQuiz = document.getElementById("startQuiz");
const message = document.getElementById("message");

let selectedCategory = "";

categories.forEach(function(category) {

    category.addEventListener("click", function() {

        categories.forEach(function(button) {
            button.classList.remove("selected");
        });

        category.classList.add("selected");

        selectedCategory = category.dataset.category;

        message.textContent = "Selected: " + selectedCategory;
    });

});

startQuiz.addEventListener("click", function() {

    if (selectedCategory === "") {
        message.textContent = "Please select a category first.";
        return;
    }

    localStorage.setItem("quizCategory", selectedCategory);

    window.location.href = "quiz.html";
});