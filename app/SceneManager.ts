export  { SceneManager };

import * as Three from 'Three';

import { Box } from "./Box";
import { BoxManager } from "./BoxManager";
import { CollisionManager } from "./CollisionManager";
import { SceneEnvironment } from "./SceneEnvironment";

class SceneManager
{
    private _Target:HTMLCanvasElement;
    private _Parent:HTMLCanvasElement;
    private _Scene:Three.Scene;
    private _Camera:Three.Camera;
    private _Renderer:Three.WebGLRenderer;
    private _AmbientLight:Three.AmbientLight;

    private _BoxManager:BoxManager;
    private _CollisionManager:CollisionManager;
    public constructor(Resolution:any)
    {
        this._Target = document.getElementById("canvas") as HTMLCanvasElement;
        document.addEventListener("keydown", this.KeyDown.bind(this));
        this._Parent = document.getElementById("canvas-parent") as HTMLCanvasElement;
        this._Scene = new Three.Scene();
        this._Scene.background = new Three.Color(255,255,255);
        this._AmbientLight = new Three.AmbientLight( 0x404040 );
        this._Scene.add( this._AmbientLight );
        this._Camera = new Three.PerspectiveCamera( 45, Resolution.X / Resolution.Y, 1, 10000 );
	    this._Camera.position.z = 1500;
        this._Camera.position.y = 500;
        this._Camera.lookAt (new Three.Vector3 (0.0, 500, 0.0));
        this._Renderer = new Three.WebGLRenderer({canvas:this._Target});
        this._Renderer.setPixelRatio( window.devicePixelRatio );
        this.Resize();
        let Env = new SceneEnvironment(this._Scene);
        this._CollisionManager = new CollisionManager();
        this._BoxManager = new BoxManager(this._Scene, this._CollisionManager);
        this._CollisionManager.Run();
        this._BoxManager.Update();
        window.requestAnimationFrame(this.Draw.bind(this));
    }
    public Resize()
    {
        let Width:number = this._Parent.clientWidth;
        let Height:number = this._Parent.clientHeight;
        this._Renderer.setSize( Width, Height );
    }
    private Draw()
    {
        this._CollisionManager.Run();
        this._BoxManager.Update();
        this._Renderer.render( this._Scene, this._Camera );
        window.requestAnimationFrame(this.Draw.bind(this));
    }
    public KeyDown(event)
    {
        if(event.keyCode == 37)
        {
            this._Scene.translateX(10);
        }
        else if(event.keyCode == 39)
        {
            this._Scene.translateX(-10);
        }
    }
}