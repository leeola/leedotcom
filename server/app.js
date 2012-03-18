#!/usr/bin/env node
//
// server/app.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var express = require('express')
var app = module.exports = express.createServer()

require('./configure')
require('./router')