import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Homepage from '../components/homepage/homepage.component';
import Dashboard from '../components/dashboard/dashboard.component';
import ShopPage from '../pages/shopPage/shopPage.component';
import FormInput from '../pages/forms/formInput.component';
import Vases from '../pages/shopPage/vases';

class Routes extends Component { 
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Homepage}></Route>
                <Route exact path='/seeds' component={Dashboard}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
                <Route exact path='/dashboard/:id' component={Dashboard}></Route>
                <Route exact path ='/shop' component={ShopPage}></Route>
                <Route exact path ='/signupmail' component={FormInput}></Route>
                <Route exact path ='/vases' component={Vases}></Route>
            </Switch>
            

        )	} 
 } 
 export default Routes;