# README #

This is my small JavaScriptArrayHelper for finding items in JavaScript Arrays.

### Why and when to use this? ###

* Ok, this small piece of code have limited usage, but it can come handy if you are not using any JS frameworks, they usualy have some sort of this. If you are build small, lightweight application or page that have to use arrays of data, and you dont want to include masive framework only to filter arrays. 

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

* if you have let say array like this

		var someArray = [
			{id: 1,
			subNode: {
					id: 3,
					subArray: "Some test name"
				}
			},
			{id: 2,
			subNode: {
					id: 4,
					subArray: "Some inner test name"
				}
			}
		]

	then you can find element with id = 4 inside subNode like this:

		var resultArray = someArray.select('subNode.id',4);

	result will be

		resultArray = [{
			id: 2,
			subNode: {
					id: 4,
					subArray: "Some test name"
				}
		}]

* another example;

		var someArray = [
			{id: 1,
			subArray: [{
					id: 1,
					subArray: "Some test name"
				}, {
					id: 2,
					name: "Some other test name"
				}]
			},
			{id: 2,
			subArray: [{
					id: 3,
					subArray: "Some second test name"
				}, {
					id: 4,
					name: "Some inner second test name"
				}]
			}
		]

	then you can find element with id = 2 inside of another array like this:

		var resultArray = someArray.select('subArray[].id',4);

	result will be

		resultArray = [{id: 2,
			subArray: [{
					id: 3,
					subArray: "Some second test name"
				}, {
					id: 4,
					name: "Some inner second test name"
				}]
			}]

	note that i use **[]** to select within inner array



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
