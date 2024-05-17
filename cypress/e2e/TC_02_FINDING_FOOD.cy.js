describe("TC 02: Tìm kiếm đồ  ăn", () => {
  it("1. Tìm kiếm đồ ăn", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get("h3.item-name").should("have.text", "cafe");
  });

  it("2. Tìm kiếm đồ ăn không tồn tại", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("         {enter}");
    cy.get(".Error404 h2").should("have.text", "Sin Resultados");
  });

  it("3. Tìm kiếm đồ ăn", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get("h3.item-name").should("have.text", "cafe");
  });

  it("4. Tìm kiếm đồ ăn có thêm khoảng trắng đầu và cuối", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("   cafe   {enter}");
    cy.get("h3.item-name").should("have.text", "cafe");
  });

  it("5. Tìm kiếm với UPPERCASE", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("CAFE{enter}");
    cy.get("h3.item-name").should("have.text", "cafe");
  });
});
