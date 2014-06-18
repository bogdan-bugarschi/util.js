(function(factory){
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// [1] CommonJS/Node.js
		var target = module['exports'] || exports; // module.exports is for Node.js
		factory(target);
	} else if (typeof define === 'function' && define['amd']) {
		// [2] AMD anonymous module
		define(['exports'], factory);
	} else {
		// [3] No module loader (plain <script> tag) - put directly in global namespace
		window['util'] = factory();
	}
}(function(undefined){
	'use strict';
	var curry, fmap, reduce, isNull, aliasFor, reduceRight, zipWith,
        util = {};

    aliasFor = function (name){
		var ret = function(newName){
			util[newName] = util[name];
            return ret;
		};
		ret.and = ret;
        ret.is = ret;
        return ret;
	};

	isNull = function(value){
		return value === undefined || value === null;
	};
	
	curry = function curry(func, length) {
		var slice = Array.prototype.slice;
		length = length || func.length;

		return function() {
			var args = slice.call(arguments),
				len = args.length;

			if (len >= length) {
				return func.apply(this, args);
			}

			return curry(function() {
				return func.apply(this, args.concat(slice.call(arguments)));
			}, length - len);
		};
	};

	fmap = curry(function fmap(cb, array){
		var i,l,
			result = [];
		for(i=0,l=array.length; i<l; i+=1){
			result.push(cb(array[i]));
		}
		return result;
	});

	reduce = curry(function reduce(cb, accumulator, array){
		var i=0,l;
		if(!isNull(accumulator)){
			accumulator = array[i+=1];
		}
		for(i,l = array.length; i<l;i+=1){
			accumulator = cb(accumulator,array[i]);
		}
		return accumulator;
	});
    reduceRight = curry(function(cb, accumulator, array){
        var i=array.length - 1,l;
        if(!isNull(accumulator)){
            accumulator = array[l+=1];
        }
        for(i,l = 0; i>=l; i-=1){
            accumulator = cb(accumulator,array[i]);
        }
        return accumulator;
    });

    zipWith = curry(function zip(zipper, array1, array2){
        var ret = [], i,
            length = array1.length < array2.length ? array1.length : array2.length;
        for(i=0; i< length;i += 1){
            ret.push(zipper(array1[i], array2[i]));
        }
        return ret;
    });


	util.fmap = fmap;
    aliasFor('fmap').is('map');

	util.reduce = reduce;
	aliasFor('reduce').is('foldl');
    aliasFor('reduce').is('reduceLeft');
    aliasFor('reduce').is('fold');

    util.reduceRight = reduceRight;
    aliasFor('reduceRight').is('foldr');

	util.curry = curry;

    util.isNull = isNull;

    util.zipWith = zipWith;
    util.zip = zipWith(function(i, j){
        return [i, j];
    });

	return util;

}));
