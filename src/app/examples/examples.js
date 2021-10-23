angular.module( 'finitio.examples', [
])

.factory( 'examples', function() {
  return [{"id":"tuple","index":6,"label":"Tuples","schema":"@import finitio/data\n\nPassword = String( s | s.length >= 8 )\n\n{\n  name: String\n  password: Password\n}\n","data":"{\n  \"name\": \"Bernard Lambeau\",\n  \"password\": \"a-very-long-password\"\n}"},{"id":"everything","index":0,"label":"Everything","schema":".","data":"\"Hello World\""},{"id":"set","index":5,"label":"Sets","schema":"@import finitio/data\n\n{ Integer( i | i>0 ) }\n","data":"[2015, 16, 12, 16]"},{"id":"sequence","index":4,"label":"Sequences","divider":true,"schema":"@import finitio/data\n\n[ Integer( i | i >= 0 ) ]\n","data":"[2015, 16, 12]"},{"id":"date","index":9,"label":"Dates ?","divider":true,"schema":"@import finitio/data\n\nDate\n","data":"\"2015-07-15\""},{"id":"integer","index":1,"label":"The set of integers","divider":true,"schema":"@import finitio/data\n\nInteger","data":"12"},{"id":"relation","index":8,"label":"Relations","schema":"@import finitio/data\n\nTalk = {\n  name: String\n  by: String\n}\n\n{Talk}","data":"[\n  {\n    \"name\": \"Data Deserves a Language Too\",\n    \"by\": \"Bernard Lambeau\"\n  },\n  {\n    \"name\": \"CSV on the Web\",\n    \"by\": \"Jeni Tennison\"\n  }\n]"},{"id":"color","index":10,"label":"Abstract Data Types","schema":"@import finitio/data\n\nColor = .Color\n  <rgb> [Integer]\n  <hex> String\n\nColor\n","data":"[12, 13, 14]\n","context":"function Color(triple){\n  this.triple = triple;\n}\n\nColor.rgb = function(triple){\n  return new Color(triple);\n};\n\nColor.prototype.toRgb = function(){\n  return this.triple;\n};\n\nColor.hex = function(hex){\n  var f = function(off){\n    return parseInt(hex.slice(off, off+2), 16);\n  };\n  return Color.rgb([f(1), f(3), f(5)]);\n};\n\nColor.prototype.toHex = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return \"#\" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);\n};\n\nColor.prototype.toString = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return \"Color(\" + r + \",\" + g + \",\" + b + \")\";\n};\n\nmodule.exports = { Color: Color };\n"},{"id":"form","index":7,"label":"Tuples + SByC","schema":"@import finitio/data\n\nPassword = String( s | s.length >= 8 )\n\n{\n  name: String\n  password: Password\n  confirm: Password\n}( t | samepass: t.password == t.confirm )\n","data":"{\n  \"name\": \"Bernard Lambeau\",\n  \"password\": \"finitio123\",\n  \"confirm\": \"finitio789\"\n}"},{"id":"union","index":3,"label":"Union types","schema":"@import finitio/data\n\nInteger | String\n","data":"16"},{"id":"naturals","index":2,"label":"Naturals through SByC","schema":"@import finitio/data\n\nInteger( i | i >= 0 )\n","data":"-16"},{"id":"undressing","index":11,"label":"Undressing","schema":"@import finitio/data\n\nColor = .Color\n  <rgb> [Integer]\n  <hex> String\n\nOutput = [Color/hex]\n\n[Color]","data":"[\n  [ 12, 13, 15 ],\n  [ 272, 11, 17 ],\n  [ 0, 0, 1 ]\n]\n","context":"function Color(triple){\n  this.triple = triple;\n}\n\nColor.rgb = function(triple){\n  return new Color(triple);\n};\n\nColor.prototype.toRgb = function(){\n  return this.triple;\n};\n\nColor.hex = function(hex){\n  var f = function(off){\n    return parseInt(hex.slice(off, off+2), 16);\n  };\n  return Color.rgb([f(1), f(3), f(5)]);\n};\n\nColor.prototype.toHex = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return \"#\" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);\n};\n\nColor.prototype.toString = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return \"Color(\" + r + \",\" + g + \",\" + b + \")\";\n};\n\nmodule.exports = { Color: Color };\n"}];
})

;