const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const Order = require("../models/order");
const Cart = require("../models/cart");

var csrfProtection = csrf();
router.use(csrfProtection);

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

redirectToOldUrl = (req, res) => {
  var oldUrl = req.session.oldUrl;
  req.session.oldUrl = null;
  res.redirect(oldUrl);
};
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", isLoggedIn, (req, res) => {
  Order.find({ user: req.user }, (err, orders) => {
    if (err) return res.write("Error!");
    var cart;
    console.log(orders);
    orders.forEach((order) => {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render("user/profile", { orders: orders });
  });
});

router.use("/", notLoggedIn, (req, res, next) => {
  next();
});

router.get("/signup", (req, res) => {
  var messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      redirectToOldUrl(req, res);
    } else {
      res.redirect("/user/profile");
    }
  }
);

router.get("/signin", (req, res) => {
  var messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/user/signin",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      redirectToOldUrl(req, res);
    } else {
      res.redirect("/user/profile");
    }
  }
);

module.exports = router;
