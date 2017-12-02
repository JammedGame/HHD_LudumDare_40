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
        let Env = new SceneEnvironment(this._Renderer.Scene);
        this._CollisionManager = new CollisionManager();
        this._BoxManager = new BoxManager(this._Renderer.Scene, this._CollisionManager);
        this._Renderer.OnRender.push(this._CollisionManager.Run.bind(this._CollisionManager));
        this._Renderer.OnRender.push(this._BoxManager.Update.bind(this._BoxManager));
    }
    public KeyDown(event)
    {
        if(event.keyCode == 37)
        {
            this._Renderer.Scene.translateX(10);
        }
        else if(event.keyCode == 39)
        {
            this._Renderer.Scene.translateX(-10);
        }
    }
}