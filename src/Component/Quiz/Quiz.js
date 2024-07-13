import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../Assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = {
    1: option1,
    2: option2,
    3: option3,
    4: option4
  };

  const checkans = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(score+1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(index + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        Object.values(option_array).forEach(option => {
          option.current.classList.remove("wrong", "correct");
        });
      }
    }
  };

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <div>
          <h2>Quiz Completed</h2>
          <p>Your score: {score} / {data.length}</p>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkans(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkans(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkans(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkans(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
