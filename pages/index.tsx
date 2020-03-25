import * as React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase} from "../src/firebase";
class Home extends React.Component<any, any>{
    uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/chat',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            "microsoft.com",
            "yahoo.com"
        ],
    };
    render(){
        return(
            <div className="wrapper">
                <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={this.uiConfig}/>
                <style jsx>{`
                .wrapper{
                width:100%;
                }
                `}</style>
            </div>
        )
    }
}

export default Home;
