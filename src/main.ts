import * as logic from './logic';

import fetch from 'node-fetch';

const {app, setLogic} = require('../src/app');

async function fillDatabase() {
    let api_users = 'https://api.stackexchange.com/2.2/users?page=1&pagesize=50&order=desc&sort=reputation&site=stackoverflow';
    console.log('FETCHING USERS...');
    let users = await fetch(api_users);
    users = await users.json();
    users = users.items;
    let usernames = [];
    for (let u of users) {
        u.display_name = u.display_name.replace(/\s/g, '');
        usernames.push(u.display_name);
        let username = u.display_name;
        await logic.createUser({username: username, password: '1234'});
    }

    let api_questions = 'https://api.stackexchange.com/2.2/questions?page=1&pagesize=100&order=desc&sort=votes&site=stackoverflow&filter=!)re8-BBUBJzv57oJHqDe';
    let questions = await fetch(api_questions);
    questions = await questions.json();
    // console.log('questions: ', questions);
    questions = questions.items;
    // console.log('questions: ', questions);
    let i = 0;
    for (let q of questions) {
        let random_user = usernames[Math.round(Math.random() * (usernames.length - 1))];
        let questionId = await logic.newQuestion({tags: q.tags, title: q.title, body: q.body, username: random_user});
        // console.log(q);

        for (let a of q.answers) {
            random_user = usernames[Math.round(Math.random() * (usernames.length - 1))];
            await logic.newAnswer(questionId, {body: a.body, username: random_user});
        }
        console.log('question ', i);

        i++;
    }

}

async function randomLikesQuestions() {
    let users = await logic.getAllUsers();
    console.log(users);
    let questions = await logic.getAllQuestions();
    let j = 0;
    for (let q of questions) {
        let randomLikes = Math.round(Math.random() * 15);
        for (let i = 0; i < randomLikes; i++) {
            let randomUser = users[Math.round(Math.random() * (users.length - 1))];
            await logic.likeQuestion(q.id, randomUser);
        }
        console.log('question: ', j);
        j++;
    }
}

async function randomLikesAnswers() {
    let users = await logic.getAllUsers();
    console.log(users);
    let questions = await logic.getAllQuestions();
    let j = 0;
    for (let q of questions) {
        let randomLikes = Math.round(Math.random() * 20);
        for (let i = 0; i < randomLikes; i++) {
            let randomUser = users[Math.round(Math.random() * (users.length - 1))];
            let randomAnswer = q.answers[Math.round(Math.random() * (q.answers.length - 1))];
            await logic.likeAnswer(randomAnswer, randomUser);
        }
        console.log('question: ', j);
        j++;
    }
}

(async () => {
    // const url = 'mongodb://127.0.0.1:27017';
    // const dbName = 'forum_test';
    const url = 'mongodb+srv://chris:ClXgGz5Wn5DYrka1@cluster0-rdvz2.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'forum';
    await logic.connectToDb(url, dbName);
    await logic.db.collection('counters').insertOne({name: 'questionId', value: 0});
    await logic.db.collection('counters').insertOne({name: 'answerId', value: 0});
    setLogic(logic);
    // console.log('FILLING DATABASE');
    // await fillDatabase();
    // await randomLikesQuestions();
    // await randomLikesAnswers();
})();
