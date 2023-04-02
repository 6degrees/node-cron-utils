const CronParser = require("cron-parser");

class CronExpression {
    private _expression: any;
    private _newExpression: any;

    constructor(expression: string) {
        this._expression = CronParser.parseExpression(expression);
        this._newExpression = this._expression.fields;
    }

    double() {
        let counter = 1;
        this._newExpression.second = this._newExpression.second.filter((_: any,i: number) => {
            return (i + 1) % 3;
          })
    }

    public toString() {
        return this._newExpression.second;
    }
}

module.exports = CronExpression;
