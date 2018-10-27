class FightEntityModel extends BaseEntityModel{

	protected _maxHp:number = 100;
	protected _hp:number = 0;//血量
	protected _fightProperty:FightObjectProperty; //战斗属性
	protected _teamType:TeamType;
	protected _fightPower:number = 10;

	public constructor() {
		super();
		this._fightProperty = new FightObjectProperty();
	}

	public get fightProperty():FightObjectProperty
	{
		return this._fightProperty
	}

	public set maxHp(_newMaxHp:number)
	{
		this._maxHp = _newMaxHp
	}

	public get maxHp():number
	{
		return this._maxHp
	}

	public set hp(newHp:number)
	{
		if(newHp <= 0){
			newHp = 0
		}
		if(newHp >= this.maxHp){
			newHp = this.maxHp
		}
		this._hp= newHp;
		if(this.entity){
			this.entity.onHpChange();
		}
		
	}

	public get hp():number
	{
		return this._hp;
	}

	public set teamType(teamType:TeamType)
	{
		this._teamType= teamType;
	}

	public get teamType():TeamType
	{
		return this._teamType;
	}

	public set fightPower(newFight:number)
	{
		this._fightPower= newFight;
	}

	public get fightPower():number
	{
		return this._fightPower;
	}
}