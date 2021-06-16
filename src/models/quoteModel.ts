// import * as mongoose from "mongoose";
// mongoose.Promise = global.Promise;
import { Document, Model, model , Schema} from "mongoose";
interface IQuote extends Document {
  _id?: Schema.Types.ObjectId,
  quote?: String,
  owner?: Schema.Types.ObjectId
}

const quoteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    // required: true,
    unique: true,
    minlength: 5,
  },
  quote: {
    type: String,
    // required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',//name of model
    // required: true
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

// export default model('Quote', quoteSchema);
// const Quote = model<IQuote>('Quote', quoteSchema);
// export default Quote;
const Quote = model('User', quoteSchema);
export {Quote, IQuote};
