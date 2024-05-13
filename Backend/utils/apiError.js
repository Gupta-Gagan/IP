class apiError extends Error{
    constructor(statusCode, message="something went wrong", errors=[]){
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.errors = errors

    }
}

export {apiError}