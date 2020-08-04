import React, { useState, useEffect } from 'react';
import {withRouter, useParams} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import loadStateProduct from '../../redux/actions/products/products.actions';

const CollectionsPreview = (props,history,match) => { 
    const [collection, setCollection] = useState([]);

    const [loader,setLoader] = useState(false);
    
    const {collectionName} = useParams();
    
    useEffect(() => {
        const loadState = async () => {
          try {
              setLoader(true)
                await loadStateProduct();
                
                setCollection(props.products[collectionName])
                setLoader(false)
          } catch (e) {
           
            setCollection([])
          }
        };
        loadState();
      },[] );
     
    
      
        return(
            <div>
                {loader 
                ? <div>Loading ...</div>
                : <div className='columns is-multiline'>
                    {collection.map( ({_id,name,price,img}) =>
                         <div key={_id} className='column  is-size-4 is-3 has-text-info-dark is-italic'>{name}
                                    <div  className='is-3' onClick={()=>history.push(`${match.url}/${_id}`)}>
                                        <div  className='card'>
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img src={img} alt={name}/>
                                                </figure>
                                            </div>
                                            <div className='card-footer'>
                                                <div className='card-footer-item is-size-6 is-italic'>$ {price}</div>
                                            </div>
                                        </div>
                            </div>
                        </div>)}
                    </div>
                        }
            </div>
            
            )
            
        
        
 } 

 function mapStateToProps(state){
     return {
         products:state.products
     }
 }

 export default compose(
  withRouter,
  connect(mapStateToProps,{loadStateProduct})
)(CollectionsPreview);