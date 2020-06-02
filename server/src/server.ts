import express, { request, response } from 'express';

const app = express();      // Por padrão não entende o Json
app.use(express.json());    // Então precisamos dessa chamada



app.get('/', (request, response) => {   // Home
    return response.json({message: 'Hello World'});
});



app.listen(3333); 




/* testes
const users = [
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel'
];

app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user =>user.includes(search)): users; // if ternário

    response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    };
    return response.json(user);
});

*/