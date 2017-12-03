export { Crane }

import { Box } from "./Box";

class Crane
{
    private _Direction:number;
    private _Speed:number;
    private _Move:number;
    private _Limit:number;
    private _Box:Box;
    public get Box():Box { return this._Box; }
    public set Box(value) { this.SetBox(value); }
    public get Speed():number { return this._Speed; }
    public set Speed(value) { this._Speed = value; }
    public get Limit():number { return this._Limit; }
    public set Limit(value) { this._Limit = value; }
    public constructor()
    {
        this._Direction = 1;
        this._Speed = 1;
        this._Limit = 100;
    }
    private SetBox(Box:Box) : void
    {
        if(Box != null)
        {
            Box.Move({x:0, y:-800});
        }
        this._Box = Box;
        this.Reset();
    }
    private Reset() : void
    {
        this._Move = 0;
    }
    public Update() : void
    {
        if(this._Box == null) return;
        this._Move += this._Direction * this._Speed;
        if(Math.abs(this._Move) > this._Limit) this._Direction *= -1;
        this._Box.Move({x:this._Direction * this._Speed, y:0});
    }
}