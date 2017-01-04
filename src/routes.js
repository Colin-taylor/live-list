import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'
import App from './App'
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import DashboardPage from './components/DashboardPage';
import LogOutPage from './components/LogOutPage';
import CreateListPage from './components/CreateListPage';
import requireAuth from './auth';
// to init
// eslint-disable-next-line
import Rebase from './Rebase.config';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}> 
            <IndexRoute component={HomePage}/>
            <Route path="dashboard" component={DashboardPage} onEnter={requireAuth}/>
            <Route path="courses" component={CoursesPage}/>
            <Route path="logout" component={LogOutPage}/>
            <Route path="create-list" component={CreateListPage}/>
        </Route>
    </Router>
)