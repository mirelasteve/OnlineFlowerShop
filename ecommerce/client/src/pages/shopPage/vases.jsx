import React, {useState} from 'react';

const Vases = () => {
    const [item,setItem] = useState(['Vases'])

    return(
        <div>
            <h2>{item}</h2>
            <input type='text'/>
            <button onClick={()=>setItem('Oranges')}>Change</button>
        </div>
    )

}
export default Vases
