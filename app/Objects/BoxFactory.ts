export { BoxFactory }

import * as Three from 'Three';

import { Box } from "./Box";

class BoxFactory
{
    private _Engine:any;
    private _Scene:Three.Scene;
    public constructor(Scene:Three.Scene, Engine:any)
    {
        this._Scene = Scene;
        this._Engine = Engine;
    }
    public Generate(Type:string, Position?:any, Static?:boolean) : Box
    {
        console.log(Type);
        let NewBox;
        if(Type == "Cardboard")
        {
            NewBox = new Box(this._Scene, 0, this._Engine, Position, {X:100, Y:100, Z:100}, Static, 0.5);
        }
        else if(Type == "Wooden")
        {
            NewBox = new Box(this._Scene, 1, this._Engine, Position, {X:100, Y:100, Z:100}, Static, 1);
        }
        return NewBox;
    }
}