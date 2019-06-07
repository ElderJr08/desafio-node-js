const mongoose = require('mongoose');
const env = process.env.NODE_ENV === 'test'? 'test' : 'prod';
const urlConnect = '';
console.log(`Connecting the database: ${env}`);

mongoose.connect(urlConnect, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
 });

mongoose.Promise = global.Promise;

module.exports = mongoose;
