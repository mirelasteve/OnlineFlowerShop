import React, {Component} from 'react';
import DirectoryMenu from '../directory/directory.component';


class Homepage extends Component { 
    constructor(props){
        super(props);
        this.state={}
    }
    
    render(){
        
        
        return(
            <React.Fragment>
                <DirectoryMenu></DirectoryMenu>
            
            </React.Fragment>
            
        )	} 
 } 
 export default Homepage;