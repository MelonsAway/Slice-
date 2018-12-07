const {addOrder, cookPizza, completeOrder, draw} = require('./main');

describe('add order', () => {
  test('an order should be added to any existing items', () => {
    //there should be one order in a list of orders
    let orders = [{number : 3, topping : 'pepperoni'}];
    const order = {number : 5, topping : 'pepperoni'};
    expect(orders.length).toBe(1);
    //run function
    addOrder(order, orders);
    //there should be 2 orders in correct order
    expect(orders.length).toBe(2);
    expect(orders[1]).toBe(order);
  });
});


describe('cook pizza', () => {
  //pizza with toppings will be redrawn at the burner location
  test('pizza with toppings should be moved to burner', () => {
    let burner = [{state: null}];
    let toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    //burner should be empty
    expect(burner[0].state).toBe(null);
    //run function
    cookPizza(toppings, burner);
    //burner should contain pizza
    expect(burner[0].state).toBe('toppedPizza');
  });
  //topping pizza will be reset for next order
  test('topping pizza should be cleared', () => {
    let burner = [{state: null}];
    let toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    //run function
    cookPizza(toppings, burner);
    //topping station should reset pizza
    expect(toppings[0].state).toBe(null);
  });
  //a pizza without toppings shouldn't affect the burner
  test("pizza w/out toppings should\'t add to burner", () => {
    let burner = [{state: null}];
    let toppings = [];
    //run function
    cookPizza(toppings, burner);
    //expect burner to stay empty
    expect(burner[0].state).toBe(null);
  });
});

describe('complete order', () => {
  //test that burner is empty
  test('burner is emptied', () => {
    let burner = [{state: 'toppedPizza'}];
    let toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    let score = {points: 0};
    //burner should contain pizza
    expect(burner[0].state).toBe('toppedPizza');
    //run function
    completeOrder(toppings, burner, score);
    //burner should be empty
    expect(burner[0].state).toBe(null);
  });
  //test that points were added
  test('points were added based on toppings', () => {
    let burner = [{state: 'toppedPizza'}];
    let toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    let score = {points: 0};
    //points are 0 before completed
    expect(score.points).toBe(0);
    //run function
    completeOrder(toppings, burner, score);
    //points are added
    expect(score.points).not.toEqual(0);
    //points correspond with toppings
    expect(score.points).toEqual(toppings.length);
  });
});

//draw is going to accept the current orders, toppings, and current state of the burner and draw the screen accordingly
describe('draw', () => {
  test('updates the orders', () => {
    const orders = [{number : 5, topping : 'pepperoni'}, {number : 3, topping : 'pepperoni'}];
    const toppings = [{}];
    const burner = [{state: null}];
    //run draw function
    draw(orders, toppings, burner);
    //draw li items for every order
   const orderEls = document.getElementsByClassName('order');
   expect(orderEls.length).toEqual(2);
   expect(orderEls[0].number).toBe(5);
   expect(orderEls[1].number).toBe(3);
  });
  test('updates the pizza toppings', () => {
    const orders = [{}];
    const toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    const burner = [{state: null}];
    //run draw function
    draw(orders, toppings, burner);
    //draw pizza toppings on pizza
    const toppingEls = document.getElementsByClassName('topping');
    expect(toppingEls.length).toEqual(2);
    expect(toppingEls[0].x).toBe(30);
    expect(toppingEls[1].x).toBe(40);
  });
  test('updates the burner with a pizza', () => {
    const orders = [{}];
    const toppings = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    const burner = [{state: null}];
    //run cook pizza function?

    //run draw function
    draw(orders, toppings, burner);
    //redraw pizza with toppings on burner
    const burnerEl = document.getElementById('burnerBox');
    expect(burnerEl.firstChild).not.toBe(null);
  });
});

//draw function that takes 3 global arrays (orders, pizza toppings, burner)
