var _ = require('lodash');
var d3 = require('d3');
// var Domain = Zhart.Domain = require('./Zhart.Domain');
// var DataSet = Zhart.DataSet = require('./Zhart.DataSet');
var Features = Zhart.Features = require('./Features.helpers');
var Layers = Zhart.Layers = require('./Layers.helpers');

/**
 * Creates the Zhart base class
 */
function Zhart(zhart){
    var that = this;

    // Sets default values
    _.defaults(this, {
        layers: [],
        features: [],
        width: 300,
        height: 200,
        margins: {
            top: 10,
            left: 30,
            bottom: 30,
            right:10
        },
        // Scales used to draw within vis
        yScale: d3.scale.linear(),
        xScale: d3.scale.linear(),
    });

    // Allow users to overwrite defaults on init
    _.extend(this, zhart);

    // A context must be provided.. for now..
    if(!this.context){throw new TypeError('Context needed :( sorry');}
    this.svg = d3.select(this.context)
        .append('svg')
        .classed('zhart', true);
    this.vis = this.svg.append('g')
        .classed('vis', true);

    // Used to clip the graph to only draw within a rect
    // TODO: fix the unique id problem
    this.clipper = this.svg.append('defs')
        .append('clipPath')
            .attr('id', 'clipper')
            .append('rect')

    // Initializes features
    _.each(this.features, function(feature){
        feature.init(that);
    });

    // TODO: remove! (performance test)
    var tTime = 0;
    setInterval(function () {
        var t = Date.now();
        that.redraw();
        tTime += (Date.now() -  t);
    }, 16);
    setInterval(function(){
        console.log((tTime/10)+'% time spent redrawing');
        tTime = 0;
    }, 1000);

    return this;
}

// Draws each layer
Zhart.prototype.redraw = function(){
    var that = this;

    // Resize and set d3 scale's domains
    this.resize();
    this.xScale.domain(this.xDomain);
    this.yScale.domain(this.yDomain);

    // Draws each layer
    _.each(this.Layers, function(layer){
        layer.draw(that);
    });
};

// Resizes svg and vis based on width, height, and margins
Zhart.prototype.resize = function(){

    this.svg
        .attr('width', this.width)
        .attr('height', this.height);

    // Contains most graphics, leaving margin room
    this.visWidth = this.width - this.margins.left - this.margins.right;
    this.visHeight = this.height - this.margins.top - this.margins.bottom;
    this.vis
        .attr('width', this.visWidth)
        .attr('height', this.visHeight)
        .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')');

    // Resizes the clipper used to trim the svg
    this.clipper
        .attr('width', this.visWidth)
        .attr('height', this.visHeight)

    // Redefine scales used for drawing
    this.yScale
        .range([this.visHeight, 0]);
    this.xScale
        .range([0, this.visWidth]);            
};

// Apply preset features and layers
Zhart.prototype.microchart = function(options){
  var that = this;

  var features = Zhart.Features('background', 'text', 'dragXDomain');
  features[0]
    .set('color', 'orange');
  features[1]
    .set('color', 'purple')
    .set('x', 200);

  var layers = Zhart.Layers('xAxis', 'yAxis', 'area', 'line', 'miniDomain');
  layers[0]
    .set('ticks', '5')
    .set('orient', 'bottom');
  layers[2]
    .set('interpolate', 'linear');
  layers[3]
    .set('interpolate', 'linear');

  layers[4]
    .set('domain', options.miniDomain);
console.log(options)
  // Initializes new features
  _.each(features, function(feature){
    feature.init(that);
  });

  // TODO: extend current layers/features instead of overwriting
  this.Layers = layers.slice();
  this.features = features.slice();
};

module.exports = Zhart;
