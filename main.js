let pepperoni = document.getElementById('pepperoni');
let pizzaBox = document.getElementById('pizzaBox');
let ingredientLocation = [];
let positioningUnit = 80;
for(let i = 0; i <= 19; i++) {
  ingredientLocation[i] = positioningUnit;
  positioningUnit +=10;
}
pepperoni.addEventListener('click', () => {
  let pepperoniIngr = document.createElement('img');
  pepperoniIngr.setAttribute('src', 'images/pepperoni.svg');
  pepperoniIngr.setAttribute('alt', 'Pepperoni');
  pepperoniIngr.style.width = '50px';
  pepperoniIngr.style.position = 'absolute';
  pepperoniIngr.style.top = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  pepperoniIngr.style.left = `${ingredientLocation[Math.floor(Math.random()*ingredientLocation.length)]}px`;
  pizzaBox.appendChild(pepperoniIngr);
});
