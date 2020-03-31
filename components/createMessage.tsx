import * as React from 'react';
import {firebase, firestore} from '../src/firebase';
import Chat from '../components/createChat';
import App from "next/app";
import Image from '../components/createImage'

class CreateMessage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = ({
            rows: []
        })
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let check = false;
        let query = this.props.query
        firestore.collection('rooms').doc(this.props.query).collection("roomInfo").doc("roomInfo").get().then((doc) => {
            doc.data().allowedMember.forEach(function (one) {
                if (one == firebase.auth().currentUser.uid) {
                    check = true;
                }
            })
            if (check) {
                firestore.collection('rooms').doc(query).collection("messages").onSnapshot((newchat) => {
                    firebase.auth().onAuthStateChanged((user) => {
                        let rows = this.state.rows;
                        newchat.docChanges().forEach(async (result) => {
                            const docData = result.doc.data();
                            if (docData.creatOn) {
                                if (!docData.image) {
                                    if (user.displayName == docData.name) {
                                        rows.push(<Chat message={docData.message} createOn={docData.creatOn}
                                                        isMine={true} key={docData.creatOn.nanoseconds.toString()}
                                                        icon={docData.icon}/>)
                                    } else {
                                        rows.push(<Chat message={docData.message} name={docData.name}
                                                        createOn={docData.creatOn}
                                                        isMine={false} key={docData.creatOn.nanoseconds.toString()}
                                                        icon={docData.icon}/>)
                                    }
                                } else {
                                    rows.push(<Image url={docData.image} createOn={docData.creatOn} name={docData.name}
                                                     isMine={docData.name == firebase.auth().currentUser.displayName}
                                                     key={docData.creatOn.nanoseconds.toString()}
                                                     icon={docData.icon}/>);
                                }
                            }
                            rows.sort(function (a, b): number {
                                return a.props.createOn.seconds > b.props.createOn.seconds ? 1 : -1
                            })
                        });
                        this.setState({
                            rows: rows
                        });
                        var elementHtml = document.documentElement;
                        var bottom = elementHtml.scrollHeight - elementHtml.clientHeight;
                        window.scroll(0, bottom);
                    })
                })
            } else {
                document.write("");
                location.assign('/lobby');
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.rows}
            </div>
        )
    }
}

export default CreateMessage;
