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
  }
});

export default mongoose.model('Quote', quoteSchema);
