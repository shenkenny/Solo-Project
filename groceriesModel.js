const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://kshen:Welcome%211@cluster0.sshns.mongodb.net/solo-project.groceries";

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'groceries'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'groceries' collection
const grocerySchema = new Schema(
    {
      'name': {
        type: String,
        required: true
      },
      'all': {
        type: String,
        required: true
      },
      'drinks': {
        type: String,
        required: true
      },
      'meat': {
        type: String,
        required: true
      },
      'sauce': {
        type: String,
        required: true
      },
      'snacks': {
        type: String,
        required: true
      },
      'staples': {
        type: String,
        required: true
      },
      'veggies': {
        type: String,
        required: true
      },
      'haveAtHome': {
        type: String,
        required: true
      },      
      'timestamp': {
        type: String
      },
    }
  );

// creats a model for the 'groceries' collection that will be part of the export
const Grocery = mongoose.model('grocery', grocerySchema);



module.exports = Grocery;
