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
  console.log()
  const [{arrayLength ,basket, user}, dispatch]= useStateValue();
  const setUser=(savedRaw)=>{
    if(savedRaw){let saved=JSON.parse(savedRaw);
     if((saved.username!==null || saved.username!==undefined) &&
       (user?.username===undefined || user?.username===null )){
      dispatch({type:'SET_USER',user: {username: saved.username,token: saved.token,}})
      }
    }
  }
  // const setBasket=(savedBasket)=>{
  //   dispatch({type:'SET_BASKET',basket:savedBasket})

  // }
  const unsetUser=(savedRaw)=>{
    if(( savedRaw===null || savedRaw===undefined) &&
     (user?.username !==null || user?.username !==undefined)){
      dispatch({type:'SET_USER',user:null })
    }
  }
window.addEventListener('storage', () => {
  if(user!==JSON.parse(localStorage.getItem("storageUser"))){
    const savedRaw=localStorage.getItem("storageUser")
    //user empty and storage full, we want to authenticate in the other tabs
    setUser(savedRaw)
    //user full and storage empty, we want to unauthenticate in the other tabs
    unsetUser(savedRaw);
  }

  //on other tabs: check if baskets (state and storage) are the same
  const storageBasket=JSON.parse(localStorage.getItem("basket"));

  if(storageBasket?.length!== basket?.length){
    //if baskets (state and storage) are the not the same, update state
    const savedBasket=JSON.parse(localStorage.getItem("basket"))
    dispatch({type:'SET_BASKET',basket:savedBasket})
  }
});
useEffect(() => {
  //setting user when tab loads
  const savedUser=localStorage.getItem("storageUser");
  setUser(savedUser);

  //setting basket when tab loads,
  //on fisrt load of the entire app, storage is empty 
  //set it to empty array, but with JSON.stringify for arrays
  const isStoragEmpty=localStorage.getItem("basket")
  isStoragEmpty==null && localStorage.setItem("basket",JSON.stringify([]));

  //use storage to set basket
  const savedBasket=JSON.parse(localStorage.getItem("basket")) || [];
  // console.log(basket)

  dispatch({type:'SET_BASKET',basket:savedBasket})
}, []);
  return (
    <BrowserRouter>
      <div className="text-stone-600 bg-white flex flex-col w-screen">
        
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
