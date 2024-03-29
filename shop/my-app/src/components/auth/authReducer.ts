import { AuthUserActionType, IAuthUser, IUser } from "./types"

const initState : IAuthUser = {
    isAuth: false
}

// const initState : IAuthUser = {
//     isAuth: true,
//     user: {
//         email: "test@gmail.com",
//         image: "1.jpg",
//         phone: "+38(097)483 24 24"
//     }
// }

export const AuthReducer = (state=initState, action: any) : IAuthUser => {
    switch(action.type) {
        case AuthUserActionType.LOGIN_USER: {
            const user : IUser= action.payload as IUser;
            return {
                ...state,
                isAuth: true,
                user: user
            }
        }
        case AuthUserActionType.LOGOUT_USER: {
            
            return {
                ...state,
                isAuth: false,
                user: undefined
            }
        }
    }
    return state;
}