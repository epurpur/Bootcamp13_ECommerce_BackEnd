const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET - all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      //JOIN with Product
      include: {model: Product, through: ProductTag, as: 'related_products'} 
    })
    .then((result) => {
      res.status(200).json(result);
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// GET - one tag by its 'id' value
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      //JOIN with Product
      include: { model: Product, through: ProductTag, as: 'related_products'} 
    });

    if (!tagData) {
      res.status(404).json({message: 'No tags found with this id!'});
    } else {
      res.status(200).json(tagData);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// DELETE - one tag by its 'id' value
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
