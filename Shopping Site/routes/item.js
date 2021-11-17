const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");
const Product = require("../models/product");

router.get("/add-item/:id", (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) return res.redirect("/");
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect("/");
  });
});

router.get("/reduce/:id", (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeOne(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/remove/:id", (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

module.exports = router;
