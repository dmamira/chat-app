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
    marginBottom:"10px",
}

const top:style = {
    marginTop:"0px",
    marginLeft:"10px"
}


export {message,top}
