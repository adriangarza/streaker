class Task {

	constructor(name, streak, personalBest, doneToday) {
		this.name = name
		this.creationDate = Date.now()
		this.streak = streak
		this.personalBest = personalBest
		this.lastTimestamp = 0
		this.doneToday = doneToday
		taskManager.addTask(this)
	}
	
	//replace spaces with dashes for making an html id	
	get htmlId() {
		return this.name.replace(/ /g, "-").toLowerCase()
	}

	addOne() {
		console.log("adding one to " + this.streak)
		this.streak++
		if (this.streak > this.personalBest) {
			this.personalBest++
		}
		this.doneToday = true;
		this.reloadContent()
	}

	//spit out a row with all the relevant info
	get html() {
		return this.createHTML()
	}

	reloadContent() {
		//jeez
		console.log("reloading content of " + this.name)
		$('#'+this.htmlId).html( this.createInnerHTML())
	}

	createInnerHTML() {
		var checkText = this.doneToday ? 'done' : 'add'
		var streakCheck = (this.streak >= this.personalBest) ? 'new-record' : ''
		var checkEnabled = this.doneToday ? '' : 'taskbutton'
		var addable = this.doneToday ? '' : 'onclick="taskManager.addToTask(\''+this.name+'\')"'
		
		var output = '<span class="task-item '+checkEnabled+' checkbutton centered"'+addable+'><i class="material-icons">'+checkText+'</i></span>\
		<span class="task-item streak-container '+streakCheck+'" >\
			<i class="material-icons" >whatshot</i>\
			<span class="streak-number" >'+this.streak+'</span>\
		</span>\
		<span class="task-item taskname	taskbutton" onclick="taskManager.insertHeading(\''+this.name+'\')">'+this.name+'</span>\
		<span class="task-item centered">\
			<i class="material-icons" class="pr-icon">grade</i>\
			<span class="personal-record">'+this.personalBest+'</span>\
		</span>'
		+'\
		<span class="task-item taskbutton singlebutton">\
			<i class="material-icons">edit</i>\
		</span>\
		<span class="task-item delete taskbutton centered" onclick="$(\'#'+this.htmlId+'\').remove()">\
			<i class="material-icons" >delete</i>\
		</span>'
		return output
	}

	createHTML() {
		var checkText = this.doneToday ? 'done' : 'add'
		var streakCheck = (this.streak >= this.personalBest) ? 'new-record' : ''
		var checkEnabled = this.doneToday ? '' : 'taskbutton'

		var output = '\
		<li class="task" id="'+this.htmlId+'">' +
		this.createInnerHTML()
		+'</li>'

	console.log(this)

	return output
	}

	createHeading() {
		var output = '<h1 id="progress">'+this.streak+' '+this.name+' in a row </h1>\
			<p class="subtitle" id="your-record">your record is '+this.personalBest+'</p>'
		return output
	}

}

var taskManager = {
	tasks: [],
	addToTask: function(taskName) {
		console.log("looking for " + taskName)
		for (var i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].name == taskName) {
				console.log("found it")
				this.tasks[i].addOne();
			}
		}
	},
	getTask: function(taskName) {
		for (var i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].name == taskName) {
				console.log("found it")
				return this.tasks[i]
			}
		}
		return null
	},
	addTask: function(task) {
		if (this.tasks.indexOf(task) < 0) {
			this.tasks.push(task)
		}
	},
	insertHeading: function(taskName) {
		$("#heading-container").html(this.getTask(taskName).createHeading())
	}
}

function checkTomorrow(date1, date2) {
	var date1_tomorrow = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1)
	if (date1_tomorrow.getFullYear() == date2.getFullYear() 
		&& date1_tomorrow.getMonth() == date2.getMonth() 
		&& date1_tomorrow.getDate() == date2.getDate()) {
	    return true
	} 
	return false
}