var Random = require('random-js');
var random = new Random(Random.engines.mt19937().autoSeed());
var ConvertBase = require('./convertBase');

function Individual(gene) {
  this.gene = new Array(5); // First bit = negative bit flag

  if (gene) {
    this.gene = gene;
  } else {
    do {
      var geneLenght = this.gene.length;
      for (var i = 0; i < geneLenght; i++) {
        this.gene[i] = random.integer(0, 1);
      }
    } while (this.getDecimalGeneValue() < -10 || this.getDecimalGeneValue() > 10);
  }
}

Individual.prototype.onePointCrossover = function(otherIndividual) {
  var self = this;
  var crossPoint = random.integer(0, 5);

  var selfChromossomesA = self.gene.slice(crossPoint);
  var selfChromossomesB = self.gene.slice(0, crossPoint);

  var otherChromossomesA = otherIndividual.gene.slice(crossPoint);
  var otherChromossomesB = otherIndividual.gene.slice(0, crossPoint);

  var aGenes = selfChromossomesA.concat(otherChromossomesB);
  var bGenes = otherChromossomesA.concat(selfChromossomesB);

  var children = [
    new Individual(aGenes),
    new Individual(bGenes)
  ];

  return children;
};

Individual.prototype.mutate = function(mutateProbability) {
  var geneLenght = this.gene.length;
	for (var i = 0; i < geneLenght; i++) {
    if (random.integer(1, 100) <= mutateProbability * 100) {
      this.gene[i] = random.integer(0, 1);
    }
  }
};

Individual.prototype.getRawFitness = function() {
  var decimalGene = this.getDecimalGeneValue();
  return decimalGene * decimalGene - 3 * decimalGene + 4;
};

Individual.prototype.getFitness = function() {
  return this.getRawFitness();
};

Individual.prototype.getDecimalGeneValue = function() {
  var gene = this.gene.slice();
  var negativeFlag = gene.splice(0, 1);
  var decimalGene = parseInt(gene.join(''), 2);

  if (negativeFlag == 1)
    decimalGene *= -1;

  return decimalGene;
};

module.exports = Individual;
