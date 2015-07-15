var Random = require('random-js');
var random = new Random(Random.engines.mt19937().autoSeed());
var Individual = require('./individual');

function GeneticAlgorithm(settings) {
  this.settings = {};
  this.settings.populationSize = settings.populationSize;
  this.settings.crossoverProbability = settings.crossoverProbability;
  this.settings.mutateProbability = settings.mutateProbability;
  this.settings.maxGenerations = settings.maxGenerations;
  this.settings.tournmentSize = settings.tournmentSize || 2;

  this.population = [];
  this.currentGeneration = 0;
  this.betSolution;
}

GeneticAlgorithm.prototype.run = function() {
  this.initPopulation();

  while (this.currentGeneration < this.settings.maxGenerations) {
    this.currentGeneration++;

    this.selectFittestsPopulation();
    var fittest = this.population[0];

    if (!this.betSolution || (fittest.getFitness() > this.betSolution.getFitness() && fittest.getDecimalGeneValue() >= -10 && fittest.getDecimalGeneValue() <= 10))
      this.betSolution = fittest;

    console.log('Generation #' + this.currentGeneration);

    for (var i = 0; i < this.population.length; i++) {
      console.log('Individual #' + i + ' - Fitness: ' + this.population[i].getFitness()  + ' X: ' + this.population[i].getDecimalGeneValue());
    }

    console.log('Best solution: x = ' + fittest.getDecimalGeneValue());
    console.log('Best fitness = ' + fittest.getFitness());
    console.log('Best gene: ' + fittest.gene);
    console.log('\n');

    this.reproduct();
  }

  console.log('Best solution');
  console.log('=====================\n')
  console.log('Best solution: x = ' + this.betSolution.getDecimalGeneValue());
  console.log('Best fitness = ' + this.betSolution.getFitness());
  console.log('Best gene: ' + this.betSolution.gene);
};

GeneticAlgorithm.prototype.initPopulation = function() {
  for (var i = 0; i < this.settings.populationSize; i++) {
    var individual = new Individual();
    this.population.push(individual);
  }
};

GeneticAlgorithm.prototype.reproduct = function() {
  var nextPopulation = [];

  while (nextPopulation.length < this.settings.populationSize) {
    var parents = this.selectionByTournment();

    if (random.real(0, 1) < this.settings.crossoverProbability) {
      var children = parents[0].onePointCrossover(parents[1]);

      if (children[0].getDecimalGeneValue() >= -10 && children[0].getDecimalGeneValue() <= 10)
        nextPopulation.push(children[0]);

      if (children[1].getDecimalGeneValue() >= -10 && children[1].getDecimalGeneValue() <= 10)
        nextPopulation.push(children[1]);
    } else {
      parents[0].mutate(this.settings.mutateProbability);
      var child = parents[0];

      if (child.getDecimalGeneValue() >= -10 && child.getDecimalGeneValue() <= 10)
        nextPopulation.push(child);
    }
  }

  this.population = nextPopulation;
};

GeneticAlgorithm.prototype.selectionByTournment = function() {
  var parents = [];

  for (var i = 0; i < this.settings.tournmentSize; i++) {
    var randomIndividual = this.getRandomIndividual();
    parents.push(randomIndividual);
  }

  parents.sort(this.fittestSorting);

  return parents;
};

GeneticAlgorithm.prototype.getRandomIndividual = function() {
  return this.population[random.integer(0, this.settings.populationSize - 1)];
};

GeneticAlgorithm.prototype.selectFittestsPopulation = function() {
  this.population.sort(this.fittestSorting);
  this.population = this.population.slice(0, this.settings.populationSize);
};

GeneticAlgorithm.prototype.fittestSorting = function(individualA, individualB) {
  if (individualA.getFitness() > individualB.getFitness())
    return -1;

  if (individualA.getFitness() < individualB.getFitness())
    return 1;

  return 0;
};

module.exports = GeneticAlgorithm;
