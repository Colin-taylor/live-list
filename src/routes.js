import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import SignUpPage from './components/SignUpPage'
import HomePage from './components/HomePage'
import CoursesPage from './components/CoursesPage'
import DashboardPage from './components/DashboardPage'

export default (
    <Route path="/" component={App}> 
        <IndexRoute component={HomePage}/>
        <Route path="signup" component={SignUpPage}/>
        <Route path="dashboard" component={DashboardPage}/>
        <Route path="courses" component={CoursesPage}/>
    </Route>
)