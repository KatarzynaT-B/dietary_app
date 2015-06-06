import Ember from 'ember';

export default Ember.Controller.extend({
  recipes: Ember.computed.filterBy('model', 'isDirty', false),
  needs: ['products'],
  allProducts: Ember.computed.alias('controllers.products.model'),

  products: Ember.computed('allProducts', function () {
    let products = this.get('allProducts');
    if (products) {
      products = products.toArray();
    } else {
      products = this.store.all('product');
    }
    return products;
  }).property(),

  setup: function () {
    this.setProperties({
      newRecipe: this.store.createRecord('recipe'),
      isAddingRecipe: false
    });
    this.store.createRecord('ingredient', {
      recipe: this.get('newRecipe')
    });
  }.on('init'),

  actions: {

    toggleAddingRecipe() {
      this.set('isAddingRecipe', !this.get('isAddingRecipe'));
    },

    addIngredient(recipe) {
      this.store.createRecord('ingredient', {
        recipe: recipe
      });
    },

    deleteRecipe(recipe) {
      recipe.deleteWithIngredients();
    },

    saveRecipeWithIngredients(recipe) {
      recipe.saveWithIngredients();
      this.setup();
    },

    cancel() {
      this.setup();
    },
  }
});