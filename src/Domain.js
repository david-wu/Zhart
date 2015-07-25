var _ = require('lodash');

// Domains are [min, max] arrays with convenience functions
function Domain(domain){
  if(!domain || !_.isArray(domain) || domain.length!==2 ){
    console.log(domain);
    throw new RangeError('Invalid Domain');
  }
  domain.startTime = startTime;
  domain.stopTime = stopTime;
  return domain;
}

// Creates an interval to regularly increase min/max by how much time passed
function startTime(){
  var that = this;
  this.stopTime();
  var time = Date.now();
  this.realTimeInterval = setInterval(function(){
    var timePassed = Date.now()-time;
    that[0] += timePassed;
    that[1] += timePassed;
    time = Date.now();
  },16);
  return this;
}

function stopTime(){
  clearInterval(this.realTimeInterval);
  this.realTimeInterval = null;
}

module.exports = Domain;