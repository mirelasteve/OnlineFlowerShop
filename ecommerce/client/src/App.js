import React from 'react';
import './App.css';
import './App.stylesheet.sass';
import '../node_modules/bulma/css/bulma.css';
import Navbar from './components/navbar/navbar.component.jsx';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes.component';
import {auth,createUser} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      currentUser:''
    }
  }
  unSubscribeFromForm = null;


  componentDidMount(){
    
   this.unSubscribeFromForm = auth.onAuthStateChanged(async (user)=>{
      if(user){
       const userRef = await createUser(user);
       userRef.onSnapshot(snapshot => {
         
          this.setState({
            currentUser:snapshot.data()
          })
        })
        
      } else {
        this.setState({
          currentUser:user
        })
      }
    })
    
  }
  componentWillUnmount(){
    
    this.unSubscribeFromForm();
  }
  render(){
    return (
      <div className="App">
      
      <BrowserRouter>
                 
                 <Navbar currentUser={this.state.currentUser}></Navbar>
                 <Routes></Routes>
             
  
         </BrowserRouter>
      
        
      </div>
    );
  }
  }  

export default App;
