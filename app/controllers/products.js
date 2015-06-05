import Ember from 'ember';

export default Ember.Controller.extend({
  products: Ember.computed.alias('model'),
  needs: ['productUnits'],
  collectedUnits: Ember.computed.alias('controllers.productUnits.collectUnits'),

  reset: function () {
    this.setProperties({
      newProductName: null,
      newProductFat: null,
      newProductProtein: null,
      newProductCarbs: null,
    });
  }.on('init'),

  newProductCalories: Ember.computed('newProductFat', 'newProductProtein', 'newProductCarbs', function () {
    return this.get('newProductFat')*9 + this.get('newProductProtein')*4 + this.get('newProductCarbs')*4;
  }),

  collectUnits(product) {
    var units = this.get('collectedUnits');
    units.forEach(function (unit) {
      unit.set('product', product);
      unit.save();
    });
  },

  actions: {
    displayNewUnit() {
      if (this.get ('addSecondUnit')) {
        this.set('addThirdUnit', true);
      } else {
        this.set('addSecondUnit', true);
      }
    },

    createProduct() {
      let product = this.store.createRecord('product', {
        name: this.get('newProductName'),
        fat: this.get('newProductFat'),
        carbs: this.get('newProductCarbs'),
        protein: this.get('newProductProtein'),
        calories: this.get('newProductCalories')
      });
      this.collectUnits(product);
      product.save();
      this.reset();
    },

    deleteProduct(product) {
      product.destroyRecord();
    },

    editProduct(product) {
      product.set('isEditing', true);
    },

    updateProduct(product) {
      product.save().then(()=>{
        product.set('isEditing', false);
      });
    },

    cancel(product) {
      product.set('isEditing', false);
      product.rollback();
    }
  }
});