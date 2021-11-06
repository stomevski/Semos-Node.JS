const mongoose = require('mongoose');

const dbConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@stefan-semos.rguax.mongodb.net/Practice1?retryWrites=true&w=majority`;

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Connection to DB failed !!!');
    }

    console.log("Succesfully connected to DB");
})