class Task {

	constructor(name, streak, personalBest, doneToday, lastTimestamp) {
		this.name = name
		this.creationDate = Date.now()
		this.streak = streak
		this.personalBest = personalBest
		this.lastTimestamp = lastTimestamp
		//this.doneToday = doneToday
		this.doneToday = (checkSameDay(new Date(lastTimestamp), new Date()))
		if (checkAfterTomorrow(new Date(lastTimestamp), new Date())) {
			this.streak = 0;
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

	createInnerHTML() {
		var checkText = this.doneToday ? 'done' : 'add'
		var streakCheck = (this.streak >= this.personalBest) ? 'new-record' : ''
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
	}
}