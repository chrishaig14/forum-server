import {Db, MongoClient} from 'mongodb';

export let db: Db;

export async function connectToDb(url: string, dbName: string) {
    let promise = new Promise((resolve, reject) => {
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
                if (err !== null) {
                    console.log('ERROR CONNECTING TO DATABASE: ', err);
                }
                console.log('Connected successfully to server');
                db = client.db(dbName);
                resolve();
                // client.close();
            });
        }
    );
    return promise;
}

export const getAnswer = async answerId => {
    let answer = await db.collection('answers').findOne({id: answerId});
    return answer;
};

export const getUserAnswers = async username => {
    let {answers} = await db.collection('users').findOne({username}, {projection: {answers: 1, _id: 0}});
    return answers;
};

export const getAnswers = async questionId => {

};

export const newQuestion = async (question) => {
    let {value} = await db.collection('counters').findOne({name: 'questionId'});
    await db.collection('questions').insertOne({...question, id: value});
    await db.collection('users').updateOne({username: question.username}, {$push: {'questions': value}});
    await db.collection('counters').updateOne({name: 'questionId'}, {$set: {'value': value + 1}});
    return value;
};

export const getQuestion = async (questionId) => {
    let question = await db.collection('questions').findOne({id: questionId});
    return question;
};

export const getUserQuestions = async (username) => {
    let {questions} = await db.collection('users').findOne({username}, {projection: {questions: 1, _id: 0}});
    return questions;
};

export const newAnswer = async (questionId, answer) => {
    let {value} = await db.collection('counters').findOne({name: 'answerId'});
    await db.collection('answers').insertOne({...answer, id: value});
    await db.collection('users').updateOne({username: answer.username}, {$push: {'answers': value}});
    await db.collection('counters').updateOne({name: 'answerId'}, {$set: {'value': value + 1}});
    return value;
};

export const createUser = async (user) => {
    await db.collection('users').insertOne({...user, questions: [], answers: []);
};

export const match = async (username, password) => {
    let result = await db.collection('users').findOne({username, password});
    return result;
};

