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
        //if(Character.Textures == null) Character.LoadTextures();
        //if(!Character.Geometry) this.LoadGeometry();
        //else
        {
            //Scene.add(Character.Geometry);
        }
    }
    private LoadGeometry() : void
    {
        var Loader = new Three.OBJLoader();
        //Loader.options.convertUpAxis = true;
        Loader.load( 'build/resources/Stacker.obj', this.LoadFinished.bind(this));
    }
    private LoadFinished(geometry) : void
    {
        console.log(geometry);
        let Mesh = new Three.Mesh( geometry, new Three.MeshLambertMaterial( { color: 0xffffff, mapDiffuse:Character.Textures[0] }));
        Mesh.rotation.y = -90;
        Mesh.position.x = -200;
        this.Scene.add(Mesh);
    }
    public static Textures:any[];
    public static LoadTextures()
    {
        let TextureUrls = ["build/resources/char.png"];
        let TextureLoader = new Three.TextureLoader();
        let Textures : Three.Texture[] = [];
        for(let j = 0; j < TextureUrls.length; j++)
        {
            let NewTexture = TextureLoader.load(TextureUrls[j]);
            Textures.push(NewTexture);
        }
        Character.Textures = Textures;
    }
}