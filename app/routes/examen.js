import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service('ajax'),
	model: function(params){
		let ajax = this.get('ajax');
		let quizId = params.quiz_id;

		//let promise = this.store.find('test', quizId)
		let promise = ajax.request('https://dev.noblyn.com/api/gaming/tests/' + quizId);
		
		return promise.then((response)=>{
   		  let test = this.store.createRecord('test', {
   		  	id: response.test.id,
   		  	name: response.test.name,
			code: response.test.code,
			cover_img: response.test.cover_img
			
		});

   		  response.test.questions.forEach((q)=>{
   		  	let question = this.store.createRecord('question', {
   		  		id: q.id,
   		  		test: test,
   		  		text: q.text,
   		  		point: q.points
   		  	});
   		  	test.get('questions').pushObject(question);
   		  })

   		  return test;
	});
   }
});
