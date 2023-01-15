
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
  res.json(users.find(user => user._id === parseInt(req.params.userId)));
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
  users.push({
    _id: counter++,
    ...req.body    
  });
  res.json(users[users.length -1])
})

// app.put('/users/1', (req, res) => {
//   users[0].name = 'Danny Dale Cooper'
//   res.json(users);
// })

app.put('/users/:userId', (req, res) => {
  // let id = req.params.userId -1;
 
  // let putUser = req.body;
  // let n = users.findIndex(m => m.userId == id) //get index of members array     
  // users[n].name = putUser.name ? putUser.name : users[n].name;
  // users[n].occupation = putUser.occupation ? putUser.occupation : users[n].occupation;
  // users[n].avatar = putUser.avatar ? putUser.avatar : users[n].avatar;
  // res.json(users[n]);
  let findUser = (users.find( user => user._id === parseInt(req.params.userId)))
  let user = findUser[0];
  user.name = req.body.name ? req.body.name : user.name
  user.avatar = req.body.avatar ? req.body.avatar : user.avatar
  user.occupation = req.body.occupation ? req.body.occupation : useroccupation
  
  res.json(user);
})

app.delete('/users/1', (req, res) => {
  users[0].delete;
  res.send('deleted')
})

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