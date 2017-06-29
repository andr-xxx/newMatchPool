import Content from '../models/welcome.content';

export function getContent(req, res) {
  Content.find().exec((err, content) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(
      {
        interests: content[0].interests,
        home: content[0].home,
      });
  });
}

export function getUser(req, res) {
  res.json({});
}
