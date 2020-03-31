import * as React from 'react'
import Chat from "../components/createChat";
import {firebase, firestore} from '../src/firebase';
import CreateMessage from '../components/createMessage';
import Dropzone from 'react-dropzone';
import {style} from "@material-ui/system";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages} from '@fortawesome/free-solid-svg-icons'
import FileInputComponent from 'react-file-input-previews-base64'
import {type} from "os";

interface State {
    input: string,
    name: string,
    file: any
}
interface Props{
    query:string
}
class Service extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            name: '',
            file: []
        }
        this.submit = this.submit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    handleStateChange(e, name) {
        let a = {}
        a[name] = e.target.value;
        this.setState(a);
    }

    submit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            firestore.collection('rooms').doc(this.props.query).collection("messages").add({
                message: this.state.input,
                name: firebase.auth().currentUser.displayName,
                creatOn: new Date(),
                icon: firebase.auth().currentUser.photoURL
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

    onSelect(files){
        const query = this.props.query;
        Object.keys(files).forEach(function (result) {
            const typeLength = files[result].type.length + 13;
            var time = new Date().getTime();
            var storageRef = firebase.storage().ref().child(time + "-image");
            storageRef.putString((files[result].base64.substring(typeLength)), "base64").then(async (result) => {
                var url = await result.ref.getDownloadURL();
                firestore.collection('rooms').doc(query).collection("messages").add({
                    name: firebase.auth().currentUser.displayName,
                    creatOn: new Date(),
                    image: url,
                    icon:firebase.auth().currentUser.photoURL
                }).then(function () {
                })
            })
        })
    }

    onDrop = (files) => {
        const query = this.props.query
        files.forEach(async function (result) {
            const date = new Date();
            const childName = date.getTime();
            const storageRef = firebase.storage().ref().child(childName + "-image");
            const reader = new FileReader();
            await reader.readAsDataURL(result);
            reader.onload = function (e) {
                if (typeof e.target.result === "string") {
                    storageRef.putString(e.target.result, 'data_url').then(async (result) =>  {
                        const url = await result.ref.getDownloadURL();
                        firestore.collection('rooms').doc(query).collection("messages").add({
                            name: firebase.auth().currentUser.displayName,
                            creatOn: new Date(),
                            image: url,
                            icon:firebase.auth().currentUser.photoURL
                        }).then(function () {
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
                    <div {...getRootProps()} className="wrapper">
                        <div className="container">
                            <CreateMessage query={this.props.query}/>
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
                            }

                            .input2 {
                                resize: none;
                                margin-top: auto;
                                text-align: center;
                                width: 100%;
                            }

                            .input1 {
                                background-color: black;
                            }

                            .file {
                                background-color: #c8c8c8;
                                width: 99%;
                                margin: auto;
                                padding-left: 20px;
                                box-sizing: border-box;
                            }

                            .clear {
                                clear: left;
                            }

                            a:link {
                                color: black
                            }

                            a:active {
                                color: red
                            }
                            .container{
                            margin-top:30px
                            }
                        `}
                        </style>
                        <div className="input2">
                            <div className="file"><FileInputComponent imagePreview={false} multiple={true}
                                                                      callbackFunction={(files) => {
                                                                          this.onSelect(files)
                                                                      }} accept="image/*" buttonComponent={<a
                                href="javascript:void(0)"><FontAwesomeIcon icon={faImages} size="lg" pull="left"
                                                                           onClick={() => console.log("clicked")}/></a>}
                                                                      labelText=""/>
                                <div className="clear"></div>
                            </div>
                            <textarea id="text-area" className="input" rows={5} value={this.state.input}
                                      onChange={(e) => {
                                          this.handleStateChange(e, "input")
                                      }} onKeyUp={this.submit}/>
                        </div>
                    </div>
                )}
            </Dropzone>
        )
    }
}

export default Service;
