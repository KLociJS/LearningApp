using WebAPI.Models.Enums;

namespace WebAPI.Models.ResultModels;

public class OperationResult
{
        public bool Succeeded { get; private set; }
        public Result Data { get; private set; }

        private OperationResult(bool isSuccess, Result data)
        {
            Succeeded = isSuccess;
            Data = data;
        }

        public static OperationResult Success(string description)
        {
            var result = new Result() { Description = description };
            return new OperationResult(true, result);
        }

        public static OperationResult InvalidInput(string description)
        {
            var result = new Result() { ErrorType = ErrorType.Client ,Description = description };
            return new OperationResult(false, result);
        }

        public static OperationResult UserNameExists()
        {
            var result = new Result() { ErrorType = ErrorType.UserName, Description = "Username already in use." };
            return new OperationResult(false, result);
        }

        public static OperationResult EmailExists()
        {
            var result = new Result() { ErrorType = ErrorType.Email, Description = "Email already in use." };
            return new OperationResult(false, result);
        }

        public static OperationResult ServerError()
        {
            var result = new Result() { ErrorType = ErrorType.Server, Description = "An error occured on the server." };
            return new OperationResult(false, result);
        }
    }