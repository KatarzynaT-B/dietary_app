import DS from 'ember-data';

export default DS.Model.extend({
  name:     DS.attr('string'),
  fat:      DS.attr('number'),
  protein:  DS.attr('number'),
  carbs:    DS.attr('number'),
  calories: DS.attr('number'),
  productUnits:    DS.hasMany('product-unit')
});