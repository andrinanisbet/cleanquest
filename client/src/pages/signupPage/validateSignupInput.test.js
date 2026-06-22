import { describe, it, expect } from "vitest";
import validateSignupInput from "./validateSignupInput";

describe("validateSignupInput", () => {
    it ("should return false when username, email, password are provided, confirm password is given and matches password", () => {
        const result = validateSignupInput("Alice", "alice@test.com", "testpassword", "testpassword")
        expect(result).toEqual(false)
    })
    it("should return a message when a username is missing", () => {
        const result = validateSignupInput(null, "alice@test.com", "testpassword", "testpassword")
        expect(result).toEqual("Please enter a username, email and password")
    })
    it("should return a message when email is missing", () => {
        const result = validateSignupInput("Alice", null, "testpassword", "testpassword")
        expect(result).toEqual("Please enter a username, email and password")
    })
    it("should return a message when a password is missing", () => {
        const result = validateSignupInput("Alice", "alice@test.com", null, "testpassword")
        expect(result).toEqual("Please enter a username, email and password")
    })
    it("should return a message when a confirm password is missing", () => {
        const result = validateSignupInput("Alice", "alice@test.com", "testpassword", null)
        expect(result).toEqual("Please confirm your password")
    })
    it("should return a message when password does not match confirm password", () => {
        const result = validateSignupInput("Alice", "alice@test.com", "testpassword", "alicepassword")
        expect(result).toEqual("Passwords do not match")
    })

})