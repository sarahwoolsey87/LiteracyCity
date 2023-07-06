"use strict"

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

const quizQuestions = [
  {
    question: "Question 1: Which pair of words is an example of a homophone?",
    choices: ["Why/Because", "Prompt/Slow", "Flour/Flower", "Sizzle/Crackle"],
    correctAnswer: "Flour/Flower"
  },
  {
    question: "Question 2: Which of these examples best exemplifies a synonym?",
    choices: ["Where/Were/Wear", "Personification", "Adverb", "Ask/Propose"],
    correctAnswer: "Ask/Propose"
  },
  {
    question: "Question 3:What is the name of a word that is spelled the same backwards as it is forwards?",
    choices: ["Palindrome", "Antonym", "Oxymoron", "Declarative"],
    correctAnswer: "Palindrome"
  },
  {
    question: "Question 5: Which of these is an example of malapropism?",
    choices: ["It's raining cats and dogs.", "For all intensive purposes...", "Hiya mate!", "Dunno"],
    correctAnswer: "For all intensive purposes..."
  },

  {
    question: "Question 5: Which of these is the term for a fake name people call themselves?",
    choices: ["Pseudonym", "Epitaph", "Denouement", "Allusion"],
    correctAnswer: "Pseudonym"
  },

  {
    question: "Question 6: Which of these is an example of a euphemism?",
    choices: ["Eureka", "Pushing up daisies", "A school of fish", "bae"],
    correctAnswer: "Pushing up daisies"
  },

  {
    question: "Question 7: What is an antonym",
    choices: ["A slang term, e.g. bruv", "A word frequently spelled wrongly.e.g.misspelled", "A word that is spelled the same as another but pronounced differently. e.g. row/row", "An opposite. e.g. Top/bottom"],
    correctAnswer: "An opposite. e.g. Top/bottom"
  },

  {
    question: "Question 8: Which of these is a term for 'exaggeration'?",
    choices: ["Genre", "Dramatic Irony", "Anecdote", "Hyperbole"],
    correctAnswer: "Hyperbole"
  },

  {
    question: "Question 9: What is a linguistic term for 'an insult'?",
    choices: ["Pejorative", "Adverbial", "Soliloquy", "Vernacular"],
    correctAnswer: "Pejorative"
  },

  {
    question: "Question 10: What is a generic term for an example of informal language?",
    choices: ["Pathetic Fallacy", "Onomatopoeia", "Colloquialism", "Platitude"],
    correctAnswer: "Colloquialism"
  },
  
];

function buildQuiz() {
  const output = [];

  quizQuestions.forEach((question, questionIndex) => {
    const choices = [];

    for (let i = 0; i < question.choices.length; i++) {
      choices.push(
        `<label>
          <input type="radio" name="question${questionIndex}" value="${question.choices[i]}">
          ${question.choices[i]}
        </label>`
      );
    }

    output.push(
      `<div class="question">
        <h3>${question.question}</h3>
        <div class="choices">
          ${choices.join('')}
        </div>
      </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.choices');

  let score = 0;

  quizQuestions.forEach((question, questionIndex) => {
    const answerContainer = answerContainers[questionIndex];
    const selected = answerContainer.querySelector(`input[name=question${questionIndex}]:checked`);
    const userAnswer = selected ? selected.value : '';

    if (userAnswer === question.correctAnswer) {
      score++;
    }
  });

  const scorePercentage = (score / quizQuestions.length) * 100;
  let scoreMessage = '';

  if (scorePercentage === 100) {
    scoreMessage = "Wow - you smashed it (or maybe you're a good guesser)!";
  } else if (scorePercentage >= 70) {
    scoreMessage = "Well done - silver star for you!";
  } else {
    scoreMessage = "Back to the classroom for you!";
  }

  resultsContainer.innerHTML = `
    <div class="score-message">${scoreMessage}</div>
    <div class="score">You scored ${score} out of ${quizQuestions.length}</div>
    <img src="images/logo.png" alt="Quiz Results">
  `;
}

function handleSubmit() {
  showResults();
  submitButton.disabled = true;
}

buildQuiz();

submitButton.addEventListener('click', handleSubmit);
