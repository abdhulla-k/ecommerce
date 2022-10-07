const express = require("express");

const router = express.Router();

const sellerController = require("../controllers/seller");

router.get('/', sellerController.getLogin);

router.post('/postLogin', sellerController.postLogin)

router.get('/signup', sellerController.getSignup);

router.post('/postSignup', sellerController.postSignup);

router.get("/addProduct", sellerController.getAddProduct);

router.post("/saveNewProduct", sellerController.postAddProduct);

router.get("/showMyProducts", sellerController.showMyProducts);

router.post("/filteredProducts", sellerController.filterProducts);

router.get("/detail/:productId", sellerController.myProductDetails);

router.get("/edit/:productId", sellerController.editProduct);

router.post("/postEdit", sellerController.saveProductEdit )

// router.get("/delete/:ProductId", sellerController.deleteProduct)

router.get("/logout", sellerController.logout);

module.exports = router;