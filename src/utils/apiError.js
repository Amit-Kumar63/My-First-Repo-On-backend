class ApiError extends Error{
  constructor(
    statusCode,
    message= "Somthing went Wrong",
    errors = [],
    statcks = ""
  ){
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors
  }
}
export {ApiError}