import React,{Component} from 'react';
import {firebase} from '../src/firebase';

class HOC extends React.Component {
    that = this;

    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.setState({
                    login: true
                });
            } else {
                document.write("ログインしてください。\n3秒後にリダイレクトします。");
                setTimeout(function(){
                    location.assign("/");
                }, 3*1000);
            }
        });
    }
    render() {
        return (
            <div>
                {this.state.login && {...this.props.component}}
            </div>
        )
    }
}

export default HOC;
