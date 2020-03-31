import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from '@material-ui/core/TextField';
import DialogActions from "@material-ui/core/DialogActions";
import {firebase, firestore} from "../src/firebase";
import {sha256, sha224} from 'js-sha256';

interface Props {
}

interface State {
    existingRoomDialogOpen: boolean,
    existingRoomId: string,
    existingPassword: string,
    NewRoomDialogOpen: boolean,
    newRoomID: string,
    newDescription: string,
    newRoomName: string,
    newPassword: string
}

class Lobby extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            existingRoomDialogOpen: false,
            NewRoomDialogOpen: false,
            existingRoomId: '',
            existingPassword: '',
            newRoomID: null,
            newDescription: '',
            newRoomName: '',
            newPassword: ''
        }
    }

    handleOpenOrClose(value) {
        this.setState({
            existingRoomDialogOpen: value
        })
    }

    handleOpenOrCloseForNewRoom(value: boolean) {
        this.setState({
            NewRoomDialogOpen: value
        })
    }

    handleChangeExistingStuff(stuff, e) {
        const temp = {}
        temp[stuff] = e.target.value;
        this.setState(temp);
    }

    handleChangeNewStuff(stuff, e) {
        const temp = {}
        temp[stuff] = e.target.value;
        this.setState(temp);
    }

    roomIn = async () => {
        let check = false;
        let allowedRoomCheck = false;
        let newAllowedRoom: string[];
        const userDoc = await firestore.collection("users").doc(firebase.auth().currentUser.uid).get();
        if(!typeof userDoc.data() === undefined ) {
            if(!typeof userDoc.data().allowedRoom === undefined) {
                userDoc.data().allowedRoom.forEach((one) => {
                    if (one == this.state.existingRoomId) {
                        allowedRoomCheck = true;
                    }
                })
                if(!allowedRoomCheck){
                    newAllowedRoom = [];
                    newAllowedRoom = [userDoc.data().allowedRoom]
                    newAllowedRoom.push(this.state.existingRoomId);
                }
            }else{
                newAllowedRoom = [this.state.existingRoomId];
            }
        }else{
            newAllowedRoom = [this.state.existingRoomId];
        }
        firestore.collection("rooms").doc(this.state.existingRoomId).collection("roomInfo").doc("roomInfo").get().then(async (doc) => {
            check = doc.exists
            if (check) {
                const writeAllowedMember = async () => {
                    if (!isAlreadyIn) {
                        member.push(firebase.auth().currentUser.uid);
                        await firestore.collection("rooms").doc(this.state.existingRoomId).collection("roomInfo").doc("roomInfo").set({
                            allowedMember: member
                        }, {merge: true})
                    }
                }
                const member: string[] = doc.data().allowedMember;
                let isAlreadyIn;
                member.forEach(function (one) {
                    if (one == firebase.auth().currentUser.uid) {
                        isAlreadyIn = true
                    }
                })
                if (doc.data().password) {
                    if (sha256(this.state.existingPassword) == doc.data().password) {
                        await writeAllowedMember();
                        if (!allowedRoomCheck) {
                            await firestore.collection("users").doc(firebase.auth().currentUser.uid).set({allowedRoom: newAllowedRoom}, {merge: true})
                        }
                        location.assign('/chat?roomId=' + this.state.existingRoomId);
                    } else {
                        alert("指定したルームは存在していないか、正しいパスワードが必要です。もう一度ルームIDとパスワードをお確かめください。")
                    }
                } else {
                    if (!allowedRoomCheck) {
                        firestore.collection("users").doc(firebase.auth().currentUser.uid).set({allowedRoom: newAllowedRoom}, {merge: true})
                    }
                    await writeAllowedMember();
                    let a = this.state.existingRoomId;
                    location.assign("/chat?roomId=" + a);
                }
            } else {
                alert("指定したルームは存在していないか、正しいパスワードが必要です。もう一度ルームIDとパスワードをお確かめください。")
            }
        })
    }

    createRoom = () => {
        let nowAllowedRoom: string[];
        firestore.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
            if (doc.data().allowedRoom) {
                nowAllowedRoom = doc.data().allowedRoom;
                alert(nowAllowedRoom);
            }
            if (!nowAllowedRoom) {
                nowAllowedRoom = [this.state.newRoomID];
            } else {
                nowAllowedRoom.push(this.state.newRoomID)
            }
            if (this.state.newPassword) {
                const password = sha256(this.state.newPassword);
                const allowedMember: string[] = [firebase.auth().currentUser.uid];
                firestore.collection("rooms").doc(this.state.newRoomID).collection("roomInfo").doc("roomInfo").set({
                    name: this.state.newRoomName,
                    description: this.state.newDescription,
                    password: password,
                    allowedMember: allowedMember
                }).then(async () => {
                    await firestore.collection("users").doc(firebase.auth().currentUser.uid).set({allowedRoom: nowAllowedRoom}, {merge: true});
                    location.assign('/chat?roomId=' + this.state.newRoomID);
                })
            } else {
                const allowedMember: string[] = [firebase.auth().currentUser.uid];
                firestore.collection("rooms").doc(this.state.newRoomID).collection("roomInfo").doc("roomInfo").set({
                    name: this.state.newRoomName,
                    description: this.state.newDescription,
                    allowedMember:allowedMember
                }).then(async () => {
                    alert("come")
                    await firestore.collection("users").doc(firebase.auth().currentUser.uid).set({allowedRoom: nowAllowedRoom}, {merge: true});
                    location.assign('/chat?roomId=' + this.state.newRoomID);
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" className="exists_chat" onClick={() => {
                    this.handleOpenOrClose(true)
                }}>
                    既存のチャットルームに入る
                </Button>
                <Dialog open={this.state.existingRoomDialogOpen} onClose={() => {
                    this.handleOpenOrClose(false)
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">チャットルームへの入室</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            チャットルームのIDを入力してください。<br/>必要な場合はパスワードも入力してください。
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room ID"
                            type="string"
                            fullWidth
                            value={this.state.existingRoomId}
                            onChange={(e) => {
                                this.handleChangeExistingStuff("existingRoomId", e)
                            }}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Password"
                            label="Password"
                            type="Password"
                            fullWidth
                            value={this.state.existingPassword}
                            onChange={(e) => {
                                this.handleChangeExistingStuff("existingPassword", e)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => {
                            this.handleOpenOrClose(false)
                        }}>キャンセル</Button>
                        <Button color="primary" onClick={this.roomIn}>入室する</Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="secondary" onClick={() => {
                    this.handleOpenOrCloseForNewRoom(true)
                }}>
                    新しくチャットルームを作る
                </Button>
                <Dialog open={this.state.NewRoomDialogOpen} onClose={() => {
                    this.handleOpenOrCloseForNewRoom(false)
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">チャットルームの作成</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            チャットルームのID,名前,概要を入力してください。<br/>また、パスワードを設定する場合はパスワードも入力してください。
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room ID"
                            type="string"
                            fullWidth
                            value={this.state.newRoomID}
                            onChange={(e) => {
                                this.handleChangeNewStuff("newRoomID", e)
                            }}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="名前"
                            type="name"
                            fullWidth
                            value={this.state.newRoomName}
                            onChange={(e) => {
                                this.handleChangeNewStuff("newRoomName", e)
                            }}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="説明"
                            type="description"
                            fullWidth
                            value={this.state.newDescription}
                            onChange={(e) => {
                                this.handleChangeNewStuff("newDescription", e)
                            }}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Password"
                            label="Password"
                            type="Password"
                            fullWidth
                            value={this.state.newPassword}
                            onChange={(e) => {
                                this.handleChangeNewStuff("newPassword", e)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => {
                            this.handleOpenOrCloseForNewRoom(false)
                        }}>キャンセル</Button>
                        <Button color="primary" onClick={this.createRoom}>チャットルームを作成する</Button>
                    </DialogActions>
                </Dialog>
                {/*language=CSS*/}
                <style jsx>{`
                    .exists_chat {
                        padding-left: 20px
                    }
                `}</style>
            </div>
        )
    }
}

export default Lobby;
