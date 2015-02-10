
assertInterpolation({
  property: 'widows',
  from: '10',
  to: '20'
}, [
  {at: -3.0, is: '1'},
  {at: -2.5, is: '1'},
  {at: -0.5, is: '5'},
  {at: 0, is: '10'},
  {at: 0.3, is: '13'},
  {at: 0.6, is: '16'},
  {at: 1, is: '20'},
  {at: 1.5, is: '25'}
]);
