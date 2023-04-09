import './css/style.css';

// This function stores our state.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

// This is a function factory. 
// We can easily create more specific functions that 
// alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

// We create four functions using our function factory. 
// We could easily create many more.
const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

console.log('index.js run');
window.onload = function () {
  console.log('loaded');
  document.getElementById('add-plant-button').addEventListener('click', (e) => {
    addPlant(1);
  });
  // This function has side effects because we are manipulating the DOM.
  // Manipulating the DOM will always be a side effect. 
  // Note that we only use one of our functions to alter soil. 
  // You can easily add more.

  [...document.getElementsByClassName('feed')].forEach(but => {
    but.addEventListener('click', (e) => {
      console.log('clicked', e.target.id);
    });
  });
  [...document.getElementsByClassName('water')].forEach(but => {
    but.addEventListener('click', (e) => {
      console.log('clicked', e.target.id);
    });
  });
  // document.getElementById('feed').onclick = function () {
  //   const newState = stateControl(feed);
  //   document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  // };
  // document.getElementById('bluefood').onclick = function () {
  //   const newState = stateControl(blueFood);
  //   document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  // };
  // document.getElementById('hydrate').onclick = function () {
  //   const newState = stateControl(hydrate);
  //   document.getElementById('water-value').innerText = `Water: ${newState.water}`;
  // };
  // document.getElementById('superWater').onclick = function () {
  //   const newState = stateControl(superWater);
  //   document.getElementById('water-value').innerText = `Water: ${newState.water}`;
  // };

  // This function doesn't actually do anything useful in this application 
  // — it just demonstrates how we can "look" at the current state 
  // (which the DOM is holding anyway). 
  // However, students often do need the ability to see the current state 
  // without changing it so it's included here for reference.
  document.getElementById('show-state').onclick = function () {
    // We just need to call stateControl() without arguments 
    // to see our current state.
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  };
};

const addPlant = (newId) => {
  console.log('Adding plant with ID', newId);
  const newPlant = document.createElement('div');
  newPlant.classList.add('plant-container');
  newPlant.id = `plant-${newId}`;
  newPlant.innerHTML = `
    <h1>Plant ID ${newId}</h1>
    <button class="feed" id="feed-${newId}">Add food</button>
    <button class="feed" id="bluefood-${newId}">Add blue food</button>
    <button class="water" id="hydrate-${newId}">Hydrate</button>
    <button class="water" id="superWater-${newId}">Super Water</button>
    <button class="showstate" id="show-state-${newId}">Current Stats</button>
    <h3><div id=soil-value-${newId}>0</div></h3>
    <h3><div id=water-value-${newId}>0</div></h3>
  `;
  document.getElementById('plant-list-area').append(newPlant);
  document.getElementById(`feed-${newId}`).onclick = function () {
    const newState = stateControl(feed);
    document.getElementById(`soil-value-${newId}`).innerText = `Soil: ${newState.soil}`;
  };
  document.getElementById(`bluefood-${newId}`).onclick = function () {
    const newState = stateControl(blueFood);
    document.getElementById(`soil-value-${newId}`).innerText = `Soil: ${newState.soil}`;
  };
  document.getElementById(`hydrate-${newId}`).onclick = function () {
    const newState = stateControl(hydrate);
    document.getElementById(`water-value-${newId}`).innerText = `Water: ${newState.water}`;
  };
  document.getElementById(`superWater-${newId}`).onclick = function () {
    const newState = stateControl(superWater);
    document.getElementById(`water-value-${newId}`).innerText = `Water: ${newState.water}`;
  };
};
