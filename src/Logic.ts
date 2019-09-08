interface Logic {

    getAnswer: (answerId: number) => Promise<any>

    getUserAnswers: (username: string) => Promise<any[]>

    getAnswers: (questionId: number) => Promise<any[]>

    newQuestion: (question: any) => Promise<number>

    getQuestion: (questionId: number) => Promise<any>

    getUserQuestions: (username: string) => Promise<any[]>

    newAnswer: (questionId: number, answer: any) => Promise<number>

    createUser: (user: any) => Promise<void>

    match: (username: string, password: string) => Promise<any>
}
