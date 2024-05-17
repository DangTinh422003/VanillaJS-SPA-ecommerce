describe("TC 03: Tìm kiếm và xem chi tiết sản phẩm", () => {
  it("1. Xem chi tiết sản phẩm CAFE", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get(".item-details").click();
    cy.get(".modal .modal-info .modal-info-name").should("have.text", "cafe");
    cy.get(".modal .modal-info .modal-info-price").should("have.text", "$ 30");
  });

  it("2. Xem chi tiết sản phẩm ROSQUILLA", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("rosquilla{enter}");
    cy.get(".item-details").click();
    cy.get(".modal .modal-info .modal-info-name").should(
      "have.text",
      "rosquilla"
    );
    cy.get(".modal .modal-info .modal-info-price").should("have.text", "$ 20");
  });
});
