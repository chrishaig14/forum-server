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

app.post('/questions', async (request, response) => {
    const newQuestion = request.body.payload;
    let questionId = await logic.newQuestion(newQuestion);
    response.status(200).json({questionId}).end();
});

app.get('/questions/:id', async (request, response) => {
    const id = request.params.id;
    let question = await logic.getQuestion(id);
    if (question) {
        response.status(200).json({question}).end();
    } else {
        response.status(404).end();
    }
});

module.exports = {
    app: app.listen(8000), setLogic: (l: Logic) => {
        logic = l;
    }
};

