import React, { useEffect, useState } from 'react';

const verbData = [
  { spanish: 'comer', english: 'eat' },
  { spanish: 'beber', english: 'drink' },
  { spanish: 'hablar', english: 'speak' },
  // Agrega más verbos aquí
];

const RegularVerbs: React.FC = () => {
  const [currentVerbIndex, setCurrentVerbIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  const currentVerb = verbData[currentVerbIndex];

  const checkAnswer = () => {
    if (userInput.toLowerCase() === currentVerb.english.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextVerb = () => {
    if (currentVerbIndex < verbData.length - 1) {
      setCurrentVerbIndex(currentVerbIndex + 1);
    } else {
      setPracticeCompleted(true);
    }
    setUserInput('');
    setIsCorrect(null);
  };

  const restartPractice = () => {
    setCurrentVerbIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setPracticeCompleted(false);
  };

  let currentSecond: number = 1;

  useEffect(() => {
    if (isCorrect) {
      currentSecond++;
      const timeoutId = setTimeout(nextVerb, 10000); // Ejecutar nextVerb después de 10 segundos

      return () => {
        clearTimeout(timeoutId); // Limpia el temporizador si se desmonta el componente
      };
    }
  }, [currentVerbIndex, practiceCompleted]);

  return (
    <>
      <h1 className="tooltip">Learning Regular Verbs in English <span className="tooltiptext">Aprendiendo los verbos regulares en inglés</span></h1>
      {practiceCompleted ? (
        <div>
          <p className='tooltip'>Congratulations! You have finished verb practice. <span className='tooltiptext'>¡Felicidades! Has terminado la práctica de verbos.</span></p>
          <button className='tooltip' onClick={restartPractice}>Start again <span className='tooltiptext'>Iniciar de Nuevo</span></button>
        </div>
      ) : (
        <div className='containerVerb'>
          <p className='tooltip'>Verb in spanish: <span style={{ color: 'green' }}>{currentVerb.spanish}</span> <span className='tooltiptext'>Verbo en español: </span></p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {isCorrect === true && <span className="correct">¡Correct!</span>}
          {isCorrect === false &&  (
            <span className="incorrect tooltip">
              Incorrect. The correct answer is: {currentVerb.english}
              <span className='tooltiptext'>Incorrecto. La respuesta correcta es:</span>
            </span>
          )}
        </div>
      )}
      <div className="containterButton">
        <button onClick={checkAnswer}>Check</button>
        <button onClick={nextVerb}>Next Verb {isCorrect && currentSecond}</button>
      </div>
    </>
  );
};

export default RegularVerbs;

