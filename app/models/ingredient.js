import DS from 'ember-data';

export default DS.Model.extend({
  name:        DS.attr('string'),
  unit:        DS.belongsTo('unit'),
  ingredients: DS.hasMany('ingredient')
});