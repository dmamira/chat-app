import * as React from 'react'
import Chat from "../components/createChat";
import {firebase,db,firestore} from '../src/firebase';

interface State{
    input:string,
    name:string
}

class Service extends React.Component<void,State> {
    constructor(props) {
        super(props);
        this.state={
            input:'',
            name:''
        }
        this.submit = this.submit.bind(this);
    }
    handleStateChange(e,name){
        let a = {}
        a[name] = e.target.value;
        this.setState(a);
    }
    submit(e){
        if(e.keyCode === 13){
            e.preventDefault();
            firestore.collection('room1').add({message:this.state.input,name:this.state.name,creatOn:new Date()}).then(() => {
                this.setState({
                    input: ''
                })
            }).catch(function(){
                alert("何らかのエラーが発生しました。")
            })
        }
    }
    render() {
        return (
            <div className="wrapper">
                <Chat name="Name goes here" message="Text Goes Here"/>
                <textarea className="input" rows={5} value={this.state.input} onChange={(e) => {this.handleStateChange(e,"input")}} onKeyUp={this.submit}/>
                {/*language=CSS*/}
                <style>{`
                    body {
                        margin: 0;
                    }
                    html{
                    margin:0;
                    }
                `}</style>
                {/*language=CSS*/}
                <style jsx>{`
                    .wrapper {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                    .input{
                    resize: none;
                    width:99%;
                    margin-top:auto;
                    margin-right:auto;
                    margin-left:auto;
                    }
                `}
                </style>
            </div>
        )
    }
}

export default Service;
