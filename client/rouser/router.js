#!/usr/bin/env node
//
// client/rouser/router.js
//
// @copyright 2012 by Lee Olayvar
//
/*jshint asi: true*/
var BrowserDispatcher = require('./dispatchers/browser')


// (dispatcher, config) -> undefined
//
// Params:
//  dispatcher: An object that will simply call `this.dispatch`.
function Router(dispatcher, config) {
  if (dispatcher === undefined || dispatcher === null)
    dispatcher = new BrowserDispatcher()
  
  dispatcher.router = this
  
  var default_config = {
    'optional_end_slash': true
  }
  
  // Routes stored in the format of..
  //{
  //  method: {
  //    regex_string: callback
  //  }
  //}
  this._routes = {}
  
  // If a config is given, overwrite our default config with the user
  // values.
  if (config !== undefined && config !== null) {
    for (var key in config) {
      default_config[key] = config[key]
    }
  }
  this._config = default_config
}

// (pattern) -> regex_string
//
// Params:
//  pattern: A string or regex object to 'format'.
//
// Retruns:
//  This returns a regexp string that has been formatted to fit the
//  configuration of this Router. Things like strict matching, etc.
//
// Desc:
//  Returns a formatted pattern object. See @returns for more information.
Router.prototype._format_pattern = function (pattern) {
  // Stringify our pattern.
  if (pattern.source)
    pattern = pattern.source
  
  // Check for the start op
  if (pattern.indexOf('^') != 0)
    pattern = '^'+ pattern
  
  // Check for the end op, if it exists, remove it.
  // This is done so we can work, modify, etc, this pattern and not
  // have to offset the $ character the entire time
  if (pattern.lastIndexOf('$') == pattern.length-1)
    pattern = pattern.substring(0, pattern.length-1)
  
  if (this._config['optional_end_slash']) {
    
    // Check for the optional ending slash pattern. If it
    // already exists, we can safely ignore this step.
    if (pattern.lastIndexOf('[\\/]?') != pattern.length-5) {
      
      // Check for the ending slash on domains. If it exists, replace it
      // with an optional end slash.
      if (pattern.lastIndexOf('\\/') != pattern.length-2) {
        pattern = pattern.substring(0, pattern.length-2) +'[\\/]?$'
      }
      // Since we have not found the user trying to add in an ending slash,
      // add our own.
      else {
        pattern = pattern +'[\\/]?'
      }
    }
  }
  
  // Make sure to append our end op again.
  return pattern + '$'
}

Router.prototype._dispatch_route = function (request, routes,
                                              routes_regies, index) {
  var self = this
    , pattern_string = routes_regies[index]
    , pattern_regexp = new RegExp(pattern_string)
  
  if (pattern_regexp.test(request.target)) {
    routes[pattern_string](request, function () {
      self._dispatch_route(request, routes, routes_regies, index++)
    })
  } else {
    this._dispatch_route(request, routes, routes_regies, index++)
  }
}

// (method, url) -> undefined
//
// Params:
//  method: The HTTP method of the request.
//  url: The url of the request.
//
// Desc:
//  Dispatch a url to this router.
Router.prototype.dispatch = function (request) {
  var routes = this._routes[request.method]
  
  if (routes === undefined)
    return undefined
  
  var route_regies = Object.keys(routes)
  this._dispatch_url(request, routes, route_regies, 0)
}

// (route, callback) -> undefined
//
// Params:
//  route: A string/regex object to match against.
//  callback: A callback for when a dispatched url matches
//    the given route.
//
// Desc:
//  Add a route and a callback to be matched.
Router.prototype.get = function (route, callback) {
  this._routes['get'][this._format_pattern(route)] = callback
}


module.exports = {
  'Router': Router
}