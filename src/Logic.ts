import {db} from './logic';

interface Logic {

    getAnswer: (answerId: string) => Promise<any>

    getUserAnswers: (username: string) => Promise<any[]>

    getAnswers: (questionId: string) => Promise<any[]>

    newQuestion: (question: any) => Promise<string>

    getQuestion: (questionId: string) => Promise<any>

    getUserProfile: (username: string) => Promise<any>

    getAllQuestions: () => Promise<any[]>

    search: (query: any) => Promise<any[]>

    likeAnswer: (answerId: string, username: string) => Promise<void>;

    unlikeAnswer: (answerId: string, username: string) => Promise<void>;

    getUserQuestions: (username: string) => Promise<any[]>

    newAnswer: (questionId: string, answer: any) => Promise<string>

    createUser: (user: any) => Promise<void>

    match: (username: string, password: string) => Promise<any>
}
