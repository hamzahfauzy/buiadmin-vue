import HttpService from "./services/http.service."
export default class Auth {

    // data {username, password}
    static async login(data){
        // console.log(data)
        const response = await HttpService.post('/auth/login', JSON.stringify(data), {
            headers: {
                'content-type':'application/json'
            }
        })

        if(response.statusText == 'OK')
        {
            this.setToken(response.data.token)
            return response.data
        }
        
        return false
    }

    static async fetchProfile(){
        try {
            const response = await HttpService.get('/me')
            return response.statusText == 'OK' ? response.data : false
        } catch (error) {
            
        }

        return false
    }

    static logout(){
        this.removeToken()
        return true
    }

    static forgotPassword(username){

    }

    // data {username, password, confirmPassword}
    static resetPassword(data){

    }

    static setToken(token){
        localStorage.setItem('token', token)
    }

    static removeToken(){
        localStorage.removeItem('token')
    }

    static getToken(){
        return localStorage.getItem('token')
    }

    static user(){
        const token = this.getToken()
    }

}