/*//initializing function to run on load
const init = () => {
  let pepperoniIcon = document.getElementById('pepperoni');
  pepperoniIcon.addEventListener('click', randomPepperoni);
  let cookButton = document.getElementById('cookButton');
  cookButton.addEventListener('click', cookPizza);
  let completeButton = document.getElementById('complete');
  completeButton.addEventListener('click', completeOrder);
  let positioningUnit = 80;
  for(let i = 0; i <= 19; i++) {
    ingredientLocation[i] = positioningUnit;
    positioningUnit +=10;
  };
  let ordersArr;
  let orderIngredientArr;
  //cook button function
}

//function to create randomized order
const createOrder = () => {
  ordersArr = document.getElementsByClassName('orders');
  if (ordersArr.length <= 5) {
    let orderList = document.getElementById('orderList');
    let newOrder = document.createElement('li');
    let ingredientList = document.createElement('ul');
    let orderIngredient = document.createElement('li');
    newOrder.setAttribute('class', 'orders');
    newOrder.innerHTML = 'Order: ';
    ingredientList.setAttribute('class', 'ingredientList');
    orderIngredient.setAttribute('class', 'orderIngredient');
    orderList.appendChild(newOrder);
    newOrder.appendChild(ingredientList);
    ingredientList.appendChild(orderIngredient);
    numOrders++;
    orderIngredientArr = document.getElementsByClassName('orderIngredient');
    orderIngredientArr[numOrders-1].innerHTML = `${(numIngredients[Math.floor(Math.random()*numIngredients.length)]) + ' ' + (ingredients[Math.floor(Math.random()*ingredients.length)])}`;
  }
}

//timer function to run createOrder function every 10 secs
const orderCycle = () => {
  createOrder();
  let orderCountdown = setInterval(createOrder, 10 * 1000);
}

//place random pepperoni function
const randomPepperoni = () => {
  let peppIngr = document.createElement('img');
  let pizzaBox = document.getElementById('pizzaBox');
  peppIngr.setAttribute('src', 'images/pepperoni.svg');
  peppIngr.setAttribute('alt', 'Pepperoni');
  peppIngr.setAttribute('class', 'peppIngr');
  peppIngr.style.width = '50px';
  peppIngr.style.position = 'absolute';
  peppIngr.style.top = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  peppIngr.style.left = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  peppCount.push([peppIngr.style.top, peppIngr.style.left]);
  pizzaBox.appendChild(peppIngr);
}

//function to move pizza to burner
const cookPizza = () => {
  let img = document.querySelectorAll('img');
  let ovenBox = document.getElementById('ovenBox')
  if(!peppCount.length == 0) {
    let burner = document.createElement('div');
    burner.setAttribute('style', "background-image: url('images/pizza.png'); background-size: contain; background-repeat: no-repeat; position: absolute; top: 27px; left: 18px; width: 40%; height: 40%;");
    burner.setAttribute('id', 'burnerPizza');
    ovenBox.appendChild(burner);
    for (let i = 0; i <= peppCount.length-1; i++) {
      let peppIngr = document.createElement('img');
      peppIngr.setAttribute('src', 'images/pepperoni.svg');
      peppIngr.setAttribute('alt', 'Pepperoni');
      peppIngr.setAttribute('class', 'smallPeppIngr');
      peppIngr.style.width = '20px';
      peppIngr.style.position = 'absolute';
      let x = peppCount[i][0];
      let y = peppCount[i][1];
      peppIngr.style.top = `${parseInt(x)/2.5}` + 'px';
      peppIngr.style.left = `${parseInt(y)/2.5}` + 'px';
      burner.appendChild(peppIngr);
      let bigPeppIngr = document.querySelectorAll('.peppIngr')
      pizzaBox.removeChild(bigPeppIngr[0]);
      //START COOKING FUNCTION
    }
  }
}

//complete button function
const completeOrder = () => {
  let burnerPizza = document.getElementById('burnerPizza');
  if (burnerPizza) {
    let orderList = document.getElementById('orderList');
    orderList.removeChild(orderList.firstElementChild);
    numOrders--;
    ovenBox.removeChild(ovenBox.firstElementChild);
    for(let i = peppCount.length; i > 0; i--) {
      let smallPeppIngr = document.querySelectorAll('.smallPeppIngr');
      burnerPizza.removeChild(smallPeppIngr[0]);
    }
  }
};

//function to run when window loads
window.onLoad = () => {
  init();
  orderCycle();
};

//initializing variables
let numOrders = 0;
let numIngredients = [5, 6, 7, 8, 9, 10];
let orderInterval = 10;
let ingredients = ['pepperoni'];
let peppCount = [];
let ingredientLocation = [];

//runs when window loads
window.onLoad();
*/

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

const completeOrderHandler = (event, toppings) => {
  event.preventDefault();
  score = completeOrder(toppings, score);
  drawScore(score);
  return score;
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
  cookButton.appendChild(cookText);
  cookButton.addEventListener('click', () => {
    cookPizza(toppings);
    drawBurnerToppings(toppings);
  });
  buttonContainer.appendChild(cookButton);

  const completeButton = document.createElement('button');
  completeButton.className = 'button';
  const completeText = document.createTextNode('Complete Order');
  completeButton.addEventListener('click', completeOrderHandler);
  completeButton.appendChild(completeText);
  buttonContainer.appendChild(completeButton);

  const toppingList = document.createElement('ul');
  toppingList.className = 'toppingList';
  document.body.appendChild(toppingList);

  const toppingIcon = document.createElement('li');
  toppingIcon.className = 'toppingIcon';
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
    cookPizza,
    drawBurnerToppings,
    completeOrder,
    drawScore,
    completeOrderHandler,
    init,
  };
};
