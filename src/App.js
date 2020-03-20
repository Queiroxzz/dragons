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
import EditDragons from './pages/editDragons/EditDragons';


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

            <Route path="/dragonRegister">
            <DragonRegister />
            </Route>

            <Route path="/editDragon">
            <EditDragons />
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
