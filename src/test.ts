interface KeydArray {
    [key: string]: string;
 }
 
class Utils  {
    private _expression: KeydArray;
    private _new_expression: KeydArray;
    
    constructor(cronExpression: string){
        //console.log(cronExpression)
        this._expression = this.translate_cron_array(cronExpression.split(' '));
		this._new_expression = this._expression;
    }

    private translate_cron_array(cron_array: string[]){
        const return_array: KeydArray = {}
		if(cron_array.length < 6){
			return_array["seconds"] = "*";
			return_array["minutes"] = cron_array[0];
			return_array["hours"] = cron_array[1];
			return_array["daysOfMonth"] = cron_array[2];
			return_array["months"] = cron_array[3];
			return_array["daysOfWeek"] = cron_array[4];
		}
		else{
			return_array["seconds"] = cron_array[0];
			return_array["minutes"] = cron_array[1];
			return_array["hours"] = cron_array[2];
			return_array["daysOfMonth"] = cron_array[3];
			return_array["months"] = cron_array[4];
			return_array["daysOfWeek"] = cron_array[5];

		}
        return return_array;
    }

    private multiply_period(multiplier:number, period_title: string, next_period_title: string, add_to_next: number = 0){
        let period: string = this._expression[period_title];
        let next_period: string = this._expression[next_period_title];
        let return_period: string = period;
        let return_add_to_next: number = add_to_next;
        let period_max = 60;
        
        switch(period_title){
            case "seconds":
                break;
            case "minutes":
                break;
            default:
                break;
        }

        if(period.includes('/')){
            const [step, range] = period.split('/');
            let doubledRange = parseInt(range) * multiplier;
            if(add_to_next != 0){
                doubledRange += add_to_next;
            }
            if(doubledRange >= period_max){
                return_add_to_next = Math.floor(doubledRange / period_max);
                doubledRange = doubledRange % period_max;
            }
            if(return_add_to_next){
                return_period = `${doubledRange}`;
            }
            else{
                return_period = `${step}/${doubledRange}`;
            }
            
        }
        else if(period == "*"){ 
            // do nothing
            if(add_to_next != 0){
                return_period = `*/${add_to_next}`;
            }
            if(next_period == "*"){
                return_period = `*/${multiplier}`;
            }
        }
        else{ 
            let range: string = period;
            let doubledRange: number = parseInt(range) * multiplier;
            if(doubledRange >= period_max){
                return_add_to_next = Math.floor(doubledRange / period_max);
                doubledRange = doubledRange % period_max;
            }
            return_period = `${doubledRange}`;
        }

        return [return_period, return_add_to_next] as const;
    }

	double() {
		// Double the seconds first
        const seconds_result = this.multiply_period(2, "seconds", "minutes");
        this._new_expression["seconds"] = seconds_result[0];
        const add_to_minutes: number = seconds_result[1];

        if(add_to_minutes){
            const minutes_result = this.multiply_period(2, "minutes", "hours", add_to_minutes);
            this._new_expression["minutes"] = seconds_result[0];
            const add_to_hours: number = seconds_result[1];
        }
        
		return this.newExpression;
	}

    get newExpression(){
        return `${this._new_expression["seconds"]} ${this._new_expression["minutes"]} ${this._new_expression["hours"]} ${this._new_expression["daysOfMonth"]} ${this._new_expression["months"]} ${this._new_expression["daysOfWeek"]}`;
    }

    get expression(){
        return `${this._expression["seconds"]} ${this._expression["minutes"]} ${this._expression["hours"]} ${this._expression["daysOfMonth"]} ${this._expression["months"]} ${this._expression["daysOfWeek"]}`;
    }
}

module.exports = Utils ;
