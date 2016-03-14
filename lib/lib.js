var _ = require('lodash');

module.exports = {
    init: function() {
        Function.prototype.method = function(name, func) {
            this.prototype[name] = func;
            return this;
        };

        Array.prototype.find = function(callback, thisObject) {
            var i = 0;
            if (_.isFunction(callback)) {
                for (i = 0; i < this.length; ++i) {
                    if (callback.call(thisObject, this[i])) {
                        return this[i];
                    }
                }
            } else {
                for (i = 0; i < this.length; ++i) {
                    if (this[i] === callback) {
                        return this[i];
                    }
                }
            }

            return undefined;
        };

        Array.prototype.randomSubset = function() {
            var res = [];
            for (var i = 0; i < this.length; ++i) {
                if (Math.random() < 0.5) {
                    res.push(this[i]);
                }
            }

            return res;
        };
    }
};