
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
