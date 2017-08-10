import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <a className="logo">
            <span className="logo-mini"><i className="fa fa-circle-o" aria-hidden="true"></i></span>
            <span className="logo-lg"><b>Observe</b>AI</span>
        </a>
        <nav className="navbar navbar-static-top">
        <a href="#" className="sidebar-toggle" onClick={this.props.onClick} role="button">
            <span className="sr-only">Toggle navigation</span>
        </a>
        </nav>
    </header>
    );
  }
}

export default Header;