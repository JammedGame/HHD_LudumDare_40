export { Character }

import * as Three from 'Three';
import * as OBJLoader from "three-obj-loader";
OBJLoader(Three);

class Character
{
    private static Geometry:any;
    private Scene:Three.Scene;
    public constructor(Scene:Three.Scene)
    {
        this.Scene = Scene;
        if(Character.Textures == null) Character.LoadTextures();
        if(!Character.Geometry) this.LoadGeometry();
        else
        {
            Scene.add(Character.Geometry);
        }
    }
    private LoadGeometry() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/Stacker1.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(geometry, materials) : void
    {
        geometry.uvsNeedUpdate = true;
        let Mesh = new Three.Mesh( geometry, new Three.MeshLambertMaterial( { color: 0xffffff, map:Character.Textures[0] }));
        Mesh.scale.set(80,80,80);
        Mesh.rotation.y = 120;
        Mesh.position.x = -200;
        Mesh.position.y = 30;
        
        console.log(Mesh);
        this.Scene.add(Mesh);
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/char2.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            NewTexture.wrapT = NewTexture.wrapS = Three.RepeatWrapping;
            Textures.push(NewTexture);
        }
        Character.Textures = Textures;
    }
}