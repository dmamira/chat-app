import * as React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase} from "../src/firebase";

class Home extends React.Component<any, any> {
    uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/chat',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            "microsoft.com",
        ],
    };

    render() {
        return (
            <div className="wrapper">
                <h1>Login</h1>
                <div className="container">
                    <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={this.uiConfig}/>
                </div>
                {/*language=CSS*/}
                <style>{`
                    html {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
                </style>
                {/*language=CSS*/}
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
                    h1 {
                        font-family: 'Roboto', sans-serif;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    }
}

export default Home;
