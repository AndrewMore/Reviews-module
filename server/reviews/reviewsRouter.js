const router = require('express').Router();
const controller = require('./reviewsController.js');

//Will have just one router/controller to handle both product id or name. The distinction will be made in the model, where the param will be analyzed based on data type.
router
  .route('/:productId')
  .get(controller.getByProdId);

router
  .route('/:productId/skinType')
  .get(controller.getBySkinType);

router
  .route('/:productId/skinShade')
  .get(controller.getBySkinShade);

router
  .route('/:productId/ageRange')
  .get(controller.getByAgeRange);

router
  .route('/:reviewId/upVote')
  .post(controller.postUpVote);

router
  .route('/:reviewId/downVote')
  .post(controller.postDownVote);

module.exports = router;