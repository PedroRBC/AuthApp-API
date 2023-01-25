declare namespace Express {
    interface Request {
        user: {
            id: string,
            username: string,
            password: string,
            admin: boolean
        }
    }
}