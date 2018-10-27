class GameProgressBarTest extends egret.DisplayObjectContainer{

	public constructor() {
		super()

		let bar = new GameProgressBar("battle_bloodbar_bg_png", "battle_bloodbar_sprite_png");
		bar.setWidth(bar.backgroundBitmap.width * 1.5)
		bar.setHeight(bar.backgroundBitmap.height * 1.5)
		bar.setPercent(0.2);
		this.addChild(bar);
	}

}