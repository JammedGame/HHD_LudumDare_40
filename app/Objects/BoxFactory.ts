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
        let NewBox;
        if(Type == "Cardboard")
        {
            NewBox = new Box(this._Scene, 0, this._Engine, Position, {X:100, Y:100, Z:100}, Static, 0.5);
        }
        else if(Type == "Wooden")
        {
            NewBox = new Box(this._Scene, 1, this._Engine, Position, {X:100, Y:100, Z:100}, Static, 1);
        }
        else if(Type == "Metal")
        {
            NewBox = new Box(this._Scene, 2, this._Engine, Position, {X:100, Y:100, Z:100}, Static, 4);
        }
        else if(Type == "Large Cardboard")
        {
            NewBox = new Box(this._Scene, 3, this._Engine, Position, {X:200, Y:100, Z:100}, Static, 4);
        }
        else if(Type == "Large Wooden")
        {
            NewBox = new Box(this._Scene, 4, this._Engine, Position, {X:200, Y:100, Z:100}, Static, 8);
        }
        else if(Type == "Large Metal")
        {
            NewBox = new Box(this._Scene, 5, this._Engine, Position, {X:200, Y:100, Z:100}, Static, 32);
        }
        return NewBox;
    }
}