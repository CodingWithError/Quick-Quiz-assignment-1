const questions = [   
  {
    question: 'Which HTML tag is used to define an inline style?',
    choices: ['<script>', '<css>', '<style>', '<span>'],
    answer: 'choice3',
  },
  {
    question: 'Which property is used to change the text color in CSS?',
    choices: ['text-color', 'font-color', 'text-style', 'color'],
    answer: 'choice4',
  },
  {
    question: 'Which of the following is the correct way to comment in HTML?',
    choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
    answer: 'choice2',
  },
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion(index) {
  const questionContainer = document.getElementById('question');
  const optionsContainer = document.getElementById('options');
  const questionNoContainer = document.getElementById('question-no');
  
  questionContainer.innerHTML = '';
  optionsContainer.innerHTML = '';
  questionNoContainer.textContent = `Question ${index + 1}`;

  const questionText = document.createElement('p');
  questionText.textContent = questions[index].question;
  questionContainer.appendChild(questionText);

  const options = questions[index].choices;

  options.forEach((option, i) => {
    const optionDiv = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `choice${i + 1}`;
    input.name = 'question';
    input.value = `choice${i + 1}`;
    input.addEventListener('change', checkAnswer);

    const label = document.createElement('label');
    label.htmlFor = `choice${i + 1}`;
    label.textContent = `${String.fromCharCode(65 + i)}. ${option}`;

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    optionsContainer.appendChild(optionDiv);
  });
}

function checkAnswer(event) {
  const selectedOption = event.target.value;
  const optionsContainer = document.getElementById('options');
  const correctOption = questions[currentQuestionIndex].answer;
  const allOptions = optionsContainer.querySelectorAll('input');

  allOptions.forEach(option => {
    option.disabled = true;
  });

  if (selectedOption === correctOption) {
    document.getElementById(selectedOption).nextSibling.classList.add('correct');
    score += 5;
  } else {
    document.getElementById(selectedOption).nextSibling.classList.add('incorrect');
    document.getElementById(correctOption).nextSibling.classList.add('correct');
  }

  document.getElementById('score').textContent = `Score: ${score}`;

  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
    } else {
      alert(`Quiz completed! Your final score is: ${score}`);
    }
  }, 1000);
}

window.onload = function() {
  displayQuestion(currentQuestionIndex);
};
