export  { Box };

import * as Three from 'Three';

class Box
{
    private _Cube:Three.Object;
    private _Scene:Three.Scene;
    public get Position() { return this._Cube.position; }
    public set Position(value) { this._Cube.position = value; }
    public constructor(Scene:Three.Scene, Position?:any)
    {
        this._Scene = Scene;
        this._Cube = new Three.Mesh( new Three.CubeGeometry(100,100,100), new Three.MeshPhongMaterial( { color: 0xe22636 } ) );
        if(Position)
        {
            this._Cube.position.x = Position.X
            this._Cube.position.y = Position.Y
            this._Cube.position.z = Position.Z
        }
        this._Scene.add(this._Cube);
        console.log(this._Scene);
    }
}