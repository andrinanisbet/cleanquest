import { describe, it, expect } from "vitest";
import locationReducer, { setSelectedLocation, clearSelectedLocation} from "./locationSlice";


describe("locationSlice", () => {
    //test for set selected location
    it("should set the value of selectedLocation", () => {
        const startingState = { selectedLocation: null};
        const newState = locationReducer(startingState, setSelectedLocation({ lat: 51.75, lng: -2.22}));
        expect(newState.selectedLocation).toEqual({ lat: 51.75, lng: -2.22})
    }); 

    //test for clear current user
    it("should clear the value of selectedLocation", () => {
        const startingState = { selectedLocation: { lat: 51.75, lng: -2.22}};
        const newState = locationReducer(startingState, clearSelectedLocation());
        expect(newState.selectedLocation).toBe(null)
    }); 
}); 




