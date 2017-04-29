function checkTomorrow(date1, date2) {
	var date1_tomorrow = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1)
	return (date1_tomorrow.getFullYear() == date2.getFullYear() 
		&& date1_tomorrow.getMonth() == date2.getMonth())
}

function checkAfterTomorrow(date1, date2) {
	var date1_tomorrow = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1)
	//console.log(date1_tomorrow)
	//console.log(date2)
	/*
	var temp = !(date1_tomorrow.getFullYear() > date2.getFullYear() 
		|| date1_tomorrow.getMonth() > date2.getMonth() 
		|| date1_tomorrow.getDate() > date2.getDate())
	console.log(temp)*/
	//this is just 12 hours until I can figure out how to work it
	var day = 86400000
	var temp = !(date1.getMilliseconds() + day > date2.getMilliseconds())
	console.log(temp)
	return temp
}

function checkSameDay(date1, date2) {
	console.log(date1)
	console.log(date2)
	return (date1.getFullYear() == date2.getFullYear() 
		&& date1.getMonth() == date2.getMonth() 
		&& date1.getDate() == date2.getDate())
}