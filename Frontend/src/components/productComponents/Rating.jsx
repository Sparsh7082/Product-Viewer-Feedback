import React from 'react'


export default function Rating({rating}) {
   const backgroundColor = (rating) => {
       if(rating<3){
           return '#f44336'
       } else if(rating<4){
           return 'orange'
       } else{
           return '#8fce00'
       }
   }
 return (
   <p className='rating' style={{backgroundColor:backgroundColor(rating)}}>Rating: {rating}</p>
 )
}