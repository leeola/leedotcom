#!/usr/bin/env node
//
// server/configure.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var express = require('express')
var app = require('./app')


app.configure(function () {
  app.use(express.logger())
  app.set('views', __dirname +'/views')
  app.set('view engine', 'jade')
  app.set('view options', {'layout': false})
})

app.configure('development', function () {
  app.set('port', process.env.PORT)
  app.use(express.errorHandler({
    dumbExceptions: true,
    showStack: true
  }))
})

app.configure('production', function () {
  app.set('port', 80)
  app.use(express.errorHandler())
})