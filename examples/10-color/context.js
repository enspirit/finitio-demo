function Color(triple){
  this.triple = triple;
}

Color.rgb = function(triple){
  return new Color(triple);
};

Color.prototype.toRgb = function(){
  return this.triple;
};

Color.hex = function(hex){
  var f = function(off){
    return parseInt(hex.slice(off, off+2), 16);
  };
  return Color.rgb([f(1), f(3), f(5)]);
};

Color.prototype.toHex = function(){
  var r = this.triple[0],
      g = this.triple[1],
      b = this.triple[2];
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.toString = function(){
  var r = this.triple[0],
      g = this.triple[1],
      b = this.triple[2];
  return "Color(" + r + "," + g + "," + b + ")";
};

module.exports = { Color: Color };
