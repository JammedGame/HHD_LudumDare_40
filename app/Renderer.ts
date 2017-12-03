export { Renderer }

import * as Three from 'Three';

class Renderer
{
    private _Scene:Three.Scene;
    private _Camera:Three.Camera;
    private _Target:HTMLCanvasElement;
    private _Parent:HTMLCanvasElement;
    private _Renderer:Three.WebGLRenderer;
    private _AmbientLight:Three.AmbientLight;
    private _OnRender:Function[];
    public get Scene():Three.Scene { return this._Scene; }
    public get Camera():Three.Camera { return this._Camera; }
    public get OnRender():Function[] { return this._OnRender; }
    public set OnRender(value:Function[]) { this._OnRender = value; }
    public constructor(Resolution:any)
    {
        this.Init(Resolution);
    }
    public Init(Resolution:any)
    {
        this._Scene = new Three.Scene();
        this._Scene.background = new Three.Color(255,255,255);
        this._AmbientLight = new Three.AmbientLight( 0x404040 );
        this._Scene.add( this._AmbientLight );
        this._Target = document.getElementById("canvas") as HTMLCanvasElement;
        this._Parent = document.getElementById("canvas-parent") as HTMLCanvasElement;
        this._Camera = new Three.PerspectiveCamera( 45, Resolution.X / Resolution.Y, 1, 10000 );
	    this._Camera.position.z = 1500;
        this._Camera.position.y = 500;
        this._Camera.lookAt (new Three.Vector3 (0.0, 500, 0.0));
        this._Renderer = new Three.WebGLRenderer({canvas:this._Target});
        this._Renderer.setPixelRatio( window.devicePixelRatio );
        this._OnRender = [];
        this.Resize();
        window.requestAnimationFrame(this.Draw.bind(this));
    }
    public Reset() : void
    {
        this._Scene.position.set(0,0,0);
    }
    public Resize() : void
    {
        let Width:number = this._Parent.clientWidth;
        let Height:number = this._Parent.clientHeight;
        this._Renderer.setSize( Width, Height );
    }
    private Draw()
    {
        for(let i in this._OnRender)
        {
            this._OnRender[i]();
        }
        this._Renderer.render( this._Scene, this._Camera );
        window.requestAnimationFrame(this.Draw.bind(this));
    }
}