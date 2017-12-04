export  { SceneManager };

import * as Three from 'Three';

import { Box } from "./Objects/Box";
import { Keyboard } from "./Keyboard";
import { Renderer } from "./Renderer"; 
import { BoxManager } from "./Objects/BoxManager";
import { LevelManager } from "./Levels/LevelManager";
import { CollisionManager } from "./CollisionManager";
import { Environment } from "./SceneEnvironment";
import { Character } from "./Character";
import { Truck } from "./Truck";

class SceneManager
{
    private _Keyboard:Keyboard;
    private _Renderer:Renderer;
    private _BoxManager:BoxManager;
    private _LevelManager:LevelManager;
    private _CollisionManager:CollisionManager;
    public constructor(Resolution:any)
    {
        this._Keyboard = new Keyboard();
        this._Renderer = new Renderer({X:1920, Y:1080});
        let Env = new Environment(this._Renderer.Scene);
        this._CollisionManager = new CollisionManager();
        let Char = new Character(this._Renderer.Scene);
        let Truc = new Truck(this._Renderer.Scene, this._CollisionManager.Engine);
        this._LevelManager = new LevelManager();
        this._BoxManager = new BoxManager(this._Renderer.Scene, this._CollisionManager.Engine, this._LevelManager.Level, this._CollisionManager);
        this._Renderer.OnRender.push(this.Update.bind(this));
        this._Renderer.OnRender.push(this._BoxManager.Prepare.bind(this._BoxManager));
        this._Renderer.OnRender.push(this._CollisionManager.Run.bind(this._CollisionManager));
        this._Renderer.OnRender.push(this._BoxManager.Update.bind(this._BoxManager));
    }
    public Reset() : void
    {
        this._BoxManager.Reset();
        this._Renderer.Reset();
    }
    private Update() : void
    {
        this._LevelManager.Update();
        if(this._Keyboard.Space) 
        { 
            this._BoxManager.ReleaseBox(); 
        } 
        if(this._Keyboard.Left) 
        { 
            this._BoxManager.SetMove(-0.1); 
        } 
        else if(this._Keyboard.Right) 
        { 
            this._BoxManager.SetMove(0.1); 
        }
        else
        {
            this._BoxManager.SetMove(0);
        }
        if(this._Keyboard.Reset) 
        { 
            this._Keyboard.Reset = false;
            this._LevelManager.Level.Reset();
            this.Reset();
        }
        if(this._Keyboard.Continue) 
        { 
            this._Keyboard.Continue = false;
            this._LevelManager.Next();
            this._BoxManager.SetLevel(this._LevelManager.Level);
            this.Reset(); 
        }
        if(this._Keyboard.Switch)
        {
            this._Keyboard.Switch = false;
            this._BoxManager.Switch();
        }
    }
}