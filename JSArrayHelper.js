var JSArrayHelper = {

	markerAll: false,
	_index: -1,
	_index_arr: [],

	getIndex: function(array, prop, value) {
		var arrayKeys;
		var index = -1;

		for (i = 0; i < array.length; i++) {
			var elem = array[i];

			if (index == -1) {
				if (elem[prop] == value) {
					index = i;
				}
			}
		}

		return index;
	},

	getMainIndex: function(array, prop, value) {
		var arrayKeys;
		var index = -1;

		for (i = 0; i < array.length; i++) {
			var elem = array[i];

			if (this.continueFind(this._index)) {
				if (elem[prop] == value) {
					this.setIndex(i);
					index = i;
				}
			}
		}

		return this._index;
	},

	getArrayIndex: function(array, prop) {
		var arrayKeys;
		var index = [];

		for (i = 0; i < array.length; i++) {
			var elem = array[i];

			arrayKeys = Object.keys(elem);

			for (k = 0; k < arrayKeys.length; k++) {
				if (arrayKeys[k] == prop) {
					index = index.concat([i]);
				}

			}

		}
		return index;
	},

	continueFind: function(index) {
		if (this.markerAll) {
			return true;
		};
		if (index == -1) {
			return true;
		} else {
			return false;
		};
	},

	setIndex: function(index) {

		if (this.markerAll) {
			this._index_arr = this._index_arr.concat([index]);
		} else {
			this._index = index;
		};
	},

	findIndex: function(array, prop, value) {
		this.markerAll = false;
		this._index = -1;
		this._index_arr = [];
		var _parts = [];
		var _typeArr = false;
		var _restParts = "";
		var _prop = prop;

		if (_prop.indexOf(":all") > 0) {
			this.markerAll = true;
			_prop = _prop.replace(":all", "");
		};

		if (_prop.indexOf(".") > 0) {
			_parts = _prop.split(".", 1);
			_restParts = _prop.replace(_parts[0] + ".", "");

			if (_parts[0].indexOf("[]") > 0) {
				_typeArr = true;
				_parts[0] = _parts[0].replace("[]", "");
			}
			var _find
			if (Array.isArray(array)) {
				_find = this.getArrayIndex(array, _parts[0]);
				for (var x = 0; x < _find.length; x++) {
					var node = array[_find[x]][_parts[0]];

					if (_restParts.indexOf(".") > 0) {
						if (typeof(node) == "object") {
							if (this.continueFind(this._index)) {
								var hasId = this.findIndex(node, _restParts, value);
								if (hasId > -1) {
									this.setIndex(x);
								};
							}
						}
					} else {
						if (typeof(node) == "object") {
							if (_typeArr) {
								if (Array.isArray(node)) {
									if (this.continueFind(this._index)) {
										var hasId = this.getIndex(node, _restParts, value)

										if (hasId != -1) {
											this.setIndex(_find[x]);
										}
									}
								}
							} else {
								var arrayKeys = Object.keys(node);

								if (this.continueFind(this._index)) {
									for (var k = 0; k < arrayKeys.length; k++) {
										if (arrayKeys[k] == _restParts) {
											if (node[arrayKeys[k]] == value) {
												this.setIndex(_find[x]);
											}
										}

									}
								}
							}
						}
					}
				}
			} else {
				var node = array[_parts[0]];

				if (_restParts.indexOf(".") > 0) {
					if (typeof(node) == "object") {
						if (this.continueFind(this._index)) {
							var hasId = this.findIndex(node, _restParts, value)
							if (hasId > -1) {
								this.setIndex(x);
							};
						}
					}
				} else {
					if (typeof(node) == "object") {
						if (_typeArr) {
							if (Array.isArray(node)) {
								if (this.continueFind(this._index)) {
									var hasId = this.getIndex(node, _restParts, value)

									if (hasId != -1) {
										this.setIndex(1);
									}
								}
							}
						} else {
							var arrayKeys = Object.keys(node);

							if (this.continueFind(this._index)) {
								for (var k = 0; k < arrayKeys.length; k++) {
									if (arrayKeys[k] == _restParts) {
										if (node[arrayKeys[k]] == value) {
											this.setIndex(1);
										}
									}

								}
							}
						}
					}
				}
			}
		} else {
			this.setIndex(this.getMainIndex(array, _prop, value));
		}
		if (this.markerAll) {
			return this._index_arr;
		} else {
			return this._index;
		};
	}

}



if (!Array.prototype.select) {
	Array.prototype.select = function(prop, value) {

		var list = Object(this);
		var selectedId = JSArrayHelper.findIndex(list, prop, value);

		return list[selectedId];

	};
	Array.prototype.selectAll = function(prop, value) {

		var list = Object(this);
		var selectedId = JSArrayHelper.findIndex(list, prop + ":all", value);
		var arr = [];

		if (Array.isArray(selectedId)) {
			for (var i = selectedId.length - 1; i >= 0; i--) {
				if (selectedId[i] != -1) {
					arr = arr.concat(list[selectedId[i]]);
				}
			};
		} else {
			if (selectedId != -1) {
				arr.push(list[selectedId]);
			}
		}
		return arr;
	};
	Array.prototype.selectId = function(prop, value) {

		var list = Object(this);
		var selectedId = JSArrayHelper.findIndex(list, prop, value);

		return selectedId;
	};
}

