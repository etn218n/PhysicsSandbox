let tri;
let p;

Engine.Awake = function() {
    Engine.ClearWindow = true;

    tri = new Triangle(new Vector2D(-1, -1), new Vector2D(-1, 1), new Vector2D(1, 0));

    p = new Particle(new Vector2D());
    // p.Rotate(90);
    // p.LocalTranslate(new Vector2D(1, 0));
    //p.Translate(new Vector2D(2, 2));
    //p.Rotate(45);
    p.hasGravity = false;
    p.velocity = new Vector2D(-0.025, 0.02);
};

Engine.Update = function() {
    p.Move();
    p.Rotate(10);
    p.Draw();

    tri.Rotate(5);
    //tri.Translate(new Vector2D(0.05, 0));
    tri.Draw();
};