import { describe, it, expect } from "vitest";
import validateLoginInput from "./validateLoginInput";


describe("validateEmailAddress", () => {

    //test for validate login input
    it ("should return false when email and password are both provided", () => {
        let result = validateLoginInput("fred@test.com", "password")
        expect(result).toEqual(false)
    })
    it ("should return a message when password is missing", () => {
        let result = validateLoginInput("fred@test.com", null)
        expect(result).toEqual("Please enter email and password")
    })
    it ("should return a message when email is missing", () => {
        let result = validateLoginInput(null, "password")
        expect(result).toEqual("Please enter email and password")
    })
    it ("should return a message when both email and password are missing", () => {
        let result = validateLoginInput(null, null)
        expect(result).toEqual("Please enter email and password")
    })


}); 