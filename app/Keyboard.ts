export { Keyboard }

class Keyboard
{
    private _HelpDown:boolean;
    private _LeftDown:boolean;
    private _RightDown:boolean;
    private _SpaceDown:boolean;
    private _ResetDown:boolean;
    private _SwitchDown:boolean;
    private _ContinueDown:boolean;
    public get Help():boolean { return this._HelpDown; }
    public get Left():boolean { return this._LeftDown; }
    public get Right():boolean { return this._RightDown; }
    public get Space():boolean { return this._SpaceDown; }
    public get Reset():boolean { return this._ResetDown; }
    public set Reset(value) { this._ResetDown = value; }
    public get Switch():boolean { return this._SwitchDown; }
    public set Switch(value) { this._SwitchDown = value; }
    public get Continue():boolean { return this._ContinueDown; }
    public set Continue(value) { this._ContinueDown = value; }
    public constructor()
    {
        this.Init();
    }
    public Init() : void
    {
        this._HelpDown = false;
        this._LeftDown = false;
        this._RightDown = false;
        this._SpaceDown = false;
        this._ResetDown = false;
        this._SwitchDown = false;
        this._ContinueDown = false;
        document.addEventListener("keydown", this.KeyDown.bind(this)); 
        document.addEventListener("keyup", this.KeyUp.bind(this)); 
    }
    public KeyDown(event)
    {
        if(event.keyCode == 32)
        {
            this._SpaceDown = true;
        }
        if(event.keyCode == 37)
        {
            this._LeftDown = true;
        }
        else if(event.keyCode == 39)
        {
            this._RightDown = true;
        }
        if(event.keyCode == 82)
        {
            this._ResetDown = true;
        }
        if(event.keyCode == 13)
        {
            this._ContinueDown = true;
        }
        if(event.keyCode == 65)
        {
            this._SwitchDown = true;
        }
        if(event.keyCode == 72)
        {
            this._HelpDown = true;
        }
    }
    public KeyUp(event)
    {
        if(event.keyCode == 37 || event.keyCode == 39)
        {
            this._LeftDown = false;
            this._RightDown = false;
        }
        if(event.keyCode == 32)
        {
            this._SpaceDown = false;
        }
        if(event.keyCode == 82)
        {
            this._ResetDown = false;
        }
        if(event.keyCode == 13)
        {
            this._ContinueDown = false;
        }
        if(event.keyCode == 65)
        {
            this._SwitchDown = false;
        }
        if(event.keyCode == 72)
        {
            this._HelpDown = false;
        }
    }
}