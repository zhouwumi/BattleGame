class BitmapFontTest extends egret.DisplayObjectContainer{

	public constructor() {
		super();
		/*
		let bmpTxt = new egret.Bitmap();
		let texture = RES.getRes("ms_battle_5")
		bmpTxt.texture = texture;
		bmpTxt.x = CommonUtils.stage.stageWidth/2;
		bmpTxt.y = CommonUtils.stage.stageHeight/2 - 100;
		this.addChild(bmpTxt);
		console.log("####BitmapFontTest#####")*/
		let nextY = 0
		let linknames = ["ms_battle_","ranking_","reduce_","wxdw_s_","add_","Combat_num_","fightLeyer"];
		for(let index = 0;index < linknames.length;index++)
		{
			let name = linknames[index]
			let numberContainer = new NumberContainer(name);
			numberContainer.setNumber("1234567890");
			numberContainer.y = nextY;
			this.addChild(numberContainer);
			nextY += numberContainer.height
		}
		

	}

}