const express = require('express');

const UserController = require('../../controller/user-controller');
const { UserAuthentication } = require('../../middlewares/user-auth');

const  router = express.Router();

router.post(
    '/signup',
    UserAuthentication,
    UserController.create   
);
router.post(
    '/signin',
    UserAuthentication,
    UserController.signIn
);

module.exports = router;