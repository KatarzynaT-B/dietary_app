import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('products', function () {
    this.route('product', {path: '/:product_id'});
  });
  this.route('recipes', function () {
    this.route('recipe', {path: '/:recipe_id'});
    // this.route('new', {path: '/new'});
  });
});
