import * as React from 'react';
import HOC from '../components/HOC';
import Service from "../components/chat";
import {firestore} from "../src/firebase";

class ChatPage extends React.Component<any, any>{
    static getInitialProps({query}){
        return {query:query}
    }
    render(){
        return(
            <HOC component={<Service query={this.props.query.roomId}/>}/>
        )
    }
}

export default ChatPage;
