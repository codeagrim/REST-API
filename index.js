const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const { json } = require('stream/consumers');
const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false}));

//Hybrid Server 

// we get all users here in this route
app.get('/api/users', (req,res) => {
    res.json(users)
});

// html 
app.get('/users', (req,res) => {
    const html = `
    <h1> All Users </h1>
    <br>
    <ul>
    ${users.map((user)=> {
       return `<li>${user.first_name + " " + user.last_name}</li>`
    }).join("")}
    </ul>
    `
    res.send(html)
});

// get user by id - params 
app.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const user = users.find((user) => (user.id === id))
    if(!user)
    {
        res.status(404).json({"message": "User not Found"})
    }
    res.status(200).json(user)
})


// post request
app.post('/api/users/', (req,res) => {
   const body = req.body;
   if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.phone_number)
   {
    res.status(400).json( {message: "Required all Fields"})
   }
    users.push({id: users.length + 1, ...body});
  
   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
    if(err)
    {
        return res.json({ error: 'Failed to save user' });
    }
    res.status(201).json({'status': "User Created"});
   });
});

// patch we are editing user
app.patch('/api/users/:id', (req,res) => {
   const id = parseInt(req.params.id)
   const userIndex = users.findIndex((user) => (user.id == id))
   if(userIndex == -1){
    res.json({"Status": "Failed", "message": "User not found"});
   }
   
    const body = req.body;
    users[userIndex] = {id: id,...body};
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
    if(err)
    {
        return res.json({ error: 'Failed to save user' });
    }
    res.json(users[userIndex]);
   });
   });

// delete
app.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((user) => (user.id == id));
    if(userIndex == -1){
    res.json({"Status": "Failed", "message": "User not found"});
   }

   users.splice(userIndex,1);

   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
    if(err)
    {
        return res.json({ error: 'Failed to delete user' });
    }
    res.json({"message": `User with id ${id} Deleted`}, users[userIndex]);
   });


})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
