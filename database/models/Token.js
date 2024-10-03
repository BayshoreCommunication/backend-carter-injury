import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  access_token: {
    type: String,
  },
  scope: {
    type: String,
  },
  token_type: {
    type: String,
  },
  id_token: {
    type: String,
  },
  expiry_date: {
    type: Number,
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
