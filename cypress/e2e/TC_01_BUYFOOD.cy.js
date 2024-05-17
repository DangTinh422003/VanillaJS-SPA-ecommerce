describe("TC 01: Chọn mua thức ăn và đồ uống", () => {
  it("1. Click mua tất cả đồ ăn", () => {
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
  });

  it("2. Thêm sản phẩm vào giỏ và kiểm tra số lượng và tổng tiền", () => {
    cy.visit("/");

    let totalAmount = 0;
    let itemCount = 0;

    cy.get(".item")
      .each(($el) => {
        const priceText = $el.find(".item-price").text();
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        totalAmount += price;
        itemCount++;

        cy.wrap($el).find(".item-btn").click();
      })
      .then(() => {
        cy.get(".header-cart-counter span")
          .eq(1)
          .should("have.text", `(${itemCount.toString()})`);

        cy.get(".header-cart-total").should(
          "have.text",
          `$${totalAmount.toFixed(0).toString()}`
        );
      });
  });

  it("3. Chọn mua đồ ăn khuyến mãi", () => {
    cy.visit("/");

    cy.get("a[href='#/promociones']").click();

    let totalAmount = 0;
    let itemCount = 0;

    cy.get(".item")
      .each(($el) => {
        const priceText = $el.find(".item-price").text();
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")); // Chuyển đổi giá từ text sang số
        totalAmount += price;
        itemCount++;

        cy.wrap($el).find(".item-btn").click();
      })
      .then(() => {
        cy.get(".header-cart-counter span")
          .eq(1)
          .should("have.text", `(${itemCount.toString()})`);

        cy.get(".header-cart-total").should(
          "have.text",
          `$${totalAmount.toFixed(0).toString()}`
        );
      });
  });
});
