import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const welcomeContentSchema = new Schema({
  home: {
    banner: {
      title: 'String',
      bgImage: 'String',
      linkText: 'String',
    },
  },
  interests: [
    {
      image: 'String',
      title: 'String',
    },
  ],
});

export default mongoose.model('welcomeContent', welcomeContentSchema);
