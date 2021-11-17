const express = require("express");
const router = express.Router();

var Cart = require("../models/cart");
const Product = require("../models/product");
const Order = require("../models/order");

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.oldUrl = req.url;
  res.redirect("/user/signin");
};

/* GET home page. */
router.get("/", (req, res) => {
  var successMsg = req.flash("success")[0];
  Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/index", {
      title: "Shopping Cart",
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg,
    });
  });
});

router.get("/shopping-cart", (req, res) => {
  if (!req.session.cart)
    return res.render("shop/shopping-cart", { product: null });
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    product: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/checkout", isLoggedIn, (req, res) => {
  if (!req.session.cart) return res.redirect("shop/shopping-cart");
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  res.render("shop/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg,
  });
});

router.post("/checkout", isLoggedIn, (req, res) => {
  if (!req.session.cart)
    return res.render("shop/shopping-cart", { product: null });
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_51JWLffHLe4A1XXsWOrcwoBLMRLeRLsWeFimkkE96UKjCrOKMu2mj7jGx0P8O7jYjc9sJ3f7ySqAGbjvJh8fdgLwV00os6VW8wt"
  );

  stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken,
      description: "Test Charge",
    },
    (err, charge) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id,
      });
      order.save((err, result) => {
        req.flash("success", "Purchase Successful!");
        req.session.cart = null;
        res.redirect("/");
      });
    }
  );
});
module.exports = router;
