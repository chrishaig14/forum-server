interface Logic {

    getAnswer: (answerId: string) => Promise<any>

    getUserAnswers: (username: string) => Promise<any[]>

    getAnswers: (questionId: string) => Promise<any[]>

    newQuestion: (question: any) => Promise<string>

    getQuestion: (questionId: string) => Promise<any>

    getUserQuestions: (username: string) => Promise<any[]>

    newAnswer: (questionId: string, answer: any) => Promise<string>

    createUser: (user: any) => Promise<void>

    match: (username: string, password: string) => Promise<any>
}
