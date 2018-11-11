import mongoose from 'mongoose';

const { Schema } = mongoose;

const SentenceSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('sentences', SentenceSchema);
