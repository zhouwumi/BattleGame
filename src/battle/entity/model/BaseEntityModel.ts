class BaseEntityModel {

	protected _id:number; //实体唯一标识id
	protected _entity:BaseEntity;
	protected _direction:Direction;
	protected _entityType:EntityType;
	
	protected _x:number = 0;
	protected _y:number = 0;
	protected _moveSpeed:number = 4;
	protected _isDead:boolean = false;
	
	public constructor() {
		this._id = ObjectManager.instance.getObjId();
	}

	public set id(__id:number)
	{
		this._id = __id;
	}

	public get id():number
	{
		return this._id
	}

	public set entity(newEntity:BaseEntity)
	{
		this._entity = newEntity;
	}

	public get entity():BaseEntity
	{
		return this._entity;
	}

	public set direction(direction:Direction)
	{
		this._direction = direction;
		if(this.entity){
			this.entity.onDirectionChange();
		}
		
	}

	public get direction():Direction
	{
		return this._direction;
	}

	public set entityType(entityType:EntityType)
	{
		this._entityType= entityType;
	}

	public get entityType():EntityType
	{
		return this._entityType;
	}

	

	public set x(newX:number)
	{
		this._x= newX;
		if(this.entity){
			this.entity.onPositionChange();
		}
	}

	public get x():number
	{
		return this._x;
	}

	public set y(newY:number)
	{
		this._y= newY;
		if(this.entity){
			this.entity.onPositionChange();
		}
	}

	public get y():number
	{
		return this._y;
	}

	

	public set moveSpeed(newSpeed:number)
	{
		this._moveSpeed= newSpeed;
	}

	public get moveSpeed():number
	{
		return this._moveSpeed;
	}

	

	public set isDead(_isDead:boolean)
	{
		this._isDead= _isDead;
	}

	public get isDead():boolean
	{
		return this._isDead;
	}

	
}