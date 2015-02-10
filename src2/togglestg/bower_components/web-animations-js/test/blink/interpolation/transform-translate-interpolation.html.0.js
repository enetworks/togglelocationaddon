

assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translate(12px, 70%)',
  to: 'translate(13px, 90%)'
}, [
  {at: -1, is: 'translate(11px, 50%)'},
  {at: 0, is: 'translate(12px, 70%)'},
  {at: 0.25, is: 'translate(12.25px, 75%)'},
  {at: 0.75, is: 'translate(12.75px, 85%)'},
  {at: 1, is: 'translate(13px, 90%)'},
  {at: 2, is: 'translate(14px, 110%)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translateX(12px)',
  to: 'translateX(13px)'
}, [
  {at: -1, is: 'translateX(11px)'},
  {at: 0, is: 'translateX(12px)'},
  {at: 0.25, is: 'translateX(12.25px)'},
  {at: 0.75, is: 'translateX(12.75px)'},
  {at: 1, is: 'translateX(13px)'},
  {at: 2, is: 'translateX(14px)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translateY(70%)',
  to: 'translateY(90%)'
}, [
  {at: -1, is: 'translateY(50%)'},
  {at: 0, is: 'translateY(70%)'},
  {at: 0.25, is: 'translateY(75%)'},
  {at: 0.75, is: 'translateY(85%)'},
  {at: 1, is: 'translateY(90%)'},
  {at: 2, is: 'translateY(110%)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translateZ(2em)',
  to: 'translateZ(3em)'
}, [
  {at: -1, is: 'translateZ(1em)'},
  {at: 0, is: 'translateZ(2em)'},
  {at: 0.25, is: 'translateZ(2.25em)'},
  {at: 0.75, is: 'translateZ(2.75em)'},
  {at: 1, is: 'translateZ(3em)'},
  {at: 2, is: 'translateZ(4em)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translate3d(12px, 70%, 2em)',
  to: 'translate3d(13px, 90%, 3em)'
}, [
  {at: -1, is: 'translate3d(11px, 50%, 1em)'},
  {at: 0, is: 'translate3d(12px, 70%, 2em)'},
  {at: 0.25, is: 'translate3d(12.25px, 75%, 2.25em)'},
  {at: 0.75, is: 'translate3d(12.75px, 85%, 2.75em)'},
  {at: 1, is: 'translate3d(13px, 90%, 3em)'},
  {at: 2, is: 'translate3d(14px, 110%, 4em)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'translateX(12px) translateY(70%) translateZ(2em)',
  to: 'translateX(13px) translateY(90%) translateZ(3em)'
}, [
  {at: -1, is: 'translateX(11px) translateY(50%) translateZ(1em)'},
  {at: 0, is: 'translateX(12px) translateY(70%) translateZ(2em)'},
  {at: 0.25, is: 'translateX(12.25px) translateY(75%) translateZ(2.25em)'},
  {at: 0.75, is: 'translateX(12.75px) translateY(85%) translateZ(2.75em)'},
  {at: 1, is: 'translateX(13px) translateY(90%) translateZ(3em)'},
  {at: 2, is: 'translateX(14px) translateY(110%) translateZ(4em)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'skewX(10rad) translateY(70%)',
  to: 'skewX(20rad) translateY(90%)'
}, [
  {at: -1, is: 'skewX(0rad) translateY(50%)'},
  {at: 0, is: 'skewX(10rad) translateY(70%)'},
  {at: 0.25, is: 'skewX(12.5rad) translateY(75%)'},
  {at: 0.75, is: 'skewX(17.5rad) translateY(85%)'},
  {at: 1, is: 'skewX(20rad) translateY(90%)'},
  {at: 2, is: 'skewX(30rad) translateY(110%)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'skewX(1rad)',
  to: 'translate3d(8px, -4px, 12px) skewX(2rad)'
}, [
  {at: -1, is: 'matrix3d(1, 0, 0, 0, 5.2998553125713235, 1, 0, 0, 0, 0, 1, 0, -8, 4, -12, 1)'},
  {at: 0, is: 'matrix(1, 0, 1.5574077246549023, 1, 0, 0)'},
  {at: 0.25, is: 'matrix3d(1, 0, 0, 0, 0.621795827675797, 1, 0, 0, 0, 0, 1, 0, 2, -1, 3, 1)'},
  {at: 0.75, is: 'matrix3d(1, 0, 0, 0, -1.2494279662824135, 1, 0, 0, 0, 0, 1, 0, 6, -3, 9, 1)'},
  {at: 1, is: 'matrix3d(1, 0, 0, 0, -2.185039863261519, 1, 0, 0, 0, 0, 1, 0, 8, -4, 12, 1)'},
  {at: 2, is: 'matrix3d(1, 0, 0, 0, -5.9274874511779405, 1, 0, 0, 0, 0, 1, 0, 16, -8, 24, 1)'},
]);

// FIXME: skewX in matrix decompositions has issues.
// assertInterpolation({
//   property: 'transform',
//   from: 'translate3d(8px, -4px, 12px) skewX(1rad) perspective(400px)',
//   to: 'scaleY(2) skewX(2rad) perspective(500px)'
// }, [
//   {at: -1, is: 'matrix3d(1, 0, 0, 0, 0, 0, 0, 0, -0.03876288659793814, 0.01938144329896907, 0.94, -0.0029653608247422686, 16, -8, 24, 0.986144329896907)'},
//   {at: 0, is: 'matrix3d(1, 0, 0, 0, 1.5574077246549023, 1, 0, 0, -0.02, 0.01, 0.97, -0.0025, 8, -4, 12, 1)'},
//   {at: 0.25, is: 'matrix3d(1, 0, 0, 0, 1.1186572632293585, 1.25, 0, 0, -0.0151159793814433, 0.00755798969072165, 0.9775, -0.002378247422680413, 6, -3, 9, 1.0012989690721648)'},
//   {at: 0.75, is: 'matrix3d(1, 0, 0, 0, -0.7525665307288518, 1.75, 0, 0, -0.005115979381443298, 0.002557989690721649, 0.9924999999999999, -0.002128247422680412, 2, -1, 3, 1.001298969072165)'},
//   {at: 1, is: 'matrix3d(1, 0, 0, 0, -2.185039863261519, 2, 0, 0, 0, 0, 1, -0.002, 0, 0, 0, 1)'},
//   {at: 2, is: 'matrix3d(1, 0, 0, 0, -11.227342763749263, 3, 0, 0, 0.021237113402061854, -0.010618556701030927, 1.03, -0.0014653608247422677, -8, 4, -12, 0.9861443298969074)'},
// ]);
// assertInterpolation({
//   property: 'transform',
//   from: 'translate3d(8px, -4px, 12px) skewX(1rad) perspective(400px)',
//   to: 'translate3d(4px, -12px, 8px) scaleY(2) perspective(500px)'
// }, [
//   {at: -1, is: 'matrix3d(1, 0, 0, 0, 0, 0, 0, 0, -0.03165032268879389, -0.0036057329645461413, 0.956, -0.002984745620652083, 12, 4, 16, 0.9956416059005948)'},
//   {at: 0, is: 'matrix3d(1, 0, 0, 0, 1.5574077246549023, 1, 0, 0, -0.02, 0.01, 0.97, -0.0025, 8, -4, 12, 1)'},
//   {at: 0.25, is: 'matrix3d(1, 0, 0, 0, 1.4600697418639708, 1.25, 0, 0, -0.017032782247925572, 0.013463037465426202, 0.9735, -0.0023764300980638675, 7, -6, 11, 1.0004085994468193)'},
//   {at: 0.75, is: 'matrix3d(1, 0, 0, 0, 0.68136587953652, 1.75, 0, 0, -0.011032782247925572, 0.0204630374654262, 0.9804999999999999, -0.0021264300980638673, 5, -10, 9, 1.0004085994468193)'},
//   {at: 1, is: 'matrix3d(1, 0, 0, 0, 0, 2, 0, 0, -0.008, 0.024, 0.984, -0.002, 4, -12, 8, 1)'},
//   {at: 2, is: 'matrix3d(1, 0, 0, 0, -4.672223173964706, 3, 0, 0, 0.0043496773112061, 0.038394267035453865, 0.998, -0.0014847456206520829, 0, -20, 4, 0.9956416059005954)'},
// ]);
// assertInterpolation({
//   property: 'transform',
//   from: 'translate3d(8px, -4px, 12px) skewX(1rad) perspective(400px)',
//   to: 'translate3d(4px, -12px, 8px) skewX(2rad) scaleY(2)'
// }, [
//   {at: -1, is: 'matrix3d(1, 0, 0, 0, 0, 0, 0, 0, -0.03876288659793814, 0.01938144329896907, 0.94, -0.004845360824742268, 12, 4, 16, 0.9793814432989688)'},
//   {at: 0, is: 'matrix3d(1, 0, 0, 0, 1.5574077246549023, 1, 0, 0, -0.02, 0.01, 0.97, -0.0025, 8, -4, 12, 1)'},
//   {at: 0.25, is: 'matrix3d(1, 0, 0, 0, 0.7772447845947462, 1.25, 0, 0, -0.0151159793814433, 0.00755798969072165, 0.9775, -0.0018894974226804128, 7, -6, 11, 1.0019329896907216)'},
//   {at: 0.75, is: 'matrix3d(1, 0, 0, 0, -2.1864989409942237, 1.75, 0, 0, -0.005115979381443298, 0.002557989690721649, 0.9924999999999999, -0.0006394974226804124, 5, -10, 9, 1.0019329896907216)'},
//   {at: 1, is: 'matrix3d(1, 0, 0, 0, -4.370079726523038, 2, 0, 0, 0, 0, 1, 0, 4, -12, 8, 1)'},
//   {at: 2, is: 'matrix3d(1, 0, 0, 0, -17.782462353533823, 3, 0, 0, 0.021237113402061854, -0.010618556701030927, 1.03, 0.0026546391752577322, 0, -20, 4, 0.9793814432989691)'},
// ]);
