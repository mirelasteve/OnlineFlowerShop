import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../redux/actions/auth/auth.actions';



class Navbar extends Component { 
    constructor(props){
        super(props);
        this.state={
           
        }
    }
    renderNavEnd(){
        
        console.log('this.props.currentUser ',this.props.currentUser);
        if(this.props.currentUser === null){
           
            
            return ( <React.Fragment>
                <div className='navbar-item'><Link to='/signupmail'><button className='button has-text-primary-light has-background-primary-dark'><i className="fa fa-envelope mr-4" ></i><span className='is-spaced'>Sign in </span></button></Link></div>
                <div className='navbar-item'>
                    <button  className='button is-info' >
                        <span className='icon is-large'>
                            <i className="fab fa-facebook-f" ></i>
                        </span>
                    </button>
                </div>
                
                < div className='navbar-item'><button onClick={()=>this.props.SignInWithProvider('google')} className='button is-danger is-light'><span className='icon is-large'><i className="fab fa-google" aria-hidden="true"></i></span></button></div>
            </React.Fragment>)
        } else if(this.props.currentUser.displayName === ''){
            return (<div className='navbar-item'>
            <span>Loading ...</span>
            <progress className="progress is-small is-warning" max="100"></progress>
            </div>
                )
        } else {
            return ( <div className='navbar-item'>
                <div className='navbar-item'><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                <div className='navbar-item text-white'>{this.props.currentUser.displayName}</div>
                <div className='navbar-item'>
                    <button className='button is-danger is-outlined' onClick={()=>this.props.loadSignOut()}>Sign Out</button>
                </div>
            </div>)
        }
    }
    render(){
        
        
        return(
            <div className='navbar is-dark' role="navigation" >

                <div className='navbar-brand'><img src={require('../../logos/logo_transparent.png')} alt='Flower store' width='100' height='100'/></div>
                <a href='/#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                <div className='navbar-menu'>
                    <div className='navbar-start'>
                        <div className='navbar-item'>
                            <Link to='/'>Home</Link>
                        </div>
                        
                        <div className='navbar-item has-dropdown is-hoverable' aria-label="dropdown navigation">                   
                            <div className='navbar-link' label="dropdown navigation">Flowers</div>
                                <div className='navbar-dropdown'>
                                    <Link to='/shop' className='navbar-item'>Seeds</Link>
                                    <Link to='/shop' className='navbar-item'>Bulbs</Link>
                                    <a href='/' className='navbar-item'>Garden</a>
                                    <a href='/' className='navbar-item'>Home flowers</a>
                                    <a href='/' className='navbar-item'>Trees</a>
                                </div>
                        </div> 

                        <div className='navbar-item has-dropdown is-hoverable' aria-label="dropdown navigation">                   
                            <div className='navbar-link' label="dropdown navigation">Bouquest</div>
                                <div className='navbar-dropdown'>
                                    <a href='/' className='navbar-item'>Weddings</a>
                                    <a href='/' className='navbar-item'>Anniversary</a>
                                    <a href='/' className='navbar-item'>Gradiation</a>
                                    <a href='/' className='navbar-item'>New baby</a>
                                </div>
                        </div>

                        <div className='navbar-item has-dropdown is-hoverable' aria-label="dropdown navigation">                   
                            <div className='navbar-link' label="dropdown navigation">Floral Supplies</div>
                                <div className='navbar-dropdown'>
                                    <Link to='/vases'>className='navbar-item'>Vases</Link>
                                    <a href='/'className='navbar-item'>Instruments</a>
                                    <a href='/'className='navbar-item'>Foams</a>
                                    <a href='/'className='navbar-item'>Preparation materials</a>
                                </div>
                        </div> 

                        <div className='navbar-item'>About</div>
                        
                    </div>
                    <div className='navbar-end'>
                        {this.renderNavEnd()}
                    </div>

                    
                        
                    
                </div>
            </div>
        )	} 
 } 

 function mapStateToProps(state){
     
     return {
         auth:state.auth
     }
 }
 
 export default connect(mapStateToProps,authActions)(Navbar);