#!/usr/bin/env node
//
// client/router.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var rouser = require('./rouser')


var router = new rouser.Router()

router.get(/\/contact/, function (request) {
  console.log('Contact Clicked! url:'+ request.target)
})

router.get(/\/social/, function (request) {
  console.log('Social Clicked! url:'+ request.target)
})
