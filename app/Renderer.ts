export { Renderer }

import * as Three from 'Three';

class Renderer
{
    private _Scene:Three.Scene;
    private _Target:HTMLCanvasElement;
    private _Parent:HTMLCanvasElement;
    private _AmbientLight:Three.AmbientLight;
    public constructor(Scene:Three.Scene)
    {
        this._Scene = Scene;
        this._Target = document.getElementById("canvas") as HTMLCanvasElement;
        this._Parent = document.getElementById("canvas-parent") as HTMLCanvasElement;
    }
    public Init()
    {

    }
}