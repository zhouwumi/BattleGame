class RemoteDeadState extends BaseAiState{
	
	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}

	public stateIn():void
	{
		this.aiComponent.stop();
		DisplayUtil.removeFromParent(this.aiComponent.battleEntity.view);
	}
}