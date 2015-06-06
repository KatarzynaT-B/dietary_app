import Ember from 'ember';

export default Ember.Component.extend({
  ingredients: Ember.computed.alias('recipe.ingredients'),
  productNames: Ember.computed.mapBy('products', 'name'),

  actions: {

    addIngredient() {
      this.sendAction('addIngredient', this.get('recipe'));
    },

    removeIngredient(ingredient) {
      ingredient.destroyRecord();
    },

    saveRecipeWithIngredients() {
      this.sendAction('saveRecipeWithIngredients', this.get('recipe'));
    },

    cancel() {
      this.sendAction('cancel');
    }
  }
});