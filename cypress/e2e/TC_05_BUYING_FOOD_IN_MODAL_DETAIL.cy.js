describe("TC 05: Mua sản phẩm và kiểm tra giỏ hàng", () => {
  it("1. Xem chi tiết và mua sản phẩm CAFE", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get(".item-details").click();

    cy.get(".modal").should("be.visible");

    cy.get(".modal-info-name").should("have.text", "cafe");
    cy.get(".modal-info-price").should("have.text", "$ 30");

    const CLICK_COUNT = 10;
    for (let i = 0; i < CLICK_COUNT; i++) {
      cy.get('button[name="bAddM21"]').click();
    }

    // Lấy giá trị của .modal-info-price và tính tổng
    cy.get(".modal-info-price").then(($price) => {
      const priceText = $price.text().trim();
      const priceValue = parseFloat(priceText.replace("$", ""));
      const expectedTotal = priceValue * CLICK_COUNT;

      // Kiểm tra giá trị tổng trong giỏ hàng
      cy.get("#modalCartTotal").should(($cartTotal) => {
        const cartTotalText = $cartTotal.text().trim();
        const cartTotalValue = parseFloat(cartTotalText.replace("$", ""));
        expect(cartTotalValue).to.equal(expectedTotal);
      });
    });
  });

  it("2. Tăng số lượng rồi giảm số lượng", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get(".item-details").click();

    cy.get(".modal").should("be.visible");

    cy.get(".modal-info-name").should("have.text", "cafe");
    cy.get(".modal-info-price").should("have.text", "$ 30");

    const INCREASE_COUNT = 10;
    for (let i = 0; i < INCREASE_COUNT; i++) {
      cy.get('button[name="bAddM21"]').click();
    }

    const DECREASE_COUNT = 20;
    for (let i = 0; i < DECREASE_COUNT; i++) {
      cy.get('button[name="bAddM11"]').click();
    }

    if (DECREASE_COUNT > INCREASE_COUNT) {
      cy.get("#modalCartTotal").should(($cartTotal) => {
        const cartTotalText = $cartTotal.text().trim();
        const cartTotalValue = parseFloat(cartTotalText.replace("$", ""));
        expect(cartTotalValue).to.equal(0);
      });
    } else {
      cy.get("#modalCartTotal").should(($cartTotal) => {
        const cartTotalText = $cartTotal.text().trim();
        const cartTotalValue = parseFloat(cartTotalText.replace("$", ""));
        expect(cartTotalValue).to.be.greaterThan(0);
      });
    }
  });

  it("3. Mua sản phẩm và kiểm tra giỏ hàng", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");
    cy.get(".item-details").click();

    cy.get(".modal").should("be.visible");

    cy.get(".modal-info-name").should("have.text", "cafe");
    cy.get(".modal-info-price").should("have.text", "$ 30");

    const CLICK_COUNT = 10;
    for (let i = 0; i < CLICK_COUNT; i++) {
      cy.get('button[name="bAddM21"]').click();
    }

    // Lấy giá trị của .modal-info-price và tính tổng
    cy.get(".modal-info-price").then(($price) => {
      const priceText = $price.text().trim();
      const priceValue = parseFloat(priceText.replace("$", ""));
      const expectedTotal = priceValue * CLICK_COUNT;

      // Kiểm tra giá trị tổng trong giỏ hàng
      cy.get("#modalCartTotal").should(($cartTotal) => {
        const cartTotalText = $cartTotal.text().trim();
        const cartTotalValue = parseFloat(cartTotalText.replace("$", ""));
        expect(cartTotalValue).to.equal(expectedTotal);
      });
    });

    // close modal
    cy.get("body").click("topLeft");
    cy.get(".modal").should("not.be.visible");

    // click giỏ hàng
    cy.get(".header-cart-title > img").click();
    cy.url().should("include", "#/cart");

    cy.get(".cartContainer-details-text").eq(0).should("have.text", "cafe");
  });

  it("4. Mua rồi tăng số lượng sản phẩm bên trong giỏ hàng", () => {
    cy.visit("/");
    cy.get("input[name='searcher']").type("cafe{enter}");

    // click giỏ hàng
    cy.get(":nth-child(1) > .item-btn > img").click();
    cy.get(".header-cart-title > img").click();
    cy.url().should("include", "#/cart");
    cy.wait(2000);

    cy.get(".cartContainer-details-text").eq(0).should("have.text", "cafe");

    const increaseAmount = 5;
    cy.get(`.cartContainer-oncart-counter`)
      .invoke("val")
      .then((currentValue) => {
        const newValue = parseInt(currentValue) + increaseAmount;
        cy.get(".cartContainer-oncart-counter")
          .clear()
          .type(`${newValue}{enter}`);
      });

    // Kiểm tra giá trị mới
    cy.get(".cartContainer-oncart-counter").should(
      "have.value",
      String(parseInt(1) + increaseAmount)
    );
  });
});
