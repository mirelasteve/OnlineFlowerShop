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
                    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT32K2UAbrN2jbiNwo8ImvCQ2o0h9F2Gxc5Jw&usqp=CAU',
                    link:'seeds'
                },
                {
                    id:2,
                    name:'Flowers',
                    img:'https://res.cloudinary.com/bloomnation/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1437137482/vendor/1836/catalog/product/2/0/20130810115635_e66a2745c3258b5cc49b2a6c155385c0.jpg',
                    link:'/flowers'
                },
                {
                    id:3,
                    name:'Trees',
                    img:'https://www.provenwinners.com/sites/provenwinners.com/files/imagecache/500x500/ifa_upload/juniperus_gin_fizz_4.jpg',
                    link:'/trees'
                },
                {
                    id:4,
                    name:'Bouquets',
                    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-Yzd9HnsYUqNiHsMpsAtkdvlW7P0ZHJWgAw&usqp=CAU',
                    link:'/bouquets'
                },
                {
                    id:5,
                    name:'Floral supplies',
                    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPGsK-n8AMJkfZ0FHLVvRsYCSz74N0enSOqw&usqp=CAU',
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