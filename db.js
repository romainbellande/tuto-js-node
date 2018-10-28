const mongoose = require('mongoose');
const dbUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@127.0.0.1:${process.env.MONGO_PORT}`;
mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = mongoose;
