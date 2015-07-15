var expect = require('chai').expect;
var Individual = require('../../../lib/geneticAlgorithm/individual');

describe('Individual', function() {
	it('should create individual with randomly generated gene', function(done) {
    var individual = new Individual();

    expect(individual.gene).to.be.a('array');
    expect(individual.gene).to.have.length(5);

    done();
  });

  it('should create individual with given gene', function(done) {
    var gene = [0, 1, 0, 0, 0];
    var individual = new Individual(gene);

    expect(individual.gene).to.be.equal(gene);

    done();
  });

  it('should cross two individuals over usin one point technique', function(done) {
    var individualA = new Individual();
    var individualB = new Individual();

    var children = individualA.onePointCrossover(individualB);

    expect(children).to.have.length(2);
    expect(children[0]).to.have.property('gene')
      .with.length(5);
    expect(children[1]).to.have.property('gene')
      .with.length(5);

    done();
  });

  it('should mutate with a given probability', function(done) {
    var individual = new Individual();
    var originalGene = individual.gene.slice();

    individual.mutate(0.01);
    var newGene = individual.gene;

    expect(originalGene).not.to.be.equal(newGene);

    done();
  });

  it('should calculate raw fitness', function(done) {
    var individual = new Individual();
    var rawFitness = individual.getRawFitness();

    expect(rawFitness).to.be.ok;

    done();
  });

  it('should calculate fitness', function(done) {
    var individual = new Individual();
    var fitness = individual.getFitness();

    expect(fitness).to.be.ok;

    done();
  });
});
