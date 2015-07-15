var GeneticAlgorithm = require('./lib/geneticAlgorithm/geneticAlgorithm');

var ga = new GeneticAlgorithm({
	populationSize: 30,
	crossoverProbability: 0.7,
	mutateProbability: 0.01,
	maxGenerations: 50
});

ga.run();
