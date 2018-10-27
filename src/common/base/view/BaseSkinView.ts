class BaseSkinView extends eui.Component{

	private _maskView:egret.Shape = null;
	private _modalNode:ModalNode = null;

	public constructor() {
		super();

		this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
		this.scaleX = this.scaleY = 0.01;
	}

	protected addToStage(event:egret.Event):void
	{
		this.once(eui.UIEvent.COMPLETE,this.uiCompelete,this);
		this.skinName = this.skinPath;
	}

	protected uiCompelete(event:eui.UIEvent):void
	{
		this.anchorOffsetX = this.width/2;
		this.anchorOffsetY = this.height/2;

		if(this.showAnimation){
			egret.Tween.get(this).to({scaleX:1,scaleY:1},200).call(this.tweenCompelete);
		}else{
			this.scaleX = this.scaleY = 1.0;
		}
	}

	protected tweenCompelete():void
	{
		console.log("tweenCompelete")
	}

	public  close():void
	{
		let self = this;
		if(this.showAnimation){
			egret.Tween.get(this).to({scaleX:0.1,scaleY:0.1},200).call(function(){
				ModalViewManager.instance.removeView(self);
			})
		}else{
			ModalViewManager.instance.removeView(self);
		}
		
	}

	public dispose():void
	{

	}


	/**
	 * 是否采用动画显示
	 */
	protected get showAnimation():boolean
	{
		return true;
	}

	public get skinPath():string
	{
		console.log("error:please override this method");
		return ""
	}

	/**
	 * 是否显示黑屏
	 */
	public get showMask():boolean
	{
		return true;
	}

	public get maskView():egret.Shape
	{
		return this._maskView;
	}

	public set maskView(view:egret.Shape)
	{
		this._maskView = view;
	}

	public set modalNode(modalNode:ModalNode)
	{
		this._modalNode = modalNode;
	}

	public get modalNode():ModalNode
	{
		return this._modalNode
	}

	
}