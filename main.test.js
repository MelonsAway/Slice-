const {addOrder, cookPizza, completeOrder, init} = require('./main');

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
    let pizza = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    //burner should be empty
    expect(burner[0].state).toBe(null);
    //run function
    cookPizza(pizza, burner);
    //burner should contain pizza
    expect(burner[0].state).toBe('toppedPizza');
  });
  //topping pizza will be reset for next order
  test('topping pizza should be cleared', () => {
    let burner = [{state: null}];
    let pizza = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    //run function
    cookPizza(pizza, burner);
    //topping station should reset pizza
    expect(pizza[0].state).toBe(null);
  });
  //a pizza without toppings shouldn't affect the burner
  test("pizza w/out toppings should\'t add to burner", () => {
    let burner = [{state: null}];
    let pizza = [];
    //run function
    cookPizza(pizza, burner);
    //expect burner to stay empty
    expect(burner[0].state).toBe(null);
  });
});

describe('complete order', () => {
  //test that burner is empty
  test('burner is emptied', () => {
    let burner = [{state: 'toppedPizza'}];
    let pizza = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    let score = {points: 0};
    //burner should contain pizza
    expect(burner[0].state).toBe('toppedPizza');
    //run function
    completeOrder(pizza, burner, score);
    //burner should be empty
    expect(burner[0].state).toBe(null);
  });
  //test that points were added
  test('points were added based on toppings', () => {
    let burner = [{state: 'toppedPizza'}];
    let pizza = [{type: 'pepperoni', x: 30, y: 40}, {type: 'pepperoni', x: 40, y: 30}];
    let score = {points: 0};
    //points are 0 before completed
    expect(score.points).toBe(0);
    //run function
    completeOrder(pizza, burner, score);
    //points are added
    expect(score.points).not.toEqual(0);
    //points correspond with toppings
    expect(score.points).toEqual(pizza.length);
  });
});

describe('init', () => {
  //test that 2 uls + li items, 2 divs, and a button were created
  test('correct elements were created', () => {
    //document should be empty
    expect(document.body.firstChild).toBeNull();
    //run function
    init();
    //test orders ul and ingredients ul
    const ulEls = document.querySelectorAll('ul');
    expect(ulEls.length).toBe(2);
    expect(ulEls[0].className).toBe('orderList');
    expect(ulEls[1].className).toBe('ingredientList');
    //test order li items
    const orderEls = document.getElementsByClassName('order');
    expect(orderEls.length).toBe(1);
    //test ingredient li items
    const ingredientEls = document.getElementsByClassName('ingredient');
    expect(ingredientEls.length).toBe(1);
    //test pizza div and burner div
    const divEls = document.querySelectorAll('div');
    expect(divEls.length).toBe(2);
    expect(divEls[0].className).toBe('pizzaBox');
    expect(divEls[1].className).toBe('burnerBox');
    //test complete button
    const buttonEl = document.querySelector('button');
    expect(buttonEl).not.toBe(null);
  });
});


//draw function that takes 3 global arrays (orders, burners, pizza toppings)
