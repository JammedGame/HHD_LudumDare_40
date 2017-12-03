export  { Environment };

import * as Three from 'Three';

class Environment
{
    private _Scene:Three.Scene;
    public constructor(Scene:Three.Scene)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init() : void
    {
        if(Environment.Textures == null) Environment.LoadTextures();
        let Floor = new Three.Mesh( new Three.CubeGeometry(7000,10,1000), new Three.MeshPhongMaterial( { color: 0x72587F, map:Environment.Textures[1] } ) );
        Floor.position.x = 2000;
        this._Scene.add(Floor);
        let Wall = new Three.Mesh( new Three.CubeGeometry(7000,1800,10), new Three.MeshPhongMaterial( { color: 0xFFFFFF, map:Environment.Textures[0] } ) );
        Wall.position.x = 2000
        Wall.position.y = 600;
        Wall.position.z = -200;
        this._Scene.add(Wall);
        this.AddLight(0);
        this.AddLight(1500);
        this.AddLight(3000);
        this.AddLight(4500);
    }
    private AddLight(X:number)
    {
        let Light = new Three.SpotLight( 0xffffff, 2, 4000, 0.3, 0.2 );
        this._Scene.add(Light);
        let targetObject = new Three.Object3D();
        targetObject.position.x = X;
        targetObject.position.y = 0;
        targetObject.position.z = -200;
        this._Scene.add(targetObject);
        Light.target = targetObject;
        Light.position.x = X;
        Light.position.z = 200;
        Light.position.y = 2000;
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/wall.png", "build/resources/floor.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            NewTexture .wrapS = NewTexture .wrapT = Three.RepeatWrapping;
            NewTexture.offset.set( 0, 0 );
            if(j > 0) NewTexture.repeat.set( 5, 1 );
            else NewTexture.repeat.set( 3, 1 );
            Textures.push(NewTexture);
        }
        Environment.Textures = Textures;
    }
}