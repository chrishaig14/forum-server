'use strict';

import {json} from 'express';

const cors = require('cors');

let logic: Logic;

const express = require('express');
const app = express();

const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(json());


app.post('/users', async (request, response) => {
    await logic.createUser(request.body.user);
    response.status(204).end();
});

app.post('/login', async (request, response) => {
    const {username, password} = request.body.user;
    let result = await logic.match(username, password);
    let token = username;
    if (result) {
        response.status(204).set('Authorization', token).end();
    } else {
        response.status(401).end();
    }
});

app.post('/questions', async (request, response) => {
    const newQuestion = request.body.question;
    let question = {...newQuestion, username: request.headers['authorization']};
    let questionId = await logic.newQuestion(question);
    response.status(200).json({questionId}).end();
});

app.get('/questions', async (request, response) => {
    let questions = await logic.getAllQuestions();
    response.status(200).json({questions}).end();
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

app.post('/questions/:id/answers', async (request, response) => {
    const id = request.params.id;
    let answerId = await logic.newAnswer(id, {...request.body.answer, username: request.headers['authorization']});
    if (answerId) {
        response.status(200).json({answerId}).end();
    } else {
        response.status(404).end();
    }
});

app.get('/questions/:id/answers', async (request, response) => {
    const id = request.params.id;
    let answers = await logic.getAnswers(id);
    if (answers) {
        response.status(200).json({answers}).end();
    } else {
        response.status(404).end();
    }
});

app.get('/users/:id/questions', async (request, response) => {
    const id = request.params.id;
    let questions = await logic.getUserQuestions(id);
    if (questions) {
        response.status(200).json({questions}).end();
    } else {
        response.status(404).end();
    }
});

app.get('/users/:id/answers', async (request, response) => {
    const id = request.params.id;
    let answers = await logic.getUserAnswers(id);
    if (answers) {
        response.status(200).json({answers}).end();
    } else {
        response.status(404).end();
    }
});

app.get('/users/:id', async (request, response) => {
    const id = request.params.id;
    let user = await logic.getUserProfile(id);
    console.log('USER PROFILE: ', user);
    if (user) {
        response.status(200).json({user}).end();
    } else {
        response.status(404).end();
    }
});

app.get('/answers/:id', async (request, response) => {
    const id = request.params.id;
    let answer = await logic.getAnswer(id);
    if (answer) {
        response.status(200).json({answer}).end();
    } else {
        response.status(404).end();
    }
});

app.put('/answers/:id/likes', async (request, response) => {
    const id = request.params.id;
    let username = request.headers['authorization'];
    await logic.likeAnswer(id, username);
    response.status(204).end();
});

app.delete('/answers/:id/likes', async (request, response) => {
    const id = request.params.id;
    let username = request.headers['authorization'];
    await logic.unlikeAnswer(id, username);
    response.status(204).end();
});

app.put('/questions/:id/likes', async (request, response) => {
    const id = request.params.id;
    let username = request.headers['authorization'];
    await logic.likeQuestion(id, username);
    response.status(204).end();
});

app.delete('/questions/:id/likes', async (request, response) => {
    const id = request.params.id;
    let username = request.headers['authorization'];
    await logic.unlikeQuestion(id, username);
    response.status(204).end();
});

app.get('/search', async (request, response) => {
    let q = request.query;
    let results = await logic.search(q);
    response.status(200).json(results).end();
});

module.exports = {
    app: app.listen(8000), setLogic: (l: Logic) => {
        logic = l;
    }
};

