/* jshint esversion: 6 */

const router = require('express').Router();
const {
    Tag,
    Product,
    ProductTag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data

    try {
        const productTags = Tag.findAll({
            include: [{
                all: true,
                nested: true
            }],
        });
        res.render('products'); ///test to see if this works
        res.status(200).json(productTags); //return 200 code
    } catch (err) {
        console.log(err); //debugging purposes
        res.status(500).json(err); //return a 500 code
    }
});

router.get('/:id', function(req, res) {
            // find a single tag by its `id`
            // be sure to include its associated Product data
            try {
                const productId = Tag.findById(req.params.id); {
                    (200).json(productId); //return 200 code
                } catch (err) {
                    console.log(err); //debugging purposes
                    res.status(500).json(err); //return a 500 code
                }
            });


        router.post('/', function(req, res) {
            // create a new tag
            try {
                const tagData = Tag.create(req.body);
                res.status(200).json(tagData);
            } catch (err) {
                res.status(400).json(err);
            }
        });

        router.put('/:id', function(req, res) {
            // update a tag's name by its `id` value
            try {
                const putData = Tag.update(req.body, {
                    where: {
                        id: req.params.id,
                    },
                });
                if (!putData[0]) {
                    res.status(404).json({
                        message: 'No tag with this id!'
                    });
                    return;
                }
                res.status(200).json(putData);
            } catch (err) {
                res.status(500).json(err);
            }
        });

        router.delete('/:id', (req, res) => {
            // delete on tag by its `id` value
            try {
                const deleteTagById = Product.destroy({
                    where: {
                        id: req.params.id,
                    },
                });

                if (!deleteTagById) {
                    res.status(404).json({
                        message: 'No tag found with that id!'
                    })
                }

            } catch (err) {
                res.status(500).json(err);

            }

        });

        module.exports = router;