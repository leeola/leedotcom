#!/usr/bin/env node
//
// server/router.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var express = require('express')
var app = require('./app')

app.get('/', function (req, res) {
  res.send('leedotcom!')
})