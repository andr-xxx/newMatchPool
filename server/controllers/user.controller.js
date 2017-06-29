import User from '../models/user';

export function addNewUser(req, res) {
  const id = req.body.id;
  User.find({ 'id': id }).exec((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!result.length) {
      const user = new User(req.body);
      user.save((err, saved) => {
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }
        return res.send(saved);
      });
    }
    res.send(result);
  });
}

export function getUser(req, res) {
  res.json({});
}
