'use strict';

const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose'); 
require("dotenv").config(); 

//initiera server
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //anslut till MongoDB 
    Mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Ansluten till MongoDB"); 
    }).catch((error) => {
        console.log("Fel vid anslutning:" + error); 
    });

    //routes 
    await server.start();
    console.log('Server running on %s', server.info.uri);
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();