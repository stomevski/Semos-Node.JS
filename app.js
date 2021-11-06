// const fs = require('fs');
// const users = require('./data/user.json');
// const readFile = require('./homework/readTheFile');
// const writeFile = require('./homework/writeTheFile');
// const appendFile = require('./homework/appendTheFile');
// const deleteFile = require('./homework/deleteTheFile');

// const userAdd = require('./homework/readWriteSaveUser');

// Task 1
// writeFile(`test.txt`, 'Dali raboti !?').then((data) => {
//     console.log(data);
//     return appendFile('test.txt', ' APPEND TEXT');
// }).then((data) => {
//     console.log(data);
//     return readFile('test.txt')
// }).then((data) => {
//     console.log(data);
//     return deleteFile('test.txt');
// }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })


// Task 2.1
// readFile('data/user.json').then((data) => {

//     console.log("Total number of users: " + JSON.parse(data).length);
// }).catch(err => {
//     console.log(err);
// })

//Task 2.2
// readFile('data/user.json').then((data) => {

//     const obj = JSON.parse(data);
//     let totalAgeNumber = 0;

//     obj.forEach(el => totalAgeNumber += el.age);

//     console.log(`Median age of users is: ${totalAgeNumber / obj.length}`);

// }).catch((err) => {
//     console.log(err);
// })
//Task 2.3

// userAdd('./data/user.json', { name: 'Trpe', age: 41, email: "trpe@email.com", gender: 'male' });



// try {
//     fs.readFile('./textt.txt', 'utf-8', (err, data) => {

//         if (err) {
//             throw new Error({ message: 'Ne postoi takov fajl !!!' })
//         }

//         console.log(data);
//     });
// } catch (er) {
//     console.log(er);
// }
// .collapse (display:none) bootstrap css


// ##################################################################################################################################

// const express = require('express');

// const people = [];

// const app = express();

// app.use(express.json());

// app.get('/person', (req, res) => {

//     res.send(people);

// })


// app.patch('/person/:id', (req, res) => {

//     const perIdx = people.find((p) => {
//         if (p.id === Number.parseInt(req.params.id)) {
//             return p;
//         } else {
//             return null;
//         }
//     });

//     if (perIdx) {

//         const idx = people.indexOf(perIdx);


//         people[idx] = {
//             ...perIdx,
//             ...req.body
//         }

//         return res.send(people[idx]);

//     } else {
//         return res.send('Cannot update person that does not exist !!!')
//     }

// })

// app.post('/person', (req, res) => {

//     const { body } = req;

//     people.push(body);

//     res.send('Person added');
// })

// app.get('/person/:id', (req, res) => {

//     const p = people.find((per) => {
//         if (per.id === Number.parseInt(req.params.id)) {
//             return per;
//         } else {
//             return null;
//         }
//     });

//     if (p) {
//         return res.send(p);
//     }

//     else {
//         return res.send(`Person with id: ${req.params.id} does not exist !!!`);
//     }

// })


// app.listen(4000, () => {
//     console.log('Server started at port 4000');
// });

// ################################################################################################################################################################

//Enviromental variables
require('dotenv').config();

//Mongo connection
require('./db/mongoConnection');

const express = require('express');

// Controller for Version 1
// const userController = require('./controllers/users');

//Controller for Version 2
const userMongoController = require('./controllers/usersMongo');

const app = express();

app.use(express.json());

//Version 1 with fs module
// app.get('api/v1/users', userController.getAll);


// app.get('api/v1/users/:id', userController.getOne);


// app.post('api/v1/users', userController.save);


// app.put('api/v1/users/:id', userController.update);


// app.delete('api/v1/users/:id', userController.remove);


//Version 2 with mongoDB
app.get('/api/v2/users', userMongoController.getAll);


app.get('/api/v2/users/:id', userMongoController.getOne);


app.post('/api/v2/users', userMongoController.save);


app.put('/api/v2/users/:id', userMongoController.update);


app.delete('/api/v2/users/:id', userMongoController.remove);


const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})




