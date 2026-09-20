const questionsContainer =
    document.getElementById("questionsContainer");

const addQuestionButton =
    document.getElementById("addQuestion");


async function loadQuestions() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/questions"
        );

        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        const questions = await response.json();

        questionsContainer.innerHTML = "";

        if (questions.length === 0) {

            questionsContainer.innerHTML =
                '<p class="loading">No questions available.</p>';

            return;
        }

        questions.forEach(function(question) {

            const questionItem =
                document.createElement("div");

            questionItem.classList.add("question-item");

            questionItem.innerHTML = `
                <h3>${question.category}</h3>

                <p>
                    <strong>Question:</strong>
                    ${question.question}
                </p>

                <p>
                    <strong>Options:</strong>
                    ${question.option1},
                    ${question.option2},
                    ${question.option3},
                    ${question.option4}
                </p>

                <p>
                    <strong>Correct Answer:</strong>
                    ${question.answer}
                </p>

                <button onclick="deleteQuestion(${question.id})">
                    Delete
                </button>
            `;

            questionsContainer.appendChild(questionItem);
        });

    } catch (error) {

        console.error(error);

        questionsContainer.innerHTML =
            '<p class="loading">Unable to load questions.</p>';
    }
}


addQuestionButton.addEventListener("click", async function() {

    const category =
        document.getElementById("category").value.trim();

    const question =
        document.getElementById("question").value.trim();

    const option1 =
        document.getElementById("option1").value.trim();

    const option2 =
        document.getElementById("option2").value.trim();

    const option3 =
        document.getElementById("option3").value.trim();

    const option4 =
        document.getElementById("option4").value.trim();

    const answer =
        document.getElementById("answer").value.trim();


    if (
        !category ||
        !question ||
        !option1 ||
        !option2 ||
        !option3 ||
        !option4 ||
        !answer
    ) {

        alert("Please fill all fields.");
        return;
    }


    const newQuestion = {

        category: category,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer
    };


    try {

        const response = await fetch(
            "http://localhost:8080/api/questions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newQuestion)
            }
        );


        if (!response.ok) {
            throw new Error("Failed to add question");
        }


        alert("Question added successfully!");


        document.getElementById("category").value = "";
        document.getElementById("question").value = "";
        document.getElementById("option1").value = "";
        document.getElementById("option2").value = "";
        document.getElementById("option3").value = "";
        document.getElementById("option4").value = "";
        document.getElementById("answer").value = "";


        loadQuestions();

    } catch (error) {

        console.error(error);

        alert("Unable to add question.");
    }
});


async function deleteQuestion(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this question?");

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/questions/" + id,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete question");
        }


        alert("Question deleted successfully!");


        loadQuestions();

    } catch (error) {

        console.error(error);

        alert("Unable to delete question.");
    }
}


document.getElementById("goHome")
    .addEventListener("click", function() {

        window.location.href = "index.html";

    });


loadQuestions();