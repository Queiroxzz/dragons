import { Layout } from '@sicredi/react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register/index';
import Home from './pages/Home/Home';
import DragonRegister from './pages/DragonsRegister/DragonRegister';
import Password from './pages/resetPassword/Password';
import { Toast } from '@sicredi/react';

const App = () => (
  <Layout>
    <Toast timeout={3000} />

    <Layout.Container>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/password">
            <Password />
          </Route>

          <Route path="/dragonRegister/:id">
            <DragonRegister />
          </Route>

          <Route path="/dragonRegister">
            <DragonRegister />
          </Route>

          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Layout.Container>
  </Layout>
);

export default App;
