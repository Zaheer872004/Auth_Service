const express = require ('express');
const app = express();
const { PORT } = require('./config/serverConfig');

const prepareAndStartService = () =>{
    app.listen(PORT,()=>{

        console.log(`Server started at ${PORT} port`);
    })
}

prepareAndStartService();