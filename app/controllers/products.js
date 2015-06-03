import Ember from 'ember';

export default Ember.Controller.extend({
  products: Ember.computed.alias('model'),

  reset: function () {
    this.setProperties({
      newProductName: '',
      newProductFat: null,
      newProductProtein: null,
      newProductCarbs: null,
    });
  }.on('init'),

  newProductCalories: Ember.computed('newProductFat', 'newProductProtein', 'newProductCarbs', function () {
    return this.get('newProductFat')*9 + this.get('newProductProtein')*4 + this.get('newProductCarbs')*4;
  }),

  actions: {
    createProduct() {
      let product = this.store.createRecord('product');
      product.setProperties({
        name: this.get('newProductName'),
        fat: this.get('newProductFat'),
        carbs: this.get('newProductCarbs'),
        protein: this.get('newProductProtein'),
        calories: this.get('newProductCalories')
      });
      product.save();
    }
  }
});