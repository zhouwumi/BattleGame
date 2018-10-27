class RemoteSpingMoveState extends RemoteMoveTargetState{

	private springTimes:number = 0;//

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}

	public stateIn():void
	{
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
		thisEntity.view.visible = true;
		
		(thisEntity.view as BattleRemoteAvatar).doAction(thisEntity.remoteConfig.action,thisEntity.remoteConfig.isLoop);

		let thisComponent = this.aiComponent as RemoteSpingAiComponent;
		let target = thisEntity.entityModel.target;
		if(!target){
			console.log("remote has no target");
			
			thisComponent.clearState();//没有找到目标，肯定不会触发目标
			thisComponent.changeState(BattleStateType.DEAD);
			return;
		}
		if(target.entityModel.isDead){
			thisComponent.changeState(BattleStateType.IDLE);
			return;
		}
		
		this.target = target;
		this.targetX = target.entityModel.x;
		this.targetY = target.entityModel.y - 60;//减去身高的一半，刚好打击在了身体中部
	//	console.log("进入了弹射过程,目标位置是",this.targetX,this.targetY);
		
		if(this.springTimes == 0){
			thisEntity.entityModel.x = thisEntity.entityModel.hostTarget.entityModel.x;
			thisEntity.entityModel.y = thisEntity.entityModel.hostTarget.entityModel.y - 60;
		}else{
			thisEntity.entityModel.x = thisEntity.entityModel.lastTarget.entityModel.x;
			thisEntity.entityModel.y = thisEntity.entityModel.lastTarget.entityModel.y - 60;
		}
		
		this.dirX = target.entityModel.x - thisEntity.entityModel.x;
		this.dirY = target.entityModel.y - thisEntity.entityModel.y;
		if(this.targetX == thisEntity.entityModel.x){
			this.degree = Math.PI/2;
		}else{
			this.degree = Math.atan(Math.abs(this.targetY - thisEntity.entityModel.y)/Math.abs(this.targetX - thisEntity.entityModel.x));
		}
		
		if(this.targetX == thisEntity.entityModel.x){
			thisEntity.view.rotation = this.targetY > thisEntity.entityModel.y ? this.degree * 180/Math.PI : this.degree * 180/Math.PI * -1;
		}else if(this.targetX > thisEntity.entityModel.x){
			if(this.targetY > thisEntity.entityModel.y){
				thisEntity.view.rotation = this.degree * 180/Math.PI;
			}else{
				thisEntity.view.rotation = this.degree * 180/Math.PI * -1;
			}
			thisEntity.entityModel.direction = Direction.RIGHT
		}else{
			if(this.targetY > thisEntity.entityModel.y){
				thisEntity.view.rotation = this.degree * 180/Math.PI * -1;
			}else{
				thisEntity.view.rotation = this.degree * 180/Math.PI;
			}
			thisEntity.entityModel.direction = Direction.LEFT  //不能直接修改view的scaleX,
		}

	//	console.log("进入弹射计算前",this.targetX,this.targetY,thisEntity.x,thisEntity.y,this.degree)
		if(this.targetY > thisEntity.entityModel.y){
			this.targetY = this.targetY - thisEntity.remoteConfig.width * Math.sin(this.degree);
		}else{
			this.targetY = this.targetY + thisEntity.remoteConfig.width * Math.sin(this.degree);
		}
		
		if(this.targetX > thisEntity.entityModel.x){
			this.targetX = this.targetX  - thisEntity.remoteConfig.width * Math.cos(this.degree);
		}else{
			this.targetX = this.targetX  + thisEntity.remoteConfig.width * Math.cos(this.degree);
		}

	//	console.log("进入弹射计算后",this.targetX,this.targetY,thisEntity.x,thisEntity.y)
	}

	protected handleMoveOver():void
	{
		
		this.springTimes++;
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity;
		let thisComponent = this.aiComponent as RemoteSpingAiComponent;
		thisComponent.cacheTarget(this.target);
		if(this.target && this.target instanceof HeroEntity){
			(this.target as HeroEntity).entityModel.hp -= 10;
		}
	//	console.log("远程打击的对象",this.target.x,this.target.y)
		thisEntity.entityModel.lastTarget = this.target;//记录上一次打击的目标
		thisEntity.entityModel.target = null;//清空远程参数里的目标
		this.target = null;
		let maxSpringTimes = thisEntity.entityModel.maxSpringTimes || thisEntity.remoteConfig.maxSpringTimes || 0;
		if(this.springTimes >= maxSpringTimes){
			this.aiComponent.changeState(BattleStateType.DEAD);
		}else{
			thisComponent.springNext();
		}
	//	console.log("########远程弹射了###几次??##",this.springTimes,thisEntity.x,thisEntity.y);
	}

	public stateUpdate()
	{
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
	//	console.log("###RemoteSpingMoveState##stateUpdate旋转角度#",this.degree,thisEntity.view.rotation)
	//	console.log("###RemoteSpingMoveState#stateUpdate#形象是否翻转##",thisEntity.view.scaleX)
		if(this.target.entityModel.isDead){
			this.aiComponent.changeState(BattleStateType.IDLE);
			return
		}
		super.stateUpdate();
	}
}