import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'https://dev.noblyn.com',
	namespace: 'api/gaming'
});
