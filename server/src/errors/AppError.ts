export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message)
        this.name = "AppError"
    }
}

export class NotFoundError extends AppError {
    constructor(resource:string = "Resource"){
        super(`${resource} not found`, 404)
        this.name = "NotFoundError"
    }
}

export class BadRequestError extends AppError {
    constructor(message:string = "Bad Request"){
        super(message, 400)
        this.name = "BadRequestError"
    }
}

export class InternalServerError extends AppError {
    constructor(message:string = "Internal Server Error"){
        super(message, 500)
        this.name = "InternalServerError"
    }
}