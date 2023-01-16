
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length + 1;

app.use(express.json());

/* BEGIN - create routes here */
/* ************* Part 1 ************** */
app.get('/users', (req, res) => {
  res.json(users)
});

app.get('/users/1', (req, res) => {
  res.json(users[0])
});

app.post('/users', (req, res) => {
  newUser = {
    "_id": 6,
    "name": "Jay Chou",
    "occupation": "Artist/Singer",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  users.push(newUser);
  return res.json(users);
});

app.put('/users/1', (req, res) => {
  users[0].name = 'Danny Dale Cooper'
  res.json(users);
});

app.delete('/users/1', (req, res) => {
  users[0].delete;
  res.send('deleted')
});

/* ************* Part 2 ************** */
app.post('/users', (req, res) => {
  users.push({
    _id: counter++,
    ...req.body    
  });
  res.json(users[users.length -1])
});

/* ************* Part 3 ************** */
app.get('/users/:userId', (req, res) => {
  res.json(users.find(user => user._id === parseInt(req.params.userId)));
});

app.put('/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  
  users[id - 1].name = req.body.name;
  users[id - 1].occupation = req.body.occupation;
  users[id - 1].avatar = req.body.avatar;

  res.json(users);
});

app.delete('/users/:userId', (req, res) => {
  let findUser = (users.find( user => user._id === parseInt(req.params.userId)));
  let user = findUser[0];
  if (user) {
    users.isActive = 'false';
    res.send('deleted')
  } else {
    res.status(400).json({ msg : `No member with the id of ${req.params.userId} is found!`})
  }
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))