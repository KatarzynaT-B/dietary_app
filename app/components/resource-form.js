import Ember from 'ember';


export default Ember.Component.extend({

  actions: {

    addDependentResource() {
      this.sendAction('addDependentResource', this.get('resource'));
    },

    removeDependent(dependentResource) {
      dependentResource.destroyRecord();
    },

    saveWithDependentResources() {
      this.sendAction('saveWithDependentResources', this.get('resource'));
    },

    cancel() {
      this.sendAction('cancel');
    }
  }
});