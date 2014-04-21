---
title: "Tutorial - Embed Lua in Java w/LibGDX and Box2D"
description: "Lua is the most popular choice for embedded language. It has been embedded in gaming and non-gaming applications alike. Some applications include World of Warcraft, Nmap, Snort and Wireshark. In this tutorial, we'll look into ways to embed Lua in Java in a totally fun and cool way. We'll create a Box2D project using LibGDX and use Lua scripts to control our physics object."
date: "2013-01-15"
categories:
    - "Java"
    - "Lua"
    - "Box2D"
---


## Video Demonstration ##


Before moving forward, Let's have a look at what we're creating. It's a LibGDX Box2D project that has one physics object. Using an external Lua script we control the physics object. More specifically, we use the cursor keys to control the camera and the "A" key to set the speed of the revolute joint.

{{% youtube deWXnyczYBY %}}




## Downloading the Libraries ##


LibGDX - [https://code.google.com/p/libgdx/downloads/list][1] LuaJ - [http://sourceforge.net/projects/luaj/files/latest/download][2]


## Setting up the Project ##


Create a new project in Eclipse called **Embed-Lua-Java-Box2D**. Alternatively, you can just fork the source from github. Add the following libraries to the project:



 - gdx-backend-lwjgl-natives.jar
 - gdx-backend-lwjgl.jar
 - gdx-natives.jar
 - gdx.jar
 - luaj-jse-3.0-alpha2.jar


## Structure ##


We're creating a LibGDX project. I'm being cautious as to not refer this a game, as it is not. In LibGDX project, we'll create a Box2D world and put some physics objects. We'll use an external Lua script that'll control some aspects of the physics object.


## Setting up Box2D  ##


Have a look at MyGdxGame.java. I'll highlight some important portion of the code.

```
@Override
public void create() {
    Vector2 gravity = new Vector2(0, -9);
    world = new World(gravity, true);
    debugDraw = new Box2DDebugRenderer();

    float w = Gdx.graphics.getWidth();
    float h = Gdx.graphics.getHeight();

    cam = new OrthographicCamera(w / 10, h / 10);
    cam.position.set(cam.viewportWidth / 2, cam.viewportHeight / 2, 0);

    scriptManager = new LuaScriptManager(
            world,
            cam,
            "scripts/tumbler.lua");

    createBodies();

    scriptManager.executeInit();
}

private void createBodies() {
  {
      BodyDef bodyDef = new BodyDef();
      ground = world.createBody(bodyDef);
  }

  {
      BodyDef bodyDef = new BodyDef();
      bodyDef.type = BodyType.DynamicBody;
      bodyDef.allowSleep = true;
      bodyDef.position.set(0.0f, 0.0f);
      body = world.createBody(bodyDef);

      PolygonShape shape = new PolygonShape();

      shape.setAsBox(0.5f, 10.0f, new Vector2(5.0f, 0.0f), 0.0f);
      body.createFixture(shape, 5.0f);

      shape.setAsBox(0.5f, 10.0f, new Vector2(-5.0f, 0.0f), 0.0f);
      body.createFixture(shape, 5.0f);

      shape.setAsBox(10.0f, 0.5f, new Vector2(0.0f, 5.0f), 0.0f);
      body.createFixture(shape, 5.0f);

      shape.setAsBox(10.0f, 0.5f, new Vector2(0.0f, -5.0f), 0.0f);
      body.createFixture(shape, 5.0f);

      RevoluteJointDef rjd = new RevoluteJointDef();
      rjd.bodyA = ground;
      rjd.bodyB = body;
      rjd.localAnchorA.set(0.0f, 10.0f);
      rjd.localAnchorB.set(0.0f, 0.0f);
      rjd.referenceAngle = 0.0f;
      rjd.motorSpeed = 0.05f * MathUtils.PI;
      rjd.maxMotorTorque = 1e8f;
      rjd.enableMotor = true;
      joint = world.createJoint(rjd);

  }
}

@Override
public void render() {
    Gdx.gl.glClear(GL10.GL_COLOR_BUFFER_BIT);

    cam.update();
    cam.apply(Gdx.graphics.getGL10());

    debugDraw.render(world, cam.combined);
    world.step(1 / 60f, 100, 100);

    if (Gdx.input.isKeyPressed(Keys.RIGHT)) {
        scriptManager.executeKeyPressed("Right", body, joint);
    } else if (Gdx.input.isKeyPressed(Keys.LEFT)) {
        scriptManager.executeKeyPressed("Left", body, joint);
    } else if (Gdx.input.isKeyPressed(Keys.A)) {
        scriptManager.executeKeyPressed("A", body, joint);
    }
}
```

Now, just to grab your attention on the subject matter, the following image shows the rendering of the above code.![][3]


## Setting up Lua script manager ##


Firstly, we define the notion of our script. For the purposes of this tutorial, I'll define our script as block of code that has two functions in Lua:

 - *`init(world, cam)`* - Takes two parameters: Box2D World and the Orthographic Camera. We'll pass these parameters from Java to Lua.
 - *`keyPressed(world, cam, body, joint, key)`* - Parameters: Box2D World, Orthographic Camera, Box2D Body, Box2D Joint, Key Pressed.


It is important to note that the signature of these functions are entirely up to you to define depending on your requirements. Later, we'll create an external script file with these functions. Now Let's move on to conceptualizing this notion of script in our project by creating an java interface called ***IScript***.

```
/**
 * The Interface IScript.
 */
public interface IScript {

	  /**
  	 * Can execute.
  	 *
  	 * @return true, if successful
  	 */
  	boolean canExecute();

	  /**
  	 * Execute init. This method is called only once per each script.
  	 */
  	void executeInit();

	  /**
  	 * Execute key pressed.
  	 *
  	 * @param key the key
  	 * @param body the body
  	 * @param joint the joint
  	 */
  	void executeKeyPressed(String key, Body body, Joint joint);
}
```

We'll implement this interface in LuaScriptManager - the handler that is responsible for calling lua functions in our project. The implementation of LuaScriptManager looks like this:

``` 
public class LuaScriptManager implements IScript {

    /** The globals. */
    private Globals globals = JsePlatform.standardGlobals();

    /** The chunk. */
    private LuaValue chunk;

    /** The script file exists. */
    private boolean scriptFileExists;

    /** The world. */
    private World world;

    /** The cam. */
    private Camera cam;

    /**
     * Instantiates a new lua script manager.
     *
     * @param world the world
     * @param cam the cam
     * @param scriptFileName the script file name
     */
    public LuaScriptManager(World world, Camera cam, String scriptFileName) {
        this.world = world;
        this.cam = cam;

        if (!Gdx.files.internal(scriptFileName).exists()) {
            scriptFileExists = false;
            return;
        } else {
            scriptFileExists = true;
        }

        chunk = globals.loadFile(scriptFileName);

        // very important step. subsequent calls to script method do not work if the
        // chunk
        // is not called here
        chunk.call();

    }

    /* (non-Javadoc)
     * @see com.laex.IScript#canExecute()
     */
    @Override
    public boolean canExecute() {
        return scriptFileExists;
    }

    /* (non-Javadoc)
     * @see com.laex.IScript#executeInit()
     */
    @Override
    public void executeInit() {
        if (!canExecute()) {
            return;
        }

        //there must be a corresponding init method in the external lua script file
        globals.get("init").invoke(
                new LuaValue[] { CoerceJavaToLua.coerce(world),
                        CoerceJavaToLua.coerce(cam) });
    }

    /* (non-Javadoc)
     * @see com.laex.IScript#executeKeyPressed(java.lang.String, com.badlogic.gdx.physics.box2d.Body, com.badlogic.gdx.physics.box2d.Joint)
     */
    @Override
    public void executeKeyPressed(String key, Body body, Joint joint) {
        if (!canExecute()) {
            return;
        }

        //there must be a corresponding keyPressed method in the external lua file
        globals.get("keyPressed").invoke(
                new LuaValue[] { CoerceJavaToLua.coerce(world),
                        CoerceJavaToLua.coerce(cam),
                        CoerceJavaToLua.coerce(body),
                        CoerceJavaToLua.coerce(joint), LuaValue.valueOf(key) });
    }
}
```
There are some key things to note while calling Lua functions from Java:


 1. To properly pass the parameters from Java to Lua, there's an excellent method: `CoerceJavaToLua.coerce(object)`
 2. `globals.loadFile(scriptFileName)` loads the Lua script and stores it in a variable, say *`chunk`*
 3. Once loaded, *`chunk.call()`* must be executed at least once
 4. Functions in Lua script can be obtained via. the `globals.get(functionName)` method
 5. Once obtained, functions can be called by using the *`invoke()`* method


## Lua Script ##


The contents of our Lua Script file looks like this:

```
function init(world, cam)//not doing anything here for now. Possible usage could be setting some configuration for world and camera
end

function keyPressed(world, cam, body, joint, key)    //translate the camera to right
    if key == "Right" then
        cam:translate(0.5, 0, 0)
    end
    //translate the camera to left
    if key == "Left" then
        cam:translate(-0.5, 0, 0)
    end
    //set motor speed to 1.
    if key == "A" then
        joint:setMotorSpeed(1)
    end
end
```

Remember, we're calling the init() and keyPressed() method from LuaScriptManager class.

## Conclusion ##

If you have any thoughts, you can put them on the comments below. Dont forget to check out the source at: [https://github.com/hemantasapkota/Embed-Lua-Java-Box2D][4]


  [1]: https://code.google.com/p/libgdx/downloads/list
  [2]: http://sourceforge.net/projects/luaj/files/latest/download
  [3]: images/29-img-001.png
  [4]: https://github.com/hemantasapkota/Embed-Lua-Java-Box2D
