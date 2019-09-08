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
var logic = require('../src/logic');
var url = 'mongodb://127.0.0.1:27017';
var dbName = 'forum_test';
beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, logic.connectToDb(url, dbName)];
            case 1:
                _a.sent();
                return [4 /*yield*/, logic.db.collection('counters').insertOne({ name: 'questionId', value: 0 })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, logic.db.dropDatabase()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('create user', function () {
    var username = 'user';
    var password = '123';
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.createUser({ username: username, password: password })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('match password returns true', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.match(username, password)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('match wrong password returns false', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.match(username, 'asdf')];
                case 1:
                    result = _a.sent();
                    expect(result).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('match inexistent username return false', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.match('asdf', password)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('new user has no questions', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getUserQuestions(username)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('new user has no answers', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getUserAnswers(username)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('create question', function () {
    var username = 'user';
    var newQuestion = { title: 'Question title', body: 'Question body', username: username };
    var questionId;
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.newQuestion(newQuestion)];
                case 1:
                    questionId = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('get created question returns same question', function () { return __awaiter(_this, void 0, void 0, function () {
        var question;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getQuestion(questionId)];
                case 1:
                    question = _a.sent();
                    expect(question).toMatchObject(newQuestion);
                    return [2 /*return*/];
            }
        });
    }); });
    test('adds question id to users question list', function () { return __awaiter(_this, void 0, void 0, function () {
        var userQuestions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getUserQuestions(username)];
                case 1:
                    userQuestions = _a.sent();
                    expect(userQuestions).toContain(questionId);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('answer question ', function () {
    var answerId;
    var questionId = 0;
    var username = 'user';
    var newAnswer = { body: 'Answer body', username: username };
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.newAnswer(questionId, newAnswer)];
                case 1:
                    answerId = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('get answer returns same answer', function () { return __awaiter(_this, void 0, void 0, function () {
        var answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getAnswer(answerId)];
                case 1:
                    answer = _a.sent();
                    expect(answer).toMatchObject(newAnswer);
                    return [2 /*return*/];
            }
        });
    }); });
    test('adds answer to question\'s answers', function () { return __awaiter(_this, void 0, void 0, function () {
        var questionAnswers;
        return __generator(this, function (_a) {
            questionAnswers = logic.getAnswers(questionId);
            expect(questionAnswers).toContain(answerId);
            return [2 /*return*/];
        });
    }); });
    test('adds answer to user\'s answers', function () { return __awaiter(_this, void 0, void 0, function () {
        var userAnswers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logic.getUserAnswers(username)];
                case 1:
                    userAnswers = _a.sent();
                    expect(userAnswers).toContain(answerId);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=test.js.map