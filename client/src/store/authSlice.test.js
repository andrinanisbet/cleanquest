import { describe, it, expect } from "vitest";
import authReducer, { setCurrentUser, clearCurrentUser } from "./authSlice";


describe("authSlice", () => {
    //test for set current user
    it("should set the value of currentUser", () => {
        const startingState = { currentUser: null};
        const newState = authReducer(startingState, setCurrentUser("Mike"));
        expect(newState.currentUser).toBe("Mike")
    }); 

    //test for clear current user
    it("should clear the value of currentUser", () => {
        const startingState = { currentUser: "Mike"};
        const newState = authReducer(startingState, clearCurrentUser());
        expect(newState.currentUser).toBe(null)
    }); 
}); 



