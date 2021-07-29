const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI = "mongodb+srv://kshen:Welcome%211@cluster0.sshns.mongodb.net/solo-project.groceries";

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'users'
})


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);