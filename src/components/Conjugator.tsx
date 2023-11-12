import React, { useState } from 'react';

interface ConjugationInput {
  tense: string;
  value: string;
}

interface VerbConjugation {
  verb: string;
  conjugations: ConjugationInput[];
  correct: boolean;
}

const VerbConjugator: React.FC = () => {
  const [inputVerb, setInputVerb] = useState<string>('');
  const [conjugationInputs, setConjugationInputs] = useState<ConjugationInput[]>([
    { tense: 'present', value: '' },
    { tense: 'past', value: '' },
    { tense: 'present continuous', value: '' },
    { tense: 'future', value: '' },
  ]);
  const [conjugationResult, setConjugationResult] = useState<VerbConjugation | null>(null);

  console.log(conjugationResult)
  const conjugateAndCheck = () => {
    const verb = inputVerb.trim().toLowerCase();

    const correctConjugations = conjugationInputs.map(({ tense }) => {
      switch (tense) {
        case 'present':
          return `I ${verb}`;
        case 'past':
          return `I ${verb}ed`;
        case 'present continuous':
          return `I am ${verb}ing`;
        case 'future':
          return `I will ${verb}`;
        default:
          return '';
      }
    });

    const userConjugations = conjugationInputs.map(({ value }) => value.trim().toLowerCase());

    const correct = userConjugations.every((userConjugation) =>
      correctConjugations.includes(userConjugation.charAt(0).toUpperCase() + userConjugation.slice(1))
      // console.log('test',correctConjugations,userConjugation.charAt(0).toUpperCase() + userConjugation.slice(1))
    );

    console.log(correct, 'variable')
    console.log(userConjugations)

    setConjugationResult({ verb, conjugations: conjugationInputs, correct });
  };

  const handleVerbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVerb(event.target.value);
  };

  const handleConjugationInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newConjugationInputs = [...conjugationInputs];
    newConjugationInputs[index].value = event.target.value;
    setConjugationInputs(newConjugationInputs);
  };

  return (
    <div>
      <label>
        Ingrese el verbo en inglés:
        <input type="text" value={inputVerb} onChange={handleVerbChange} />
      </label>
      <br />
      {conjugationInputs.map((conjugationInput, index) => (
        <div key={index}>
          <label>
            {conjugationInput.tense}:
            <input
              type="text"
              value={conjugationInput.value}
              onChange={(event) => handleConjugationInputChange(index, event)}
            />
          </label>
        </div>
      ))}
      <br />
      <button onClick={conjugateAndCheck}>Verificar conjugaciones</button>
      {conjugationResult && (
        <div>
          <h3>Conjugaciones para "{conjugationResult.verb}":</h3>
          <ul>
            {conjugationResult.conjugations.map(({ tense, value }, index) => (
              <li key={index} className={conjugationResult.correct ? 'correct' : 'incorrect'}>
                {tense}: {value}
              </li>
            ))}
          </ul>
          <p className={conjugationResult.correct ? 'correct' : 'incorrect'}>
            {conjugationResult.correct ? '¡Correcto!' : 'Incorrecto. Verifica las conjugaciones.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerbConjugator;


/* import React, { useState } from 'react';

interface ConjugationProps {
  verbs: string[];
}

const Conjugator: React.FC<ConjugationProps> = ({ verbs }) => {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [tense, setTense] = useState<'present' | 'past' | 'presentContinuous' | 'future'>('present');
  const [conjugation, setConjugation] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkConjugation = () => {
    // Lógica para verificar si la conjugación es correcta.
    // Puedes personalizar esta lógica para cada tiempo verbal y verbo específico según tus necesidades.

    const correctConjugation = getCorrectConjugation(verbs[currentVerbIndex], tense);

    setIsCorrect(conjugation.toLowerCase() === correctConjugation.toLowerCase());
  };

  const nextVerb = () => {
    // Pasar al siguiente verbo y reiniciar el estado de la conjugación y la corrección.
    setCurrentVerbIndex((prevIndex) => prevIndex + 1);
    setConjugation('');
    setIsCorrect(null);
  };

  const getCorrectConjugation = (verb: string, selectedTense: string): string => {
    // Lógica para obtener la conjugación correcta según el verbo y el tiempo verbal seleccionado.
    // Puedes extender esta función para cubrir más tiempos verbales y reglas específicas.

    switch (selectedTense) {
      case 'present':
        // Lógica para el tiempo presente.
        return verb;
      case 'past':
        // Lógica para el tiempo pasado.
        // Ejemplo simple: Añadir "ed" al final del verbo.
        return verb + 'ed';
      case 'presentContinuous':
        // Lógica para el tiempo presente continuo.
        // Ejemplo simple: Agregar "is/are/am" + "ing" al final del verbo.
        return 'am/is/are ' + verb + 'ing';
      case 'future':
        // Lógica para el tiempo futuro.
        // Ejemplo simple: Agregar "will" + verbo.
        return 'will ' + verb;
      default:
        return '';
    }
  };

  return (
    <div>
      <h2>Conjugación de {verbs[currentVerbIndex]}</h2>
      <label>
        Conjugación ({tense}):
        <input
          type="text"
          value={conjugation}
          onChange={(e) => setConjugation(e.target.value)}
        />
      </label>
      <button onClick={checkConjugation}>Verificar</button>
      {isCorrect !== null && (
        <p>{isCorrect ? '¡Correcto!' : 'Incorrecto. Intenta de nuevo.'}</p>
      )}
      <div>
        <button onClick={() => setTense('present')}>Presente</button>
        <button onClick={() => setTense('past')}>Pasado</button>
        <button onClick={() => setTense('presentContinuous')}>Presente Continuo</button>
        <button onClick={() => setTense('future')}>Futuro</button>
      </div>
      {currentVerbIndex < verbs.length - 1 ? (
        <button onClick={nextVerb}>Siguiente verbo</button>
      ) : (
        <p>Has completado todos los verbos.</p>
      )}
    </div>
  );
};

export default Conjugator;
 */