describe(`"New Normal Order" should show up in Pending area`, () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#normal-order").click();
    cy.get("#pending-area").contains("1");
  });
});

describe("VIP orders shows up before normal orders", () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#normal-order").click();
    cy.get("#normal-order").click();
    cy.get("#vip-order").click();
    cy.get("#VIP-list").contains("3");
  });
});

describe("Order number should be unique & increasing", () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#normal-order").click();
    cy.get("#pending-area").contains("1");
    cy.get("#pending-area").not(`:contains("2")`);
    cy.get("#normal-order").click();
    cy.get("#pending-area").contains("2");
    cy.get("#pending-area").not(`:contains("3")`);
  });
})

describe("Bot creation start process orders and move to Complete", () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#normal-order").click();
    cy.get("#vip-order").click();
    cy.get("#bot-create").click();
    cy.get("#bot-2").should("not.exist");
    cy.get("#bot-1").contains("2");
    cy.wait(10 * 1000);
    cy.get("#completed-area").contains("2");
    cy.get("#completed-area").not(`:contains("1")`);
    cy.get("#bot-1").contains("1");
    cy.wait(10 * 1000);
    cy.get("#completed-area").contains("1");
  });
})

describe("Bot does nothing until a order comes in", () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#bot-create").click();
    cy.get("#bot-create").click();
    cy.get("#bot-1").not(`:contains("1")`);
    cy.get("#normal-order").click();
    cy.get("#bot-1").contains("1");
  });
})

describe("Destroy and recreation of bot matches orders again correctly", () => {
  it("test", () => {
    cy.visit("http://localhost:3000");
    cy.get("#normal-order").click();
    cy.get("#normal-order").click();
    cy.get("#vip-order").click();
    cy.get("#bot-create").click();
    cy.get("#bot-create").click();
    cy.get("#bot-1").contains("3");
    cy.get("#bot-2").contains("1");
    cy.get("#bot-destroy").click();
    cy.get("#bot-destroy").click();
    cy.get("#bot-create").click();
    cy.get("#bot-create").click();
    cy.get("#bot-1").contains("3");
    cy.get("#bot-2").contains("1");
  });
})
