import React from 'react';
import './FaceRecognition.css'
const FaceRecognition=({ box,imageUrl })=>{//console.log(imageUrl);
	return(
     <div className='center'>
       <div className='mt2 absolute '>
        <img  id='imageid' alt='face here' src={imageUrl}
     width='500px' heigh='auto'
        />
        <div
         className='bounding-box'
         style={{
         	left:box.leftCol,
         	right:box.rightCol,
         	bottom:box.bottomRow,
         	top:box.topRow}}
         	>
        </div>
       </div>
     </div>
		);
}
export default FaceRecognition;