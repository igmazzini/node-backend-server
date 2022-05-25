const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {

        console.log('Init db config')

        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');


    } catch (error) {
        console.log(error);
        throw new Error('Data base error connection');
    }
};



module.exports = {
    dbConnection
}