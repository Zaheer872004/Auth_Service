const express = require ('express');
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();
const { PORT } = require('./config/serverConfig');
// const PORT = process.env.PORT



const prepareAndStartService = () => {
    app.listen(PORT,()=>{

        console.log(`Server started at ${PORT} port`);
    })
}

prepareAndStartService();