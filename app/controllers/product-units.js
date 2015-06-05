import Ember from 'ember';

export default Ember.Controller.extend({
  firstUnitAdded: Ember.computed.and('newUnitName1', 'newUnitWeight1'),
  secondUnitAdded: Ember.computed.and('newUnitName2', 'newUnitWeight2'),
  thirdUnitAdded: Ember.computed.and('newUnitName3', 'newUnitWeight3'),

  allowAddUnit: Ember.computed('firstUnitAdded', 'addSecondUnit', 'secondUnitAdded', 'addThirdUnit', function () {
    return this.get('firstUnitAdded') && !this.get('addSecondUnit') ||
           this.get('secondUnitAdded') && !this.get('addThirdUnit');
  }),

  reset: function () {
    this.setProperties({
      newUnitName1: null,
      newUnitWeight1: null,
      newUnitName2: null,
      newUnitWeight2: null,
      newUnitName3: null,
      newUnitWeight3: null,
    });
  }.on('init'),

  collectUnits: function () {
    var units = [];
    if (this.get('firstUnitAdded')) {
      var unit = this.store.createRecord('product-unit', {
        name: this.get('newUnitName1'),
        weight: this.get('newUnitWeight1')
      });
      units.push(unit);
    }
    if (this.get('secondUnitAdded')) {
      var unit = this.store.createRecord('product-unit', {
        name: this.get('newUnitName2'),
        weight: this.get('newUnitWeight2')
      });
      units.push(unit);
    }
    if (this.get('thirdUnitAdded')) {
      var unit = this.store.createRecord('product-unit', {
        name: this.get('newUnitName3'),
        weight: this.get('newUnitWeight3')
      });
      units.push(unit);
    }
    this.reset();
    return units;
  }.property(),

  actions: {
    displayNewUnit() {
      if (this.get ('addSecondUnit')) {
        this.set('addThirdUnit', true);
      } else {
        this.set('addSecondUnit', true);
      }
    }
  }
});