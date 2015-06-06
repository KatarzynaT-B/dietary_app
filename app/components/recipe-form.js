import ResourceForm from './resource-form';

export default ResourceForm.extend({
  ingredients: Ember.computed.alias('recipe.ingredients'),
  productNames: Ember.computed.mapBy('products', 'name'),
  resource: Ember.computed.alias('recipe'),
});