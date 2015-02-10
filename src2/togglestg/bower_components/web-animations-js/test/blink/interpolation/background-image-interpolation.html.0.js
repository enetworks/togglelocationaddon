
// Image to image
var from = 'url(../resources/blue-100.png)';
var to = 'url(../resources/green-100.png)';
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Image to gradient
from = 'url(../resources/blue-100.png)';
to = 'linear-gradient(45deg, blue, orange)';
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Gradient to gradient
from = 'linear-gradient(-45deg, red, yellow)';
to = 'linear-gradient(45deg, blue, orange)';
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Keyword to image
from = 'none';
to = 'url(../resources/green-100.png)';
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: from},
  {at: 0.6, is: to},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Multiple to multiple
var fromA = 'url(../resources/stripes-100.png)';
var fromB = 'linear-gradient(-45deg, blue, transparent)';
var toA = 'url(../resources/blue-100.png)';
var toB = 'url(../resources/stripes-100.png)';
from = fromA + ', ' + fromB;
to = toA + ', ' + toB;
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + fromA + ', ' + toA + ', 0.3), -webkit-cross-fade(' + fromB + ', ' + toB + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + fromA + ', ' + toA + ', 0.6), -webkit-cross-fade(' + fromB + ', ' + toB + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Single to multiple
from = 'url(../resources/blue-100.png)';
var toA = 'url(../resources/stripes-100.png)';
var toB = 'url(../resources/green-100.png)';
to = toA + ', ' + toB;
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  // The interpolation of different numbers of background-images looks a bit strange here.
  // Animating background-image is not specified to be possible however we do it for backwards compatibility.
  // With this in mind we kept the implementation simple at the expense of this corner case because there is
  // no official specification to support.
  {at: -0.3, is: from + ', ' + from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + toA + ', 0.3), -webkit-cross-fade(' + from + ', ' + toB + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + toA + ', 0.6), -webkit-cross-fade(' + from + ', ' + toB + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Multiple mismatched types
from = 'url(../resources/blue-100.png), none';
to = 'url(../resources/stripes-100.png), url(../resources/green-100.png)';
assertInterpolation({
  property: 'background-image',
  from: from,
  to: to,
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: from},
  {at: 0.6, is: to},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);
