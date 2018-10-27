class BaseAiState {
	public aiComponent:BaseAIComponent = null;

	public constructor(aiComponent:BaseAIComponent) 
	{
		this.aiComponent = aiComponent;
	}


	//进入状态
	public stateIn():void
	{
	}

	//更新状态
	public stateUpdate():void
	{
	}

	//退出状态
	public stateOut():void
	{
		
	}

	public getDistance(target:BaseEntity):number
	{
		return Math.abs(target.entityModel.x - this.aiComponent.battleEntity.entityModel.x) + Math.abs(target.entityModel.y - this.aiComponent.battleEntity.entityModel.y)
	}

	public getDistanceX(target:BaseEntity):number
	{
		return Math.abs(target.entityModel.x - this.aiComponent.battleEntity.entityModel.x)
	}
}