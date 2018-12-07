const {addTopping} = require('./main');
let pizza = [];
let topping = {};
describe('addTopping', () => {

// add pepp to a pizza
  test('on addTopping add pepp to pizza', () => {
//pizza should be blank
//run function on click
    addTopping(pizza, 'pepperoni');
    //pizza should have a pepp
    expect(topping.type = 'pepperoni');
    expect(pizza[0] = topping);
  })
  test('not pepperoni', () => {
    addTopping(pizza, 'stuff');
    expect(topping.type != 'pepperoni');
    expect(topping.type = 'stuff');
  })
})
