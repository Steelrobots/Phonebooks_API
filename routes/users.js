var express = require('express');
const { User } = require('../models');
var router = express.Router();
const { Op } = require("sequelize")


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const { page = 1, limit = 10, keyword = "", sort = 'ASC' } = req.query
    console.log("keyword masuk", keyword)
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { phone: { [Op.iLike]: `%${keyword}%` } }
        ]

      }, order: [['name', sort]], limit,
      offset: (page - 1) * limit
    })
    const pages = Math.ceil(count / limit)
    res.status(200).json({
      phonebooks: rows,
      page: Number(page),
      limit: Number(limit),
      pages: Number(pages),
      total: count
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.post('/', async function (req, res) {
  try {
    const { name, phone } = req.body
    if (!name && !phone) throw Error.message = "name and phone can't be empty"
    const phonebook = await User.create({ name, phone })
    res.status(201).json(phonebook)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.put('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const { name, phone } = req.body
    if (!name && !phone) throw Error.message = "name and phone can't be empty"
    const updatepb = await User.update({ name, phone }, {
      where: {
        id
      },
      returning: true,
      plain: true
    })
    res.status(201).json(updatepb[1])
  } catch (error) {
    res.status(500).json(error.message)
  }
})
router.delete('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id
      }
    });
    if (!user) {
      res.status(500).json({ message: "user not found" })
    }
    await User.destroy({
      where: {
        id
      },
      returning: true,
      plain: true
    })
    return res.status(200).json(user)
  } catch (error) {

  }
})

module.exports = router;
