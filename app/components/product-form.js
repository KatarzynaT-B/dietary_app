import ResourceForm from './resource-form';

export default ResourceForm.extend({
  units: Ember.computed.alias('product.productUnits'),
  resource: Ember.computed.alias('product'),
});