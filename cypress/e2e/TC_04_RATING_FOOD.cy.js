describe("TC 04: Xem chi tiết và đánh giá sản phẩm", () => {
  it("1. Xem chi tiết và đánh giá sản phẩm CAFE", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get(".item-details").click();

    cy.get(".modal").should("be.visible");

    cy.get(".modal .modal-info .modal-info-name").should("have.text", "cafe");
    cy.get(".modal .modal-info .modal-info-price").should("have.text", "$ 30");

    cy.get("#likecounter").then(($likeCounter) => {
      const currentLikeCounter = parseInt($likeCounter.text(), 10);

      const CLICK_COUNT = 10;
      for (let i = 0; i < CLICK_COUNT; i++) {
        cy.get('button[name="like11"] > img').click();
      }

      cy.get("#likecounter").should(($newLikeCounter) => {
        const newLikeCounter = parseInt($newLikeCounter.text(), 10);
        expect(newLikeCounter).to.equal(currentLikeCounter + CLICK_COUNT);
      });
    });
  });
});
