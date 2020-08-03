import React, {Component} from 'react';
import SubMenu from './subMenu.component';

class DirectoryMenu extends Component { 
    constructor(props){
        super(props);
        this.state={
            items:[
                {
                    id:1,
                    name:'Seeds',
                    img:'https://cdn.pixabay.com/photo/2020/07/05/20/46/poppy-5374557_1280.jpg',
                    link:'/seeds'
                },
                {
                    id:2,
                    name:'Flowers',
                    img:'https://cdn.pixabay.com/photo/2016/08/15/14/38/lavender-field-1595598_1280.jpg',
                    link:'/flowers'
                },
                {
                    id:3,
                    name:'Trees',
                    img:'https://cdn.pixabay.com/photo/2015/06/28/15/53/apricots-824626_1280.jpg',
                    link:'/trees'
                },
                {
                    id:4,
                    name:'Bouquets',
                    img:'https://cdn.pixabay.com/photo/2019/01/28/12/02/bridal-bouquet-3960220_1280.jpg',
                    link:'/bouquets'
                },
                {
                    id:5,
                    name:'Floral supplies',
                    img:'https://media.istockphoto.com/photos/landscaping-tools-with-room-for-copy-picture-id502377899?b=1&k=6&m=502377899&s=170667a&w=0&h=6enMP-5HK1t8wf4W5CWRX7yIz1XKlCLopdOLkDs520Y=',
                    link:'/floralsupplies'
                }
                
            ]
        }
    }
    render(){
        return(<React.Fragment>
            <div className='columns is-multiline '>
                {this.state.items.map( ({id,...rest})=>{
                    return (
                        <div key={id}  className='column is-4'>
                            <SubMenu  id={id} {...rest}></SubMenu>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>)	} 
 } 
 export default DirectoryMenu;