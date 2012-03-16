#!/usr/bin/env node
//
// server/configure.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var express = require('express')
var app = require('./app')


app.set('port', process.env.PORT)