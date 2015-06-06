import Ember from 'ember';

export default Ember.Controller.extend({
  products: Ember.computed.filterBy('model', 'isDirty', false),

  setup: function () {
    this.setProperties({
      newProduct: this.store.createRecord('product'),
      isAddingProduct: false
    });
  }.on('init'),

  actions: {

    deleteProduct(product) {
      product.deleteWithUnits();
    },

    saveProductWithUnits(product) {
      product.saveWithUnits();
      this.transitionTo('products.product', this.get('newProduct.id'));
      this.setup();
    },

    cancel() {
      this.setup();
    },

    addUnit(product) {
      this.store.createRecord('product-unit', {
        product: product
      });
    },

    toggleAddingProduct() {
      this.set('isAddingProduct', !this.get('isAddingProduct'));
    }
  }
});