import React from "react";

export default function PhotoItem (props) {

    const deleteItem = ()=> {
        props.changeItems(
            props.items.filter(element => element !== props.path)
        )
    }

    return <div className="photo-item"> 
                <button className="delete-btn" onClick={()=> deleteItem()} > X </button>
                <img src={props.path} alt="" className='img-item' />
           </div>
}