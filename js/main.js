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
	if (checkTimestamp <= 0) {
		return
	}

	storage.incrementItem('itemCount', 1)

	if (getCount() > storage.getItem('personalBest')) {
		updatePersonalBest(getCount())
		updateSubtitle()
	}

	updateTimestamp()

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
	if (checkTimestamp() > 1) {
		resetCount()
	}
})

function updatePersonalBest(record) {
	storage.setItem('personalBest', record)
	updateSubtitle()
}
function updateSubtitle() {
	$("#your-record").html("your record is "+storage.getItem('personalBest'))
}

function checkTimestamp() {
	var rawTimeStamp = storage.getItem('lastTimestamp')
	if (rawTimeStamp == null) {
		return 1
	}
	var lastTimestamp = JSON.parse(rawTimeStamp)	
	var currentDate = new Date()

	//this should be updated later, maybe with date.js
	return currentDate.getDay() - lastTimestamp.day
}

function updateTimestamp() {
	var currentDate = new Date()
	lastTimestamp = {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth(),
		day: currentDate.getDay(),
		time: currentDate.getTime()
	}
	storage.setItem('lastTimestamp', JSON.stringify(lastTimestamp))
}

function resetTimestamp() {
	storage.removeItem('lastTimestamp')
}

class Task {
	constructor(name) {
		this.name = name
		this.creationDate = Date.now()
		this.streak = 0
		this.personalBest = 0
		this.lastTimestamp = 0
		this.doneToday = false
	}
	
}