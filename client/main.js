#!/usr/bin/env node
//
// client/main.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var jquery = require('jquery-browserify')


var main = function () {
  var processEvent = function (event) {
    console.log('Event! '+ event)
    event.preventDefault()
    
    var link_title = event.target.innerHTML
    var link_href = event.target.getAttribute('href')
    history.pushState(null, link_title, link_href)
  }
  
  var els = document.getElementsByTagName('a')
  
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', processEvent, false)
  }
}

jquery(function () {
    main()
})