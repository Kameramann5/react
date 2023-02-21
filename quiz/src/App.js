import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const questions = [
    {
      questionText: 'Столица США?',
      id: '1',
      answerOptions: [
        { answerText: 'Бостон', isCorrect: false },
        { answerText: 'Вашингтон', isCorrect: true },
        { answerText: 'Нью Йорк', isCorrect: false },
        { answerText: 'Лос-Анджелес', isCorrect: false },
      ],
    },
    {
      questionText: 'Какая компания разработала React?',
      id: '2',
      answerOptions: [
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Mail', isCorrect: false },
        { answerText: 'Facebook', isCorrect: true },
        { answerText: 'Google', isCorrect: false },
      ],
    },
    {
      questionText: 'Что не относится к марвел?',
      id: '3',
      answerOptions: [
        { answerText: 'Бэтмен', isCorrect: true },
        { answerText: 'Халк', isCorrect: false },
        { answerText: 'Железный человек', isCorrect: false },
        { answerText: 'Мстители', isCorrect: false },
      ],
    },
    {
      questionText: 'Что не является языком программирования?',
      id: '4',
      answerOptions: [
        { answerText: 'Go', isCorrect: false },
        { answerText: 'HTML', isCorrect: true },
        { answerText: 'JavaScript', isCorrect: false },
        { answerText: 'Python', isCorrect: false },
      ],
    },
    {
      questionText: 'В каком году началась вторая мировая война?',
      id: '5',
      answerOptions: [
        { answerText: '1945', isCorrect: false },
        { answerText: '1941', isCorrect: true },
        { answerText: '1940', isCorrect: false },
        { answerText: '1935', isCorrect: false },
      ],
    },
  ];

  const [userAnswers, setUserAnswerds] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handleAnswerOptionClick = (isCorrect, question) => { 
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setUserAnswerds([...userAnswers, question]); 
    }
console.log(isCorrect); 
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }    
  };

  //переключение вопросов
  // const handleBackOptionClick = () => {  
  //   if (currentQuestion != 0 ) {
  //     if(score >0) { 
  //     setScore(score - 1); 
  //   } 
  //     const prevQuestion = currentQuestion - 1;
  //     setCurrentQuestion(prevQuestion);
  //   }
  // };
  // const handleDaleeOptionClick = () => { 
  //   const nextQuestion = currentQuestion + 1;
  //   if (nextQuestion < questions.length) {
  //     setCurrentQuestion(nextQuestion);
  //   } else {
  //     setShowScore(true);
  //   }
  // };
  const refresh = () => {
    setUserAnswerds([])
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  function Good(props, score) {
   
    if (props.score == questions.length) {
      return <b>Вы ответили на все правильно!</b>;
    }
  }
  function GoodNo(props, score) {
  
    if (props.score == 0) {
      return <b>Нет правильных ответов!</b>;
    }
  }
  function GoodNo2(props, score) {
  
    if (props.score != questions.length) {
      return  <p className='incorrect_p'> Ваши ошибки:</p>;
    }
  }




  const percentage = Math.round((currentQuestion / questions.length) * 100);
  return (
    <div className='app'>
      {showScore ? (
        //показать результат
        <div className='section_score'>
          <button onClick={refresh} className='refresh__btn'>
            Попробовать еще раз
          </button>
          <div>
            Правильных ответов {score} из {questions.length}
          </div>
          <Good score={score} /> <GoodNo score={score} />
          <GoodNo2 score={score} />
         
          {userAnswers
            .map((question,index) => ( 
              <div className='incorrect' key={index}>
                {question.id} {question.questionText}
                <br></br>
<div className='incorrect_your'> 
				Ваш ответ: {question.userAnswer.answerText}
</div>
              
                <div className='correct'>
                  Правильный ответ:{' '}
                  {
                    question.answerOptions.find((option) => option.isCorrect)
                      ?.answerText
                  }{' '}
                </div>
              </div>
            ))}
        </div>
      ) : (
        //показать вопросы
        <div className='quizz'>
          <div className='progress'>
            <div
              style={{ width: `${percentage}%` }}
              className='progress_status'
            ></div>
          </div>
          <div className='question__section'>
            <div className='question__count'>
              <span>Вопрос {currentQuestion + 1}</span> / {questions.length}
            </div>
            <div className='question__text'>
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className='answer_section'>
            {questions[currentQuestion].answerOptions.map((item, index) => (
              <button
                className='btn__answer'
                key={index}
                onClick={() =>
                  handleAnswerOptionClick(
                    item.isCorrect,
                    {...questions[currentQuestion], userAnswer: item}
                  )
                }
              >
                {item.answerText}
              </button>
            ))}
          </div>

          <div className='btn__dalee__next'>
          
            {/* <button
              className=' btn__end'
              onClick={() => handleBackOptionClick()}
            >
              &larr;
            </button>
            <button
              className=' btn__dalee'
              onClick={() => handleDaleeOptionClick()}
            >
              &rarr;
            </button> */}
            
            {' '}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
