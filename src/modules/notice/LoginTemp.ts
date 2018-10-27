class LoginTemp extends eui.Component{
	public constructor() {
		super()
			
		egret.callLater(function(){
			this.skinName = "resource/config/Login_Temp.exml";
		}, this);
	}
}