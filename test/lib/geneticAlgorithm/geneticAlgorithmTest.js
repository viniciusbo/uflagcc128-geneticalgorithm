var expect = require('chai').expect;
var GeneticAlgorithm = require('../../../lib/geneticAlgorithm/geneticAlgorithm');

describe('Genetic Algorithm', function() {
  var defaultSettings = {
    populationSize: 30,
    crossoverProbability: 0.7,
    mutateProbability: 0.01,
    maxGenerations: 1
  };

  it('should initialize population randomly', function(done) {
    var ga = new GeneticAlgorithm(defaultSettings);
    ga.initPopulation();

    expect(ga.population.length).to.be.equal(defaultSettings.populationSize);

    for (var i = 0; i < ga.population.length; i++) {
      expect(ga.population[i].gene).to.be.a('array');
    }

    done();
  });

  it('should get a random individual', function(done) {
    var ga = new GeneticAlgorithm(defaultSettings);
    ga.initPopulation();

    var randomIndivudal = ga.getRandomIndividual();
    expect(randomIndivudal).to.be.ok;

    done();
  });

  it('should select individuals by tournment', function(done) {
    var ga = new GeneticAlgorithm(defaultSettings);
    ga.initPopulation()

    var parents = ga.selectionByTournment();

    expect(parents).to.be.a('array');
    expect(parents.length).to.be.equal(2);

    done();
  });

  it('should select fittests', function(done) {
    var ga = new GeneticAlgorithm(defaultSettings);
    ga.initPopulation();
    ga.reproduct();
    ga.selectFittestsPopulation();

    expect(ga.population.length).to.be.equal(defaultSettings.populationSize);

    done();
  });

  it('should run', function(done) {
    var ga = new GeneticAlgorithm(defaultSettings);
    ga.run();

    done();
  })
});
