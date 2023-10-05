using WebAPI.Models.Enums;
using WebAPI.Models.ResponseDto;

namespace WebAPI.Models.ResultModels;

public class RegisterResult
{
        public bool Succeeded { get; private set; }
        public Result Data { get; private set; }

        public RegisterResult(bool isSuccess, Result data)
        {
            Succeeded = isSuccess;
            Data = data;
        }

        public static RegisterResult Success(string description)
        {
            var result = new Result() { Description = description };
            return new RegisterResult(true, result);
        }

        public static RegisterResult UserNameExists()
        {
            var result = new Result() { ErrorType = ErrorType.UserName, Description = "Username already in use." };
            return new RegisterResult(false, result);
        }

        public static RegisterResult EmailExists()
        {
            var result = new Result() { ErrorType = ErrorType.Email, Description = "Email already in use." };
            return new RegisterResult(false, result);
        }

        public static RegisterResult ServerError()
        {
            var result = new Result() { ErrorType = ErrorType.Server, Description = "An error occured on the server." };
            return new RegisterResult(false, result);
        }
    }