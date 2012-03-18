#!/usr/bin/env node
//
// server/main.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var app = require('./app')


if (require.main === module) {
  app.listen(app.settings.port)
}