import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';


import decoration from '../../resources/img/vision.png';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar />
        <div className='chat__content'>
          <CharList/>
          <CharInfo/>
        </div>
        <img className='bg-decoration' src={decoration} alt="vision"/>
      </main>

        
    </div>
  );
}

export default App;
