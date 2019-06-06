import React from 'react';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login, Register, Forgotpass } from './pages/Auth';
import Dashboard from './pages/Dahsboard'
import { PublicRoute, PrivateRoute } from './components/Routes'
import Nav from './components/Nav'
import './App.css';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css'
export const history = createBrowserHistory();

// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

class App extends BrowserRouter {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick />
        <Route path="/" component={Nav} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/forgotpass" component={Forgotpass} />
          <Redirect path="/" to="/login" />
        </Switch>
        {/* <div>
        <h1>hello users...</h1>
      </div> */}
      </Router>
    )
  }

}

export default App;
