const express = require("express");
const productController = require("./productController");

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
