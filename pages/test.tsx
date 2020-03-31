import * as React from 'react';

class Test extends React.Component<any, any> {
    render() {
        return (
            <div>
                <p className="roomName">text goes here</p>
                <p className="description">ここに説明が入りますここに説明が入りますここに説明が入りますここに説明が入りますここに説明が入りますここに説明が入ります</p>
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

export default Test;
