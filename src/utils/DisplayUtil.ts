class DisplayUtil {
	
	public static removeFromParent(child:egret.DisplayObject):void
	{
		if(child && child.parent){
			child.parent.removeChild(child);
		}
	}

	public static removeAllChildren(parent:egret.DisplayObjectContainer):void
	{
		if(parent)
		{
			parent.removeChildren();
		}
	}

	//判断是否在舞台可视范围内
	public static isEntityInStageScope(entity:BaseEntity):boolean
	{
		if(!entity || !entity.view){
			return false;
		}
		let entityView = entity.view;
		if(!entityView.visible || !entityView.parent){
			return false
		}
		let parnetEntityView = entityView.parent;
		let globalPoint = parnetEntityView.localToGlobal(entity.entityModel.x,entity.entityModel.y)
		return globalPoint.x >=0 && globalPoint.x <= CommonUtils.stage.stageWidth && globalPoint.y >= 0 && globalPoint.y <= CommonUtils.stage.stageHeight;
	}

	//数字瓢字：先变大，然后砸下去，这个过程是变小上浮，砸下去之后，满满上浮消失
	public static flyNumber_bigUp(numberContainer:NumberContainer,entity:BaseEntity,callback:Function = null):void
	{
		numberContainer.visible = true;
		numberContainer.alpha = 1;
		numberContainer.anchorOffsetX = numberContainer.width * 0.5
		numberContainer.anchorOffsetY = numberContainer.height * 0.5
		numberContainer.scaleX = numberContainer.scaleY = 10
		numberContainer.x = entity.entityModel.x + Math.random() * 50 * (Math.floor(Math.random()*2) == 0 ? 1:-1);
		numberContainer.y = entity.entityModel.y - BaseEntityAvatar.BODY_SIZE_HEIGHT + 100;
		egret.Tween.get(numberContainer).to({scaleX:1,scaleY:1,y:numberContainer.y - 50},300).to({y:numberContainer.y - 150,alpha:0},300).call(function(){
			numberContainer.visible = false;
			DisplayUtil.removeFromParent(numberContainer);
			NumberContainerPool.instance.returnNumberContainer(numberContainer);
			if(callback){
				callback()
			}
		})
	}

	//数字飘字：直接出现在头顶，然后上浮消失。
	public static flyNumber_up(numberContainer:NumberContainer,entity:BaseEntity,callback:Function = null):void
	{
		numberContainer.visible = true;
		numberContainer.alpha = 1;
		numberContainer.anchorOffsetX = numberContainer.width * 0.5
		numberContainer.anchorOffsetY = numberContainer.height * 0.5
		numberContainer.x = entity.entityModel.x + Math.random() * 50 * (Math.floor(Math.random()*2) == 0 ? 1:-1);
		numberContainer.y = entity.entityModel.y - BaseEntityAvatar.BODY_SIZE_HEIGHT -50;
		egret.Tween.get(numberContainer).to({y:numberContainer.y - 400,alpha:0},2000).call(function(){
			numberContainer.visible = false;
			DisplayUtil.removeFromParent(numberContainer);
			NumberContainerPool.instance.returnNumberContainer(numberContainer);
			if(callback){
				callback()
			}
		})
	}
}