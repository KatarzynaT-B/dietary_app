import Ember from 'ember';

export default Ember.Controller.extend({
  product: Ember.computed.alias('model'),
  units: Ember.computed.alias('model.productUnits'),

  reset: function () {
    this.setProperties({
      isEditing: false,
    });
  }.on('init'),

  actions: {

    addUnit(product) {
      this.store.createRecord('product-unit', {
        product: product
      });
    },

    deleteProduct(product) {
      this.transitionTo('products');
      product.deleteWithUnits();
    },

    editProduct(product) {
      product.set('isEditing', true);
    },

    saveProductWithUnits(product) {
      product.saveWithUnits();
      product.set('isEditing', false);
      // this.transitionTo('products');
    },

    cancel() {
      this.get('product').set('isEditing', false);
      this.get('product').rollback();
    }
  }
});