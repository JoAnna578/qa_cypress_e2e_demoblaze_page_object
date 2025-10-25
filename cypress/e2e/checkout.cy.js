/// <reference types='cypress' />

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

describe('Demoblaze Checkout Flow', () => {
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  before(() => {
    homePage.visit();
  });

  it('should add Sony vaio i7 to cart and verify alert', () => {
    homePage.clickCategory('Laptops');
    homePage.clickProduct('Sony vaio i7');
    productPage.addToCart();
    productPage.assertAlertMessage('Product added.');
  });

  it('should place order and verify purchase', () => {
    cy.contains('a', 'Cart').click();
    cartPage.assertProductInCart('Sony vaio i7');

    cartPage.placeOrder();

    const orderData = {
      name: 'John Doe',
      country: 'USA',
      city: 'New York',
      card: '1234567890123456',
      month: '12',
      year: '2025'
    };

    cartPage.fillOrderForm(orderData);
    cartPage.purchase();
    cartPage.assertPurchaseData(orderData);
    cartPage.confirmOk();
  });
});
