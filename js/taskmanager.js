class Task {

	constructor(name, streak, personalBest, doneToday) {
		this.name = name
		this.creationDate = Date.now()
		this.streak = streak
		this.personalBest = personalBest
		this.lastTimestamp = 0
		this.doneToday = doneToday
	}
	
	//replace spaces with dashes for making an html id	
	get htmlId() {
		return this.name.replace(/ /g, "-").toLowerCase()
	}

	//spit out a row with all the relevant info
	get html() {
		return this.createHTML()
	}
	createHTML() {
		var checkText = this.doneToday ? 'done' : 'access_time'
		var streakCheck = (this.streak >= this.personalBest) ? 'new-record' : ''

		var output = '\
<li class="task" id="'+this.htmlId+'">\
	<span class="task-item taskbutton checkbutton centered"><i class="material-icons">'+checkText+'</i></span>\
	<span class="task-item streak-container '+streakCheck+'">\
		<i class="material-icons" >whatshot</i>\
		<span class="streak-number">'+this.streak+'</span>\
	</span>\
	<span class="task-item taskname	taskbutton">'+this.name+'</span>\
	<span class="task-item">\
		<i class="material-icons" class="pr-icon">grade</i>\
		<span class="personal-record">'+this.personalBest+'</span>\
	</span>\
	<span class="task-item delete taskbutton centered" onclick="$(\'#'+this.htmlId+'\').remove()">\
		<i class="material-icons" >delete</i>\
	</span>\
</li>'

	console.log(this)

	return output
	}
}