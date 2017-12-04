export  { BoxManager };

import * as Three from 'Three';

import { Box } from "./Box";
import { Crane } from "./Crane";
import { Level } from "./../Levels/Level";
import { Messages } from "./../UI/Messages";
import { BoxFactory } from "./BoxFactory";
import { BoxTypeDisplay } from "./../UI/BoxTypeDisplay";
import { CollisionManager } from "./../CollisionManager";

class BoxManager
{
    private _BoxType:number;
    private _Finished:boolean;
    private _Velocity:number;
    private _BaseBox:Box;
    private _ReleasedBox:Box;
    private _Boxes:Box[];
    private _CarriedBoxes:Box[];
    private _Crane:Crane;
    private _Level:Level;
    private _Scene:Three.Scene;
    private _Messages:Messages;
    private _Display:BoxTypeDisplay;
    private _Collision:CollisionManager;
    private _Factory:BoxFactory;
    public get Finished():boolean { return this._Finished; }
    public constructor(Scene:Three.Scene, Engine:any, Level:Level, Collision:CollisionManager)
    {
        this._Scene = Scene;
        this._Level = Level;
        this._Collision = Collision;
        this._Messages = new Messages(Level);
        this._Display = new BoxTypeDisplay(Level);
        this._Factory = new BoxFactory(Scene, Engine);
        this.Init();
    }
    public Init() : void
    {
        this._BoxType = 0;
        this._Finished = false;
        this._Velocity = 0;
        this._Boxes = [];
        this._CarriedBoxes = [];
        this._BaseBox = this.GetNewCraneBox();
        this._BaseBox.Move({x:0, y:-200});
        this._Display.Update();
        this._Boxes.push(this._BaseBox);
        this._CarriedBoxes.push(this._BaseBox);
        this._Crane = new Crane();
        this._Crane.Speed = this._Level.CraneSpeed;
        this._Crane.Limit = this._Level.CraneLimit;
    }
    public SetLevel(Level:Level) : void
    {
        this._Level = Level;
        this._Display.SetLevel(Level);
        this._Messages.SetLevel(Level);
    }
    public Reset() : void
    {
        this._Messages.Hide();
        for(let i in this._Boxes)
        {
            this._Boxes[i].Destroy();
        }
        this._Crane = null;
        this._ReleasedBox = null;
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
            if(this._Boxes[i]) this._Boxes[i].Update();
        }
        if(!this._Crane.Box && (!this._ReleasedBox || this._ReleasedBox.Position.y < 500))
        {
            this._Crane.Box = this.GetNewCraneBox();
            if(this._Crane.Box != null) this._Boxes.push(this._Crane.Box);
        }
        this._Scene.position.x = -this._BaseBox.Position.x;
    }
    public Switch()
    {
        if(this._Crane.Box)
        {
            let OldBox = this._Crane.Box;
            this._Crane.Box = null;
            this._Boxes.splice(this._Boxes.indexOf(OldBox), 1);
            OldBox.Destroy();
            this._Level.NowBoxTypes[this._BoxType].Amount += 1;
            this._BoxType++;
            if(this._BoxType >= this._Level.NowBoxTypes.length) this._BoxType = 0;
            this._Crane.Box = this.GetNewCraneBox();
            if(this._Crane.Box != null) this._Boxes.push(this._Crane.Box);
        }
    }
    private GetNewCraneBox() : Box
    {
        if(this._BoxType == -1) return;
        while(this._Level.NowBoxTypes[this._BoxType].Amount == 0)
        {
            this._BoxType++;
            if(this._BoxType >= this._Level.NowBoxTypes.length)
            {
                this._BoxType = -1;
                break;
            }
        }
        if(this._BoxType == -1)
        {
            for(let i = 0; i < this._Level.NowBoxTypes.length; i++)
            {
                if(this._Level.NowBoxTypes[i].Amount != 0) this._BoxType = i;
            }
        }
        if(this._BoxType == -1) return null;
        else
        {
            this._Level.NowBoxTypes[this._BoxType].Amount -= 1;
            this._Display.Update();
            return this._Factory.Generate(this._Level.NowBoxTypes[this._BoxType].Type, null, true);
        }
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
            if(!this._Finished)
            {
                this._Finished = true;
                this.UpdateCarriedBoxes();
                this._Level.Score += this.CalculateScore();
                this._Messages.Show();
            }
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
    private CalculateScore() : number
    {
        let Score = 0;
        for(let i in this._CarriedBoxes)
        {
            Score += this._CarriedBoxes[i].Score;
            this._CarriedBoxes[i].Score;
        }
        return Score;
    }
}