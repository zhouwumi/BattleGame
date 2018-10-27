class ActorAvatar extends FightEntityAvatar{
	
	protected mapBufferId2View:Object;

	public constructor(entity:BaseEntity) {
		super(entity)
		this.mapBufferId2View = {}
	}

	public addBuffView(bufferId:number)
	{
		if(this.mapBufferId2View[bufferId]){
			return
		}	
		let bufferInfo:BufferInfo = BattleConfigLoader.instance.getBufferInfo(bufferId);
		let animationName = bufferInfo.animation
		let animation = CommonUtils.createDragonBones(animationName);
		this.mapBufferId2View[bufferId] = animation
		if(animation.isDataReady())
		{
			this.onBuffAnimationReady(bufferId)
		}else{
			let self = this
			animation.readyCallback = function(){
				self.onBuffAnimationReady(bufferId);
			}
		}
		this.getLayer(AvatarLayer.Buff_Background).addChild(animation);
	}

	public onBuffAnimationReady(bufferId:number):void
	{
		let animation:db.DragonBonesAnimation = this.mapBufferId2View[bufferId];
		let bufferInfo:BufferInfo = BattleConfigLoader.instance.getBufferInfo(bufferId);
		animation.play(bufferInfo.action,0)
	}

	public removeBuffer(bufferId:number):void
	{
		let animation:db.DragonBonesAnimation = this.mapBufferId2View[bufferId];
		DisplayUtil.removeFromParent(animation);
		this.mapBufferId2View[bufferId] =  null;
	}
}