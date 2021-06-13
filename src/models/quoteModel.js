import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const quoteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  quote: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',//name of model
    required: true
  },
});
// After `findOne()` was called
quoteSchema.pre('findOne', function () {
  this.populate({
    path: 'owner',
    select: 'username phone quotes',
    gender: 0,
    // populate the 'quotes' to get all info of quotes
    populate: { path: 'quotes' }
  });
});

export default mongoose.model('Quote', quoteSchema);
