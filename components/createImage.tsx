import * as React from 'react';
import {top} from "../src/messaageStyle";
import MediaQuery from "react-responsive";

interface Props {
    url: string,
    createOn: number,
    name: string,
    isMine: boolean;
    icon?:string
}

interface State {

}

interface style {
    [index: string]: string
}

class Image extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    name: style;
    divStyleMine: style;
    image:style;
    icon:style;
    imagePhone:style;
    render() {
        if (!this.props.isMine) {
            this.divStyleMine = {
                textAlign: "left",
                marginLeft: "60px"
            }
            this.name = {
                fontSize: "10pt",
                marginLeft: "55px",
            }
            this.icon = {
                width:"50px",
                borderRadius:"50%",
                position:"relative",
                top:"55px",
                marginTop:"-55px"
            }
            this.image={
                minWidth:"100px",
                maxWidth:"300px",
            }
            this.imagePhone = {
                minWidth:"70px",
                maxWidth:"200px"
            }
        } else {
            this.divStyleMine = {
                textAlign: "right",
                marginRight: "40px",
            }
            this.name = {
                display: "none"
            }
            this.icon = {
                display:"none"
            }
            this.image={
                minWidth:"100px",
                maxWidth:"300px",
            }
        }
        let icon;
        if(this.props.icon){
            icon = this.props.icon
        }else{
            icon = "https://firebasestorage.googleapis.com/v0/b/chat-app-with-next.appspot.com/o/no_icon.png?alt=media&token=6c5f8b3f-8421-4719-aaa9-9ae92009397a";
        }
        return (
            <div style={top}>
                <img src={icon} style={this.icon}/>
                <p style={this.name}>{this.props.name}</p>
                <MediaQuery query="(min-width:401px)">
                <div style={this.divStyleMine}>
                    <img src={this.props.url} style={this.image}/>
                </div>
                </MediaQuery>
                <MediaQuery query="(max-width:400px)">
                    <div style={this.divStyleMine}>
                        <img src={this.props.url} style={this.imagePhone}/>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default Image;
