class DamageData {
	private _damageAppend:number;
	private _damageRate:number;
	private _damageCalculatorType:number;

	public constructor(damageAppend:number,damageRate:number,damageCalculatorType:DamageCalculateType = DamageCalculateType.Normal) {
		this._damageAppend = damageAppend;
		this._damageRate = damageRate;
		this._damageCalculatorType = damageCalculatorType;
	}

	public get damageAppend():number
	{
		return this._damageAppend;
	}

	public get damageRate():number
	{
		return this._damageRate;
	}

	public get damageCalculatorType():DamageCalculateType
	{
		return this._damageCalculatorType;
	}

}