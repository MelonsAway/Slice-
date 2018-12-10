<<<<<<< HEAD
const {fetchRandom, addTopping, addOrder, drawOrders, cookPizza, drawTopping, drawBurnerToppings, completeOrder, drawScore, init} = require('./main');
=======
const {
  fetchRandom,
  addOrder,
  drawOrders,
  cookPizza,
  drawBurnerToppings,
  completeOrder,
  drawScore,
  init
} = require('./main');
>>>>>>> e207b3666965e6585703f0dddc6db12a716f9197

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


describe('addTopping', () => {
  let toppings = [
    pizza = [],
    burner = [],
  ];
  let topping = {};

// add pepp to a pizza
  test('on addTopping add pepp to pizza', () => {
//pizza should be blank
//run function on click
    addTopping(pizza, 'pepperoni');
    //pizza should have a pepp
    expect(topping.type = 'pepperoni');
    expect(pizza[0] = topping);
    expect(toppings[0] = pizza);
    expect(toppings.pizza = 'pepperoni');
  })
  test('not pepperoni', () => {
    addTopping(pizza, 'stuff');
    expect(topping.type != 'pepperoni');
    expect(topping.type = 'stuff');
  })
})
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
describe('draw images', () => {
  let imgEl = document.createElement('img');
  test('should draw pepps on pizza', () => {
    drawTopping('pepperoni');
    expect(imgEl.src = 'images/pepperoni.svg');
  })
});
describe('cook pizza', () => {
  test('pizza has all topping objects removed', () => {
    let toppings = [{
      pizza: [{type: 'pepperoni', x: 89, y: 135},
              {type: 'pepperoni', x: 198, y: 74}],
      burner: []
    }];
    toppings = cookPizza(toppings);
    expect(toppings[0].pizza.length).toBe(0);
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

describe('draw burner toppings', () => {
  test('toppings were created on a burner accordingly', () => {
    //burnerBox
    const burnerBox = document.createElement('div');
    burnerBox.className = 'burnerBox';
    document.body.appendChild(burnerBox);
    //pizzaBox
    const pizzaBox = document.createElement('div');
    pizzaBox.className = "pizzaBox";
    document.body.appendChild(pizzaBox);
    //sample pepperoni
    let pepperoni1 = document.createElement('img');
    pepperoni1.className = "pepperoni";
    pepperoni1.setAttribute('style', `position: absolute; left: 89; bottom: 135`);
    pizzaBox.appendChild(pepperoni1);
    //sample pepperoni 2
    let pepperoni2 = document.createElement('img');
    pepperoni2.className = "pepperoni";
    pepperoni2.setAttribute('style', `position: absolute; left: 198; bottom: 74`);
    pizzaBox.appendChild(pepperoni2);
    //toppings parameter
    let toppings = [{
      pizza: [{type: 'pepperoni',x: 89,y: 135},
              {type: 'pepperoni',x: 198,y: 74}],
      burner: []
    }];
    expect(burnerBox.firstChild).toBe(null);
    drawBurnerToppings(toppings);
    let pepperonis = document.querySelectorAll('.burnerBox .pepperoni');
    expect(burnerBox.firstChild.src).toBe("http://localhost/images/pizza.png");
    expect(burnerBox.childNodes.length).toBe(3);
    expect(burnerBox.childNodes[1].style.left).toBe('89px');
    expect(burnerBox.childNodes[2].style.bottom).toBe('74px');
  });
  test('toppings were removed from pizza accordingly', () => {
    //pizzaBox
    const pizzaBox = document.createElement('div');
    pizzaBox.className = "pizzaBox";
    document.body.appendChild(pizzaBox);
    //burnerBox
    const burnerBox = document.createElement('div');
    burnerBox.className = 'burnerBox';
    document.body.appendChild(burnerBox);
    //sample pepperoni
    let pepperoni1 = document.createElement('img');
    pepperoni1.className = "pepperoni";
    pepperoni1.setAttribute('style', `position: absolute; left: 89; bottom: 135`);
    pizzaBox.appendChild(pepperoni1);
    //toppings parameter
    let toppings = [{
      pizza: [{type: 'pepperoni',x: 89,y: 135}],
      burner: []
    }];
    let pepperonis = document.querySelectorAll('.pizzaBox .pepperoni');
    expect(pizzaBox.childNodes.length).toBe(1);
    drawBurnerToppings(toppings);
    expect(pizzaBox.childNodes.length).toBe(0);
  });
});

describe('complete order', () => {
  //test that burner is empty
  test('burner is emptied', () => {
    let toppings = [{
      pizza: [],
      burner: [{type: 'pepperoni',x: 89,y: 135},
              {type: 'pepperoni',x: 198,y: 74}]
    }];
    let score = {points: 0};
    //burner should contain pizza
    expect(toppings[0].burner[0]).not.toBe(null);
    //run function
    score = completeOrder(toppings, score);
    //burner should be empty
    expect(toppings[0].burner[0]).toBe(undefined);
  });
  //test that points were added
  test('points were added based on toppings', () => {
    let toppings = [{
      pizza: [],
      burner: [{type: 'pepperoni',x: 89,y: 135},
              {type: 'pepperoni',x: 198,y: 74}]
    }];
    let score = {points: 0};
    let numberToppings = toppings[0].burner.length;
    //points are 0 before completed
    expect(score.points).toBe(0);
    //run function
    score = completeOrder(toppings, score);
    //points are added
    expect(score.points).not.toEqual(0);
    //points correspond with toppings
    expect(score.points).toEqual(numberToppings);
  });
});

describe('draw score', () => {
  test('score text has been updated', () => {
    //score before pizza is made
    let score = {points: 0};
    //topping list
    const toppingList = document.createElement('ul');
    toppingList.className = 'toppingList';
    document.body.appendChild(toppingList);
    //pepperoni icon
    const toppingIcon = document.createElement('li');
    toppingIcon.className = 'toppingIcon';
    toppingList.appendChild(toppingIcon);
      //score counter li item
    const scoreCounter = document.createElement('li');
    scoreCounter.className = 'score';
    scoreCounter.textContent = `Score: ${score.points}`;
    toppingList.appendChild(scoreCounter);
    //burnerBox
    const burnerBox = document.createElement('div');
    burnerBox.className = 'burnerBox';
    document.body.appendChild(burnerBox);
    //text should be score of 0
    expect(scoreCounter.textContent).toBe('Score: 0');
    //score updates after pizza is made
    score = {points: 2};
    //run function
    drawScore(score);
    //text should be score of 2
    expect(scoreCounter.textContent).toBe('Score: 2');
  });
});

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
