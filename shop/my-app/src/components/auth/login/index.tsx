import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";

const Login = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfViT4lAAAAANn54e_LEq1BNtOnPkD3HLFWSv4L">
            <LoginPage/>
        </GoogleReCaptchaProvider>
    )
}


export default Login;