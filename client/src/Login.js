import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from './stateProvider';
import './styleSheets/login.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [{basket, user}, dispatch]= useStateValue();

    
    function handleLogin(e){
        e.preventDefault();
        const userToSend={
            email:email,
            password:password
        };
        fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(userToSend)
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.message==="Success"){
            dispatch({
            type:'SET_USER',
                user: {
                    username: data.username,
                    token: data.token,
                }
            })
            }
        })
    }
    function register(e){
        e.preventDefault();
        const user={
            email:email,
            username:username,
            password:password
        };
        fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(user)
        }).then(res=>res.json())
        .then(data=> console.log(data))
    }
    useEffect(() => {  
        if(user?.username!==null && user?.username!==undefined){
            localStorage.setItem("storageUser", JSON.stringify(user));
            let saved=JSON.parse(localStorage.getItem("storageUser"));
            saved.username!==null && saved.username!==undefined  && navigate('/');
        }
    },[user]);

    return (
        <div className="login flex flex-col  items-center justify-center h-screen">
         
            <Link to={'/'} className='text-3xl mb-6 sm:inline' style={{fontFamily:['Patrick Hand']}}>
                        Full House Deco
            </Link>
            <div className="login_container">
                <h1>Sign-In</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" className='border-2 border-slate-400' value={email} onChange={e=> setEmail(e.target.value)} id="" />

                    <h5>Password</h5>
                    <input type="password" className='border-2 border-slate-400' value={password} id="" onChange={e=> setPassword(e.target.value)} />

                    <button className='login__signInButton' type="submit" onClick={e=>handleLogin(e)}>Sign In</button>
                </form>

            </div>
         
            <Link to={'/'} className='text-3xl mt-6 sm:inline' style={{fontFamily:['Patrick Hand']}}>
                     <KeyboardBackspaceIcon/>   Go back
            </Link>
        </div>
    )
}
