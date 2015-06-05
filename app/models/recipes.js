import DS from 'ember-data';

export default DS.Model.extend({
  title:       DS.attr('string'),
  description: DS.attr('string'),
  protein:     DS.attr('number'),
  fat:         DS.attr('number'),
  carbs:       DS.attr('number'),
  calories:    DS.attr('number'),
  ingredients: DS.hasMany('ingredient')
});