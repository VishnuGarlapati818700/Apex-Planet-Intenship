const questions = [
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: 1
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<script>", "<js>", "<code>", "<link>"],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft", "Apple"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

function startGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result-box").classList.remove("active");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, index, q.answer);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("score").innerText = `Score: ${score}`;
}

function checkAnswer(button, chosen, correct) {
  const options = document.querySelectorAll(".option");

  options.forEach(opt => opt.style.pointerEvents = "none");

  if (chosen === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    options[correct].classList.add("correct");
  }

  document.getElementById("score").innerText = `Score: ${score}`;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.add("active");
  document.getElementById("final-score").innerText = `You scored ${score}/${questions.length}`;
}
