var todo = "things"

function getCount() {
	return Number(storage.getItem('itemCount')) || 0
}
function updateProgress() {
	$("#progress").html(getCount()+' '+todo+' in a row')
}
function resetCount() {
	storage.setItem('itemCount', 0)
	alert("cuck")
	updateProgress()
}
function addCount() {
	storage.incrementItem('itemCount', 1)

	if (getCount() > storage.getItem('personalBest')) {
		updatePersonalBest(getCount())
		updateSubtitle()
	}

	updateProgress()
}
function changeTodo() {
	todo = prompt("What are you doing instead?")
	storage.setItem('itemCount', 0)
	storage.setItem('todoItem', todo)
	updateProgress()
	updatePersonalBest(0)
}

$(document).ready(function() {
	if (storage.getItem('personalBest') == null) {
		storage.setItem('personalBest', 0)
	}
	updateSubtitle()
	todo = storage.getItem('todoItem') || 'things'
	updateProgress()
})

function updatePersonalBest(record) {
	storage.setItem('personalBest', record)
	updateSubtitle()
}
function updateSubtitle() {
	$("#subtitle").html("your record is "+storage.getItem('personalBest'))
}
