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
            .send({user: {username, password}})
            .expect(204)
            .end(done);
    });

    test('login created user returns 200 with token in body', done => {
        request(app)
            .post('/login')
            .send({user: {username, password}})
            .expect(204, done)
            .expect(response => {
                expect(response.headers).toHaveProperty('authorization');
            }, done);
    });

    test('login with wrong password returns 401', done => {
        request(app)
            .post('/login')
            .send({user: {username, password: '2345'}})
            .expect(401, done);
    });

    test('login inexistent user returns 401', done => {
        request(app)
            .post('/login')
            .send({user: {username: 'joe', password: '5678'}})
            .expect(401, done);
    });
});

describe('create question', () => {

    let username = 'user';
    let newQuestion = {title: 'Question title', body: 'Question body'};
    let questionId;
    let token = username;

    test('returns question id', async (done) => {
        request(app)
            .post('/questions')
            .send({question: newQuestion})
            .set('Authorization', token)
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

describe('answer question ', () => {
    let questionId;
    let answerId;

    let username = 'user';
    let token = username;
    let newAnswer = {body: 'Answer body'};

    let newQuestion = {title: 'Question title', body: 'Question body'};

    beforeAll(async (done) => {
        request(app)
            .post('/questions')
            .send({question: newQuestion})
            .set('Authorization', token)
            .then(response => {
                    questionId = response.body.questionId;
                    done();
                }
            );
    });

    test('post answer returns answer id', async done => {
        request(app)
            .post('/questions/' + questionId + '/answers')
            .send({answer: newAnswer})
            .set('Authorization', token)
            .expect(200, done)
            .expect(response => {
                expect(response.body).toHaveProperty('answerId');
                answerId = response.body.answerId;
            }, done);
    });

    test('get question\'s answers contains answer id', async done => {
        request(app)
            .get('/questions/' + questionId + '/answers')
            .expect(200, done)
            .expect(response => {
                expect(response.body.answers).toContain(answerId);
            }, done);
    });

    test('get answer returns correct answer', async done => {
        request(app)
            .get('/answers/' + answerId)
            .expect(200, done)
            .expect(response => {
                expect(response.body).toMatchObject({answer: {...newAnswer, questionId}});
            }, done);
    });
    test('get user\'s answers contains new answer id', async done => {
        request(app)
            .get('/users/' + username + '/answers')
            .expect(200, done)
            .expect(response => {
                expect(response.body).toHaveProperty('answers');
                expect(response.body.answers).toContain(answerId);
            });
    });

});
