import React, {Component} from 'react';
import FLOWER_DATA from '../flowers/flowers.data';
import CollectionsPreview from './collectionsPrevies.component';

class Collections extends Component { 
    constructor(props){
        super(props);
        this.state={
            collections:FLOWER_DATA
        }
    }
    render(){
        const {collections} = this.state;
        return(
            <React.Fragment>
                {collections.map( ({id,...rest})=>
                    <CollectionsPreview key={id} {...rest}></CollectionsPreview>
            )}
            </React.Fragment>
        )	} 
 } 
 export default Collections;