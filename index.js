// script.js

let questions = [
	{
		prompt: `Inside which HTML element do we put the JavaScript?`,
		options: [
		    "<javascript>",
		    "<js>",
		    "<script>",
		    "<scripting>",
		],
		answer: "<script>",
	    },
	    {
		prompt: `What is the correct HTML for creating a hyperlink?`,
		options: [
		    `<a href="http://www.example.com">Example</a>`,
		    `<link href="http://www.example.com">`,
		    `<href>http://www.example.com</href>`,
		    `<a url="http://www.example.com">Example</a>`,
		],
		answer: `<a href="http://www.example.com">Example</a>`,
	    },
	    {
		prompt: `Which tag is used to define an unordered list in HTML?`,
		options: [
		    "<ul>",
		    "<ol>",
		    "<li>",
		    "<ul>",
		],
		answer: "<ul>",
	    },
	    {
		prompt: `What does HTML stand for?`,
		options: [
		    "Hyper Text Markup Language",
		    "High Tech Markup Language",
		    "Hyperlink and Text Markup Language",
		    "Home Tool Markup Language",
		],
		answer: "Hyper Text Markup Language",
	    },
	    {
		prompt: `Which tag is used to define a table row in HTML?`,
		options: [
		    "<td>",
		    "<tr>",
		    "<table>",
		    "<th>",
		],
		answer: "<tr>",
	    },
	    {
		prompt: `What does HTML element <input type="checkbox"> represent?`,
		options: [
		    "Checkbox",
		    "Radio button",
		    "Text input",
		    "Submit button",
		],
		answer: "Checkbox",
	    },
	    {
		prompt: `Which attribute is used to provide additional information about an element?`,
		options: [
		    "title",
		    "id",
		    "class",
		    "src",
		],
		answer: "title",
	    },
	    {
		prompt: `Which tag is used to define a hyperlink in HTML?`,
		options: [
		    "<link>",
		    "<a>",
		    "<href>",
		    "<hyperlink>",
		],
		answer: "<a>",
	    },
	    {
		prompt: `What is the correct HTML for adding a background color to a web page?`,
		options: [
		    `<body style="background-color: #000000;">`,
		    `<background color="#000000;">`,
		    `<body background="#000000;">`,
		    `<body bg="#000000;">`,
		],
		answer: `<body style="background-color: #000000;">`,
	    },
	    {
		prompt: `Which tag is used to define the footer of a webpage?`,
		options: [
		    "<header>",
		    "<footer>",
		    "<bottom>",
		    "<end>",
		],
		answer: "<footer>",
	    },
	    {
		prompt: `What is the correct HTML for inserting an image?`,
		options: [
		    `<img src="image.jpg" alt="MyImage">`,
		    `<image src="image.jpg" alt="MyImage">`,
		    `<img alt="MyImage">image.jpg</img>`,
		    `<img>image.jpg</img>`,
		],
		answer: `<img src="image.jpg" alt="MyImage">`,
	    },
	    {
		prompt: `Which HTML tag is used for the largest heading?`,
		options: [
		    "<h1>",
		    "<heading>",
		    "<head>",
		    "<h>",
		],
		answer: "<h1>",
	    },
	    {
		prompt: `How do you create a hyperlink that will send an email?`,
		options: [
		    `<a href="mailto:email@example.com">Send Email</a>`,
		    `<a href="email@example.com">Send Email</a>`,
		    `<mail>email@example.com</mail>`,
		    `<email>email@example.com</email>`,
		],
		answer: `<a href="mailto:email@example.com">Send Email</a>`,
	    },
	    {
		prompt: `Which tag is used to define an image map?`,
		options: [
		    "<img>",
		    "<map>",
		    "<area>",
		    "<imagemap>",
		],
		answer: "<map>",
	    },
	    {
		prompt: `What is the correct HTML for creating a hyperlink to another webpage?`,
		options: [
		    `<a href="http://www.example.com">Link</a>`,
		    `<link href="http://www.example.com">Link</link>`,
		    `<a src="http://www.example.com">Link</a>`,
		    `<href="http://www.example.com">Link</a>`,
		],
		answer: `<a href="http://www.example.com">Link</a>`,
	    },
	    {
		prompt: `Which tag is used to define a line break in HTML?`,
		options: [
		    "<br>",
		    "<lb>",
		    "<break>",
		    "<linebreak>",
		],
		answer: "<br>",
	    },
	    
];

// Get Dom Elements

let questionsEl =
	document.querySelector(
		"#questions"
	);
let timerEl =
	document.querySelector("#timer");
let choicesEl =
	document.querySelector("#options");
let submitBtn = document.querySelector(
	"#submit-score"
);
let startBtn =
	document.querySelector("#start");
let nameEl =
	document.querySelector("#name");
let feedbackEl = document.querySelector(
	"#feedback"
);
let reStartBtn =
	document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
	timerId = setInterval(
		clockTick,
		1000
	);
	timerEl.textContent = time;
	let landingScreenEl =
		document.getElementById(
			"start-screen"
		);
	landingScreenEl.setAttribute(
		"class",
		"hide"
	);
	questionsEl.removeAttribute(
		"class"
	);
	getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
	let currentQuestion =
		questions[currentQuestionIndex];
	let promptEl =
		document.getElementById(
			"question-words"
		);
	promptEl.textContent =
		currentQuestion.prompt;
	choicesEl.innerHTML = "";
	currentQuestion.options.forEach(
		function (choice, i) {
			let choiceBtn =
				document.createElement(
					"button"
				);
			choiceBtn.setAttribute(
				"value",
				choice
			);
			choiceBtn.textContent =
				i + 1 + ". " + choice;
			choiceBtn.onclick =
				questionClick;
			choicesEl.appendChild(
				choiceBtn
			);
		}
	);
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
	if (
		this.value !==
		questions[currentQuestionIndex]
			.answer
	) {
		time -= 10;
		if (time < 0) {
			time = 0;
		}
		timerEl.textContent = time;
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`;
		feedbackEl.style.color = "red";
	} else {
		feedbackEl.textContent =
			"Correct!";
		feedbackEl.style.color =
			"green";
	}
	feedbackEl.setAttribute(
		"class",
		"feedback"
	);
	setTimeout(function () {
		feedbackEl.setAttribute(
			"class",
			"feedback hide"
		);
	}, 2000);
	currentQuestionIndex++;
	if (
		currentQuestionIndex ===
		questions.length
	) {
		quizEnd();
	} else {
		getQuestion();
	}
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
	clearInterval(timerId);
	let endScreenEl =
		document.getElementById(
			"quiz-end"
		);
	endScreenEl.removeAttribute(
		"class"
	);
	let finalScoreEl =
		document.getElementById(
			"score-final"
		);
	finalScoreEl.textContent = time;
	questionsEl.setAttribute(
		"class",
		"hide"
	);
}

// End quiz if timer reaches 0

function clockTick() {
	time--;
	timerEl.textContent = time;
	if (time <= 0) {
		quizEnd();
	}
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
	let name = nameEl.value.trim();
	if (name !== "") {
		let highscores =
			JSON.parse(
				window.localStorage.getItem(
					"highscores"
				)
			) || [];
		let newScore = {
			score: time,
			name: name,
		};
		highscores.push(newScore);
		window.localStorage.setItem(
			"highscores",
			JSON.stringify(highscores)
		);
		alert(
			"Your Score has been Submitted"
		);
	}
}

// Save users' score after pressing enter

function checkForEnter(event) {
	if (event.key === "Enter") {
		saveHighscore();
		alert(
			"Your Score has been Submitted"
		);
	}
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;
