import * as React from 'react';

interface Props {
    name:string,
    description:string
}

class InRoomInfo extends React.Component<Props, any> {
    render() {
        return (
            <div>
                <p className="roomName">{this.props.name}</p>
                <p className="description">{this.props.description}</p>
                {/*language=CSS*/}
                <style jsx>{`
                    .roomName {
                        font-weight: bold;
                        font-size: 20px;
                        margin-top:10px
                    }
                    .description{
                    margin-top:10px
                    }
                    div {
                        max-width: 400px;
                        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;
                        border-radius: 10px;
                    }
                    p{
                    margin:0px
                    }
                `}</style>
            </div>
        )
    }
}

export default InRoomInfo;
