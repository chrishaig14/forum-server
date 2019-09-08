const logic = require('../src/logic');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'forum_test';

beforeAll(async () => {
    await logic.connectToDb(url, dbName);
    await logic.db.collection('counters').insertOne({name: 'questionId', value: 0});
});

afterAll(async () => {
    await logic.db.dropDatabase();
});

describe('create user', () => {
    let username = 'user';
    let password = '123';
    beforeAll(async () => {
        await logic.createUser({username, password});
    });
    test('match password returns true', async () => {
        let result = await logic.match(username, password);
        expect(result).toBeTruthy();
    });
    test('match wrong password returns false', async () => {
        let result = await logic.match(username, 'asdf');
        expect(result).toBeFalsy();
    });
    test('match inexistent username return false', async () => {
        let result = await logic.match('asdf', password);
        expect(result).toBeFalsy();
    });
    test('new user has no questions', async () => {
        let result = await logic.getUserQuestions(username);
        expect(result).toEqual([]);
    });
    test('new user has no answers', async () => {
        let result = await logic.getUserAnswers(username);
        expect(result).toEqual([]);
    });
});

describe('create question', () => {

    let username = 'user';
    let newQuestion = {title: 'Question title', body: 'Question body', username: username};
    let questionId;

    beforeAll(async () => {
        questionId = await logic.newQuestion(newQuestion);
    });
    test('get created question returns same question', async () => {
        let question = await logic.getQuestion(questionId);
        expect(question).toMatchObject(newQuestion);
    });

    test('adds question id to users question list', async () => {
        let userQuestions = await logic.getUserQuestions(username);
        expect(userQuestions).toContain(questionId);
    });
});

describe('answer question ', () => {
        let answerId;
        let questionId = 0;
        let username = 'user';
        let newAnswer = {body: 'Answer body', username: username};

        beforeAll(async () => {
            answerId = await logic.newAnswer(questionId, newAnswer);
        });

        test('get answer returns same answer', async () => {
            let answer = await logic.getAnswer(answerId);
            expect(answer).toMatchObject(newAnswer);
        });

        test('adds answer to question\'s answers', async () => {
            let questionAnswers = logic.getAnswers(questionId);
            expect(questionAnswers).toContain(answerId);
        });

        test('adds answer to user\'s answers', async () => {
            let userAnswers = await logic.getUserAnswers(username);
            expect(userAnswers).toContain(answerId);
        });
    }
);
