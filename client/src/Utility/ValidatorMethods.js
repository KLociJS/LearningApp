
export function userNameValidator(username){
    let validUserName = /^[a-zA-Z0-9-._]{4,20}$/
    return validUserName.test(username) 
}

export function emailValidator(email){
    let validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return validEmail.test(email)
}

export function passwordValidator(password){
    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*(.).*\1)[a-zA-Z\d\W]{6,}$/
    return validPassword.test(password)
}
