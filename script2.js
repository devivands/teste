const cards = [
    { image: 'images/card1.jpeg', description: 'Imagem 1' },
    { image: 'images/card2.jpeg', description: 'Imagem 2' },
    { image: 'images/card3.jpeg', description: 'Imagem 3' },
    { image: 'images/card4.jpeg', description: 'Imagem 4' },
    { image: 'images/card5.jpeg', description: 'Imagem 5' },
    { image: 'images/card6.jpeg', description: 'Imagem 6' },
    { image: 'images/card7.jpeg', description: 'Imagem 7' },
    { image: 'images/card8.jpeg', description: 'Imagem 8' },
    { image: 'images/card9.jpeg', description: 'Imagem 9' },
    { image: 'images/card10.jpeg', description: 'Imagem 10' }
];

const questions = [
    {
        question: '1 As plantas produzem seu próprio alimento, através de um processo fotoquímico. Com a imagem, que nível trópico se encontra?',
        answers: ['Consumidor', 'Decompositor', 'Produtor', 'Herbívoro'],
        correctAnswer: 'Produtor'
    },
    {
        question: '2 Sabendo que esse Pokémon é um peixe, podemos classificar ele em qual nível trópico ele se encontra?',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Terciário'
    },
    {
        question: '3 Sabendo que esse pokemon é uma foca, conseguimos classificar ele em um nível trópico, sendo ele um:',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Terciário'
    },
    {
        question: '4 A partir da imagem, pode se considerar esse pokemon como um polvo, sabendo disso, classifique o em seu nivel trópico',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Secundário'
    },
    {
        question: '5 Observe a imagem, a partir dela, classifique esse pokemon em seu nivel trópico',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Primário'
    },
    {
        question: '6 Sabendo que está planta é carnívora, qual nível trófico ela se encaixa?',
        answers: ['Produtor', 'Consumidor Primário', 'Consumidor Secundário', 'Decompositor'],
        correctAnswer: 'Consumidor Primário'
    },
    {
        question: '7 Nesta imagem podemos observar um parasita e um animal, considerando os níveis tróficos, o parasita seria um decompositor?',
        answers: ['Verdadeiro', 'Falso'],
        correctAnswer: 'Verdadeiro'
    },
    {
        question: '8 Observando esse moluco na imagem, em qual nível trópico ele pertence, sabendo que ele também se alimenta de algas',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Secundário'
    },
    {
        question: '9 Observando as características destes 3 humanoide, que nivel trópico eles pertencem?',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Decompositor'],
        correctAnswer: 'Consumidor Terciário'
    },
    {
        question: '10 Observando a cadeia alimentar, qual a sequência correta?',
        answers: ['Consumidor, Produtor e Decompositor', 'Decompositor, Consumidor e Produtor primário', 'Consumidor Primário, Secundário e Terciário', 'Herbívoro, Carnívoro e onívoro'],
        correctAnswer: 'Consumidor Primário, Secundário e Terciário'
    },
    // Adicione mais perguntas conforme necessário
];

let currentCardIndex = 0;
let currentQuestionIndex = 0;
let cardsShown = 0;

const cardImageElement = document.getElementById('card-image');
const cardDescriptionElement = document.getElementById('card-description');
const nextCardButton = document.getElementById('next-card-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextQuestionButton = document.getElementById('next-question-btn');
const feedbackMessage = document.getElementById('feedback-message');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const errorElement = document.getElementById('errors');

let score = 0;
let errors = 0;

nextCardButton.addEventListener('click', showNextCard);
nextQuestionButton.addEventListener('click', showNextQuestion);

function showNextCard() {
    console.log('showNextCard called');
    if (cardsShown < 1 && currentCardIndex < cards.length) {
        showCard(cards[currentCardIndex]);
        currentCardIndex++;
        cardsShown++;
    } else {
        showQuestion(questions[currentQuestionIndex]);
    }
}

function showNextQuestion() {
    console.log('showNextQuestion called');
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        cardsShown = 0;
        showNextCard();
        feedbackMessage.classList.add('hide');
        nextQuestionButton.classList.add('hide');
    } else {
        showScore();
    }
}

function showCard(card) {
    console.log('showCard called', card);
    cardImageElement.src = card.image;
    cardDescriptionElement.innerText = card.description;
    questionContainerElement.classList.add('hide');
    nextCardButton.classList.remove('hide');
    nextQuestionButton.classList.add('hide');
}

function showQuestion(question) {
    console.log('showQuestion called', question);
    questionContainerElement.classList.remove('hide');
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, question.correctAnswer));
        answerButtonsElement.appendChild(button);
    });
    nextCardButton.classList.add('hide');
    nextQuestionButton.classList.add('hide');
}

function selectAnswer(selectedButton, correctAnswer) {
    console.log('selectAnswer called', selectedButton.innerText, correctAnswer);
    const isCorrect = selectedButton.innerText === correctAnswer;
    setStatusClass(selectedButton, isCorrect);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.innerText === correctAnswer);
    });

    feedbackMessage.innerText = isCorrect ? 'Resposta correta!' : 'Resposta incorreta.';
    feedbackMessage.classList.remove('hide');

    if (isCorrect) {
        score++;
    } else {
        errors++;
    }

    console.log(`Score: ${score}, Errors: ${errors}`);
    nextQuestionButton.classList.remove('hide');
}

function setStatusClass(element, isCorrect) {
    clearStatusClass(element);
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    console.log('showScore called');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
    errorElement.innerText = errors;
    questionContainerElement.classList.add('hide');
    document.getElementById('card-container').classList.add('hide');
    nextQuestionButton.classList.add('hide');
}

// Adicione uma função para iniciar o quiz se necessário
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-container').classList.add('hide');
    document.getElementById('quiz-container').classList.remove('hide');
    showNextCard();
});
