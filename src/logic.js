"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var dbClient;
function connectToDb(url, dbName) {
    return __awaiter(this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            promise = new Promise(function (resolve, reject) {
                mongodb_1.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                    if (err !== null) {
                        console.log('ERROR CONNECTING TO DATABASE: ', err);
                    }
                    console.log('Connected successfully to server');
                    exports.db = client.db(dbName);
                    resolve();
                    dbClient = client;
                    // client.close();
                });
            });
            return [2 /*return*/, promise];
        });
    });
}
exports.connectToDb = connectToDb;
function closeConnectionToDb() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbClient.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.closeConnectionToDb = closeConnectionToDb;
exports.getAnswer = function (answerId) { return __awaiter(_this, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('answers').findOne({ id: answerId })];
            case 1:
                answer = _a.sent();
                return [2 /*return*/, answer];
        }
    });
}); };
exports.getAllQuestions = function () { return __awaiter(_this, void 0, void 0, function () {
    var questions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('questions').find({}, { projection: { _id: 0 } })];
            case 1:
                questions = _a.sent();
                return [4 /*yield*/, questions.toArray()];
            case 2:
                questions = _a.sent();
                return [2 /*return*/, questions];
        }
    });
}); };
exports.getUserAnswers = function (username) { return __awaiter(_this, void 0, void 0, function () {
    var answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('users').findOne({ username: username }, { projection: { answers: 1, _id: 0 } })];
            case 1:
                answers = (_a.sent()).answers;
                return [2 /*return*/, answers];
        }
    });
}); };
exports.getAnswers = function (questionId) { return __awaiter(_this, void 0, void 0, function () {
    var answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('questions').findOne({ id: questionId }, { projection: { answers: 1, _id: 0 } })];
            case 1:
                answers = (_a.sent()).answers;
                return [2 /*return*/, answers];
        }
    });
}); };
exports.newQuestion = function (question) { return __awaiter(_this, void 0, void 0, function () {
    var value, questionId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('counters').findOne({ name: 'questionId' })];
            case 1:
                value = (_a.sent()).value;
                questionId = value.toString();
                return [4 /*yield*/, exports.db.collection('questions').insertOne(__assign({}, question, { id: questionId, answers: [], upvotes: 0, downvotes: 0 }))];
            case 2:
                _a.sent();
                return [4 /*yield*/, exports.db.collection('users').updateOne({ username: question.username }, { $push: { 'questions': questionId } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, exports.db.collection('counters').updateOne({ name: 'questionId' }, { $set: { 'value': value + 1 } })];
            case 4:
                _a.sent();
                return [2 /*return*/, questionId];
        }
    });
}); };
exports.getQuestion = function (questionId) { return __awaiter(_this, void 0, void 0, function () {
    var question;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('questions').findOne({ id: questionId })];
            case 1:
                question = _a.sent();
                return [2 /*return*/, question];
        }
    });
}); };
exports.getUserQuestions = function (username) { return __awaiter(_this, void 0, void 0, function () {
    var questions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('users').findOne({ username: username }, { projection: { questions: 1, _id: 0 } })];
            case 1:
                questions = (_a.sent()).questions;
                return [2 /*return*/, questions];
        }
    });
}); };
exports.newAnswer = function (questionId, answer) { return __awaiter(_this, void 0, void 0, function () {
    var value, answerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('counters').findOne({ name: 'answerId' })];
            case 1:
                value = (_a.sent()).value;
                answerId = value.toString();
                return [4 /*yield*/, exports.db.collection('answers').insertOne(__assign({}, answer, { id: answerId, questionId: questionId }))];
            case 2:
                _a.sent();
                return [4 /*yield*/, exports.db.collection('questions').updateOne({ id: questionId }, { $push: { 'answers': answerId } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, exports.db.collection('users').updateOne({ username: answer.username }, { $push: { 'answers': answerId } })];
            case 4:
                _a.sent();
                return [4 /*yield*/, exports.db.collection('counters').updateOne({ name: 'answerId' }, { $set: { 'value': value + 1 } })];
            case 5:
                _a.sent();
                return [2 /*return*/, answerId];
        }
    });
}); };
exports.createUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('users').insertOne(__assign({}, user, { questions: [], answers: [] }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.match = function (username, password) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.collection('users').findOne({ username: username, password: password })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
//# sourceMappingURL=logic.js.map