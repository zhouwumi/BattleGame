/**
 * 头顶说话脚本
 */
class ShowTalkScript extends BaseScript{

	private params:Object;
	private _talkStr:string;
	private _talkView:ShowTalkView;

	public constructor(entity:BaseEntity,animationPlayer:BattleAnimationPlayer) {
		super(entity,animationPlayer);
	}

	public setParams(params:Object):void
	{
		this.params = params["params"]
		let thisEntity = this._entity
		let entityModel = thisEntity.entityModel as ActorEntityModel
		this._duration = params["duration"]
		this._talkStr = params["talkStr"]
	}

	protected onStart():void
	{
		this._talkView = new ShowTalkView(this._talkStr);
		this._entity.view.addChild(this._talkView);
		this._talkView.setDirection(this._entity.entityModel.direction)

		if(this._entity.entityModel.direction == Direction.LEFT){
			this._talkView.x = BaseEntityAvatar.BODY_SIZE_WIDTH/2 + 20
			this._talkView.y =  - 1 * BaseEntityAvatar.BODY_SIZE_HEIGHT - 30
		}else{
			this._talkView.x =  -1 * this._talkView.boxBitmap.width - 20
			this._talkView.y =  - 1 * BaseEntityAvatar.BODY_SIZE_HEIGHT - 30
		}
	}	

	protected onStop():void
	{
		if(this._talkView)
		{
			DisplayUtil.removeFromParent(this._talkView)
		}
	}
}