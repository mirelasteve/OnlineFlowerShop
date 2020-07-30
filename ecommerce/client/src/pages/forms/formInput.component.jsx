import React, {Component} from 'react';


class FormInput extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }
    handleInput(e){
        const {value,name} = e.target;
        this.setState({
            [name]:value
        })
    }
    render(){
        console.log(this.state);
        
        return(
            <div className='columns mt-3 is-grouped'>
            <div className='column is-half is-offset-one-quarter '>
            <div className='field ml-6'>
                <label className='label'>Email</label>
                <div className='control'>
                    <input className='input' onInput={(e)=>this.handleInput(e)} type='email'  name='email' required/>
                </div>
                <label className='label'>Password</label>
                <div className='control'>
                    <input className='input' onInput={(e)=>this.handleInput(e)} type='password'  name='password' />
                </div>
            </div>
            </div>
            {/* <button className='button' onClick={()=>SignInWithGoogle()}>Google</button> */}
            </div>
        )
    }
}
export default  FormInput