var mybutton = document.getElementById('myBtn');
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  speech.voice = voices[0];

  voices.forEach(
      (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector('#button1').addEventListener('click', () => {
  speech.text = document.querySelector('textarea').value;

  window.speechSynthesis.speak(speech);
});



const questions = [
  {
    question:
        'Which handshape is typically used to represent the letter "A" in American Sign Language (ASL)?',
    answers: [
      {text: 'Open hand with all fingers extended', correct: true},
      {text: 'Fist with the thumb sticking out', correct: false},
      {text: 'Index finger pointing upwards', correct: false},
      {
        text: 'Pinky finger extended while other fingers are curled',
        correct: false
      },
    ]
  },
  {
    question:
        'Which of the following is the correct sign for "thank you" in American Sign Language (ASL)?',
    answers: [
      {text: 'Hand making a "thumbs up" gesture', correct: false},
      {text: ' Hand waving side to side in front of the body', correct: false},
      {text: 'Fingers of one hand tapping the chin', correct: false},
      {text: 'Hand placed on the chest and then moved outward', correct: true},
    ]
  },
  {
    question:
        'Which of the following signs means "please" in American Sign Language (ASL)?',
    answers: [
      {text: 'Fingerspelling the letters P-L-E-A-S-E', correct: false},
      {text: 'Rubbing the chest with a flat hand', correct: true},
      {text: 'Tapping the chin with the fingertips', correct: false},
      {
        text: 'Holding the hand palm-up and moving it in a circular motion',
        correct: false
      },
    ]
  },
  {
    question:
        'Which sign indicates I don t understand in American Sign Language (ASL)?',
    answers: [
      {
        text: 'Shrugging the shoulders with a puzzled expression',
        correct: false
      },
      {text: 'Pointing to the ear and shaking the head', correct: false},
      {
        text: 'Placing the index finger horizontally across the forehead',
        correct: true
      },
      {text: 'Fingerspelling the letters I-D-K (I dont know)', correct: false},
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}


function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});


startQuiz();