class AddBuffScript extends BaseScript{

	public bufferId:number;
	private params:Object;
	private target:ActorEntity;
	private attachHost:ActorEntity;
	private duration:number;
	private isMe:boolean;

	public constructor(entity:BaseEntity,animationPlayer:BattleAnimationPlayer) {
		super(entity,animationPlayer);
		this._duration = 0;
	}
	
	public setParams(params:Object):void
	{
		this.bufferId = params["bufferId"]
		this.params = params["params"]
		let thisEntity = this._entity
		let entityModel = thisEntity.entityModel as ActorEntityModel
		this.target = entityModel.target as ActorEntity;
		this.attachHost = thisEntity as ActorEntity;
		this.duration = params["duration"]
		this.isMe = params["isMe"] || false;
		if(this.isMe){
			this.attachHost.addBuff(this.bufferId,this.duration,this.attachHost);
		}else{
			this.target.addBuff(this.bufferId,this.duration,this.attachHost);
		}
		
	}

}