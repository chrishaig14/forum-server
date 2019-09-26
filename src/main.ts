import * as logic from './logic';

const {app, setLogic} = require('../src/app');

(async () => {
    // const url = 'mongodb://127.0.0.1:27017';
    // const dbName = 'forum_test';
    const url = 'mongodb+srv://chris:ClXgGz5Wn5DYrka1@cluster0-rdvz2.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'forum';
    await logic.connectToDb(url, dbName);
    await logic.db.collection('counters').insertOne({name: 'questionId', value: 0});
    await logic.db.collection('counters').insertOne({name: 'answerId', value: 0});
    setLogic(logic);
})();
