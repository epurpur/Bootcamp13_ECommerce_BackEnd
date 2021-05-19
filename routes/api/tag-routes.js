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

    //if wrong tag id is entered
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


// PUT - Update prduct tag name by its 'id' value
router.put('/:id', async (req, res) => {

  //update tag data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// DELETE - one tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    //if wrong id is entered
    if(!tagData) {
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    } else {
      console.log(`\n Deleting tag with id: ${req.params.id} \n`);
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
