import app from "../app";
import supertest from "supertest";
import { describe, test, expect, vi } from "vitest";
import config from "../config";

describe("root endpoint get and post", () => {
  test("get to / returns 200 and data", async () => {
    const result = await supertest(app).get("/");
    expect(result.statusCode).toEqual(200);
    expect(result.body.name).toBeTruthy();
  });

  test("post to / echoes json", async () => {
    const result = await supertest(app).post("/").send({
      test: "value",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toBeTruthy();
    expect(result.body.json.test).toBe("value");
  });

  test("404 & json returned from nonexistent route", async () => {
    const result = await supertest(app).get("/badPath");
    expect(result.statusCode).toEqual(404);
    expect(result.body.message).toBeTruthy();
  });

  test("500 & json returned from error dev server", async () => {
    const result = await supertest(app).get("/error");
    expect(result.statusCode).toEqual(500);
    expect(result.body.message).not.toBe("unknown error");
  });

  test("500 & json returned from error production server", async () => {
    config.nodeEnv = "production";

    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await supertest(app).get("/error");
    expect(console.error).toHaveBeenCalled();
    expect(result.statusCode).toEqual(500);
    expect(result.body.message).toBe("unknown error");
  });
});
