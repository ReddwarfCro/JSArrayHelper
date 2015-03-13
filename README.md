# README #

This is my small JavaScriptArrayHelper for finding items in JavaScript Arrays.

### What is this repository for? ###

* Quick summary
* Version 0.5

### How do I get set up? ###

* You will be able to include this library in your project, and get access to methods for finding index of searched object, filter array to get only information you need in that array and getting first
occurrence found in array.
* Just include JSArrayHelper.js in your page and arrays will have ability to find and extract nodes.


### Usage ###

* if you have let say array like this

		var someArray = [{
			id: 1,
			name: "Some test name"
		}, {
			id: 2,
			name: "Some other test name"
		}]

	then you can find element with id = 2 like this:

		var resultArray = someArray.select('id',2);

	result will be

		resultArray = [{
			id: 2,
			name: "Some other test name"
		}]



### Current otions ###

* After including JSArrayHelper.js JavaScript arrays will have options
	
	* .**select**(*'name of the element'*, *'value of the element'*)  - returns object of first occurance
	* .**selectId**(*'name of the element'*, *'value of the element'*) - returns id of first occurance
	* .**selectAll**(*'name of the element'*, *'value of the element'*) - returns all objects in array


### Contribution guidelines ###

* Some tests are needed


### TODO ###

* yet to come;
	* minimized version
	* more examples
	* more functions
