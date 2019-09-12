import * as logic from './logic';

const {app, setLogic} = require('../src/app');

(async () => {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'forum_test';
    await logic.connectToDb(url, dbName);
    await logic.db.collection('counters').insertOne({name: 'questionId', value: 0});
    await logic.db.collection('counters').insertOne({name: 'answerId', value: 0});
    setLogic(logic);
})();
