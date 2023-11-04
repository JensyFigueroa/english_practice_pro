import React, { useState } from 'react';
import './App.css'

const verbData = [
  { spanish: 'comer', english: 'eat' },
  { spanish: 'beber', english: 'drink' },
  { spanish: 'hablar', english: 'speak' },
  // Agrega más verbos aquí
];

const App: React.FC = () => {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

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


  return (
    <div className="App">
      <h1>Aprende Verbos en Inglés</h1>
      {practiceCompleted ? (
        <div>
          <p>¡Felicidades! Has terminado la práctica de verbos.</p>
          <button onClick={restartPractice}>Iniciar de Nuevo</button>
        </div>
      ) : (
        <div>
          <p>Verbo en español: {currentVerb.spanish}</p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={checkAnswer}>Verificar</button>
          {isCorrect === true && <p className="correct">¡Correcto!</p>}
          {isCorrect === false && (
            <p className="incorrect">
              Incorrecto. La respuesta correcta es: {currentVerb.english}
            </p>
          )}
          <button onClick={nextVerb}>Siguiente verbo</button>
        </div>
      )}
    </div>
  );
};

export default App;

