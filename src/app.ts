import {json} from 'express';

let logic: Logic;

const express = require('express');
const app = express();

app.use(json());


app.post('/users', async (request, response) => {
    await logic.createUser(request.body);
    response.status(204).end();
});

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    let result = await logic.match(username, password);
    if (result) {
        response.status(200).json({token: username}).end();
    } else {
        response.status(401).end();
    }
});

module.exports = {
    app: app.listen(8000), setLogic: (l: Logic) => {
        logic = l;
    }
};

