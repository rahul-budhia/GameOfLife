var population = [], SIZE=55;

function newGeneration(size) {
  var generation = [];
  for (var i = 0; i < size; i++) {
    generation.push([]);
  }
  return generation;
}

function copyOf(currentGeneration) {
  return currentGeneration.map(function (row) {
    return row.slice();
  })
}

function seed(population) {
  for(var j=0; j<SIZE; j++){
    var row = [];
    for(var i=0; i<SIZE; i++){
      row.push(Math.round(Math.random()));
    }
    population.push(row);
  }
}

function ifAlive(population, row, column) {
  if (population[row]) {
    if (population[row][column]) {
      return population[row][column];
    }
  }
  return 0;
}

function display(population) {
  var markup = '';
  for (var i = 0; i < population.length; i++) {
    markup += '<div class="row">';
    var row = population[i];
    for (var j = 0; j < row.length; j++) {
      if (row[j]) {
        markup += '<div class="cell alive"></div>';
      } else {
        markup += '<div class="cell dead"></div>';
      }
    }
    markup += '</div>'
  }
  document.getElementById('root').innerHTML = markup;
}

function getAliveNeigbours(population, row, column) {
  // (row-1, column-1), (row, column-1), (row-1, column), (row-1, column+1),
  // (row+1, column), (row, column+1), (row+1, column+1), (row+1, column-1)
  var aliveNeighbours = ifAlive(population, row-1, column-1) + ifAlive(population, row, column-1) +
    ifAlive(population, row-1, column) + ifAlive(population, row-1, column+1) +
    ifAlive(population, row+1, column) + ifAlive(population, row, column+1)+
    ifAlive(population, row+1, column+1) + ifAlive(population, row+1, column-1);

  return aliveNeighbours;
}

function tick(population) {
  var size = population.length;
  var currentIndex = total = size * size,
    nextGeneration = newGeneration(size);

  while (--currentIndex) {
    var row = Math.floor(currentIndex / SIZE), column = currentIndex % SIZE;
    var aliveNeighbours = getAliveNeigbours(population, row, column);

    if (aliveNeighbours > 3) { //Over population
      nextGeneration[row][column] = 0
    } else if (aliveNeighbours < 2) { //Under population
      nextGeneration[row][column] = 0
    } else if (aliveNeighbours == 3) { //Reproduction
      if(population[row][column] == 0) {
        nextGeneration[row][column] = 1;
      } else {
        nextGeneration[row][column] = population[row][column];
      }
    } else {
      nextGeneration[row][column] = population[row][column];
    }
  }

  return nextGeneration;
}

seed(population);

setInterval(function () {
  display(population);
  population = tick(population);
}, 100)

//tick(population);
//setInterval(tick.bind(null, population), 1000);
