const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 3000;


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
    res.json(user)
})


// post request

app.post('/api/users/:id', (req,res) => {
   })


// patch

app.patch('/api/users/:id', (req,res) => {
   })

// delete

app.delete('/api/users/:id', (req,res) => {
    res.json(user)
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
