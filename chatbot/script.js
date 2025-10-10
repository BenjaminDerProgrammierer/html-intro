const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const profile = {
    nameElement: document.getElementById("profile-name"),
    colorElement: document.getElementById("profile-color"),
    occupationElement: document.getElementById("profile-occupation"),
    emailElement: document.getElementById("profile-email"),
    container: document.getElementById("profile")
};

const botMessages = [
    // First answer: Greeting
    [
        "Hello!",
        "Hi there!",
        "Greetings!",
        "Hey!"
    ],
    // Second answer: Respond to ask for name
    [
        "That's a nice name!",
        "I like that name!",
        "What a unique name!"
    ],
    // Third answer: favorite color
    [
        "That's a beautiful color!",
        "I love that color too!",
        "Such a vibrant color!",
        "Meh. Not my favorite color."
    ],
    // Fourth answer: user's occupation
    [
        "That sounds interesting!",
        "Wow, that must be fun!",
        "I bet you meet a lot of people!"
    ],
    // Fifth answer: e-mail
    [
        "Thanks for sharing your email!",
        "I'll make sure to keep in touch!",
        "Great, I'll reach out sometime!"
    ],
    // Sixth answer: goodbye
    [
        "Goodbye!",
        "See you later!",
        "Take care!",
        "Have a great day!"
    ]
];

const questions = [
    "Greet me!",
    "What's your name?",
    "What's your favorite color? (use a CSS color name or hex code)",
    "What do you do for a living?",
    "What's your email address?",
    "Say goodbye!"
];

let questionIndex = 0;

let answers = [];

sendButton.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage("user", userMessage);
        appendMessage("bot", "Loading...", "loading");
        userInput.disabled = true;
        userInput.value = "";
        answers.push(userMessage);
        // Simulate bot response
        setTimeout(() => {
            const botReplyOptions = botMessages[questionIndex];
            const botReply = botReplyOptions[Math.floor(Math.random() * botReplyOptions.length)];
            appendMessage("bot", botReply);
            questionIndex++;
            userInput.disabled = false;
            userInput.focus();
            setTimeout(updateTask, 200);
        }, 1000);
    }
});

// Allow pressing Enter to send message
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendButton.click();
    }
});

function appendMessage(sender, message, type = "text") {
    // Remove loading message if exists
    messagesDiv.querySelector(".loading")?.remove();
    if (type === "loading") {
        messagesDiv.innerHTML += `<p class="loading"><strong>${sender}:</strong> <em>${message}</em></p>`;
    } else {
        messagesDiv.innerHTML += `<p class="${sender}-message"><strong>${sender}:</strong> ${message}</p>`;
    }
}

function updateTask() {
    if (questionIndex < questions.length) {
        appendMessage("bot", questions[questionIndex]);
    } else {
        userInput.disabled = true;
        sendButton.disabled = true;
        profile.nameElement.textContent = answers[1];
        profile.container.backgroundColor = answers[2];
        profile.occupationElement.textContent = answers[3];
        profile.emailElement.textContent = answers[4];
        profile.container.style.display = "block";
    }
}

// Initialize first task
updateTask();

new EmojiPicker({
    trigger: [{
        selector: '#emoji-button',
        insertInto: '#user-input'
    }],
    closeButton: true,
    specialButtons: answers[2] || 'green' // #008000, rgba(0, 128, 0);
});
