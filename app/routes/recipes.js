import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return Ember.RSVP.all([
      this.store.find('product')
    ]);
  },

  model() {
    return this.store.find('recipe');
  },

  afterModel(model) {
    return Ember.RSVP.all([
      model.get('ingredients')
    ]);
  },
});