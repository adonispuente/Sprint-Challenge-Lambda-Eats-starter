describe("Testing our volunteer form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/pizza");
  });
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]').type("Adonis");

    cy.get("textarea[name=instructions]")
      .type("blabla son im ordering a pizza")
      .should("have.value", "blabla son im ordering a pizza");
    cy.get("[type=checkbox]")
      .check()
      .should("be.checked");
    cy.get("select")
      .select("Medium")
      .should("have.value", "Medium");

    // cy.get("checkbox[name='red']")
    //   .check()
    //   .should("be.checked");
    // cy.get("checkbox[name='garlic']")
    //   .check()
    //   .should("be.checked");
    // cy.get("checkbox[name=bbq]")
    //   .check()
    //   .should("be.checked");
    // cy.get("checkbox[name=spinach]")
    //   .check()
    //   .should("be.checked");
    cy.get("button").click();
  });
});
