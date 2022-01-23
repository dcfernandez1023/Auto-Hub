import { useState } from 'react';
import { AuthController } from '../../controllers/AuthController';

const LoginService = () => {
    const[loginEmail, setLoginEmail] = useState<string>("");
    const[loginPwd, setLoginPwd] = useState<string>("");

    const[registerEmail, setRegisterEmail] = useState<string>("");
    const[registerPwd, setRegisterPwd] = useState<string>("");

    const[isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitCallback = () => {
        setIsLoading(false);
    }

    const onSubmitError = (error: any) => {
        alert(error.message);
        setIsLoading(false);
    }

    const onLogin = () => {
        if(loginEmail.trim().length === 0 || loginPwd.trim().length === 0) {
            alert("Please enter your login email and password");
            return;
        }
        AuthController.standardLogin(loginEmail, loginPwd, onSubmitCallback, onSubmitError);
    }

    const onRegister = () => {
        if(registerEmail.trim().length === 0 || registerPwd.trim().length === 0) {
            alert("Please enter your registration email and password");
            return;
        }
        AuthController.standardRegister(registerEmail, registerPwd, onSubmitCallback, onSubmitError);
    }

    const onGoogleSignin = () => {
        AuthController.googleSignIn(
            () => {return},
            (error: any) => {console.log(error.message)}
        );
    }

    return {
        loginEmail, setLoginEmail, 
        loginPwd, setLoginPwd, 
        registerEmail, setRegisterEmail, 
        registerPwd, setRegisterPwd,
        isLoading, setIsLoading,
        onSubmitError,
        onLogin,
        onRegister,
        onGoogleSignin
    };
}

export default LoginService;