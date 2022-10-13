const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get('/login', userController.getLogin);

router.post('/postLogin', userController.postLogin);

router.get('/signup', userController.getSignup);

router.post('/postSignup', userController.postSignup);

router.get('/otp', userController.otpVerify);

router.post('/postSignupOtp', userController.postSignupOtp);

router.get('/logout', userController.userLogout);

router.get('/cart', userController.showCart);

router.post('/addToCart', userController.addToCart);

router.get('/addToCart/:productId', userController.getAddToCart);

router.get('/removeFromCart/:productId', userController.removeFromCart);

router.get('/checkout', userController.getCheckout);

router.post('/placeOrder', userController.placeOrder);

module.exports = router;