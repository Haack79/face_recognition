import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import 'tachyons'; // tachyons is a styling package. 

const app = new Clarifai.App({
  apiKey: '66c3455646a945e9ab384aac5293af1a'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  // }
  calculateFaceLocation = (data) => {
    // this.setState({input: event.target.value}); 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // create element in facerecognition.js
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // here is where you return what will fill the box state object. 
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // this needs the above returned object from calculateFaceLocation. 
  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    // console.log(event.target.value); 
    this.setState({input: event.target.value}); 
  }
  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // this calculateFaceLocation takes response and returns an object and then that object
    // goes into displayFaceBox as it's new state. wow weeeee 
    // i am going to make response return caclulateFaceLcoation with a response
    //  and feed to displayfacebox that object that is returned. 
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      // do something with response
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } 
    this.setState({ route: route });
  }
  render() {
    // later destructur to get rid of this.state below
    // const { issignedIn, imageUrl, route, box } = this.state; 
    // then below you can get rid of this.state 
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} 
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            : (
              this.state.route === 'signin' 
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
      );
  }
}

export default App;
