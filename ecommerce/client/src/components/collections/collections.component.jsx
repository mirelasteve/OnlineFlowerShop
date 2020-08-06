import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

class Collections extends Component { 
    constructor(props){
        super(props);
        this.state={
            products:this.props.products,
            productKeys:[],
            productValues:[]          
        }
    }

    componentDidUpdate(){
        if(this.props.products !== this.state.products){
            const productKeys =[];
            const productValues = [];
             this.props.products.map( x =>{
                const key = Object.keys(x);
                const value = Object.values(x);
                const entries = Object.entries(x)
                productKeys.push(key[0]);
                productValues.push(entries[0]);
             })
            
            this.setState({
                products:this.props.products,
                productKeys:productKeys,
                productValues:productValues
            })
        }
        
    }
    render(){
        
        return(
            <React.Fragment>
               
                {
                    this.state.productValues.map(([prKey,values]) =>
                    <div key = {prKey} className="columns is-multiline is-mobile mt-2 ml-3">
                    <div className="column is-12 has-text-success-dark mt-2 is-size-1 ml-3 is-capitalized" >
                        <Link to={this.props.match.url+''+prKey} >{prKey}</Link>
                    </div>
                    {values.filter( (pi,productIndex) => productIndex < 4).map( ({_id,name,img}) =>
                        <div key = {_id} className="column is-3 hover-hand" onClick={()=>this.props.history.push(`${this.props.match.url}/${prKey}/${_id}`)}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-1by1">
                                            <img src={img} alt={name}/>
                                    </figure>
                                </div>
                                
                                <div className='content'>
                                    {name}
                                </div>
                        </div> 
                    </div>    
                    )
                    
                    
                        }
                    </div> )
                   
                }
            </React.Fragment>
        )	} 
 } 

 const mapStateToProps = (state) => {
     
     return {
        products:state.products
     }
 }
 export default connect(mapStateToProps,null)(Collections);