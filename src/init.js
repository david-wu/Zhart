var _ = require('lodash');
var Zhart = require('./Zhart.Core');
var Domain = require('./Domain');
var DataSet = require('./DataSet');

var now = Date.now();
var dataSets = [
    new DataSet([[now,0]]),
    new DataSet([[now,0]])
];

var miniDomain = new Domain([now-20000, now-1000]).startTime();

var xDomain = new Domain([now-20000, now-1000]).startTime();
var yDomain = new Domain([0,10]);

var zhart1 = new Zhart({
    context: document.getElementById('zhart2'),
    width: 500,
    height: 300,
    dataSets: dataSets,
    xDomain: xDomain,
    yDomain: yDomain
}).microchart({
    miniDomain: miniDomain
});

var zhart2 = new Zhart({
    context: document.getElementById('zhart'),
    width: 500,
    height: 80,
    dataSets: dataSets,
    xDomain: xDomain,
    yDomain: yDomain
}).microchart({
    miniDomain: miniDomain
});

// Crappy fake data
setInterval(function(){
    _.each(dataSets, function(set){
        set.push([_.last(set)[0]+1000, Math.random(10)*10]);
    });
},1000);
