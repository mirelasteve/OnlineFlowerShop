import React from 'react';
import './App.css';
import './App.stylesheet.sass';
import '../node_modules/bulma/css/bulma.css';
import Navbar from './components/navbar/navbar.component.jsx';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes.component';
import * as authActions  from './redux/actions/auth/auth.actions';
// import {auth,createUser} from './firebase/firebase.utils';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     
    }
  }
componentDidMount(){
  
    this.props.loadCreateUser();
  
}
 
  render(){
    
    return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar></Navbar>
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
const mapDispatchToProps = (dispatch) =>{
  return dispatch(authActions)
}
export default connect(mapStateToProps,authActions)(App);
