class Task {

	constructor(name, streak, personalBest, doneToday, lastTimestamp) {
		this.name = name
		this.creationDate = Date.now()
		this.streak = streak
		this.personalBest = personalBest
		this.lastTimestamp = lastTimestamp
		//this.doneToday = doneToday
		if (lastTimestamp != null) {
			this.doneToday = (checkSameDay(new Date(lastTimestamp), new Date()))
			if (checkAfterTomorrow(new Date(lastTimestamp), new Date())) {
				this.streak = 0;
			}
		} else {
			this.doneToday = false
			this.streak = 0
		}
		taskManager.addTask(this)
	}
	
	//replace spaces with dashes for making an html id	
	get htmlId() {
		return this.name.replace(/ /g, "-").toLowerCase()
	}

	addOne() {
		this.streak++
		if (this.streak > this.personalBest) {
			this.personalBest++
		}
		this.doneToday = true;
		this.lastTimestamp = Date.now()
		this.reloadContent()
	}

	subOne() {
		if (this.streak > 0) this.streak--
		this.doneToday = false
		this.reloadContent()
	}

	toggleDone() {
		if (!this.doneToday) {
			this.addOne()
		} else {
			this.subOne()
		}
	}

	//spit out a row with all the relevant info
	get html() {
		return this.createHTML()
	}

	reloadContent() {
		//jeez
		$('#'+this.htmlId).html( this.createInnerHTML())
		taskManager.insertHeading(this.name)
	}

	changeId(newId) {
		$('#'+this.htmlId).attr("id", newId);
	}

	createInnerHTML() {
		var checkText = this.doneToday ? 'done' : 'add'
		var streakCheck = (this.streak >= this.personalBest && this.streak > 0) ? 'new-record' : ''
		var checkEnabled = this.doneToday ? 'taskbutton' : 'taskbutton'
		var addable = /*this.doneToday ? '' :*/ 'onclick="taskManager.toggleDone(\''+this.name+'\')"'
		
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
		<span class="task-item taskbutton singlebutton" onclick="taskManager.editTask(\''+this.name+'\')">\
			<i class="material-icons">edit</i>\
		</span>\
		<span class="task-item delete taskbutton centered" onclick="taskManager.removeTask(\''+this.name+'\')">\
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
		
		return output
	}

	createHeading() {
		var output = '<h1 id="progress">'+this.streak+' '+this.name+' </h1>\
			<p class="subtitle" id="your-record">your record is '+this.personalBest+'</p>'
		return output
	}

}

var taskManager = {
	tasks: [],
	addToTask: function(taskName) {
		for (var i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].name == taskName) {
				this.tasks[i].addOne();
			}
		}
	},
	getTask: function(taskName) {
		for (var i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].name == taskName) {
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
	},
	toggleDone: function(taskName) {
		this.getTask(taskName).toggleDone()
	},
	saveTasks: function() {
		var tempList = []
		for (var i = 0; i < this.tasks.length; i++) {
			tempList.push(JSON.stringify(this.tasks[i]))
		}
		storage.setItem("taskList", JSON.stringify(tempList))
	},
	loadTasks: function() {
		if (storage.getItem('taskList') == null) return

		var tempList = JSON.parse(storage.getItem('taskList'))

		for (var i = 0; i < tempList.length; i++) {
			//convert the stored object into a Task
			var o = JSON.parse(tempList[i])
			var t = new Task(o.name, o.streak, o.personalBest, o.doneToday, o.lastTimestamp)
		}
	},
	appendTask: function(taskObj) {
		$("#tasks").append(taskObj.createHTML())
	},
	createTask: function() {
		var taskName = prompt("What are you gonna do?")
		console.log(taskName)
		while (this.getTask(taskName) != null) {
			taskName = prompt("Try another name, that one is in use.")
		}
		var tempTask = new Task(taskName, 0, 0, false, null)
		this.appendTask(tempTask)
	},
	removeTask: function(taskName) {
		$('#'+this.getTask(taskName).htmlId).remove()
		for (var i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].name == taskName) {
				this.tasks.splice(i, 1)
			}
		}
	},
	editTask: function(taskName) {
		var newName = prompt("Enter another name for "+taskName+':')
		while (this.getTask(newName) != null) {
			newName = prompt("Try another name, that one is in use.")
		}
		var currentTask = this.getTask(taskName)
		currentTask.changeId(newName)
		currentTask.name = newName
		currentTask.reloadContent()
	}
}