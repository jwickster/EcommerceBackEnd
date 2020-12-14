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
                include: Product.tags,
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
                const singleTagById = Tag.findByPk(req.params.id, {
                    include: true
                });

                if (singleTagById) {
                    res.status(200).json({
                        message: 'Tag found with that id!'
                    });
                } else {
                    res.status(404).json({
                        message: 'Tag not found!'
                    });
                }
            } catch (err) {
                res.status(500).json({
                    message: 'Server side error '
                });

            }
        }



        // try {
        //     const productId = Tag.findByPk(req.params.id); {
        //         if(!productId){
        //             res.status(404).json({
        //                 message: 'Tag not found',
        //             });
        //         }
        //         (200).json(productId); //return 200 code
        //     } catch (err) {
        //         console.log(err); //debugging purposes
        //         res.status(500).json(err); //return a 500 code
        //     }
        // });


        router.post('/', function(req, res) {
            // create a new tag
            try {
                const tagData = Tag.create(req.body);
                res.status(500).json(tagData, {
                    message: '500 - server side error' + tagData.message,
                });
            } catch (err) {
                res.status(400).json(err, {
                    message: '400 - Bad Request error + ' + err.message,
                });
            } finally {
                res.status(200).json(tagData, {
                    message: 'Success!',
                });
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
                const deleteTagById = Tag.destroy({
                    where: {
                        id: req.params.id,
                    },
                });

                if (!deleteTagById) {
                    res.status(404).json({
                        message: 'No tag found with that id!'
                    });
                } else {
                    res.status(200).json(deleteTagById);
                }

            } catch (err) {
                res.status(500).json(err);

            }

        });

        module.exports = router;