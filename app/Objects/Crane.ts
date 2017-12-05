export { Crane }

import { Box } from "./Box";

import * as Three from 'Three';

class Crane
{
    private static Mesh:any;
    private static Geometry:any;
    private _Direction:number;
    private _Speed:number;
    private _Move:number;
    private _Limit:number;
    private _Box:Box;
    private _Mesh:any;
    private _Scene:Three.Scene;
    public get Box():Box { return this._Box; }
    public set Box(value) { this.SetBox(value); }
    public get Speed():number { return this._Speed; }
    public set Speed(value) { this._Speed = value; }
    public get Limit():number { return this._Limit; }
    public set Limit(value) { this._Limit = value; }
    public constructor(Scene:Three.Scene)
    {
        this._Direction = 1;
        this._Speed = 1;
        this._Limit = 100;
        this._Scene = Scene;
        if(Crane.Textures == null) Crane.LoadTextures();
        if(!Crane.Mesh)
        {
            this.LoadGeometry();
        }
        else this._Mesh = Crane.Mesh;
    }
    private LoadGeometry() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/crane.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(geometry, materials) : void
    {
        geometry.uvsNeedUpdate = true;
        this._Mesh = new Three.Mesh( geometry, new Three.MeshLambertMaterial( { color: 0xffffff, map:Crane.Textures[0] }));
        Crane.Mesh = this._Mesh;
        this._Mesh.rotation.y = -Math.PI / 2;
        this._Mesh.scale.set(90,50,50);
        this._Mesh.position.set(0,740,0);
        this._Scene.add(this._Mesh);
    }
    private SetBox(Box:Box) : void
    {
        if(Box != null)
        {
            Box.Move({x:0, y:-1100});
            if(this._Mesh) this._Mesh.position.x = 0;
        }
        this._Box = Box;
        this.Reset();
    }
    private Reset() : void
    {
        this._Move = 0;
    }
    public Update() : void
    {
        if(!this._Mesh) return;
        if(this._Box == null) return;
        this._Move += this._Direction * this._Speed;
        if(Math.abs(this._Move) > this._Limit) this._Direction *= -1;
        this._Box.Move({x:this._Direction * this._Speed, y:0});
        this._Mesh.position.x += this._Direction * this._Speed;
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/Crane.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            NewTexture.wrapT = NewTexture.wrapS = Three.RepeatWrapping;
            Textures.push(NewTexture);
        }
        Crane.Textures = Textures;
    }
}