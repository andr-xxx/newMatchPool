import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testModel = new Schema({
  home: {
    banner: {
      title: 'String',
      bgImage: 'String',
      linkText: 'String',
    },
    main: [
      {
        title: 'String',
        model: 'String',
      },
    ],
  },
  interests: [
    {
      image: 'String',
      title: 'String',
    },
  ],
});

export default mongoose.model('testModel', testModel);
