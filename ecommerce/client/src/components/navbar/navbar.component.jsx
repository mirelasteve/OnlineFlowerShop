import React, {Component} from 'react';
import {Link,withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
// import * as authActions from '../../redux/actions/auth/auth.actions';



class Navbar extends Component { 
    constructor(props){
        super(props);
        this.state={
           user:'',
           count:0,
           activeCart:''
        }
    }
   
    componentDidUpdate(){
       let newCount = 0;
        this.props.cart.map(x=> newCount+=x.count);
        if( typeof newCount === 'number' && newCount!== this.state.count ){
            this.setState({
                count:newCount
            })
        }
    }   

    activateHover(){
        if(this.state.activeCart.length<1) {
            this.setState({
                activeCart:' is-active'
            })
        } else {
            this.setState({
                activeCart:''
            })
        }
        
    }
    renderNavEnd(){
      
        if(this.props.auth.user === null){
           
            return ( <React.Fragment>
                <div className='navbar-item'><Link to='/signupmail'><button className='button has-text-primary-light has-background-primary-dark'><i className="fa fa-envelope mr-4" ></i><span className='is-spaced'>Sign in </span></button></Link></div>
                <div className='navbar-item'>
                    <button  onClick={()=>this.props.SignInWithProvider('facebook')} className='button is-info' >
                        <span className='icon is-large'>
                            <i className="fab fa-facebook-f" ></i>
                        </span>
                    </button>
                </div>
                
                <div className='navbar-item'>
                    <button onClick={()=>this.props.SignInWithProvider('google')} className='button is-danger is-light'>
                        <span className='icon is-large'><i className="fab fa-google" aria-hidden="true"></i></span>
                    </button>
                </div>
            </React.Fragment>)
        } else if(this.props.auth.user === ''){
           
            return (<div className='navbar-item'>
                        <span>Loading ...</span>
                        <progress className="progress is-small is-warning" max="100"></progress>
                    </div>
                )
        } else {
            return ( <div className='navbar-item '>
                <div className={'dropdown'+this.state.activeCart}>
                    <div className="dropdown-trigger">
                    <button onClick={()=>this.activateHover()} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <i className="fa fa-shopping-cart " aria-hidden="true"></i>
                    </button>
                     
                    </div>

                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                            <>{this.props.cart.map(x=>
                                <div className="dropdown-item is-size-7">
                                    <span> 
                                        <span className='has-text-primary-dark'>{x.name}</span>
                                        <span> {x.count}</span>   
                                        <span className='has-text-right'> {(x.price*x.count).toFixed(2)}</span></span> 
                                        
                                </div>    
                                
                                )}

                                <div className="dropdown-item">Total:</div>
                            </>
                    </div>
                    </div>
                </div>
                <span className='ml-3 mr-1'>{this.state.count}</span> 
                <span className='ml-4'>{this.props.auth.user.displayName}</span>
                <div className='navbar-item ml-2'>
                    <button className='button is-danger is-outlined' onClick={()=>this.props.loadSignOut()}>Sign Out</button>
                </div>
            </div >
            )
        }
    }
    render(){
       
        return(
            <div className='navbar is-dark' role="navigation" >

                {/* <div className='navbar-brand'><img src={require('../logos/logo_transparent.png')} alt='Flower store' width='10' height='10'/></div> */}
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
                            <div className='navbar-link' label="dropdown navigation">Flowers and Trees</div>
                                <div className='navbar-dropdown'>
                                    <ul>
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/seeds`)}}>Seeds</button>
                                    </li> 
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/bulbs`)}}>Bulbs</button>
                                    </li>
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/garden`)}}>Garden</button>
                                    </li> 
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/trees`)}}>Trees</button>
                                    </li>
                                
                                    </ul>
                                    
                                    
                                </div>
                        </div> 

                        <div className='navbar-item has-dropdown is-hoverable' aria-label="dropdown navigation">                   
                            <div className='navbar-link' label="dropdown navigation">Bouquest</div>
                                <div className='navbar-dropdown'>
                                <ul>
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/weddings`)}}>Weddings</button>
                                    </li> 
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/graduation`)}}>Graduation</button>
                                    </li>
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/newBaby`)}}>Newborn Bouquets</button>
                                    </li> 
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/anniversary`)}}>Anniversary</button>
                                    </li>
                                
                                    </ul>
                                </div>
                        </div>

                        <div className='navbar-item has-dropdown is-hoverable' aria-label="dropdown navigation">                   
                            <div className='navbar-link' label="dropdown navigation">Floral Supplies</div>
                                <div className='navbar-dropdown'>
                                <ul>
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/floralsupplies`)}}>Floral supplies</button>
                                    </li> 
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/instruments`)}}>Instruments</button>
                                    </li>
                                    <li> 
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/foams`)}}>Foams</button>
                                    </li> 
                                    <li>
                                        <button className='button is-white' onClick={()=>{this.props.history.push(`${this.props.match.url}products/prepMaterials`)}}>Materials</button>
                                    </li>
                                
                                    </ul>
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
         auth:state.auth,
         cart:state.cart.cart
     }
 }
 
 export default compose(withRouter, connect(mapStateToProps,null))(Navbar);