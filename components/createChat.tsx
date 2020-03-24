import * as React from 'react'

interface style{
    [index:string]:string
}

interface State{}

interface Props{
    name:string,
    message:string
}

class Chat extends React.Component<Props, State>{
    message:style = {
        backgroundColor:"#f5f5f5",
        borderRadius:"50px",
        boxSizing:"border-box",
        paddingLeft:"20px",
        minHeight:"50px",
        marginLeft:"40px",
        maxWidth:"768px",
        paddingRight:"20px",
        float:"left",
        marginBottom:"20px"
    }
    top:style = {
        marginTop:"40px",
    }
    text:style = {
    }
    clear:style = {
        clear:"left"
    }
    name:style = {
        marginLeft:"40px",
        fontSize:"10pt"
    }
    render(){
        return(
            <div style={this.top}>
                <div>
                    <p style={this.name}>{this.props.name}</p>
                <div style={this.message}>
                    <p style={this.text}>{this.props.message}</p>
                </div>
                <div style={this.clear}></div>
                </div>
            </div>
        )
    }
}

export default Chat
