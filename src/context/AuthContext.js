import { createContext, useState, useCallback } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [ authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [ user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // let [ loading, setLoading ] = useState(true)

    localStorage.setItem('user', JSON.stringify(user))

    let history = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/employees"
    // console.log(location)
    // console.log(user)
    let loginUser = async (e) => {
        e.preventDefault()
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", e.target.email.value);
        urlencoded.append("password", e.target.password.value);
        let response = await fetch(`https://housing-api.stag.mpao.mv/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded
        })
        let data = await response.json();
        // console.log(data)
        
        if (response.status === 200) {
            console.log(JSON.stringify(data))
            setAuthTokens(data);
            // setUser(jwt_decode(data));
            localStorage.setItem('authTokens', JSON.stringify(data));
            history(from, {replace: true});
        } else {
            console.log('Something went wrong!');
        }
    }

    let logoutUser = useCallback(() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        history('/')
    }, [history]);

    // let updateToken = useCallback( async () => {
    //     // console.log('update token')
    //     let response = await fetch(`${process.env.REACT_APP_BACKEND}/api/token/refresh/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({'refresh': authTokens?.refresh})
    //     })
    //     const data = await response.json()
    //     // console.log(data)
        
    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     } else {
    //         // console.log(authTokens)
    //         logoutUser()
    //     }
    //     // console.log(window.location.pathname === String('/dashboard'))
    //     if (loading) {
    //         setLoading(false)
    //     }


    // }, [authTokens?.refresh, loading, logoutUser])

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser: loginUser,
        logoutUser:logoutUser
    }

    // useEffect(() => {
    //     if (loading && authTokens) {
    //         updateToken();
    //     }

    //     let fourMinutes = 1000 * 60 * 4
    //     let interval = setInterval(() => {
    //         if (authTokens) {
    //             updateToken()
    //         }
    //     }, fourMinutes)

    //     return () => clearInterval(interval)

    // }, [authTokens, loading, updateToken])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}