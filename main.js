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

const addOrder = (order, orders) => {
  orders.push(order);
  return orders;
};

const cookPizza = (toppings, burner) => {
  if(toppings[0] && burner[0].state == null) {
    burner[0].state = 'toppedPizza';
    toppings[0].state = null;
  };
};

const completeOrder = (toppings, burner, score) => {
  if(burner[0].state !== null) {
    burner[0].state = null;
    score.points += toppings.length;
    return score;
  };
};

const draw = (orders, toppings, burner) => {
  for(let order of orders) {
    let orderEl = document.createElement('li');
    let orderList = document.querySelector('.orderList');
    orderEl.className = 'order';
    orderList.appendChild(orderEl);
  };
  for(let topping of toppings) {
    let toppingEl = document.createElement('img');
    toppingEl.className = 'topping';
    pizzaBox.appendChild(toppingEl);
  };
  if(burner[0].state == null) {
    for(let topping of toppings) {
      let burnerBox = document.querySelector('.burnerBox')
      let currentToppings = document.querySelector('.topping');
      burnerBox.setAttribute('style', "background-image: url('images/pizza.png'); background-size: contain; background-repeat: no-repeat;");
      burnerBox.appendChild(currentToppings);
    };
  };
};

window.onload = init;

const init = () => {
  const orderList = document.createElement('ul');
  orderList.className = 'orderList';
  document.body.appendChild(orderList);

  const order = document.createElement('li');
  order.className = 'order';
  orderList.appendChild(order);
  //EVENTUALLY WE WANT TO PUT A CREATE ORDER FUNCTION IN HERE MAYBE

  const pizzaBox = document.createElement('div');
  pizzaBox.className = 'pizzaBox';
  document.body.appendChild(pizzaBox);

  const burnerBox = document.createElement('div');
  burnerBox.className = 'burnerBox';
  document.body.appendChild(burnerBox);

  const ingredientList = document.createElement('ul');
  ingredientList.className = 'ingredientList';
  document.body.appendChild(ingredientList);

  const ingredient = document.createElement('li');
  ingredient.className = 'ingredient';
  ingredientList.appendChild(ingredient);

  const completeButton = document.createElement('button');
  document.body.appendChild(completeButton);
};

//exporting to test file
if (typeof module !== 'undefined') {
  module.exports = {
    addOrder,
    cookPizza,
    completeOrder,
    draw,
    init,
  };
};
