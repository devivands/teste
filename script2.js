const cards = [
    { image: 'images/card1.jpeg', description: '' },
    { image: 'images/card2.jpeg', description: '' },
    { image: 'images/card3.jpeg', description: '' },
    { image: 'images/card4.jpeg', description: '' },
    { image: 'images/card5.jpeg', description: '' },
    { image: 'images/card6.jpeg', description: '' },
    { image: 'images/card7.jpeg', description: '' },
    { image: 'images/card8.jpeg', description: '' },
    { images: ['images/card9_1.jpeg', 'images/card9_2.jpeg', 'images/card9_3.jpeg'], description: '' },
    { images: ['images/card10_1.jpeg', 'images/card10_2.jpeg', 'images/card10_3.jpeg'], description: '' }
];

const questions = [
    {
        question: ' As plantas produzem seu próprio alimento, através de um processo fotoquímico. Com a imagem, que nível trópico se encontra?',
        answers: ['Consumidor', 'Decompositor', 'Produtor', 'Herbívoro'],
        correctAnswer: 'Produtor'
    },
    {
        question: ' Sabendo que esse Pokémon é um peixe, podemos classificar ele em qual nível trópico ele se encontra?',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Terciário'
    },
    {
        question: ' Sabendo que esse pokemon é uma foca, conseguimos classificar ele em um nível trópico, sendo ele um:',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Terciário'
    },
    {
        question: ' A partir da imagem, pode se considerar esse pokemon como um polvo, sabendo disso, classifique o em seu nivel trópico',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Secundário'
    },
    {
        question: ' Observe a imagem, a partir dela, classifique esse pokemon em seu nivel trópico',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Primário'
    },
    {
        question: ' Sabendo que está planta é carnívora, qual nível trófico ela se encaixa?',
        answers: ['Produtor', 'Consumidor Primário', 'Consumidor Secundário', 'Decompositor'],
        correctAnswer: 'Consumidor Primário'
    },
    {
        question: ' Nesta imagem podemos observar um parasita e um animal, considerando os níveis tróficos, o parasita seria um decompositor?',
        answers: ['Verdadeiro', 'Falso'],
        correctAnswer: 'Verdadeiro'
    },
    {
        question: ' Observando esse moluco na imagem, em qual nível trópico ele pertence, sabendo que ele também se alimenta de algas',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
        correctAnswer: 'Consumidor Secundário'
    },
    {
        question: ' Observando as características destes 3 humanoide, que nivel trópico eles pertencem?',
        answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Decompositor'],
        correctAnswer: 'Consumidor Terciário',
        imageClass: 'large-image'
    },
    {
        question: ' Observando a cadeia alimentar, qual a sequência correta?',
        answers: ['Consumidor, Produtor e Decompositor', 'Decompositor, Consumidor e Produtor primário', 'Consumidor Primário, Secundário e Terciário', 'Herbívoro, Carnívoro e onívoro'],
        correctAnswer: 'Consumidor Primário, Secundário e Terciário',
        imageClass: 'large-image'
    },
    // Adicione mais perguntas conforme necessário
];

let currentCardIndex = 0;
let currentQuestionIndex = 0;
let cardsShown = 0;

const cardImagesElement = document.getElementById('card-images');
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
    cardImagesElement.innerHTML = ''; // Limpa as imagens anteriores
    if (Array.isArray(card.images)) {
        card.images.forEach(imgSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            cardImagesElement.appendChild(imgElement);
        });
    } else {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        cardImagesElement.appendChild(imgElement);
    }

    if (card.imageClass) {
        cardImagesElement.classList.add(card.imageClass);
    } else {
        cardImagesElement.classList.remove('large-image');
    }

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

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-container').classList.add('hide');
    document.getElementById('quiz-container').classList.remove('hide');
    showNextCard();
});
