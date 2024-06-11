const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: 0
  },
  Betamount: {
    type: Number,
    default: 0
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    default: 0,
  },
  utrNumber: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

const AdminUpiSchema = new Schema({
  upiId: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('UserGmb', UserSchema,AdminUpiSchema);

module.exports = User;