const questions = [
  {
    question: "Según la investigación, ¿qué porcentaje de estudiantes había visto al menos una película colombiana?",
    answers: ["40,0 %", "77,8 %", "88,9 %"],
    correct: 1,
    explanation: "El 77,8 % de los 45 estudiantes encuestados dijo haber visto al menos una película colombiana."
  },
  {
    question: "¿Qué porcentaje tenía interés en aprender más sobre cine colombiano en el colegio?",
    answers: ["82,2 %", "68,9 %", "20,0 %"],
    correct: 0,
    explanation: "El 82,2 % manifestó interés en aprender más sobre cine colombiano en el entorno escolar."
  },
  {
    question: "¿Qué porcentaje consideró importante o muy importante que Colombia produzca sus propias películas?",
    answers: ["31,1 %", "42,2 %", "88,9 %"],
    correct: 2,
    explanation: "El 88,9 % consideró importante o muy importante que el país produzca sus propias películas."
  },
  {
    question: "¿Cuál fue una de las dificultades de conocimiento que identificó la encuesta?",
    answers: [
      "La mayoría no había visto ninguna película",
      "El 68,9 % no conocía la legislación que incentiva el cine nacional",
      "Nadie estaba interesado en aprender"
    ],
    correct: 1,
    explanation: "El 68,9 % no conocía la legislación que incentiva el cine nacional. Esto señala un tema que podría divulgarse mejor."
  },
  {
    question: "¿Qué porcentaje no reconoció a ninguno de los directores incluidos en el cuestionario?",
    answers: ["40,0 %", "77,8 %", "17,8 %"],
    correct: 0,
    explanation: "El 40,0 % no reconoció a ninguno de los directores incluidos en el cuestionario."
  },
  {
    question: "¿Qué actividad fue la más elegida entre las opciones de actividades para aprender sobre cine?",
    answers: ["Presentaciones cortas", "Actividades prácticas", "Cineforo"],
    correct: 2,
    explanation: "El cineforo fue la opción más elegida, con 31,1 %. Las presentaciones cortas obtuvieron 24,4 %."
  },
  {
    question: "¿Qué tema fue el de mayor interés entre los temas consultados?",
    answers: ["Temas sociales y culturales", "Efectos especiales de Hollywood", "Crítica de videojuegos"],
    correct: 0,
    explanation: "Los temas sociales y culturales fueron seleccionados por el 42,2 % de los participantes."
  },
  {
    question: "¿Cuál afirmación describe correctamente el alcance de esta investigación escolar?",
    answers: [
      "Se aplicó y evaluó un programa de cineforo durante varias semanas",
      "Se encuestó a estudiantes para conocer sus saberes y percepciones; las actividades son propuestas",
      "Se comprobó que todos los estudiantes conocen el cine colombiano"
    ],
    correct: 1,
    explanation: "La investigación fue una encuesta sobre conocimiento y percepción. No se implementó ni evaluó una intervención pedagógica."
  }
];

const questionCounter = document.getElementById("question-counter");
const scoreLabel = document.getElementById("score-label");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizContent = document.getElementById("quiz-content");
const resultScreen = document.getElementById("result-screen");
const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  scoreLabel.textContent = `Puntos: ${score}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = item.question;
  answerList.innerHTML = "";
  feedback.hidden = true;
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver resultado →" : "Siguiente pregunta →";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index));
    answerList.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...answerList.querySelectorAll("button")];
  const isCorrect = selectedIndex === item.correct;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("incorrect");
  });

  if (isCorrect) score++;
  scoreLabel.textContent = `Puntos: ${score}`;
  feedback.hidden = false;
  feedback.classList.add(isCorrect ? "correct-feedback" : "incorrect-feedback");
  const title = document.createElement("strong");
  title.textContent = isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta";
  feedback.replaceChildren(title, document.createTextNode(item.explanation));
  nextButton.disabled = false;
}

function showResults() {
  quizContent.hidden = true;
  resultScreen.hidden = false;
  progressFill.style.width = "100%";
  resultScore.textContent = `Obtuviste ${score} de ${questions.length} puntos.`;
  const percentage = (score / questions.length) * 100;

  if (percentage >= 87.5) {
    resultIcon.textContent = "★";
    resultTitle.textContent = "¡Excelente!";
    resultMessage.textContent = "Tienes una buena base sobre el cine colombiano y los resultados de la encuesta. Sigue descubriendo películas y cineastas del país.";
  } else if (percentage >= 50) {
    resultIcon.textContent = "✓";
    resultTitle.textContent = "¡Vas por buen camino!";
    resultMessage.textContent = "Ya conoces varios datos. Revisa las explicaciones y vuelve a jugar para reforzar lo aprendido.";
  } else {
    resultIcon.textContent = "↻";
    resultTitle.textContent = "¡Inténtalo de nuevo!";
    resultMessage.textContent = "Este reto es una oportunidad para aprender. Lee las explicaciones y vuelve a probar.";
  }
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.hidden = true;
  quizContent.hidden = false;
  renderQuestion();
});

renderQuestion();
