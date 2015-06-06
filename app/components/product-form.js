import Ember from 'ember';

export default Ember.Component.extend({
  units: Ember.computed.alias('product.productUnits'),

  actions: {

    addUnit() {
      this.sendAction('addUnit', this.get('product'));
    },

    removeUnit(unit) {
      unit.destroyRecord();
    },

    saveProductWithUnits() {
      this.sendAction('saveProductWithUnits', this.get('product'))
    },

    cancel() {
      this.sendAction('cancel');
    }
  }
});