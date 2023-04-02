interface AssociativeArray {
    [key: string]: string
 }
 
class utils {
	double(cronExpression: string) {
		const interval = cronExpression.split(' ');

		const expression: AssociativeArray = {}
		let new_expression: AssociativeArray = {}
		if(interval.length < 6){
			expression["seconds"] = "*";
			expression["minutes"] = interval[0];
			expression["hours"] = interval[1];
			expression["daysOfMonth"] = interval[2];
			expression["months"] = interval[3];
			expression["daysOfWeek"] = interval[4];

			new_expression["seconds"] = expression["seconds"]
			new_expression["minutes"] = expression["minutes"]
			new_expression["hours"] = expression["hours"]
			new_expression["daysOfMonth"] = expression["daysOfMonth"]
			new_expression["months"] = expression["months"]
			new_expression["daysOfWeek"] = expression["daysOfWeek"]
		}
		else{
			expression["seconds"] = interval[0];
			expression["minutes"] = interval[1];
			expression["hours"] = interval[2];
			expression["daysOfMonth"] = interval[3];
			expression["months"] = interval[4];
			expression["daysOfWeek"] = interval[5];

			new_expression["seconds"] = expression["seconds"];
			new_expression["minutes"] = expression["minutes"];
			new_expression["hours"] = expression["hours"];
			new_expression["daysOfMonth"] = expression["daysOfMonth"];
			new_expression["months"] = expression["months"];
			new_expression["daysOfWeek"] = expression["daysOfWeek"];
		}
		
	
		
		let add_to_minutes = 0;
		let add_to_hours = 0;
		// Double the seconds first
		if(expression["seconds"].includes('/')){ 
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
		else if(expression["seconds"] == "*"){
			// do nothing
			if(expression["minutes"] == "*"){
				new_expression["seconds"] = `*/2`;
			}
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
	

		if(expression["minutes"].includes('/')){ 
			const [step, range] = expression["minutes"].split('/');
			let doubledRange = parseInt(range) * 2;
			if(add_to_minutes != 0){
				doubledRange += add_to_minutes;
			}
			if(doubledRange >= 60){
				add_to_hours = Math.floor(doubledRange / 60);
				doubledRange = doubledRange % 60;
			}
			new_expression["minutes"] = `${step}/${doubledRange}`;
		}
		else if (expression["minutes"] == "*"){
			// do nothing
			if(add_to_minutes != 0){
				new_expression["minutes"] = `*/${add_to_minutes}`;
			}
			else{
				new_expression["minutes"] = new_expression["minutes"]
			}
		}
		else{
			new_expression["minutes"] = new_expression["minutes"]
		}
		
		return `${new_expression["seconds"]} ${new_expression["minutes"]} ${new_expression["hours"]} ${new_expression["daysOfMonth"]} ${new_expression["months"]} ${new_expression["daysOfWeek"]}`;
	}
}

module.exports = utils;
