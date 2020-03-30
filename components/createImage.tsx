import * as React from 'react';

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
    image:style={
        minWidth:"100px",
        maxWidth:"300px"
    }
    icon:style
    render() {
        if (!this.props.isMine) {
            this.divStyleMine = {
                textAlign: "left",
                marginLeft: "60px"
            }
            this.name = {
                fontSize: "10pt",
                marginLeft: "55px"
            }
            this.icon = {
                width:"50px",
                borderRadius:"50%",
                position:"relative",
                top:"70px"
            }
        } else {
            this.divStyleMine = {
                textAlign: "right",
                marginRight: "40px"
            }
            this.name = {
                display: "none"
            }
            this.icon = {
                display:"none"
            }
        }
        return (
            <div>
                <img src={this.props.icon ? this.props.icon : "https://firebasestorage.googleapis.com/v0/b/chat-app-with-next.appspot.com/o/no_icon.png?alt=media&token=6c5f8b3f-8421-4719-aaa9-9ae92009397a"} style={this.icon}/>
                <p style={this.name}>{this.props.name}</p>
                <div style={this.divStyleMine}>
                    <img src={this.props.url} style={this.image}/>
                </div>
            </div>
        )
    }
}

export default Image;
