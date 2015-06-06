import Ember from 'ember';

export default Ember.Controller.extend({
  recipe: Ember.computed.alias('model'),
  ingredients: Ember.computed.alias('model.ingredients'),
  needs: ['recipes'],
  products: Ember.computed.alias('controllers.recipes.products'),

  setup: function () {
    this.setProperties({
      isEditing: false,
    });
  }.on('init'),

  actions: {

    addIngredient(recipe) {
      this.store.createRecord('ingredient', {
        recipe: recipe
      });
    },

    deleteRecipe(recipe) {
      this.transitionTo('recipes');
      recipe.deleteWithIngredients();
    },

    editRecipe(recipe) {
      recipe.set('isEditing', true);
    },

    saveRecipeWithIngredients(recipe) {
      recipe.saveWithIngredients();
      recipe.set('isEditing', false);
    },

    cancel() {
      this.get('recipe').set('isEditing', false);
      this.get('recipe').rollback();
    }
  }
});