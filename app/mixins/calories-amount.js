import Ember from 'ember';

export default Ember.Mixin.create({
  calculateCalories(product) {
    let fatCalories = product.get('fat')*9,
        proteinCalories = product.get('protein')*4,
        carbsCalories = product.get('carbs')*4,
        totalCalories = fatCalories + proteinCalories + carbsCalories;
    return +totalCalories.toFixed(2);
  }
});