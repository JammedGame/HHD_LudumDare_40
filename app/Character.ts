export { Character }

import * as Three from 'Three';
import * as OBJLoader from "three-obj-loader";
OBJLoader(Three);

class Character
{
    private _Loaded:boolean;
    private _File1:any;
    private _File2:any;
    private _File3:any;
    private _Idle:any;
    private _Walk:any;
    private _Mesh:any;
    private _Moonwalk:any;
    private _Mixer:any;
    private static Geometry:any;
    private Scene:Three.Scene;
    public get Mixer():any { return this._Mixer; }
    public constructor(Scene:Three.Scene)
    {
        this._Loaded = false;
        this.Scene = Scene;
        if(Character.Textures == null) Character.LoadTextures();
        if(!Character.Geometry) this.LoadGeometry1();
        else
        {
            Scene.add(Character.Geometry);
        }
    }
    private LoadGeometry1() : void
    {
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/idle.json', this.LoadGeometry2.bind(this));
    }
    private LoadGeometry2(Geometry) : void
    {
        this._File1 = Geometry;
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/walk.json', this.LoadGeometry3.bind(this));
    }
    private LoadGeometry3(Geometry) : void
    {
        this._File2 = Geometry;
        var Loader = new Three.JSONLoader();
        Loader.load( 'build/resources/moonwalk.json', this.LoadFinished.bind(this));
    }
    private LoadFinished(Geometry, materials) : void
    {
        this._File3 = Geometry;

        this._File1.animations.push(this._File2.animations[0]);
        this._File1.animations.push(this._File3.animations[0]);
        this._File1.animations[0].name = "Idle";
        this._File1.animations[1].name = "Walk";
        this._File1.animations[2].name = "Moonwalk";

        let Mesh = new Three.SkinnedMesh( this._File1, new Three.MeshLambertMaterial( { color: 0xffffff, map:Character.Textures[0], skinning: true }));
        Mesh.scale.set(100,100,100);
        Mesh.rotation.y = Math.PI / 2;
        Mesh.position.x = -110;
        Mesh.position.y = 0;

        this._Mesh = Mesh;

        this.Scene.add(Mesh);

        this._Mixer = new Three.AnimationMixer(Mesh);

        let clip = Three.AnimationClip.findByName( Mesh.geometry.animations, 'Idle' );
        this._Idle = this._Mixer.clipAction(clip);
        this._Idle.play();

        clip = Three.AnimationClip.findByName( Mesh.geometry.animations, 'Walk' );
        this._Walk = this._Mixer.clipAction(clip);
        this._Walk.weight = 0;
        this._Walk.play();

        clip = Three.AnimationClip.findByName( Mesh.geometry.animations, 'Moonwalk' );
        this._Moonwalk = this._Mixer.clipAction(clip);
        this._Moonwalk.weight = 0;
        this._Moonwalk.play();

        this._Loaded = true;
    }
    public SetAction(Action:string)
    {
        if(!this._Loaded) return;
        this._Idle.weight = 0;
        this._Walk.weight = 0;
        this._Moonwalk.weight = 0;
        if(Action == "Idle") this._Idle.weight = 1;
        else if(Action == "Walk") this._Walk.weight = 1;
        else if(Action == "Moonwalk") this._Moonwalk.weight = 1;
    }
    public Move(Vector:any) : void
    {
        if(!this._Loaded) return;
        this._Mesh.position.x += Vector.X;
    }
    public Reset() : void
    {
        this._Mesh.position.x = -110;
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