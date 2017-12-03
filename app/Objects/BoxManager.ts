export  { BoxManager };

import * as Three from 'Three';

import { Box } from "./Box";
import { Crane } from "./Crane";
import { Level } from "./../Levels/Level";
import { CollisionManager } from "./../CollisionManager";

class BoxManager
{
    private _Velocity:number;
    private _BaseBox:Box;
    private _ReleasedBox:Box;
    private _Boxes:Box[];
    private _CarriedBoxes:Box[];
    private _Crane:Crane;
    private _Level:Level;
    private _Scene:Three.Scene;
    private _Collision:CollisionManager;
    public constructor(Scene:Three.Scene, Level:Level, Collision:CollisionManager)
    {
        this._Scene = Scene;
        this._Level = Level;
        this._Collision = Collision;
        this.Init();
    }
    public Init() : void
    {
        this._Velocity = 0;
        this._Boxes = [];
        this._CarriedBoxes = [];
        this._BaseBox = new Box(this._Scene, this._Collision.Engine, {X:0, Y:200, Z:0}, true);
        this._Boxes.push(this._BaseBox);
        this._CarriedBoxes.push(this._BaseBox);
        this._Crane = new Crane();
        this._Crane.Speed = this._Level.CraneSpeed;
        this._Crane.Limit = this._Level.CraneLimit;
        this._Crane.Box = new Box(this._Scene, this._Collision.Engine, null, true);
        this._Boxes.push(this._Crane.Box);
    }
    public Reset() : void
    {
        for(let i in this._Boxes)
        {
            this._Boxes[i].Destroy();
        }
        this._Crane = null;
        this.Init();
    }
    public Prepare() : void
    {
        this._Crane.Update();
        for(let i in this._Boxes)
        {
            this._Boxes[i].Prepare();
        }
    }
    public Update() : void
    {
        for(let i in this._Boxes)
        {
            this._Boxes[i].Update();
        }
        if(!this._Crane.Box && this._ReleasedBox.Position.y < 500)
        {
            this._Crane.Box = new Box(this._Scene, this._Collision.Engine, null, true);
            this._Boxes.push(this._Crane.Box);
        }
        this._Scene.position.x = -this._BaseBox.Position.x;
    }
    public ReleaseBox() : void
    {
        if(!this._Crane.Box) return;
        this._ReleasedBox = this._Crane.Box;
        this._Crane.Box = null;
        this._ReleasedBox.NonStatic();
        this._CarriedBoxes.push(this._ReleasedBox)
    }
    public SetMove(Speed:number)
    {
        if(this._BaseBox.Position.x > 3000)
        {
            this.UpdateCarriedBoxes();
            console.log("Truck!");
        }
        else
        {
            if(Speed == 0) this._Velocity = 0;
            else this._Velocity += Speed;
            if(this._Velocity > 5) this._Velocity = 5;
            if(this._Velocity < -5) this._Velocity = -5;
            if(this._Velocity < 0 && this._BaseBox.Position.x <= -100) this._Velocity = 0;
            this._BaseBox.SetVelocity(this._Velocity);
        }
    }
    private UpdateCarriedBoxes() : void
    {
        for(let i in this._CarriedBoxes)
        {
            if(this._CarriedBoxes[i].Position.y < 200)
            {
                this._CarriedBoxes.splice(this._CarriedBoxes.indexOf(this._CarriedBoxes[i]), 1);
            }
        }
    }
}