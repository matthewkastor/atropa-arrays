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
