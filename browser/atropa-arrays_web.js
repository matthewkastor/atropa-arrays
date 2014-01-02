;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var arrays = require('../src/atropa-arrays.js');

try {
    Object.keys(arrays).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = arrays[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-arrays.js');
}

Object.keys(arrays.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = arrays.data[prop];
    }
);

},{"../src/atropa-arrays.js":2}],2:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-inquire/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-inquire/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-inquire/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.inquire = require('atropa-inquire').inquire;
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3,"atropa-inquire":4}],3:[function(require,module,exports){
var atropa = {};

/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>

/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa;
atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],4:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1hcnJheXNcXGRldlxcYnJvd3Nlck1haW4uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1hcnJheXNcXHNyY1xcYXRyb3BhLWFycmF5cy5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWhlYWRlclxcc3JjXFxhdHJvcGEtaGVhZGVyLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtaW5xdWlyZVxcc3JjXFxhdHJvcGEtaW5xdWlyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5cyA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtYXJyYXlzLmpzJyk7XHJcblxyXG50cnkge1xyXG4gICAgT2JqZWN0LmtleXMoYXJyYXlzKS5mb3JFYWNoKFxyXG4gICAgICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgICAgIGlmKCFhdHJvcGFbcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYVtwcm9wXSA9IGFycmF5c1twcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1hcnJheXMuanMnKTtcclxufVxyXG5cclxuT2JqZWN0LmtleXMoYXJyYXlzLmRhdGEpLmZpbHRlcihcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgIT09ICdyZXF1aXJlbWVudHMnO1xyXG4gICAgfVxyXG4pLmZvckVhY2goXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIGF0cm9wYS5kYXRhW3Byb3BdID0gYXJyYXlzLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKipcclxuICogUmVxdWlyZWQgbW9kdWxlLCB0aGUgZG9jcyBmb3IgaXQgYXJlIGluIHRoZSA8Y29kZT5cclxuICogIGF0cm9wYS1pbnF1aXJlL2RvY3M8L2NvZGU+IGRpcmVjdG9yeSB3aGVyZSB0aGlzIG1vZHVsZSBcclxuICogIGlzIGxvY2F0ZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtaW5xdWlyZS9kb2NzL2pzZG9jL2luZGV4Lmh0bWxcIj5cclxuICogLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL2RvY3MvanNkb2MvaW5kZXguaHRtbDwvYT4sXHJcbiAqICB1bmxlc3MgeW91IGluc3RhbGxlZCB0aGlzIGRlcGVuZGVuY3kgbWFudWFsbHkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5hcnJheXNcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5hcnJheXMgPSB7fTtcclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgYmFzZWQgb24gc2l6ZSwgY29udGVudHMsIGFuZCBlbGVtZW50IG9yZGVyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIE9uZSBhcnJheSB5b3Ugd2FudCBjb21wYXJlZCB0byBhbm90aGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgVGhlIG90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxyXG4gKiAgd2hldGhlciBvciBub3QgdGhlIGFycmF5cyBtYXRjaGVkIGluIHNpemUsIGNvbXBvc2l0aW9uLCBhbmRcclxuICogIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMl07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzIsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIHRoZSBlbGVtZW50cyBhcmUgbm90IGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogdmFyIHkgPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIGV2ZW4gdGhvdWdoIHRoZSBvYmplY3QgbG9va3MgdGhlIHNhbWUsIHRoZVxyXG4gKiAvLyB0d28gb2JqZWN0cyBhcmUgaW4gZmFjdCBkaXN0aW5jdCBvYmplY3RzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbHVlJ307XHJcbiAqIHZhciB4ID0gWzEsb2JqXTtcclxuICogdmFyIHkgPSBbMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZSBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmVcclxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLm1hdGNoID0gZnVuY3Rpb24gYXJyYXlzTWF0Y2goYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHgsXHJcbiAgICBsO1xyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcclxuICAgIGZvciAoeCA9IDA7IHggPCBsOyB4ICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyYXkxW3hdICE9PSBhcnJheTJbeF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG4vKipcclxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxyXG4gKiAgc2V0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cclxuICogQHBhcmFtIHtBcnJheX0gKG1pbnVlbmQpIGZyb21CIFRoZSBhcnJheSB3aXRoIGVsZW1lbnRzIGR1cGxpY2F0ZWQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFszXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxLDEsOV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbOV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW10gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZSB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYSwgZnJvbUIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRoZSA9IHt9O1xyXG4gICAgdGhlLnJlc3VsdCA9IFtdO1xyXG4gICAgZnJvbUIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xyXG4gICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbihybSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT09IHJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGUucmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhlLnJlc3VsdDtcclxufTtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIEFub3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW5cclxuICogIGFycmF5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSwxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBzbWFsbEFycmF5LCBsYXJnZUFycmF5LCBpbnRlcnNlY3Rpb24gPSBbXTtcclxuICAgIGlmKGFycmF5MS5sZW5ndGggPiBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgfVxyXG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkeEluTGFyZ2VBcnJheSA9IGxhcmdlQXJyYXkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoMCA8PSBpZHhJbkxhcmdlQXJyYXkpIHsgLy8gaGFzIHdvcmRcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xyXG59O1xyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gY2FsY3VsYXRlIGZyZXF1ZW5jaWVzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXHJcbiAqICBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSBhbmQgdGhlaXIgdmFsdWUgaXMgdGhlaXIgZnJlcXVlbmN5IG9mXHJcbiAqICBvY2N1cnJlbmNlIHdpdGhpbiB0aGUgYXJyYXkuIEJlIGNhcmVmdWwgdGhhdCB5b3VyIGFycmF5IGRvZXNcclxuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDEsMSwzLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogNSxcclxuICogLy8gICAgIFwiM1wiOiAyXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcImJpbGxcIjogMSxcclxuICogLy8gICAgIFwiZnJlZFwiOiAyLFxyXG4gKiAvLyAgICAgXCJqYW5lXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgb3RoZXJPYmogPSB7fTtcclxuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogM1xyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyxcInRvU3RyaW5nXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJ0b1N0cmluZ1wiOiBcImZ1bmN0aW9uIHRvU3RyaW5nKCkge1xcbiAgICBbbmF0aXZlIGNvZGVdXFxufTFcIlxyXG4gKiAvLyB9XHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xyXG4gICAgICAgIGlmIChhY2NbY3Vycl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgVW5pcXVlIHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gbGFyZ2VBcnJheSBUaGUgYXJyYXkgd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsNCw0LDMsNl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCIxXCIsIFwiNFwiLCBcIjNcIiwgXCI2XCIgXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXHJcbiAqICAgICBcImJpbGxcIixcclxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcclxuICogICAgIHtcImFHdXlcIiA6IFwiZnJlZFwifSxcclxuICogICAgIHtcImFMYWR5XCIgOiBcImphbmVcIn1cclxuICogXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcImJpbGxcIiwgXCJbb2JqZWN0IE9iamVjdF1cIiBdXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSA9IGZ1bmN0aW9uIChsYXJnZUFycmF5KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlXaXRoRW1wdHlFbGVtZW50cyBUaGUgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyAxMCwgLCA1LCBcIlwiLCAnJywgNyBdO1xyXG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKHgpO1xyXG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogLy8gZGlzcGxheXMgdGhlIGZvbGxvd2luZ1xyXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxyXG4gKiAvLyBbMTAsIHVuZGVmaW5lZCwgNSwgXCJcIiwgXCJcIiwgN11cclxuICogLy8gZW5kaW5nIGxlbmd0aCAzXHJcbiAqIC8vIFsxMCwgNSwgN11cclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnJheVdpdGhFbXB0eUVsZW1lbnRzKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnJheVdpdGhFbXB0eUVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyhpdGVtKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogUmVpbmRleGVzIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB3aXRoIGRpc2NvbnRpbnVvdXMga2V5cy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF07XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcclxuICogICAgICAgICAgICAgIC8vIHRoZSBhcnJheSBsZW5ndGggcmVtYWlucyB0aGUgc2FtZVxyXG4gKiAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgYXJyYXlzIGtleXMgYXJlIDAsIDIsIGFuZCAzXHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyAgWyBcImFcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqICAgIC8vIG5vdGUgdGhhdCB0aGUgbGFzdCBlbGVtZW50IGV4aXN0ZWQgaW4gdGhlIGFycmF5LCBpdHMgdmFsdWUgd2FzXHJcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXHJcbiAqICAgIC8vXHJcbiAqICAgIC8vIFRoZSBkZWxldGVkIGVsZW1lbnQgd2FzIGluIGZhY3QgZGVsZXRlZCBmcm9tIHRoZSBhcnJheSBzbyB0aGVyZSB3YXMgbm9cclxuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcclxuICogICAgLy8gdmFsdWUgb2YgdW5kZWZpbmVkIHdhcyByZXR1cm5lZC4gVGhpcyBiZWhhdmlvciBpcyBjb25mdXNpbmcgdW5sZXNzIHlvdVxyXG4gKiAgICAvLyB0aGluayBhYm91dCB0aGUgYXJyYXlhcyBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZWQgYnlcclxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXHJcbiAqICAgIC8vIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0ZWQgaW4gdGhlIHBhc3Qgb3Igbm90LlxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDNcclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBpZHgsIG91dDtcclxuICAgIG91dCA9IFtdO1xyXG4gICAgZm9yKGlkeCBpbiBhcnIpIHtcclxuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChhcnJbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIGFycmF5J3MgZWxlbWVudHMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxyXG4gKiAgbnVtYmVyLWlzaC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBpbiBudW1lcmljIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFszLCAyLCA5LCAyNiwgMTAsIDEsIDk5LCAxNV07XHJcbiAqIGNvbnNvbGUubG9nKCBhdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSh4KSApO1xyXG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydE51bWVyaWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnRBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRBbHBoYWJldGljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XHJcbiAqICBkb2VzIHdoYXQgeW91IHdvdWxkIGV4cGVjdCB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIGRvLCBleGNlcHQgdGhlIGRlbGV0ZVxyXG4gKiAgb3BlcmF0b3IgZG9lc24ndCBkbyB3aGF0IHlvdSB3b3VsZCBleHBlY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlLlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgcmVtb3ZlZCwgY29udGlndW91cyBrZXlzLCBhbmRcclxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmRlbGV0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBkZWxldGUgYXJyW2luZGV4XTtcclxuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoYXJyKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwidmFyIGF0cm9wYSA9IHt9O1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuXHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYTtcclxuYXRyb3BhID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGNsYXNzIGhhcyBiZWVuIG1hcmtlZCBhcyB1bnN1cHBvcnRlZCBhbmQgdGhyb3dzIGFuIFxyXG4gKiAgZXJyb3IgaWYgaXQgaGFzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgT3B0aW9uYWwuIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXHJcbiAqL1xyXG5hdHJvcGEuc3VwcG9ydENoZWNrID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGNsYXNzTmFtZSA9IFN0cmluZyhjbGFzc05hbWUpO1xyXG4gICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3I7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcclxuICAgIFxyXG4gICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID09PSAndW5zdXBwb3J0ZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBQdXNoZXMgYSByZXF1aXJlbWVudCBjaGVjayBpbnRvIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy4gVGhlIHRlc3RcclxuICogIHRlc3RzIHdoZXRoZXIgdGhlIGNsYXNzIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBTZXRzXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXHJcbiAqICBpZiB0aGUgcmVxdWlyZW1lbnRGbiByZXR1cm5zIGZhbHNlLiBUaGUgcmVxdWlyZW1lbnQgY2hlY2tzIHdpbGwgYWxsIGJlIHJ1blxyXG4gKiAgYWZ0ZXIgdGhlIGxpYnJhcnkgaGFzIGxvYWRlZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1aXJlbWVudEZuIEEgZnVuY3Rpb24gdG8gdGVzdCB3aGV0aGVyIG9yIG5vdCB0aGUgY2xhc3NcclxuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcclxuICogIHJldHVybiBmYWxzZS5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGlzIGNsYXNzIG9yIGl0c1xyXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XHJcbiAqICAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICsgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XHJcbiAqL1xyXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEucmVxdWlyZXMgcmVxdWlyZXMgdGhlIGNsYXNzIG5hbWUgdG8gYmUgJyArXHJcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdID0ge307XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZW1lbnRGbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcclxuICAgICAgICAgICAgICAgICAgICAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvciA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnB1c2goY2hlY2spO1xyXG59O1xyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICovXHJcbmF0cm9wYS5kYXRhID0ge307XHJcblxyXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcclxuXHJcbmF0cm9wYS5ub3AgPSBmdW5jdGlvbiBub3AgKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcblxyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5pbnF1aXJlXCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCA9PT0gbnVsbC5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAoeCA9PT0gbnVsbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHlwZW9mKHgpID09PSAnb2JqZWN0Jy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYm90aCBhblxyXG4gKiBvYmplY3QgYW5kIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCBpcyBib3RoIGFuIG9iamVjdCBhbmRcclxuICogbm90IG51bGwuIChudWxsIGlzIGFuIG9iamVjdCkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XHJcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgd2FzIGluaGVyaXRlZFxyXG4gKiBvciBub3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCB3aGljaCBtYXkgb3IgbWF5IG5vdFxyXG4gKiBoYXZlIHRoZSBwcm9wZXJ0eSBpZGVudGlmaWVkIGJ5IHByb3AuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcclxuICogbmFtZSBvZiB0aGUgcHJvcGVydHkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgb2JqLnByb3AgZXhpc3RzLFxyXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gKHByb3AgaW4gb2JqKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHN0ciBpcyBhbiBlbXB0eSBzdHJpbmcsXHJcbiAqICBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBmYWxzZTtcclxuICAgIGlmICgnJyA9PT0gc3RyKSB7XHJcbiAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiJdfQ==
;