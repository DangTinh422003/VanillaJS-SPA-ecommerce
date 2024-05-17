describe("TC 06: Clear giỏ hàng", () => {
  it("1. Mua rồi clear giỏ hàng", () => {
    // 1. Open browser
    cy.visit("/");

    // 2. Click add to cart and count the number of clicks
    let counter = 0;
    cy.get("button.item-btn")
      .each(($el, index, $list) => {
        cy.wrap($el).click();
        counter++;
      })
      .then(() => {
        cy.log(counter);

        cy.get(".header-cart-counter span")
          .eq(1)
          .should("have.text", `(${counter.toString()})`);
      });

    // 3. Clear cart
    cy.get(".header-cart-title > img").click();
    cy.url().should("include", "#/cart");

    cy.get(".cartActions-btn > img").click();

    cy.get(".cartContainer").should("not.exist");
  });
});
