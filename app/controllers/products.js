import Ember from 'ember';

export default Ember.Controller.extend({
  products: Ember.computed.filterBy('model', 'isDirty', false),

  setup: function () {
    this.setProperties({
      newProduct: this.store.createRecord('product')
    });
  }.on('init'),

  actions: {

    deleteProduct(product) {
      product.deleteWithUnits();
    },

    saveProductWithUnits(product) {
      product.saveWithUnits();
      this.setup();
    },

    cancel() {
      this.setup();
    },

    addUnit(product) {
      this.store.createRecord('product-unit', {
        product: product
      });
    }
  }
});