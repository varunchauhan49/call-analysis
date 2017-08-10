import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <aside className = "main-sidebar" style={{height: "100%",minHeight: "100%"}}
      onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
        <section className = "sidebar">
          <ul className = "sidebar-menu tree" data-widget="tree">
            <li><a href="#"><i className = "fa fa-bar-chart"></i> <span>INSIGHTS</span></a></li>
            <li className = "active"><a href="#"><i className = "fa fa-phone"></i> <span>CALLS</span></a></li>
            <li><a href="#"><i className = "fa fa-university"></i> <span>ACADEMY</span></a></li>
            <li><a href="#"><i className = "fa fa-user-o"></i> <span>ACCOUNT</span></a></li>
          </ul>
        </section>
      </aside>
    );
  }
}

export default Sidebar;