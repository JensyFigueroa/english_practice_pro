import './App.css'
import Conjugator from './components/Conjugator';
import VerbConjugator from './components/Conjugator';
import RegularVerbs from './components/RegularVerbs';

const verbs = ['am','eat', 'run', 'write'];

const App = () => {

  return (
    <div className="App">
      {/* <RegularVerbs/> */}
      <Conjugator verbs={verbs}/>
    </div>
  );
};

export default App;

