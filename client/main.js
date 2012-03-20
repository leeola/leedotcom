#!/usr/bin/env node
//
// client/main.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var jquery = require('jquery-browserify')


var main = function () {
  // Only require our real code, after the dom has loaded.
  require('./router')
}

jquery(function () {
    main()
})