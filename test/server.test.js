const request = require("supertest");
const app = require("../app");


describe("GET /google-sheet", () => {
  test("It should have coins values", async () => {
    const response = await request(app).get("/google-sheet");
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toStrictEqual(["Coin","Price","Volume","Cap"])
    expect(response.body[1]).toStrictEqual(["TestCoin1","$100","1000","$100BN"])
    expect(response.body[2]).toStrictEqual(["TestCoin2","$200","2000","$200BN"])    
    expect(response.statusCode).toBe(200);
  });
});


describe("POST /save-data", () => {
  test("It updates the coin value", async () => {
    const updatedCoin = await request(app)
      .post("/save-data")
      .send({
          newCoin: "TestCoin1",
          price:"$1000",
          volume: "10000",
          cap: "$1000BN"
      });

    expect(updatedCoin.statusCode).toBe(200);
    const response = await request(app).get("/google-sheet");
    expect(response.body.length).toBe(3);
  });
  test("It appends the coin value", async () => {
    const updatedCoin = await request(app)
      .post("/save-data")
      .send({
          newCoin: "TestCoin3",
          price:"$300",
          volume: "3000",
          cap: "$300BN"
      });

    expect(updatedCoin.statusCode).toBe(200);
    const response = await request(app).get("/google-sheet");
    expect(response.body.length).toBe(4);
  });
});