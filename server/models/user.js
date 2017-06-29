import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accessToken: { type: 'String', required: true},
  email: { type: 'String', required: true },
  expiresIn: { type: 'Number', required: true },
  gender: { type: 'String', required: true },
  id: { type: 'Number', required: true },
  name: { type: 'String', required: true },
  picture: {
    data: {
      is_silhouette: 'Boolean',
      url: { type: 'String', required: true },
    },
  },
  signedRequest:{ type: 'String', required: true },
  userID: { type: 'Number', required: true },
});

export default mongoose.model('User', userSchema);
