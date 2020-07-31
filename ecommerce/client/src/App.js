import React from 'react';
import './App.css';
import './App.stylesheet.sass';
import '../node_modules/bulma/css/bulma.css';
import Navbar from './components/navbar/navbar.component.jsx';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes.component';
import * as authActions  from './redux/actions/auth/auth.actions';
import {SignInWithProvider,loadCreateUser,loadSignOut} from './redux/actions/auth/auth.actions';

// import {auth,createUser} from './firebase/firebase.utils';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     user:''
    }
  }
 
  componentDidMount(){
    
  this.props.loadCreateUser()
  
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
        <Routes></Routes>
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
  loadSignOut : () =>dispatch(loadSignOut())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
