var todo = "things"

function getCount() {
	return Number(storage.getItem('todoItem')) || 0
}
function updateProgress() {
	$("#progress").html(getCount()+' '+todo+' in a row')
}
function resetCount() {
	storage.setItem('todoItem', 0)
	alert("cuck")
	updateProgress()
}
function addCount() {
	storage.incrementItem('todoItem', 1)

	if (getCount() > storage.getItem('personalBest')) {
		updatePersonalBest(getCount())
		updateSubtitle()
	}

	updateProgress()
}
function changeTodo() {
	todo = prompt("What are you doing instead?")
	storage.setItem('todoItem', 0)
	updateProgress()
	updatePersonalBest(0)
}

$(document).ready(function() {
	updateProgress()
	if (storage.getItem('personalBest') == null) {
		storage.setItem('personalBest', 0)
	}
	updateSubtitle()
	todo = getItem('todoItem') || 'things'
})

function updatePersonalBest(record) {
	storage.setItem('personalBest', record)
	updateSubtitle()
}
function updateSubtitle() {
	$("#subtitle").html("your record is "+storage.getItem('personalBest'))
}
