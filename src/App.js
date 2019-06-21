import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { BackTop } from 'antd';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/loadable';
import NewHouse from './pages/NewHouse/loadable';
import TwoHand from './pages/TwoHand/loadable';
import Rent from './pages/Rent/loadable';
import HouseNews from './pages/HouseNews/loadable';
import Login from './pages/Login';
import Detail from './pages/Detail/loadable';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Route path="/" exact component={Home} />
          <Route path="/newhouse" exact component={NewHouse} />
          <Route path="/twohand" exact component={TwoHand} />
          <Route path="/rent" exact component={Rent} />
          <Route path="/housenews" exact component={HouseNews} />
          <Route path="/login" exact component={Login} />
          <Route path="/detail/:data" exact component={Detail} />
          <Footer />
        </BrowserRouter>
        <div><BackTop visibilityHeight="100" /></div>
      </Provider>
    </div>
  );
}

export default App;
