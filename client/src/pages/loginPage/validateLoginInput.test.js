import { describe, it, expect } from "vitest";
import validateLoginInput from "./validateLoginInput";


describe("validateLoginInput", () => {

    it ("should return false when email and password are both provided", () => {
        const result = validateLoginInput("fred@test.com", "password")
        expect(result).toEqual(false)
    })
    it ("should return a message when password is missing", () => {
        const result = validateLoginInput("fred@test.com", null)
        expect(result).toEqual("Please enter email and password")
    })
    it ("should return a message when email is missing", () => {
        const result = validateLoginInput(null, "password")
        expect(result).toEqual("Please enter email and password")
    })
    it ("should return a message when both email and password are missing", () => {
        const result = validateLoginInput(null, null)
        expect(result).toEqual("Please enter email and password")
    })


}); 