import './App.css';
import './bootstrap.min.css';
import Header from './components/Reusable/Header';
import HomeScreen from './components/Screen/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import SignInScreen from './components/Screen/SignInScreen';
import RegistrationScreen from './components/Screen/RegistrationScreen';
import LoggedInScreen from './components/Screen/LoggedInScreen';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/registration" component={RegistrationScreen} />
        <Route path="/loggedin" component={LoggedInScreen} />

      </main>
      <footer className="text-center">

      </footer>
        </BrowserRouter>
    </div>
  );
}

export default App;
