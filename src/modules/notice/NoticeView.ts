
class NoticeView extends BaseSkinView{

	private loginTemp:LoginTemp;
	private label_content:eui.Label;
	private btn_yes:eui.Button;

	public constructor() {
		super();
	}

	protected addToStage(event:egret.Event):void
	{
		this.once(eui.UIEvent.COMPLETE,this.uiCompelete,this);
		this.skinName = 'LoginNotice';
	//	this.skinName = this.skinPath;
	}

	protected uiCompelete(event:eui.UIEvent):void
	{
		super.uiCompelete(event);
		this.label_content.text = "之间啊老师讲课峰啦开始懂了法律手段法拉克是地方卡兰蒂斯开发开始懂了发的粉丝";
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		console.log("LoginNotice == null", LoginNotice == null);
		console.log("LoginNotice == window['LoginNotice']", LoginNotice == window['LoginNotice']);
	}

	protected partAdded(partName: string, instance: any): void
	{
		if(partName == "loginTemp")
		{
			var localThis = this;
			egret.callLater(function(){
				localThis.loginTemp.$invalidate();
			}, this);
			
		}
	}

	private onClick():void
	{
	//	this.close();
		this.loginTemp.$invalidate();
	}

	public get skinPath():string
	{
		return "resource/eui_skins/modules/notice/LoginNotice.exml";
	}

	
}