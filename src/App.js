import React, { Component } from 'react';
import Sidebar from './static/jsx/Sidebar.jsx';
import MainContent from './static/jsx/MainContent.jsx'
import Header from './static/jsx/Header.jsx'
import './static/css/content.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mounted: null,
      sidebar: "skin-blue sidebar-mini sidebar-collapse"
    };
  }
  handlClickEvent = () =>{
    if(this.state.sidebar === "skin-blue sidebar-mini sidebar-collapse"){
      this.setState({sidebar:"skin-blue sidebar-mini"});
    }
    else{
      this.setState({sidebar:"skin-blue sidebar-mini sidebar-collapse"});
    }
  }
  handleSideBarOpen = () =>{
    this.setState({sidebar:"skin-blue sidebar-mini"});
  }
  handleSidebarClollapse = () =>{
    this.setState({sidebar:"skin-blue sidebar-mini sidebar-collapse"})
  }
  render() {
    return (
      <div className={this.state.sidebar} style={{height: "100%",minHeight: "100%"}}>
        <div className="wrapper" style={{height: "100%",minHeight: "100%"}}>
          <Header onClick={this.handlClickEvent} />
          <Sidebar onMouseOver={this.handleSideBarOpen} onMouseOut={this.handleSidebarClollapse} />
          <MainContent />
          <footer className="main-footer">        
            All rights
            reserved.
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
