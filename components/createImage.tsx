import * as React from 'react';

interface Props {
    url: string,
    createOn: number,
    name: string,
    isMine: boolean;
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
    render() {
        if (!this.props.isMine) {
            this.divStyleMine = {
                textAlign: "left",
                marginLeft: "40px"
            }
            this.name = {
                fontSize: "10pt",
                marginLeft: "30px"
            }
        } else {
            this.divStyleMine = {
                textAlign: "right",
                marginRight:"40px"
            }
            this.name={
                display:"none"
            }
        }
        return (
            <div>
                <p style={this.name}>{this.props.name}</p>
                <div style={this.divStyleMine}>
                    <img src={this.props.url} style={this.image}/>
                </div>
            </div>
        )
    }
}

export default Image;
