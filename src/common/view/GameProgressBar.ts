class GameProgressBar extends egret.DisplayObjectContainer{

	public backgroundBitmap:egret.Bitmap;
	public progressBitmap:egret.Bitmap;
	private currentPercent:number = 0;

	public constructor(background:string,progress:string) {
		super();
		this.backgroundBitmap = new egret.Bitmap();
		this.backgroundBitmap.texture = RES.getRes(background);
		this.addChild(this.backgroundBitmap);
		this.progressBitmap = new egret.Bitmap();
		this.progressBitmap.texture = RES.getRes(progress);
		this.addChild(this.progressBitmap);
	}

	public setWidth(width:number):void
	{
		this.backgroundBitmap.width = width;
		this.progressBitmap.width = width;
	}

	public setHeight(height:number):void
	{
		this.backgroundBitmap.height = height;
		this.progressBitmap.height = height;
	}

	public setPercent(percent:number):void
	{
		if(this.currentPercent == percent){
			return;
		}
		this.currentPercent = percent;
		var newRectange = new egret.Rectangle(0,0,this.progressBitmap.width * percent,this.progressBitmap.height);
		this.progressBitmap.mask = newRectange;
	}

}