import * as React from 'react';
import Chat from '../components/createChat'
import Dropzone from "react-dropzone";
import Image from "../components/createImage";

class Test extends React.Component {
    onDrop = (acceptedFiles: File[]) => {
        console.log(acceptedFiles);
    }
    render() {
        return (
            <div>
            <Image url="https://pics.prcm.jp/e71658ade5a7f/51571080/png/51571080_220x220.png" createOn={100} name="AIUEO" isMine={true}/>
            <Image url="https://pics.prcm.jp/e71658ade5a7f/51571080/png/51571080_220x220.png" createOn={100} name="AIUEO" isMine={false}/>
            </div>
        )
    }
}

export default Test;
