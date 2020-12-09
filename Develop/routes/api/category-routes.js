/* jshint esversion: 6 */

const router = require('express').Router();
const {
    Category,
    Product
} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const productData = await Product.findByPk(req.params.id, {
            include: [{
                model: Reader
            }],
        });

        if (!productData) {
            res.status(404).json({
                message: 'Product not found with that ID'
            });
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }


});

router.get('/:id', async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const dynamicID = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!dynamicID) {
            res.status(404).json({
                message: 'No products found with that id!'
            });
            return;
        }

        res.status(200).json(dynamicID);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    // create a new category
    try {
        const categoryData = await Product.create({
            reader_id: req.body.reader_id,
        });
        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
});

router.delete('/:id', async function(req, res) {
    // delete a category by its `id` value
    try {
        const deleteProductData = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deleteProductData) {
            res.status(404).json({
                message: 'No library card found with that id!'
            });
            return;
        }
        res.status(200).json(libraryCardData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;