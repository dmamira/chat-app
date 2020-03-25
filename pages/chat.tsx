import * as React from 'react';
import HOC from '../components/HOC';
import Service from "../components/chat";

class ChatPage extends React.Component<any, any>{
    render(){
        return(
            <HOC component={<Service/>}/>
        )
    }
}

export default ChatPage;
