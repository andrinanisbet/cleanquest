//hook used to dispatch state into Redux to persist logged in user
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, clearCurrentUser, setIsCheckingAuth } from "../store/authSlice";

export default function usePersistAuth () {
const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    //if no token in local storage, clear current user and auth checking in Redux store as no user logged in
    if(!token){
      dispatch(clearCurrentUser());
      //setIsCheckingAuth called without payload, set to false by the reducer
      dispatch(setIsCheckingAuth());
      return;
    }

    const checkUser = async() => {
      try {
            const response = await fetch("http://localhost:3001/api/auth/me",{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
          });

          const data = await response.json();

          if (response.ok){
            dispatch(setCurrentUser(data.user));
            dispatch(setIsCheckingAuth());
          } else {
              localStorage.removeItem("token");
              dispatch(clearCurrentUser());
              dispatch(setIsCheckingAuth());
            }
      //catch logs user out if an error occurs in fetch as a fallback since token can't be verified
      } catch (error) {
            localStorage.removeItem("token");
            dispatch(clearCurrentUser());
            dispatch(setIsCheckingAuth());
      }
    }

    checkUser();

  }, [dispatch]);

}