import * as React from 'react'
import {message,top} from "../src/messaageStyle";

interface style{
    [index:string]:string
}

interface State{}

interface Props{
    name?:string,
    message:string,
    createOn:any,
    isMine:boolean
}

class Chat extends React.Component<Props, State>{
    constructor(props) {
        super(props);
    }
    clear:style;
    name:style;
    othersMessage:style;
    marginMessage:style;
    topBackground:style;
    render(){
        if(this.props.isMine){
            this.clear = {
                clear:"right",
            }
            this.othersMessage = {
                float: "right",
            }
            this.marginMessage = {
                marginRight:"40px",
            }
            this.name = {
                marginRight:"100px",
                fontSize:"10pt",
                textAlign:"right"
            }
            this.topBackground = {
                backgroundColor:"#00ff7f"
            }
        }else{
            this.clear = {
                clear:"left"
            }
            this.othersMessage={
                float:"left"
            }
            this.marginMessage={
                marginLeft:"40px",
            }
            this.name = {
                marginLeft:"40px",
                fontSize:"10pt",
            }
            this.topBackground = {
                backgroundColor:"#f5f5f5"
            }
        }
        return(
            <div style={top}>
                <div>
                    <p style={this.name}>{this.props.name}</p>
                <div style={Object.assign(this.othersMessage,message,this.marginMessage,this.topBackground)}>
                    <p>{this.props.message}</p>
                </div>
                <div style={this.clear}></div>
                </div>
            </div>
        )
    }
}

export default Chat
