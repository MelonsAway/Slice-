const {addOrder} = require('./main');

describe('add order', () => {
  test('an order should be added to any existing items', () => {
    //there should be one order in a list of orders
    let orders = [{number : 3, ingredient : 'pepperoni'}];
    const order = {number : 5, ingredient : 'pepperoni'};
    expect(orders.length).toBe(1);
    //run function
    addOrder(order, orders);
    //there should be 2 orders in correct order
    expect(orders.length).toBe(2);
    expect(orders[1]).toBe(order);
  });
});
