import React from 'react';

interface style{
    [index:string]:string
}

const message:style = {
    borderRadius:"50px",
    boxSizing:"border-box",
    paddingLeft:"20px",
    minHeight:"50px",
    maxWidth:"768px",
    paddingRight:"20px",
    marginBottom:"10px"
}
/*const myMessage:style = {
    float:"right",
}*/

const top:style = {
    marginTop:"10px"
}

/*const name:style = {
    marginLeft:"40px",
    fontSize:"10pt"
}*/

export {message,top}
