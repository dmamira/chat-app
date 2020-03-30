import * as React from "react";
import Image from "../components/createImage";

class Test extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Image url="https://cdn.pixabay.com/photo/2020/02/07/14/49/glacier-4827387_1280.jpg" createOn={111} name="DAI" isMine={false} icon="https://lh3.googleusercontent.com/a-/AOh14GjSbRpxQI5cVPsZ4jISs1gmlHSF1aR7x0-a6YRi"/>
                {/*language=CSS*/}
                <style jsx>{`                    
               
                `}</style>
            </div>
        )
    }
}

export default Test;
