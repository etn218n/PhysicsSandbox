let tri;
let p;

Engine.Awake = function() {
    Engine.ClearWindow = false;

    tri = new Triangle(new Vector2D(0, 0), new Vector2D(2, 0), new Vector2D(0, 2));

    p = new Particle(new Vector2D());
    // p.Rotate(90);
    // p.LocalTranslate(new Vector2D(1, 0));
    //p.Translate(new Vector2D(2, 2));
    //p.Rotate(45);
    p.velocity = new Vector2D(1, 2.5);
};

Engine.Update = function() {
    // p.Move();
    // p.Rotate(10);
    // p.Draw();
    Ramp.Plot();
};