import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect';
import AuthLanding from '../auth-landing/auth-landing';
import Header from '../header/header';
import ProfileDashboard from '../dashboard/profile-dashboard';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'> 
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={AuthLanding}/>
            <Route exact path='/signup' component={AuthLanding}/>
            <Route exact path='/login' component={AuthLanding}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/profile' component={ProfileDashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
