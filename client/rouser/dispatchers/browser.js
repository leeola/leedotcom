#!/usr/bin/env node
//
// client/dispatchers/browser.js
//
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/

/*
var processEvent = function (event) {
  console.log('Event! '+ event)
  event.preventDefault()
  
  var link_title = event.target.innerHTML
  var link_href = event.target.getAttribute('href')
  history.pushState({'title': link_title}, link_title, link_href)
}

var els = document.getElementsByTagName('a')

for (var i = 0; i < els.length; i++) {
  els[i].addEventListener('click', processEvent, false)
}
*/


function Dispatcher() {
  // Do some browser validity checks. There are likely better ways to do
  // this, but for now we're just going to half ass it.
  if (document === undefined || window === undefined)
    throw new Error()
  
  // Get the A element tags, and add event listeners.
  var tag_elements = document.getElementsByTagName('a')
  
  for (var i = 0; i < tag_elements.length; i++)
    tag_elements[i].addEventListener('click', this._click_event.bind(this), false)
  
  this.router = null
}

Dispatcher.prototype._click_event = function (event) {
  event.preventDefault()
  
  var request = {
    'method': 'GET',
    'target': event.target.getAttribute('href'),
    'title': event.target.innerHTML,
    'origin': event.target.href
  }
  
  if (this.router)
    this.router.dispatch(request)
}

module.exports = Dispatcher