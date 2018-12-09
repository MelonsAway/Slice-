const {fetchRandom, addOrder, drawOrders, cookPizza, /*completeOrder,*/  init} = require('./main');

beforeEach(() => {
  // reset the document
  document.body.innerHTML = '';
})

describe('fetchRandom', () => {
  test('get random number within range', () => {
    let random = fetchRandom(10, 20);
    expect(random).toBeGreaterThanOrEqual(10);
    expect(random).toBeLessThan(20);
  });
});

describe('add order', () => {
  test('an order should be added to any existing items', () => {
    //there should be one order in a list of orders
    let orders = [{number: 3, topping: 'pepperoni'}];
    expect(orders.length).toBe(1);
    //run function
    orders = addOrder(12, orders);
    //there should be 2 orders in correct order
    expect(orders.length).toBe(2);
    expect(orders[1].number).toBe(12);
  });
});

describe('draw orders', () => {
  test('should render an <li> for each order', () => {
    const ulEl = document.createElement('ul');
    ulEl.className = 'orderList';
    document.body.appendChild(ulEl);
    const orders = [{
      number: 11,
      topping: 'pepperoni'},
      {number: 13,
      topping: 'pepperoni'}];
    drawOrders(orders);
    const liEls = document.querySelectorAll('.order');
    expect(liEls.length).toBe(2);
    expect(liEls[0].textContent).toBe('11 pepperoni');
    expect(liEls[1].textContent).toBe('13 pepperoni');
  });
});

describe('cook pizza', () => {
  test('pizza has all topping objects removed', () => {
    let toppings = [{
      pizza: [{type: 'pepperoni', x: 89, y: 135},
              {type: 'pepperoni', x: 198, y: 74}],
      burner: []
    }];
    toppings = cookPizza(toppings);
    expect(toppings[0].pizza.length).toBe(undefined);
  });
  test('burner has objects updated to match the previous pizza', () => {
    let toppings = [{
      pizza: [{type: 'pepperoni',x: 89,y: 135},
              {type: 'pepperoni',x: 198,y: 74}],
      burner: []
    }];
    expect(toppings[0].burner.length).toBe(0);
    toppings = cookPizza(toppings);
    expect(toppings[0].burner.length).toBe(2);
    expect(toppings[0].burner[0].x).toBe(89);
    expect(toppings[0].burner[1].y).toBe(74);
  });
});

/*describe('cook pizza', () => {
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
});*/


  /*test('updates the pizza toppings', () => {
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
  });*/

describe('init', () => {
  //test that 2 uls + li items, 2 divs, and a button were created
  test('correct elements were created', () => {
    //document should be empty
    expect(document.body.firstChild).toBeNull();
    //run function
    init();
    //test orders ul and toppings ul
    const ulEls = document.querySelectorAll('ul');
    expect(ulEls.length).toBe(2);
    expect(ulEls[0].className).toBe('orderList');
    expect(ulEls[1].className).toBe('toppingList');
    //test topping li items
    const toppingEls = document.getElementsByClassName('toppingIcon');
    expect(toppingEls.length).toBe(1);
    //test container div
    const containerDiv = document.getElementsByClassName('containerBox');
    expect(containerDiv.length).toBe(1);
    //test pizza div and burner div
    const divEls = document.querySelectorAll('.containerBox div');
    expect(divEls.length).toBe(2);
    expect(divEls[0].className).toBe('pizzaBox');
    expect(divEls[1].className).toBe('burnerBox');
    //test complete button
    const buttonEl = document.querySelector('button');
    expect(buttonEl).not.toBe(null);
  });
});

//draw function that takes 3 global arrays (orders, pizza toppings, burner)

//smaller unit functions that return a value are more important to test
