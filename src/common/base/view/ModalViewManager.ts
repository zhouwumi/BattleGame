class ModalViewManager{
	private static _instance = null;
	public static get instance():ModalViewManager{
		if(ModalViewManager._instance == null){
			ModalViewManager._instance = new ModalViewManager();
		}
		return ModalViewManager._instance;
	}

	private _modalNodes:Array<ModalNode> = [];
	private _modalViews:Array<BaseSkinView> = [];
	private _maskViews:Array<egret.Shape> = [];

	public constructor(){

	}

	public addView(view:BaseSkinView):boolean{
		for(let index = 0;index<this._modalNodes.length;index++)
		{
			let node = this._modalNodes[index];
			if(node.contentView == view){
				return false;
			}
		}

		let newNode = new ModalNode(view);
		let newIndex = this._modalNodes.push(newNode);
		newNode.setModalIndex(newIndex);

		LayerManager.instance.getActivitySubLayer(LayerCost.Layer_Activity_UI).addChild(newNode);
		
		return true;
	}

	public removeView(view:BaseSkinView):boolean
	{
		let index = -1;
		if(!view.modalNode || (index = this._modalNodes.indexOf(view.modalNode)) == -1){
			return false;
		}
		let modalNode = view.modalNode;
		if(modalNode.parent){
			modalNode.parent.removeChild(modalNode);
		}

		this._modalNodes.splice(index);
		return true;
	}

}

class ModalNode extends egret.DisplayObjectContainer{

	public contentView:BaseSkinView = null;
	public maskView:egret.Shape = null;
	public constructor(view:BaseSkinView){
		super();
		
		if(view.showMask){
			let maskView = this.createMaskView();
			view.maskView = maskView;
			this.maskView = maskView;
			this.addChild(this.maskView);
		}
		this.addChild(view);
		view.modalNode = this;
		view.x = CommonUtils.stage.stageWidth/2 ;
        view.y = CommonUtils.stage.stageHeight/2;
	}

	public setModalIndex(index:number){
		this.maskView.alpha += 0.1 * (index - 1);
	}

	private createMaskView():egret.Shape
	{
		let mask = new egret.Shape();
        mask.graphics.beginFill(0x000000, 0.5);
        mask.graphics.drawRect(0, 0, CommonUtils.stage.stageWidth, CommonUtils.stage.stageHeight);
        mask.graphics.endFill();
		mask.touchEnabled = true;
		return mask;
	}
	
}	