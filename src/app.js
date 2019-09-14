'use strict';
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
var express_1 = require("express");
var cors = require('cors');
var logic;
var express = require('express');
var app = express();
var corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization', 'Content-Type']
};
app.use(cors(corsOptions));
app.use(express_1.json());
app.post('/users', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, logic.createUser(request.body.user)];
            case 1:
                _a.sent();
                response.status(204).end();
                return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, password, result, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body.user, username = _a.username, password = _a.password;
                return [4 /*yield*/, logic.match(username, password)];
            case 1:
                result = _b.sent();
                token = username;
                if (result) {
                    response.status(204).set('Authorization', token).end();
                }
                else {
                    response.status(401).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/questions', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var newQuestion, question, questionId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newQuestion = request.body.question;
                question = __assign({}, newQuestion, { username: request.headers['authorization'] });
                return [4 /*yield*/, logic.newQuestion(question)];
            case 1:
                questionId = _a.sent();
                response.status(200).json({ questionId: questionId }).end();
                return [2 /*return*/];
        }
    });
}); });
app.get('/questions', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var questions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, logic.getAllQuestions()];
            case 1:
                questions = _a.sent();
                response.status(200).json({ questions: questions }).end();
                return [2 /*return*/];
        }
    });
}); });
app.get('/questions/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, question;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.getQuestion(id)];
            case 1:
                question = _a.sent();
                if (question) {
                    response.status(200).json({ question: question }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/questions/:id/answers', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, answerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.newAnswer(id, __assign({}, request.body.answer, { username: request.headers['authorization'] }))];
            case 1:
                answerId = _a.sent();
                if (answerId) {
                    response.status(200).json({ answerId: answerId }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/questions/:id/answers', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.getAnswers(id)];
            case 1:
                answers = _a.sent();
                if (answers) {
                    response.status(200).json({ answers: answers }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:id/questions', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, questions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.getUserQuestions(id)];
            case 1:
                questions = _a.sent();
                if (questions) {
                    response.status(200).json({ questions: questions }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:id/answers', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.getUserAnswers(id)];
            case 1:
                answers = _a.sent();
                if (answers) {
                    response.status(200).json({ answers: answers }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/answers/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, logic.getAnswer(id)];
            case 1:
                answer = _a.sent();
                if (answer) {
                    response.status(200).json({ answer: answer }).end();
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
app.put('/answers/:id/likes', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, username;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                username = request.headers['authorization'];
                return [4 /*yield*/, logic.likeAnswer(id, username)];
            case 1:
                _a.sent();
                response.status(204).end();
                return [2 /*return*/];
        }
    });
}); });
app.delete('/answers/:id/likes', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, username;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                username = request.headers['authorization'];
                return [4 /*yield*/, logic.unlikeAnswer(id, username)];
            case 1:
                _a.sent();
                response.status(204).end();
                return [2 /*return*/];
        }
    });
}); });
module.exports = {
    app: app.listen(8000), setLogic: function (l) {
        logic = l;
    }
};
//# sourceMappingURL=app.js.map