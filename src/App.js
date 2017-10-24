import React, { Component } from 'react';
import './App.css';
// import 'whatwg-fetch';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 

  performSearch = (query = 'cats') => {
    axios
      .get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
      .then(response => { 
        this.setState({
          loading: false,
          gifs: response.data.data
        });
      }) 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  
  componentDidMount() {
    this.performSearch();
  }  

  // THIS EXAMPLE USES fetch()  
  // componentDidMount() {
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({gifs: responseData.data});  
  //     }) 
  //     .catch((error) => { // offline, for example
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }
  
  render() {      
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">    
          { 
            (this.state.loading)
              ? <div>Loading...</div> 
              : <GifList data={this.state.gifs} /> 
          }
        </div>
      </div>
    );
  }
}
