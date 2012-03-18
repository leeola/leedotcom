#!/usr/bin/env node
//
// server/configure.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var express = require('express')
  , stylus = require('stylus')
var app = require('./app')


app.configure(function () {
  app.set('views', __dirname +'/views')
  app.set('view engine', 'jade')
  
  app.use(express.logger())
})

app.configure('development', function () {
  app.set('port', process.env.PORT)
  app.set('view options', {
    'layout': false,
    'pretty': true
  })
  
  app.use(express.errorHandler({
    dumbExceptions: true,
    showStack: true
  }))
  app.use(stylus.middleware({
    // Force our stylus files to always recompile.
    'force': true,
    'linenos': true,
    'src': __dirname +'/../public'
  }))
})

app.configure('production', function () {
  app.set('port', 80)
  app.set('view options', {'layout': false})
  
  app.use(express.errorHandler())
  app.use(stylus.middleware({
    'compress': true,
    'src': __dirname +'/../public'
  }))
})

// This 2nd 'plain' configure call is here so that we can call some
// middleware after others. Namely static, after stylus, as calling them
// the other way around was causing stylus to have issues refreshing
// content.
app.configure(function () {
  app.use(express.static(__dirname +'/../public'))
})