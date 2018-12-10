let orders = [];
let toppings = [{
  pizza: [],
  burner: []
}];
let score = {points: 0};

const fetchRandom = (min, max) => {
  return Math.floor(Math.random()*(max-min)+min);
};

const addOrder = (num, list) => {
  return [...list, {
    number: num,
    topping: 'pepperoni'
  }];
};

const drawOrders = (list) => {
  const orderList = document.querySelector('.orderList');
  //orderList.innerHTML = '';
  for(let item of list) {
    let liEl = document.createElement('li');
    liEl.className = 'order';
    let liElText = document.createTextNode(item.number + ' ' + item.topping);
    liEl.appendChild(liElText);
    orderList.appendChild(liEl);
  };
};

const addTopping = (toppings) => {
    let topping = {
      type: 'pepperoni',
      x: fetchRandom(100, 320),
      y: fetchRandom(100, 320),
    };
  toppings[0].pizza.push(topping);
  return topping;
};

const drawTopping = (topping, toppings) => {
    let pizzaBox = document.querySelector('.pizzaBox');
    let imgEl = document.createElement('img');
    imgEl.className = `${topping.type}`;
    imgEl.setAttribute('src', 'images/pepperoni.svg');
    imgEl.setAttribute('style', `position: absolute; left: ${topping.x}px; bottom: ${topping.y}px`);
    pizzaBox.appendChild(imgEl);
 };

const cookPizza = (toppings) => {
  if(toppings[0].pizza && toppings[0].burner.length == 0) {
    toppings[0].burner = [...toppings[0].pizza];
    toppings[0].pizza = [];
  };
  return toppings;
};

const drawBurnerToppings = (toppings) => {
  let pizza = toppings[0].pizza;
  let burnerBox = document.querySelector('.burnerBox');
  let pizzaBox = document.querySelector('.pizzaBox');
  if(pizza && toppings[0].burner.length == 0) {
    let pizzaImg = document.createElement('img');
    pizzaImg.setAttribute('src', 'images/pizza.png');
    pizzaImg.setAttribute('style', 'height: 480px; position: absolute; left: 10px; bottom: 10px;');
    burnerBox.appendChild(pizzaImg);
    for(let topping of pizza) {
      let imgEl = document.createElement('img');
      imgEl.className = `${topping.type}`;
      imgEl.setAttribute('src', 'images/pepperoni.svg');
      imgEl.setAttribute('style', `position: absolute; left: ${topping.x}px; bottom: ${topping.y}px`);
      burnerBox.appendChild(imgEl);
      pizzaBox.innerHTML = '';
    };
  };
};

const completeOrder = (toppings, score) => {
  if(toppings[0].burner[0]) {
    score.points += toppings[0].burner.length;
    toppings[0].burner = [];
    return score;
  };
};

const drawScore = (score) => {
  let scoreCounter = document.querySelector('.score');
  let burnerBox = document.querySelector('.burnerBox');
  scoreCounter.textContent = `Score: ${score.points}`;
  burnerBox.innerHTML = '';
};

const init = () => {
  const orderList = document.createElement('ul');
  orderList.className = 'orderList';
  document.body.appendChild(orderList);

  const containerBox = document.createElement('div');
  containerBox.className = 'containerBox';
  document.body.appendChild(containerBox);

  const pizzaBox = document.createElement('div');
  pizzaBox.className = 'pizzaBox';
  containerBox.appendChild(pizzaBox);

  const burnerBox = document.createElement('div');
  burnerBox.className = 'burnerBox';
  containerBox.appendChild(burnerBox);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';
  document.body.appendChild(buttonContainer);

  const cookButton = document.createElement('button');
  cookButton.className = 'button';
  const cookText = document.createTextNode('Cook Pizza');
  cookButton.addEventListener('click', event => {
    drawBurnerToppings(toppings);
    cookPizza(toppings);
  });
  cookButton.appendChild(cookText);
  buttonContainer.appendChild(cookButton);

  const completeButton = document.createElement('button');
  completeButton.className = 'button';
  const completeText = document.createTextNode('Complete Order');
  completeButton.addEventListener('click', event => {
    score = completeOrder(toppings, score);
    drawScore(score);
  });
  completeButton.appendChild(completeText);
  buttonContainer.appendChild(completeButton);

  const toppingList = document.createElement('ul');
  toppingList.className = 'toppingList';
  document.body.appendChild(toppingList);

  const toppingIcon = document.createElement('li');
  toppingIcon.className = 'toppingIcon';
  toppingIcon.addEventListener('click', event => {
    topping = addTopping(toppings);
    drawTopping(topping, toppings);
  });
  toppingList.appendChild(toppingIcon);

  const scoreCounter = document.createElement('li');
  scoreCounter.className = 'score';
  scoreCounter.textContent = `Score: 0`;
  toppingList.appendChild(scoreCounter);
};

window.onload = init;

//exporting to test file
if (typeof module !== 'undefined') {
  module.exports = {
    fetchRandom,
    addOrder,
    drawOrders,
    addTopping,
    drawTopping,
    cookPizza,
    drawBurnerToppings,
    completeOrder,
    drawScore,
    init,
  };
};
