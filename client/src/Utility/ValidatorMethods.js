
export function userNameValidator(username){
    let validUserName = /^[a-zA-Z0-9-._]{4,20}$/
    return validUserName.test(username) 
}

export function emailValidator(email){
    let validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return validEmail.test(email)
}

export function passwordValidator(password){
    let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,20}$/
    return validPassword.test(password)
}
