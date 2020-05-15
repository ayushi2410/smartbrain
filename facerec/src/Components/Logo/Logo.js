import React from'react';
import brain from './brain.png'
import Tilt from 'react-tilt';

const Logo=()=>{
	return(
 <div class='ma4 mt0'>
<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner"> <img alt='brain'src={brain}/> </div>
</Tilt>
</div>
);
}
export default Logo;