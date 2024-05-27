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
      question: 'As plantas produzem seu próprio alimento, através de um processo fotoquímico. Com a imagem, que nível trópico se encontra?',
      answers: ['Consumidor', 'Decompositor', 'Produtor', 'Herbívoro'],
      correctAnswer: 'Produtor',
      explanation: 'As plantas são classificadas como produtores porque produzem seu próprio alimento através da fotossíntese.'
    },
    {
      question: 'Sabendo que esse Pokémon é um peixe, podemos classificar ele em qual nível trópico ele se encontra?',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
      correctAnswer: 'Consumidor Terciário',
      explanation: 'Este Pokémon é um predador de nível superior, portanto, é classificado como consumidor terciário.'
    },
    {
      question: 'Sabendo que esse pokemon é uma foca, conseguimos classificar ele em um nível trópico, sendo ele um:',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
      correctAnswer: 'Consumidor Terciário',
      explanation: 'A foca é um predador que se alimenta de outros consumidores, sendo classificada como consumidor terciário.'
    },
    {
      question: 'A partir da imagem, pode se considerar esse pokemon como um polvo, sabendo disso, classifique o em seu nivel trópico',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
      correctAnswer: 'Consumidor Secundário',
      explanation: 'O polvo é um predador que se alimenta de consumidores primários, classificando-o como consumidor secundário.'
    },
    {
      question: 'Observe a imagem, a partir dela, classifique esse pokemon em seu nivel trópico',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
      correctAnswer: 'Consumidor Primário',
      explanation: 'Este Pokémon se alimenta diretamente de produtores, sendo um consumidor primário.'
    },
    {
      question: 'Sabendo que está planta é carnívora, qual nível trófico ela se encaixa?',
      answers: ['Produtor', 'Consumidor Primário', 'Consumidor Secundário', 'Decompositor'],
      correctAnswer: 'Consumidor Primário',
      explanation: 'Embora as plantas carnívoras produzam seu próprio alimento, elas também consomem insetos, sendo consideradas consumidores primários.'
    },
    {
      question: 'Nesta imagem podemos observar um parasita e um animal, considerando os níveis tróficos, o parasita seria um decompositor?',
      answers: ['Verdadeiro', 'Falso'],
      correctAnswer: 'Verdadeiro',
      explanation: 'Os parasitas são considerados decompositores porque se alimentam de organismos mortos ou em decomposição.'
    },
    {
      question: 'Observando esse moluco na imagem, em qual nível trópico ele pertence, sabendo que ele também se alimenta de algas',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Consumidor Quartenario'],
      correctAnswer: 'Consumidor Secundário',
      explanation: 'Este Pokémon é um consumidor secundário porque se alimenta de algas e outros organismos.'
    },
    {
      question: 'Observando as características destes 3 humanoide, que nivel trópico eles pertencem?',
      answers: ['Consumidor Primário', 'Consumidor Secundário', 'Consumidor Terciário', 'Decompositor'],
      correctAnswer: 'Consumidor Terciário',
      imageClass: 'large-image',
      explanation: 'Esses humanoides são predadores de nível superior, sendo classificados como consumidores terciários.'
    },
    {
      question: 'Observando a cadeia alimentar, qual a sequência correta?',
      answers: ['Consumidor, Produtor e Decompositor', 'Decompositor, Consumidor e Produtor primário', 'Consumidor Primário, Secundário e Terciário', 'Herbívoro, Carnívoro e onívoro'],
      correctAnswer: 'Consumidor Primário, Secundário e Terciário',
      imageClass: 'large-image',
      explanation: 'A sequência correta é consumidor primário, secundário e terciário, conforme a estrutura da cadeia alimentar.'
    },
    // Adicione mais perguntas conforme necessário
  ];
  
  let currentCardIndex = 0;
  let currentQuestionIndex = 0;
  let cardsShown = 0;
  let attempts = 0;
  
  const cardImagesElement = document.getElementById('card-images');
  const cardDescriptionElement = document.getElementById('card-description');
  const nextCardButton = document.getElementById('next-card-btn');
  
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextQuestionButton = document.getElementById('next-question-btn');
  const previousQuestionButton = document.getElementById('previous-question-btn');
  const feedbackMessage = document.getElementById('feedback-message');
  const scoreContainer = document.getElementById('score-container');
  const scoreElement = document.getElementById('score');
  const errorElement = document.getElementById('errors');
  
  let score = 0;
  let errors = 0;
  
  nextCardButton.addEventListener('click', showNextCard);
  nextQuestionButton.addEventListener('click', showNextQuestion);
  previousQuestionButton.addEventListener('click', showPreviousQuestion);
  
  function showNextCard() {
    if (cardsShown < 1 && currentCardIndex < cards.length) {
      showCard(cards[currentCardIndex]);
      currentCardIndex++;
      cardsShown++;
    } else {
      showQuestion(questions[currentQuestionIndex]);
    }
  }
  
  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      cardsShown = 0;
      showNextCard();
      feedbackMessage.classList.add('hide');
      nextQuestionButton.classList.add('hide');
      previousQuestionButton.classList.remove('hide');
    } else {
      showScore();
    }
  }
  
  function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(questions[currentQuestionIndex]);
      feedbackMessage.classList.add('hide');
      nextQuestionButton.classList.add('hide');
    }
  }
  
  function showCard(card) {
    cardImagesElement.innerHTML = '';
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
    questionContainerElement.classList.remove('hide');
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn');
      button.addEventListener('click', () => selectAnswer(button, question.correctAnswer, question.explanation));
      answerButtonsElement.appendChild(button);
    });
    nextCardButton.classList.add('hide');
    nextQuestionButton.classList.add('hide');
    previousQuestionButton.classList.remove('hide');
  }
  
  function selectAnswer(selectedButton, correctAnswer, explanation) {
    const isCorrect = selectedButton.innerText === correctAnswer;
    setStatusClass(selectedButton, isCorrect);
    
    if (isCorrect) {
      if (attempts === 0) {
        score += 1;
      } else if (attempts === 1) {
        score += 0.75;
      } else if (attempts === 2) {
        score += 0.25;
      } else {
        score += 0;
      }
      feedbackMessage.innerText = `Resposta correta! ${explanation}`;
      feedbackMessage.classList.remove('hide');
      nextQuestionButton.classList.remove('hide');
      attempts = 0; // Reset attempts for the next question
      
      // Desabilitar todos os botões após a resposta correta
      Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
      });
    } else {
      attempts++;
      feedbackMessage.innerText = `Resposta incorreta. ${explanation}`;
      feedbackMessage.classList.remove('hide');
      Array.from(answerButtonsElement.children).forEach(button => {
        if (button.innerText === correctAnswer) {
          button.classList.remove('correct-answer');
        }
      });
    }
  
    console.log(`Score: ${score.toFixed(2)}, Attempts: ${attempts}, Errors: ${errors}`);
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
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score.toFixed(2);
    errorElement.innerText = errors;
    questionContainerElement.classList.add('hide');
    document.getElementById('card-container').classList.add('hide');
    nextQuestionButton.classList.add('hide');
    previousQuestionButton.classList.add('hide');
  }
  
  document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-container').classList.add('hide');
    document.getElementById('quiz-container').classList.remove('hide');
    showNextCard();
  });
  