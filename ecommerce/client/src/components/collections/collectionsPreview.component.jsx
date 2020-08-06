import React, { useState, useEffect } from 'react';
import {withRouter, useParams} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loadStateProductCollection}  from '../../redux/actions/products/products.actions';

const CollectionsPreview = ({products,history,match}) => { 
  
    const [collection, setCollection] = useState([]);

    const [loader,setLoader] = useState(false);

    const [isVisibleArr,setVisibility] = useState([]);

    const {collectionName} = useParams();

    useEffect(() => {
      
        const loadState = async () => {
          try {
              setLoader(true)
                await loadStateProductCollection();
                let setProduct = [];
                products.map(x=>{
                  const {[collectionName]: value} = x;
                  if(value){
                    setProduct = value
                  }
                })
                setCollection(setProduct);
                setVisibility(Array.from({length:collection.length}).fill(' is-hidden'))
                setLoader(false)
          } catch (e) {
           
            setCollection([])
          }
        };
        loadState();
      },[collectionName,products]);
     
    
      const setVisibilityToElement = (ind) => {
        let newIsVisibleArr = [...isVisibleArr];
        newIsVisibleArr[ind] = ''
        setVisibility(newIsVisibleArr)
      }

      const setInvisibilityToElement = (ind) => {
        let newIsVisibleArr = [...isVisibleArr];
        newIsVisibleArr[ind] = ' is-hidden'
        setVisibility(newIsVisibleArr)
      }
      
        return(
            <div>
                {loader 
                ? <div>Loading ...</div>
                : <div className='columns is-multiline mt-2'>
                    {collection.map( ({_id,name,price,img,description},ind) =>
                         <div key={_id} className='column  is-size-4 is-3 has-text-info-dark is-italic' >{name}
                                    <div  className='is-3' onClick={()=>history.push(`${match.url}/${_id}`)}>
                                    
                                        <div  className='card' onMouseEnter={()=>setVisibilityToElement(ind)} onMouseLeave={()=>setInvisibilityToElement(ind)}>
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img src={img} alt={name}/>
                                                    
                                                </figure>
                                            </div>
                                           
                                           <div className={'content is-size-7 has-text-centered'+isVisibleArr[ind]}>
                                               {description}
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
  connect(mapStateToProps,{loadStateProductCollection})
)(CollectionsPreview);