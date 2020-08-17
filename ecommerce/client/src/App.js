import React from 'react';
import './App.css';
import './App.stylesheet.sass';
import '../node_modules/bulma/css/bulma.css';
import Navbar from './components/navbar/navbar.component.jsx';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes.component';
// import * as authActions  from './redux/actions/auth/auth.actions';
import {SignInWithProvider,loadCreateUser,loadSignOut, checkUserSession} from './redux/actions/auth/auth.actions';

// import {auth,createUser} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import HeroBanner from './pages/hero/hero.pages';
import {loatStateProduct,getStateProducts} from './redux/actions/products/products.actions';
import { fetchCollectionsStartSaga } from './redux/sagas/products/products.sagas';
import { LOAD_STATE_PRODUCT, CHECK_CURRENT_USER } from './redux/actions/actions.types';
import { onCheckCurrentUser } from './redux/sagas/auth/auth.sagas';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     user:''
    }
  }
 
  componentDidMount(){
    this.props.fetchCollectionsStartSaga();
    this.props.onCheckCurrentUser();
  //   const load = async () => {
  //     // await this.props.loadCreateUser()
  //     // await this.props.loadState()
  //   }
  // load()
}

  render(){
    
    return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar 
          user={this.state.user}
          SignInWithProvider={this.props.SignInWithProvider} 
          loadCreateUser={this.props.loadCreateUser}
          loadSignOut={this.props.loadSignOut}
        ></Navbar>
        <HeroBanner></HeroBanner>
        <Routes user={this.state.user}></Routes>
      </BrowserRouter>
    </div>
    );
  }
  }  


const mapStateToProps = (state) => {
  return {
    auth:state.auth
  }
}
const mapDispatchToProps = (dispatch) => ({
  SignInWithProvider : (provider) => dispatch(SignInWithProvider(provider)),
  loadCreateUser : () => dispatch(loadCreateUser()),
  loadSignOut : () =>dispatch(loadSignOut()),
  loadState : () => dispatch(loatStateProduct()),
  fetchCollectionsStartSaga : () => dispatch({type:LOAD_STATE_PRODUCT}),
  onCheckCurrentUser: () => dispatch(checkUserSession())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
