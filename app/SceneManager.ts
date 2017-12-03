export  { SceneManager };

import * as Three from 'Three';

import { Box } from "./Objects/Box";
import { Renderer } from "./Renderer"; 
import { BoxManager } from "./Objects/BoxManager";
import { CollisionManager } from "./CollisionManager";
import { SceneEnvironment } from "./SceneEnvironment";

class SceneManager
{
    private _Renderer:Renderer;
    private _BoxManager:BoxManager;
    private _CollisionManager:CollisionManager;
    public constructor(Resolution:any)
    {
        this._Renderer = new Renderer({X:1920, Y:1080});
        document.addEventListener("keydown", this.KeyDown.bind(this)); 
        document.addEventListener("keyup", this.KeyUp.bind(this)); 
        let Env = new SceneEnvironment(this._Renderer.Scene);
        this._CollisionManager = new CollisionManager();
        this._BoxManager = new BoxManager(this._Renderer.Scene, this._CollisionManager);
        this._Renderer.OnRender.push(this._BoxManager.Prepare.bind(this._BoxManager));
        this._Renderer.OnRender.push(this._CollisionManager.Run.bind(this._CollisionManager));
        this._Renderer.OnRender.push(this._BoxManager.Update.bind(this._BoxManager));
    }
    public KeyDown(event)
    {
        //console.log(event);
        if(event.keyCode == 32)
        {
            this._BoxManager.ReleaseBox();
        }
        else if(event.keyCode == 37)
        {
            this._BoxManager.SetMove(-0.1);
        }
        else if(event.keyCode == 39)
        {
            this._BoxManager.SetMove(0.1);
        }
    }
    public KeyUp(event)
    {
        if(event.keyCode == 37 || event.keyCode == 39)
        {
            this._BoxManager.SetMove(0);
        }
    }
}