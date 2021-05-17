const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      // JOIN with products     
      include: [ {model: Product} ]
    })
    .then((result) => {
      //return JSON response of result
      res.status(200).json(result);
    });

  } catch (err) {
    //console log error if status = 500
    res.status(500).json(err);
  }
});


// GET one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //JOIN with Products
      include: [ {model: Product} ]
    })
    .then((result) => {
      res.status(200).json(result);
    });

  } catch (err) {
    res.status(500).json(err)
  }
});


// GET one category by its category_name value
router.get('/category/:category_name', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      where: {category_name: req.params.category_name},
      include: [ {model: Product} ]
    })
    .then((result) => {
      res.status(200).json(result);
    });

  } catch (err) {
    res.status(500).json(err)
  }
});



router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
