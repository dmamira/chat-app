import * as React from 'react';
import InRoomInfo from "../components/inRoomInfo";

class Test extends React.Component<any, any> {
    render() {
        return (
          <div>
              <InRoomInfo name="荒野の部屋" description="荒野行動について語り合う部屋です。荒野行動がお好きな方はお越しください。"/>
          </div>
        )
    }
}

export default Test;
