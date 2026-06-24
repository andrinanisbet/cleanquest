import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, clearCurrentUser, setIsCheckingAuth } from "../store/authSlice";

export default function usePersistAuth () {
const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      dispatch(clearCurrentUser());
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

      } catch (error) {
            localStorage.removeItem("token");
            dispatch(clearCurrentUser());
            dispatch(setIsCheckingAuth());
      }
    }

    checkUser();

  }, [dispatch]);

}