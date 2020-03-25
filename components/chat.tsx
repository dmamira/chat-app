import * as React from 'react'
import Chat from "../components/createChat";
import {firebase, firestore} from '../src/firebase';
import CreateMessage from '../components/createMessage';
import Dropzone from 'react-dropzone';
import {style} from "@material-ui/system";

interface State {
    input: string,
    name: string,
    file: any
}

class Service extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            name: '',
            file: []
        }
        this.submit = this.submit.bind(this);
    }

    handleStateChange(e, name) {
        let a = {}
        a[name] = e.target.value;
        this.setState(a);
    }

    submit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            firestore.collection('room1').add({
                message: this.state.input,
                name: firebase.auth().currentUser.displayName,
                creatOn: new Date()
            }).then(() => {
                this.setState({
                    input: ''
                })
                var elementHtml = document.documentElement;
                var bottom = elementHtml.scrollHeight - elementHtml.clientHeight;
                window.scroll(0, bottom);
            }).catch(function () {
                alert("何らかのエラーが発生しました。")
            })
        }
    }

    onDrop = (files) => {
        files.forEach(async function (result) {
            var date = new Date();
            var childName = date.getTime();
            var storageRef = firebase.storage().ref().child(childName + "-image");
            var encoded;
            var reader = new FileReader();
            await reader.readAsDataURL(result);
            reader.onload = function (e) {
                if (typeof e.target.result === "string") {
                    storageRef.putString(e.target.result, 'data_url').then(function (result) {
                        firestore.collection('room1').add({
                            name: firebase.auth().currentUser.displayName,
                            creatOn: new Date(),
                            image: childName + "-image"
                        }).then(function () {
                            console.log("success")
                        })
                    })
                }
            }
        })
    };
    render() {
        return (
            <Dropzone onDrop={this.onDrop}>
                {({getRootProps, isDragActive}) => (
                    <div {...getRootProps({className: 'input1'})} className="wrapper">
                        <div className="container">
                            <CreateMessage chatData={this.props.onedata}/>
                        </div>
                        <style>{`
                    body {
                        margin: 0;
                    }

                    html {
                        margin: 0;
                    }
                `}</style>
                        {/*language=CSS*/}
                        <style jsx>{`
                            .wrapper {
                                display: flex;
                                flex-direction: column;
                                min-height: 100vh;
                            }
                            .input {
                                resize: none;
                                width: 99%;
                                margin-top: auto;
                                margin-right: auto;
                                margin-left: auto;
                            }
                            .container {
                                margin-top: 20px;
                            }
                            .input1{
                            background-color:black;
                            }
                        `}
                        </style>
                        <textarea id="text-area" className="input" rows={5} value={this.state.input} onChange={(e) => {
                            this.handleStateChange(e, "input")
                        }} onKeyUp={this.submit}/>
                    </div>
                )}
            </Dropzone>
        )
    }
}

export default Service;
