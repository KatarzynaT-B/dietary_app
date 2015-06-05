import Ember from 'ember';

export default Ember.Component.extend({
  units: Ember.computed.alias('product.productUnits'),

  productCalories: Ember.computed('product.fat', 'product.carbs', 'product.protein', function () {
    let cal = this.get('product.fat')*9 + this.get('product.protein')*4 + this.get('product.carbs')*4;
    return +cal.toFixed(2);
  }),

  actions: {

    addUnit() {
      this.sendAction('addUnit', this.get('product'));
    },

    removeUnit(unit) {
      unit.destroyRecord();
    },

    saveProductWithUnits() {
      let product = this.get('product');
      product.set('calories', this.get('productCalories'));
      this.sendAction('saveProductWithUnits', product)
    },

    cancel() {
      this.sendAction('cancel');
    }
  }
});