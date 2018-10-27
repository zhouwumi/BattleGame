/**
 * 头顶说话
 */
class ShowTalkView extends egret.DisplayObjectContainer{

	private _showStr:string;
	public boxBitmap:egret.Bitmap;
	public labelContent:egret.TextField;

	public constructor(showStr) {
		super()
		this._showStr = showStr

		let boxBitmap = new egret.Bitmap();
		let texture = RES.getRes("talk_png")
		boxBitmap.texture = texture;
		
		boxBitmap.scale9Grid = new egret.Rectangle(10,10,boxBitmap.texture.textureWidth - 10,boxBitmap.texture.textureHeight/2);
		boxBitmap.width = 1.5 * boxBitmap.texture.textureWidth;
		boxBitmap.height = 1.3 * boxBitmap.texture.textureHeight
		this.addChild(boxBitmap)

		let label = new egret.TextField();
		label.text = this._showStr;
		label.size = 14
		label.width = 120
		this.addChild(label);

		this.labelContent = label;
		this.boxBitmap = boxBitmap
	}

	public setDirection(direction:Direction)
	{
		if(direction == Direction.LEFT){
			this.labelContent.x = 10;
			this.labelContent.y = 10;
		}else{
			this.boxBitmap.anchorOffsetX = this.boxBitmap.width * 0.5
			this.boxBitmap.anchorOffsetY = this.boxBitmap.height * 0.5
			this.boxBitmap.x = this.boxBitmap.anchorOffsetX 
			this.boxBitmap.y = this.boxBitmap.anchorOffsetY
			this.boxBitmap.scaleX = -1
			this.labelContent.x = 10;
			this.labelContent.y = 10;
		}
	}
}