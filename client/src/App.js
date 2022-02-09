import './App.css';
import Header from'./Header.js'
import Home from'./Home.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { useStateValue } from './stateProvider';
import Addproduct from './Addproduct';
import Details from './Details';
import Update from './Update';
import Products from './Products';

function App() {
  const [{arrayLength,user}, dispatch]= useStateValue();
  const setUser=(savedRaw)=>{
    if(savedRaw){let saved=JSON.parse(savedRaw);
     if((saved.username!==null || saved.username!==undefined) &&
       (user?.username===undefined || user?.username===null )){
      dispatch({type:'SET_USER',user: {username: saved.username,token: saved.token,}})
      }
    }
  }
  const unsetUser=(savedRaw)=>{
    if(( savedRaw===null || savedRaw===undefined) &&
     (user?.username !==null || user?.username !==undefined)){
      dispatch({type:'SET_USER',user:null })
    }
  }
window.addEventListener('storage', () => {
  const savedRaw=localStorage.getItem("storageUser")
  //user empty and storage full, we want to authenticate in the other tabs
  setUser(savedRaw)
  //user full and storage empty, we want to unauthenticate in the other tabs
  unsetUser(savedRaw)
});
useEffect(() => {
  const savedRaw=localStorage.getItem("storageUser")
  setUser(savedRaw)
}, []);
  return (
    <BrowserRouter>
      <div className="text-stone-600 bg-white flex flex-col ">
        
          <Routes>
            <Route  path="/login" element={<Login />} />
            <Route  path="/" element={<Header />} >
              <Route path="" element={<Home />} />
              <Route path="addProduct" element={<Addproduct />} />
              <Route path="details" element={<Details />} />
              <Route path="update" element={<Update />} />
              <Route path="products" element={<Products />} />
              <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
            </Route>
          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
