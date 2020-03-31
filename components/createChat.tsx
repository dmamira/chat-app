import * as React from 'react'
import {message, top} from "../src/messaageStyle";
import MediaQuery from "react-responsive";

interface style {
    [index: string]: string
}

interface State {
}

interface Props {
    name?: string,
    message: string,
    createOn: any,
    isMine: boolean,
    icon?: string
}

class Chat extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    clear: style;
    name: style;
    othersMessage: style;
    marginMessage: style;
    topBackground: style;
    icon: style
    pcMessage: style = {
        maxWidth: "768px"
    }
    phoneMessage: style = {
        maxWidth: "200px"
    }

    render() {
        if (this.props.isMine) {
            this.clear = {
                clear: "right",
            }
            this.othersMessage = {
                float: "right",
            }
            this.marginMessage = {
                marginRight: "40px",
            }
            this.name = {
                marginRight: "100px",
                fontSize: "10pt",
                textAlign: "right"
            }
            this.topBackground = {
                backgroundColor: "#00ff7f"
            }
            this.icon = {
                display: "none"
            }
        } else {
            this.clear = {
                clear: "left"
            }
            this.othersMessage = {
                float: "left"
            }
            this.marginMessage = {
                marginLeft: "50px",
            }
            this.name = {
                marginLeft: "55px",
                fontSize: "10pt",
            }
            this.topBackground = {
                backgroundColor: "#f5f5f5"
            }
            this.icon = {
                width: "50px",
                borderRadius: "50%",
                position: "relative",
                top: "55px",
                marginTop: "-55px"
            }
        }
        let icon;
        if (this.props.icon) {
            icon = this.props.icon
        } else {
            icon = "https://firebasestorage.googleapis.com/v0/b/chat-app-with-next.appspot.com/o/no_icon.png?alt=media&token=6c5f8b3f-8421-4719-aaa9-9ae92009397a";
        }
        return (
            <div style={top}>
                <div>
                    <img src={icon} style={this.icon}/>
                    <p style={this.name}>{this.props.name}</p>
                        <div
                            style={Object.assign(this.othersMessage, message, this.marginMessage, this.topBackground, this.pcMessage)}>
                            <p>{this.props.message}</p>
                        </div>
                        <div style={this.clear}></div>
                </div>
            </div>
        )
    }
}

export default Chat
