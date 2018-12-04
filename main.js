  //initializing variables
  let pepperoni = document.getElementById('pepperoni');
  let peppCount = [];
  let pizzaBox = document.getElementById('pizzaBox');
  let ovenBox = document.getElementById('ovenBox')
  let completeButton = document.getElementById('complete');
  let cookButton = document.getElementById('cookButton');
  let burner1;
  let burner2;
  let burner3;
  let burner4;
  let ingredientLocation = [];
  let positioningUnit = 80;
  let ingredients = ['pepperoni'];
  let numIngredients = [5, 6, 7, 8, 9, 10];
  let orderInterval = 10;
  let ordersArr;
  let orderIngredientArr;
  let numOrders = 0;


  //adds locations 80-270 to ingredientLocation array
  for(let i = 0; i <= 19; i++) {
    ingredientLocation[i] = positioningUnit;
    positioningUnit +=10;
  }

//cook button function
  cookButton.addEventListener('click', () => {
    let img = document.querySelectorAll('img');
    if(!peppCount.length == 0) {
      console.log('yes');
      let burner = document.createElement('div');
      burner.setAttribute('style', "background-image: url('images/pizza.png'); background-size: contain; background-repeat: no-repeat; position: absolute; top: 27px; left: 18px; width: 40%; height: 40%;");
      ovenBox.appendChild(burner);
      for (let i = 0; i <= peppCount.length-1; i++) {
        let peppIngr = document.createElement('img');
        peppIngr.setAttribute('src', 'images/pepperoni.svg');
        peppIngr.setAttribute('alt', 'Pepperoni');
        peppIngr.style.width = '20px';
        peppIngr.style.position = 'absolute';
        let x = peppCount[i][0];
        let y = peppCount[i][1];
        peppIngr.style.top = `${parseInt(x)/2.5}` + 'px';
        peppIngr.style.left = `${parseInt(y)/2.5}` + 'px';
        burner.appendChild(peppIngr);
        //START COOKING FUNCTION
      }
    }
  });

//}

/*window.onLoad = () => {
  init()
};*/

//place random pepperoni function
const randomPepperoni = () => {
  let peppIngr = document.createElement('img');
  peppIngr.setAttribute('src', 'images/pepperoni.svg');
  peppIngr.setAttribute('alt', 'Pepperoni');
  peppIngr.style.width = '50px';
  peppIngr.style.position = 'absolute';
  peppIngr.style.top = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  peppIngr.style.left = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  peppCount.push([peppIngr.style.top, peppIngr.style.left]);
  pizzaBox.appendChild(peppIngr);
  console.log(peppCount);
}

const orderCycle = () => {
  createOrder();
  let orderCountdown = setInterval(createOrder, 10 * 1000);
}

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

orderCycle();

//pepperoni eventListener
pepperoni.addEventListener('click', randomPepperoni);



if (module) {
  module.exports = {
    randomPepperoni
  };
}
