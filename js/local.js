var storage = {
	incrementItem: function(itemName, numChange) {
		var tempItem = localStorage.getItem(itemName)
		localStorage.setItem(itemName, Number(tempItem) + numChange)
	},
	getItem: function(itemName) {
		return localStorage.getItem(itemName)
	},
	setItem: function(itemName, value) {
		localStorage.setItem(itemName, value)
	}
}