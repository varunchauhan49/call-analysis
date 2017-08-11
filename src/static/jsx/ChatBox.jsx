import React, { Component } from 'react';

class ChatBox extends Component {
  componentWillReceiveProps (nextProps) {
    var self = this;
    if (nextProps.scroll !== this.props.scroll) {
      if(nextProps.scroll){
        self.refs["babu" + nextProps.scroll].scrollIntoView();
      }
    }
  }

//   Convert sec's to Time
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

//   Render function will loop over all chats and create a chat box with these chats
  render() {
      var self = this;
      var chats = [];
      if(this.props.chat){
        chats = this.props.chat.map(function(item,index){
            if(item.speaker === "Rep"){
                return(
                <div key={index} className="direct-chat-msg" ref={"babu" + item.conv_no}>
                    <div className="direct-chat-text">
                        <span className="direct-chat-timestamp pull-right">{self.getTime(item.start_time)}</span>
                        <br />
                        {item.line}
                    </div>
                </div>
                )
            }
            else{
                return(
                <div key={index} className="direct-chat-msg right" ref={"babu" + item.conv_no}>
                    <div className="direct-chat-text">
                        <span className="direct-chat-timestamp pull-right">{self.getTime(item.start_time)}</span>
                        <br />
                        {item.line}
                    </div>
                </div>
                )
            }
        })
      }
    return (
      <div className="col-md-6 padding-0">
        <div className="box" style={{border: "1px solid #d2d6de",borderTop:"1px solid #d2d6de",
        height:"50vh",overflow:"scroll"}}>
            <div className="box-body">
                {chats}
            </div>
        </div>
        </div>
    );
  }
}

export default ChatBox;