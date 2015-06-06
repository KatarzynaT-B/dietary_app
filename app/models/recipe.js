import DS from 'ember-data';
import CaloriesAmount from '../mixins/calories-amount';

export default DS.Model.extend(CaloriesAmount, {
  title:       DS.attr('string'),
  description: DS.attr('string'),
  protein:     DS.attr('number'),
  fat:         DS.attr('number'),
  carbs:       DS.attr('number'),
  calories:    DS.attr('number'),
  ingredients: DS.hasMany('ingredient', {async: true}),

  saveWithIngredients() {
    this.saveIngredients();
    this.setNutritionData();
    this.save();
  },

  saveIngredients() {
    let ingredients = this.get('ingredients');
    ingredients.forEach(function (ingredient) {
      if (ingredient.get('product') && ingredient.get('amount')) {
        ingredient.save();
      } else {
        ingredient.destroyRecord();
      }
    });
  },

  deleteWithIngredients() {
    this.get('ingredients').then(function (ingredients) {
      ingredients.forEach(function (ingredient) {
        ingredient.destroyRecord();
      });
    });
    this.destroyRecord();
  },

  setNutritionData() {
    let nutritionStatus = this.calculateNutritionStatus();
    this.setProperties({
      fat: nutritionStatus.fat,
      protein: nutritionStatus.protein,
      carbs: nutritionStatus.carbs,
      calories: nutritionStatus.calories
    });
  },

  calculateNutritionStatus() {
    let totalFat = 0, totalProtein = 0, totalCarbs = 0, totalCalories = 0, recipe = this;
    this.get('ingredients').forEach(function (ingredient) {
      let weight = recipe.calculateIngredientWeight(ingredient);
      totalFat += (weight / 100) * ingredient.get('product.fat');
      totalProtein += (weight / 100) * ingredient.get('product.protein');
      totalCarbs += (weight / 100) * ingredient.get('product.carbs');
      totalCalories = recipe.calculateCalories(ingredient.get('product'));
    });
    return {fat: totalFat, protein: totalProtein, carbs: totalCarbs, calories: totalCalories};
  },

  calculateIngredientWeight(ingredient) {
    let amount = ingredient.get('amount'),
        unit = ingredient.get('productUnit');
    if (unit) { amount *= unit.get('weight'); }
    return amount;
  },
});