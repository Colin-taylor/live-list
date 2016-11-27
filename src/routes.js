import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import DashboardPage from './components/DashboardPage';
import LogOutPage from './components/LogOutPage';
import CreateListPage from './components/CreateListPage';
import requireAuth from './auth';
// to init
import Rebase from './Rebase.config';

export default (
    <Route path="/" component={App}> 
        <IndexRoute component={HomePage}/>
        <Route path="signup" component={SignUpPage}/>
        <Route path="dashboard" component={DashboardPage} onEnter={requireAuth}/>
        <Route path="courses" component={CoursesPage}/>
        <Route path="logout" component={LogOutPage}/>
        <Route path="create-list" component={CreateListPage}/>
    </Route>
)