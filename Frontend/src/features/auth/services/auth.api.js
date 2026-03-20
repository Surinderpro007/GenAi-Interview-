import axios from 'axios'

const api = axios.create({
    baseURL:"https://genai-interview-production.up.railway.app",
    withCredentials: true
})

export async function register({username, email, password}) {
    
    try{
    const response = await api.post('/api/auth/register',{
        username, email, password
    })
    return response.data
    }
    catch(err){
    console.log(err)
    return null
}
}



export async function login({ email, password }) {

    try{
        const response = await api.post('/api/auth/login',{
            email,
            password
        })

        return response.data
    }
    catch(err){
    console.log(err)
    return null
}
}

export async function logout() {
    try{
    const response = await api.get('/api/auth/logout')
    return response.data
    }
    catch(err){
    console.log(err)
    return null
}
}

export async function getMe(params) {
      try{
    const response = await api.get('/api/auth/get-me')
    return response.data
    }
    catch(err){
    console.log(err)
    return null
}
}