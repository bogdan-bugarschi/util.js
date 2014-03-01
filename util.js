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
	var curry, fmap, reduce, isNull;

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
		for(i=0,l=array.length; i<l; i++){
			result.push(cb(array[i]));
		}
		return result;
	});

	reduce = curry(function reduce(cb, accumulator, array){
		var i=0,l;
		if(!isNull(accumulator)){
			accumulator = array[i++];
		}
		for(i,l = array.length; i<l;i++){
			accumulator = cb(accumulator,array[i]);
		}
		return accumulator;
	});

	return {
		fmap : fmap,
		reduce : reduce,
		curry : curry
	};
}));