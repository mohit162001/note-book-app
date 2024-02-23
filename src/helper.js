import { redirect } from "react-router-dom"

export function storeData(data){
    const {user,jwt} = data
    localStorage.setItem("username",user.username);
    localStorage.setItem("uid",user.id);
    localStorage.setItem('email',user.email)
    localStorage.setItem("jwt-token",jwt);
}

export function checkAuth(){
    const token = getToken()
    if(!token){
        return redirect('/login')
    }
    return null 
}

export function getToken(){
    const token = localStorage.getItem('jwt-token');
    return token
}

export function clearCredential(){
    localStorage.clear();
}