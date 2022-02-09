import React, { useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useStateValue } from './stateProvider';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

export default function Header() {

    const [{ user}, dispatch]= useStateValue();
    const handleSignOut = ()=>{
        if(user){
            localStorage.removeItem("storageUser");
            dispatch({
                type:'SET_USER',
                user:null
              })
        }        
    }
    return (
        <div className="relative flex flex-col ">
            <div className="z-10 flex justify-around items-center h-20 bg-white bg-gradient-to-r from-rose-00 to-white border-b-yellow-800 border-b-2	fixed w-full top-0 left-0 ">
                <div  className="h-16  p-1 m-2 flex items-center gap-x-4">
                    {/* <Link className="h-16  " to={`/`}>
                        <img className="object-cover h-full rounded-md ring-yellow-800 ring-1" src="logo.png"  />
                    </Link> */}
                    <Link to={'/'} className='text-3xl  sm:inline' style={{fontFamily:['Patrick Hand']}}>
                        Full House Deco
                    </Link>
                </div>
                
                {user!=='' && user?.token && (
                <>
                    <Link to='/addProduct'><Button variant='outlined' color='success' ><AddIcon/></Button></Link>
                    <Link to={!user && '/login'}>
                        <Button color='error' variant='contained' onClick={handleSignOut} className="header__option">
                            <span className="header__optionLineTwo">Sign out</span>
                        </Button>
                    </Link>
                </>)}
            </div>
            <div  className="mt-20">
                <Outlet/>
            </div>
        </div>
    )
}
