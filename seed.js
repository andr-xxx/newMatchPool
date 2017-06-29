import mongoose from 'mongoose';
import content from './server/models/welcome.content';
import post from './server/models/post';
import test from './server/models/testModel';
import _ from 'lodash';
import random from 'random-utility';
// https://npm.runkit.com/random-utility documentation
import lorem from 'lorem-ipsum';

const categoryOfImage = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'];

function getImage(params) {
  if (!params) {
    throw new Error('Please, use param for generate image');
  }
  params.width ? params.width : params.width = 400;
  params.height ? params.height : params.height = 200;

  categoryOfImage.indexOf(params.category);

  return `http://lorempixel.com/${params.width}/${params.height}/${params.category}`;
}

function changeKeysInArray(obj, stingPath, iterableObj, i) {
  stingPath.split('.').reduce((prev, curr, index, arr) => {
    if (index === arr.length - 1) {
      if (i === 0) {
        prev.target[curr] = [iterableObj];
      } else {
        prev.target[curr].push(iterableObj);
      }
      return
    }
    prev.target = prev.target[curr];
    return prev;
  }, { target: obj });
}

function changeKeys(oldObj, paths, arrayLength) {
  const obj = _.cloneDeep(oldObj);
  _.forOwn(paths, (value, key) => {
    if (key === '_id' || key === '__v' || key === '_proto') return;
    if (value.schema) {
      const field = key.split('.')[key.split('.').length - 1];
      for (let i = 0; i < arrayLength[field]; i++) {
        changeKeysInArray(obj, key, changeKeys(value.schema.obj, value.schema.paths), i);
      }
      return;
    }
    key.split('.').reduce((prev, curr, index, arr) => {
      if (index === arr.length - 1) {
        const type = _.isObject(prev.target[curr]) ? prev.target[curr].type : prev.target[curr];
        switch (type) {
          case 'String':
            prev.target[curr] = prev.value;
            break;
          case 'Date':
            prev.target[curr] = Date.now();
            break;
          case 'Number':
            // TODO connect random for number
            prev.target[curr] = 15;
            break;
        }
        return
      }
      prev.target = prev.target[curr];
      return prev;
    }, { target: obj, value: lorem({ count: 1 }) });
  });
  return obj;
}

function createDummyData(opt) {
  const resultScheme = [];
  opt.forEach((item) => {
    if (item.count < 0) {
      throw new Error('Wrong count, please check it');
    }
    const obj = changeKeys(item.schema.schema.obj, item.schema.schema.paths, item.array);
    const tempArr = [];
    for (let i = 0; i < item.count; i++) {
      tempArr.push(obj);
    }
    resultScheme.push({
      models: tempArr,
      Schema: item.schema,
    });
  });
  return resultScheme;
}

function updateDb(schemaArr) {
  _.forEach(schemaArr, (item, i) => {
    const Schema = item.Schema;
    item.models.forEach((obj) => {
      const newSchema = new Schema(obj);
      newSchema.save((err) => {
        if (err) {
          console.log(err.message); // eslint-disable-line no-console
          throw err;
        }
        console.log('Succes'); // eslint-disable-line no-console
        process.exit();
      });
    });
  });
}

export default function seed(options) {
  mongoose.Promise = global.Promise;
  mongoose.connect(options.mongoUrl, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
    const resultScheme = createDummyData(options.models);
    updateDb(resultScheme);
  });
}

seed({
  mongoUrl: 'mongodb://localhost:27017/matchpool',
  models: [
    {
      schema: test,
      dropBefore: true,
      count: 1,
      array: {
        'main': 3,
        'interests': 5,
      },
    },
  ],
});
