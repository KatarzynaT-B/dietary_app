import DS from 'ember-data';

export default DS.Model.extend({
  name:     DS.attr('string'),
  fat:      DS.attr('number'),
  protein:  DS.attr('number'),
  carbs:    DS.attr('number'),
  calories: DS.attr('number'),
  productUnits:    DS.hasMany('product-unit', {async: true}),

  deleteWithUnits() {
    if (this.get('productUnits.length') > 0) {
      this.get('productUnits').then(function (units) {
        units.forEach(function (unit) {
          unit.destroyRecord();
        });
      });
    }
    this.destroyRecord();
  },

  saveWithUnits() {
    let units = this.get('productUnits');
    units.forEach(function (unit) {
      if (unit.get('name') && unit.get('weight')) {
        unit.save();
      } else {
        unit.destroyRecord();
      }
    });
    this.save();
  }
});