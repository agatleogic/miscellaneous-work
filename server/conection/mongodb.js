const mongoose = require('mongoose');

const connectToDatabase = async () => await mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connectToDatabase;