class utils {
	double(cronExpression) {
		const interval = cronExpression.split(' ');
	  
		const expression = []
		expression["seconds"] = interval[0];
		expression["minutes"] = interval[1];
		expression["hours"] = interval[2];
		expression["daysOfMonth"] = interval[3];
		expression["months"] = interval[4];
		expression["daysOfWeek"] = interval[5];
		
		let new_expression = []
		new_expression["seconds"] = interval[0];
		new_expression["minutes"] = interval[1];
		new_expression["hours"] = interval[2];
		new_expression["daysOfMonth"] = interval[3];
		new_expression["months"] = interval[4];
		new_expression["daysOfWeek"] = interval[5];
	
		
		let add_to_minutes = false;
		let add_to_hours = false;
		// Double the seconds first
		if(expression["seconds"].includes('/')){ // */5
			const [step, range] = expression["seconds"].split('/');
			let doubledRange = parseInt(range) * 2;
			if(doubledRange >= 60){
				add_to_minutes = Math.floor(doubledRange / 60);
				doubledRange = doubledRange % 60;
			}
			if(add_to_minutes){
				new_expression["seconds"] = `${doubledRange}`;
			}
			else{
				new_expression["seconds"] = `${step}/${doubledRange}`;
			}
			
		}
		else if(expression["seconds"] == "*"){   // *
			// do nothing
			new_expression["seconds"] = `*/2`;
		}
		else{ // 5
			let range = expression["seconds"];
			let doubledRange = parseInt(range) * 2;
			if(doubledRange >= 60){
				add_to_minutes = Math.floor(doubledRange / 60);
				doubledRange = doubledRange % 60;
			}
			new_expression["seconds"] = `${doubledRange}`;
		}
	

		if(expression["minutes"].includes('/')){ // */5
			const [step, range] = expression["minutes"].split('/');
			let doubledRange = parseInt(range) * 2;
			if(add_to_minutes != false){
				doubledRange += add_to_minutes;
			}
			if(doubledRange >= 60){
				add_to_hours = Math.floor(doubledRange / 60);
				doubledRange = doubledRange % 60;
			}
			new_expression["minutes"] = `${step}/${doubledRange}`;
		}
		else if (expression["minutes"] == "*"){   // *
			// do nothing
			if(add_to_minutes != false){
				new_expression["minutes"] = `*/${add_to_minutes}`;
			}
		}
		else{ // 5
			
		}
		
		return `${new_expression["seconds"]} ${new_expression["minutes"]} ${new_expression["hours"]} ${new_expression["daysOfMonth"]} ${new_expression["months"]} ${new_expression["daysOfWeek"]}`;
	}
}

module.exports = utils;
