import * as React from 'react';
import InRoomInfo from "../components/inRoomInfo";
import {Scrollbars} from 'react-custom-scrollbars';


class Test extends React.Component<any, any> {
    render() {
        return (
                <Scrollbars style={{height: 500}}>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                    <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
                </Scrollbars>
        )
    }
}

export default Test;
