const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

/*
* You can copy and run the code below to play around with bcrypt
* However this is for demonstration purposes only. Use these concepts
* to adapt to your own project needs.
*/
// const saltRounds = 10 // increase this if you want more iterations  
// const userPassword = 'supersecretpassword'  
// const randomPassword = 'fakepassword'
// const storeUserPassword = (password, salt) =>  
//   bcrypt.hash(password, salt).then(storeHashInDatabase)
// const storeHashInDatabase = (hash) => {  
//    // Store the hash in your password DB
//    return hash // For now we are returning the hash for testing at the bottom
// }
// // Returns true if user password is correct, returns false otherwise
// const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
//   bcrypt.compare(enteredPassword, storedPasswordHash)
// // This is for demonstration purposes only.
// storeUserPassword(userPassword, saltRounds)  
//   .then(hash =>
//     // change param userPassword to randomPassword to get false
//     checkUserPassword(userPassword, hash)
//   )
//   .then(console.log)
//   .catch(console.error)

const app = express();
app.use(bodyParser.json());
app.use(cors());
// ------------ temp database
const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'bhsss',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get('/', (req, res) => {
    res.send(database.users);
    // res.send('this is working');
})

app.post('/signin', (req, res) => {
    bcrypt.compare("password", 'a;osiefja;soeifas;lfkjas;dlfkjad;f', function(err, res) {
        //res = true 
    });
    bcrypt.compare("veggies", 'asldkfja;sdkf', function(err, res) {
    });
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
            //res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
    res.json('signin');
})

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false; 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true; 
           return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false; 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true; 
            user.entries++
           return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})
app.listen(3000, () => {
    console.log('app is running on port 3000');
})