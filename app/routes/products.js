import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('product');
  },

  afterModel(model) {
    return Ember.RSVP.all([
      model.get('productUnits')
    ]);
  }
});