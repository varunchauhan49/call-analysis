import React, { Component } from 'react';
import CallStats from './CallStats.jsx';
import ChatBox from './ChatBox.jsx';
import WaveSurfer from 'wavesurfer.js';
import request from "superagent";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';

class MainContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.wavesurfer;
    this.currentTime;
    this.state = {
      action:"fa fa-play",
      duration:"",
      chatData:"",
      chat:"",
      scroll:"",
      timer:"00:00:00",
      value:""
    };
  }
  getTime = (duration) =>{
    duration = Number(duration);
    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration % 3600 / 60);
    var s = Math.floor(duration % 3600 % 60);
    var hh = (h === 0)?"00":h;
    var mm = (m === 0)?"00":m;
    var ss = (s === 0)?"00":s;
    return hh + ":" + mm + ":" + ss; 
  }
  //  componentDidMount Will be called only once when component is loaded.
  componentDidMount = () =>{
    var self = this;
    this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple'
    });
    this.wavesurfer.load('http://localhost:8000/api/audio');
    // this.wavesurfer.loadBlob("../media/videoplayback.mp3");
    this.wavesurfer.on('ready', function () {
        self.setState({duration:self.wavesurfer.getDuration()})
    });
    this.wavesurfer.on('audioprocess', function () {
      self.setState({timer:self.getTime(self.wavesurfer.getCurrentTime())})
    });    
    this.wavesurfer.on('seek', function (event) {
        let curTime = parseInt(self.wavesurfer.getCurrentTime());
        let seekDiv;
        self.state.chat.forEach(function(item){
          if(item.start_time < curTime && item.end_time > curTime){
            seekDiv = item.conv_no;
          }
        })
        self.setState({scroll:seekDiv});
    });
    request.get('http://demo5670791.mockable.io/transcript')
      .end(function (err, res) {
      if (err) {
          console.log(err);
          return;
      }
      var data = JSON.parse(res.text);
      self.setState({chat:data,chatData:data});
    });
  }
  //  Function to Pause or Play Audio File.
  pausePlay = () =>{
    //  Looking for current action
    if(this.state.action === "fa fa-pause"){
      this.wavesurfer.pause();
      this.setState({action:"fa fa-play"});
    }
    else{
      this.wavesurfer.play();
      this.setState({action:"fa fa-pause"});
    }
  }
  // Function to move forward on audio track by 15 secs.
  handleForward = () =>{
    this.wavesurfer.skipForward(15);
  }
  // Function to move back on audio track by 15 secs.
  handleBack = () =>{
    this.wavesurfer.skipBackward(15);
  }
  handleChange = (e) =>{
    if(e.target.value === ""){
      this.setState({value:e.target.value,chatData:this.state.chat});
    }
    else{
      var chatNew=[]
      this.state.chat.forEach(function(item){
        if(item.line.toString().toLowerCase().indexOf(e.target.value.toString().toLowerCase())!==-1){
          chatNew.push(item);
        }
      })
      this.setState({value:e.target.value,chatData:chatNew});
    }
  }
  render() {
    return (
      <div className="content-wrapper" style={{height: "100%",minHeight: "100%",background:"white"}}>
        <section className="content-header">
          <h1>
            CALLS
          </h1>
        </section>
        <section className="content container-fluid">
          <CallStats />
          <div className="callAnalysis">

            <div className="player" style={{margin:" 0 auto",width: "70%"}}>
              <div className="start_time">
                {this.state.timer}
              </div>
              <div id="waveform" style={{margin:" 0 auto",width: "58%"}}>
              </div>
              <div className="end_time" style={{display:"inline-block"}}>
                {this.getTime(this.state.duration)}
              </div>
            </div>
            <div className="control" style={{margin:" 0 auto",width: "10%"}}>
               <div className="back" onClick={this.handleBack.bind(this)} style={{display: "inline-block"}}>
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
              <div className="play" onClick={this.pausePlay.bind(this)}
                style={{display: "inline-block",marginLeft:"10px",marginRight:"10px"}}>
                <i className={this.state.action} aria-hidden="true"></i>
              </div>
              <div className="back" onClick={this.handleForward.bind(this)} style={{display: "inline-block"}}>
                <i className="fa fa-repeat" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className = "row row-centered" style={{padding:"30px 15px 15px 10%"}}>
            <div className = "col-md-5 col-sm-6 col-xs-12 col-centered padding-0">
              <div className="box" style={{border: "1px solid #d2d6de",
              borderTop:"1px solid #d2d6de",height:"50vh"}}>
                  <div className="box-body">
                    <div className="inner-addon right-addon">
                      <i className="glyphicon glyphicon-search"></i>
                      <input type="text" className="form-control" placeholder="Search in this call"
                       value={this.state.value} onInput={this.handleChange.bind(this)} />
                    </div>
                  </div>
              </div>
            </div>
            <ChatBox scroll={this.state.scroll} chat={this.state.chatData} />
          </div>
        </section>
      </div>
    );
  }
}

export default MainContent;