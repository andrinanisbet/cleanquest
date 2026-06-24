import { describe, it, expect, vi } from "vitest";
import getHotspotsData from "./getHotspotsData";

describe("getHotspotsData", () => {
    it("should return the data when the fetch succeeds", async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({username: "Test User"}),
        });

        const result = await getHotspotsData();
        expect(result).toEqual({username: "Test User"});
    })
    it("should throw an error when the fetch fails", async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect (getHotspotsData()).rejects.toThrow("Request failed: 404")
    });
});
