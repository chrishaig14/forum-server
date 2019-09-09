import * as logic from '../src/logic';

const {app, setLogic} = require('../src/app');
const request = require('supertest');

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'forum_test';
    await logic.connectToDb(url, dbName);
    await logic.db.collection('counters').insertOne({name: 'questionId', value: 0});
    await logic.db.collection('counters').insertOne({name: 'answerId', value: 0});
    setLogic(logic);
});

afterAll(async () => {
    await logic.db.dropDatabase();
    await logic.closeConnectionToDb();
    app.close();
});

describe('create user', () => {
    let username = 'user';
    let password = '1234';

    test('new user returns 204', done => {
        request(app)
            .post('/users')
            .send({username, password})
            .expect(204)
            .end(done);
    });

    test('login created user returns 200 with token in body', done => {
        request(app)
            .post('/login')
            .send({username, password})
            .expect(200, done)
            .expect(response => {
                expect(response.body).toHaveProperty('token');
            }, done);
    });

    test('login with wrong password returns 401', done => {
        request(app)
            .post('/login')
            .send({username, password: '2345'})
            .expect(401, done);
    });

    test('login inexistent user returns 401', done => {
        request(app)
            .post('/login')
            .send({username: 'joe', password: '5678'})
            .expect(401, done);
    });
});

describe('create question', () => {

    let username = 'user';
    let newQuestion = {title: 'Question title', body: 'Question body'};
    let questionId;

    test('returns question id', async (done) => {
        request(app)
            .post('/questions')
            .send({token: username, payload: newQuestion})
            .expect(200, done)
            .expect(response => {
                expect(response.body).toHaveProperty('questionId');
                questionId = response.body.questionId;
                expect(questionId).toBe('0');
            }, done);
    });

    test('get question returns same question', async (done) => {
        request(app)
            .get('/questions/' + questionId)
            .send({token: username})
            .expect(200, done)
            .expect(response => {
                expect(response.body).toMatchObject({question: {...newQuestion, id: questionId}});
            }, done);
    });

    test('get user\'s questions contains new question id', async done => {
        request(app)
            .get('/users/' + username + '/questions')
            .expect(200, done)
            .expect(response => {
                expect(response.body).toHaveProperty('questions');
                expect(response.body.questions).toContain(questionId);
            });
    });
});
