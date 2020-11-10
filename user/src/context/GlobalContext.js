import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// Initial state
const initialState = {
  tender: [],
  user: [],
  currentUser: [],
  error:null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [user , setUser] = useState('')

  async function getCurrentUser(id){
  const res = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
    const data = await res.data.data;
    if(data){
      setUser(data);
    }
}
 async function addedTender(tender) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/tender', tender , config);
            // res = await response.data.data;
            console.log(res);
            dispatch({
                type: 'ADD_TENDER',
                payload: res.data.data
              });
        } 
        catch (err) {
            dispatch({
                type: 'TENDER_ERROR',
                payload: err.response.data.error
              });
        }
    }
    
   async function addedUser(user) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/user', user , config);
            // res = await response.data.data;
            console.log(res);
            dispatch({
                type: 'ADD_USER',
                payload: res.data.data
              });
        } 
        catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
              });
        }
    }


  return (
    <GlobalContext.Provider
      value={{
        tender:state.tender,
        user:state.user,
        error:state.error,
        user,
        addedTender,
        addedUser,
        getCurrentUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
