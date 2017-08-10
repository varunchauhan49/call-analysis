import React, { Component } from 'react';
import request from "superagent";

class CallStats extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      stats:""
    };
  }
  componentDidMount = () =>{
    var self = this;
    request.get('http://demo5670791.mockable.io/stats')
      .end(function (err, res) {
      if (err) {
          console.log(err);
          return;
      }
      var data = JSON.parse(res.text);
      self.setState({stats:data});
    });
  }
  render() {
    return (
      <div className = "row row-centered" style={{width:"100%",paddingLeft:"10%",paddingRight:"15px"}}>
        <div className = "col-md-2 col-sm-6 col-xs-12 col-centered padding-0 col">
            <div className = "info-box" style={{backgroundColor:"#f5f5f5"}}>
            <div className = "info-box-content" style={{textAlign:"center","marginLeft":"0px"}}>
                <span className = "info-box-text-meeting">Demo Meeting</span>
                <span className = "info-box-data">July,2017 | 2184</span>
            </div>
            </div>
        </div>
        <div className = "col-md-2 col-sm-6 col-xs-12 col-centered padding-0 col">
            <div className = "info-box" style={{backgroundColor:"#f5f5f5"}}>
            <span className = "info-box-icon" style={{width:"60px",backgroundColor:"#f5f5f5"}}>
                <img src="https://lh3.googleusercontent.com/kKTOf-IO2lrVM0coLOw7fitvlS2vfeE9DEfgnrTYJMtee84zr7Wh5G3EXRShL4jfn4n0CUfwLJcU7uDotg=w5760-h3600-rw-no"
                style={{width:"50px",marginBottom:"30px"}} className="img-circle" alt="User Image" />
            </span>

            <div className="info-box-image-text">
                <span className="info-box-text-meeting">Demo Representative</span>
                <span className="info-box-data">Sales Repo</span>
            </div>
            </div>
        </div>
        <div className = "col-md-2 col-sm-6 col-xs-12 col-centered padding-0 col">
            <div className = "info-box" style={{backgroundColor:"#f5f5f5"}}>
            <span className = "info-box-icon" style={{backgroundColor:"#f5f5f5"}}>
                {(this.state.stats)?this.state.stats.talk_listen:false}
            </span>
            <div className = "info-box-content">
                <span className = "info-box-number">Talk to Listen Ratio</span>
            </div>
            </div>
        </div>
        <div className = "col-md-2 col-sm-6 col-xs-12 col-centered padding-0 col">
            <div className = "info-box" style={{backgroundColor:"#f5f5f5"}}>
            <span className = "info-box-icon" style={{backgroundColor:"#f5f5f5"}}>
                 {(this.state.stats)?this.state.stats.works_per_minute:false}
            </span>
            <div className = "info-box-content">
                <span className = "info-box-number">Works per minute</span>
            </div>
            </div>
        </div>
        <div className = "col-md-2 col-sm-6 col-xs-12 col-centered padding-0 col">
            <div className = "info-box" style={{backgroundColor:"#f5f5f5"}}>
            <span className = "info-box-icon" style={{backgroundColor:"#f5f5f5"}}>
                 {(this.state.stats)?this.state.stats.words_per_sentence:false}
            </span>
            <div className = "info-box-content">
                <span className = "info-box-number">Words per sentence</span>
            </div>
            </div>
        </div>
        </div>
    );
  }
}

export default CallStats;