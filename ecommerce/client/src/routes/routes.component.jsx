import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Homepage from '../components/homepage/homepage.component';
import Dashboard from '../components/dashboard/dashboard.component';
import ShopPage from '../pages/shopPage/shopPage.component';
import FormInput from '../pages/forms/formInput.component';
import Vases from '../pages/shopPage/vases';
import Collections from '../components/collections/collections.component';
import CollectionItem from '../components/collections/collectionItem.component';
import NoMatch from '../pages/noMatch/noMatch404';
import collectionsPreviewComponent from '../components/collections/collectionsPreview.component';
import CartComponent from '../components/cartHOC/cartHOC';
import Profile from '../components/profile/profileUser';

class Routes extends Component { 
    constructor(props){
        super(props);
        this.state={
         
        }
    }

    
    render(){
       
        return(
            <Switch>
                <Route exact path='/' component={Homepage}></Route>
                <Route exact path='/products' component={Collections}></Route>
                <Route exact path='/products/:collectionName' component={collectionsPreviewComponent}></Route>
                <Route exact path='/products/:collectionName/:id' component={CollectionItem}></Route>
                <Route exact path='/seeds' component={Dashboard}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
                <Route exact path='/dashboard/:id' component={Dashboard}></Route>
                <Route exact path ='/shop' component={ShopPage}></Route>
                <Route exact path ='/signupmail' component={FormInput}></Route>
                <Route exact path ='/profile' component={Profile}></Route>
                <Route exact path ='/cart' component={CartComponent}></Route>
                <Route exact path ='*' component={NoMatch}></Route>
            </Switch>
            

        )	} 
 } 
 export default Routes;