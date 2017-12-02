export  { CollisionManager };

import * as Matter from 'matter-js';

import { Ground } from "./Ground";

class CollisionManager
{
    private _Engine:any;
    private _Render:any;
    private _Ground:Ground;
    public get Engine():any { return this._Engine; }
    public constructor()
    {
        this.Init();
    }
    public Init() : void
    {
        this._Engine = Matter.Engine.create();
        this._Ground = new Ground(this._Engine, {X:2000, Y:0, Z:0}, {X:7000,Y:10,Z:1000});
    }
    public Run() : void
    {
        Matter.Engine.update(this._Engine);
    }
}