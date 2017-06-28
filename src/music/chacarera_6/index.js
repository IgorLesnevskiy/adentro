module.exports = {
	name: 'Chacarera on 6',
	scheme: require('./scheme.yaml'),
	music: [require('./music/la_penadora'), require('./music/la_baguala')],
	animation: [{
		id: 'onTwo',
		animClass: require('animationClasses/ChacareraAnimation').default,
		title: localize({ru: 'На двоих', en: 'On two people'})
	}, {
		id: 'onFour',
		animClass: require('animationClasses/Chacarera4Animation').default,
		title: localize({ru: 'На четверых', en: 'On four people'})
	}],
	info: require('infoData/chacarera.inc'),
	zapateo: true
};
