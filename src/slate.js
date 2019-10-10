if (typeof define !== 'function') {
    // Support Node use without RequireJS
    var define = require('amdefine')(module);
}

define(function () {
    /**
     * An unsatisifiable condition exists.
     *
     * @param message A message describing the unsatisifiable dependency.
     */
    function SlateDependencyError (message) {
        this.name    = "SlateDependencyError";
        this.message = (message || "");
    }

    SlateDependencyError.prototype = Error.prototype;

    /**
     * A slate, a workflow.
     *
     * <p>A slate is a workflow execution manager, which is implemented by
     * determining the appropriate merge points necessary to resolve any one of
     * a table of promises it's given.  Attempting to resolve the promise
     * causes the workflow to be executed, with each parallelizable action
     * executed simultanously.</p>
     *
     * @param providers A list of promise providers.
     */
    return function Slate (providers, Promise) {
        var promises = {};

        /**
         * Resolve a key to a promise.
         *
         * <p>Resolve a promise by determining what it's provider needs, and
         * resolving those promises.</p>
         *
         * @param key The key to resolve.
         * @return A Promise for value associated with the given key, which
         * will error if any issue arrive in the workflow.
         */
        this.get = function (key) {
            /* TODO Consider using post-iterative traversal instead of
             * recursion.
             */
            if (typeof promises[key] === "undefined") {
                var provider = providers[key];

                if (typeof provider === "undefined") {
                    throw new SlateDependencyError("Unable to resolve " + key);
                }

                var deps    = provider[0];
                var impl    = provider[1];
                var context = (provider[2] || this);

                var depPromises = [];

                for (var i = 0; i < deps.length; i++) {
                    depPromises.push(this.get(deps[i]));
                }

                promises[key] = Promise.all(depPromises).then(
                    function (depValues) {
                        var depObj = {};
                        for (var j = 0; j < deps.length; j++) {
                          depObj[deps[j]] = depValues[j];
                        }
                        return impl.apply(context, [depObj]);
                    }
                );
            }

            return promises[key];
        };

        /**
         * Add a key/promise pair
         *
         * <p>Allow the reusable providers to be supplimented/overwritten with
         * keys and promises that are reset when clear is called.<p>
         *
         * @param key The key to add to the providers.
         * @param promise The value to add to the providers under the key.
         * @return The promise that was passed as a parameter.
         */
        this.put = function (key, promise) {
          promises[key] = promise;
        };

        /**
         * Clean the slate.
         *
         * <p>Remove all the existing promises from this slate, so that they
         * will need to be created again.</p>
         */
        this.clear = function () {
            promises = {};
        };

        /**
         * Create a new slate, exactly like this one, with no values.
         */
        this.clone = function () {
            return new Slate(providers, Promise);
        };
    };
});
