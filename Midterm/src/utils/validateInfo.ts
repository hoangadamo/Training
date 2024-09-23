const validateInfo = (username: string, password: string) => {
    let check = true;
    if (username.length < 5 || password.length<8){
        check = false;
    }
    return check;
}

export default validateInfo;