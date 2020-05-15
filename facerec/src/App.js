import React, {Component} from 'react';
import Navigation from'./Components/Navigation/Navigation'
import Logo from'./Components/Logo/Logo'
import './App.css';
import Particles from 'react-particles-js';
import ImageLinkForm from'./Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from'./Components/FaceRecognition/FaceRecognition'
import Signin from'./Components/Signin/Signin'
import Register from'./Components/Register/Register'
import Rank from'./Components/Rank/Rank'
import Clarifai from 'clarifai'
const app = new Clarifai.App({
 apiKey: '378948c56c1a4e3296d3752d90c8da6b'
});
const particleOptions={
                 particles:{
                  number:{
                    value:20,
                    density:{
                      enable:true,
                      value_area:80
                    }}
                 }
                  
                }
class App extends Component {
  constructor(){
    super();
    this.state={
      input:' ',
     imageUrl:'',
     box:{},
     route:'register',
     isSignedIn:false,
     user:{
           email:'',
           name:'',
           id:'',
           entries:0,
           password:'' 
     }
    }
  }
  loadUser=(data)=>{
    this.setState({user:{
          email:data.email,
           name:data.name,
           id:data.id,
           entries:data.entries,
           password:data.password }
    })
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
   // console.log(event.target.value);
 }
  
  calculateFaceLocation=(data)=>{
const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
const image=document.getElementById('imageid');
const height=Number(image.height);
const width=Number(image.width);//console.log(clarifaiFace.left_col * width);
return {
leftCol: (clarifaiFace.left_col * width),
topRow: clarifaiFace.top_row*height,
rightCol: width-(clarifaiFace.right_col * width),
bottomRow: height-(clarifaiFace.bottom_row*height)
}
  }
  displayFaceBox=(box)=>{
   console.log(box);
    this.setState({box:box});
  }
    onButtonSubmit=()=>{
    console.log('click');
    this.setState({imageUrl : this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response=>{
      if(response){
        fetch('http://localhost:8008/image',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
        id:this.state.user.id
                            })
}).
        then(response=>response.json()).
        then(count=>{
        this.setState( Object.assign(this.state.user,{ entries:count }))
         })
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err=>console.log(err))
    
                     }


 onRouteChange=(route)=>{
  if(route==='signout')
    this.setState({isSignedIn:false})
  else if (route==='home')
    this.setState({isSignedIn:true})
      this.setState({ route: route});
                     }
   
componentDidMount(){
  fetch('http://localhost:8008').
  then(response=>response.json()).
  then(data=>console.log(data))
}


  render(){
    const {isSignedIn,imageUrl,box,route}=this.state;
return(
<div className="App">
                <Particles className='particles' 
                params={particleOptions} />
               
               <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
               {route==='home'
                ?
                <div>
                
                 <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
               <ImageLinkForm onInputChange={this.onInputChange}
                             onButtonSubmit={this.onButtonSubmit}
               />
              <FaceRecognition 
              box={box}
              imageUrl={imageUrl} />  
              </div> :
              (route==='signin'
              ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                ) }    
</div>
  );
  }
}

export default App;
