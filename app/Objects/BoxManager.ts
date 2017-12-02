export  { BoxManager };

import * as Three from 'Three';

import { Box } from "./Box";
import { CollisionManager } from "./../CollisionManager";

class BoxManager
{
    private _BaseBox:Box;
    private _Boxes:Box[];
    private _Scene:Three.Scene;
    private _Collision:CollisionManager;
    public constructor(Scene:Three.Scene, Collision:CollisionManager)
    {
        this._Scene = Scene;
        this._Collision = Collision;
        this.Init();
    }
    public Init()
    {
        this._Boxes = [];
        this._BaseBox = new Box(this._Scene, this._Collision.Engine, {X:0, Y:200, Z:0}, true);
        this._Boxes.push(this._BaseBox);
        let Box2 = new Box(this._Scene, this._Collision.Engine, {X:20, Y:300, Z:0});
        this._Boxes.push(Box2);
        let BoxUp = new Box(this._Scene, this._Collision.Engine, {X:-30, Y:800, Z:0});
        this._Boxes.push(BoxUp);
    }
    public Update()
    {
        for(let i in this._Boxes)
        {
            this._Boxes[i].Update();
        }
    }
}