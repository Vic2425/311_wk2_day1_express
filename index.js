
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length + 1;

app.use(express.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/1', (req, res) => {
  res.json(users[0])
})

app.get('/users/:userId', (req, res) => {
  let id = req.params.userId -1;
  res.json(users[id]);
})

app.post('/users', (req, res) => {
  newUser = {
    "_id": 6,
    "name": "Jay Chou",
    "occupation": "Artist/Singer",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  users.push(newUser);
  return res.json(users);
})

app.post('/users', (req, res) => {
  
  let newUser = {
    _id: ++counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };

  users.push(newUser);
  // counter++;
  res.json(users[users.length -1])
})

app.put('/users/1', (req, res) => {
  users[0].name = 'Danny Dale Cooper'
  res.json(users);
})

app.put('/users/:userId', (req, res) => {
  let id = req.params.userId -1;
  // users[id].name = "Jane Doe";
  // res.json(users[id])
  let putUser = req.body;
  let n = users.findIndex(m => m.userId == id) //get index of members array     
  users[n].name = putUser.name ? putUser.name : users[n].name;
  users[n].occupation = putUser.occupation ? putUser.occupation : users[n].occupation;
  users[n].avatar = putUser.avatar ? putUser.avatar : users[n].avatar;
  res.json(users[n]);
})

app.delete('/users/1', (req, res) => {
  users[0].delete;
  res.send('deleted')
})

app.delete('/users/:userId', (req, res) => {
  let id = req.params.userId -1;
  users[id].isActive = 'false';
  res.send('deleted')
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))