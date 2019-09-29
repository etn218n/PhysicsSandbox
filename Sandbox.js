let p;
let rect;
let tri;

Engine.OnAwake.push(() => {
    rect = new Rectangle(3, 4);
    rect.Translate(2, 2);
    rect.angularVelocity = 360;
    rect.hasGravity = true;
    rect.isExtrapolated = true;

    p = new Particle(6, 6);
    p.angularVelocity = 360;
    p.velocity = new Vector2D(10, 10);
    //p.hasGravity = true;
    p.isExtrapolated = true;

    tri = new Triangle(0, 1, 1, 0, -1, 0);
    tri.Translate(-2, -2);
    tri.angularVelocity = 360;
    tri.isExtrapolated = true;

    document.body.addEventListener("keypress", event => {
        if (event.key == 'w')
            Engine.SetPixelsPerUnit(10);
        else if (event.key == 's')
            Engine.SetPixelsPerUnit(15);
    });
});

Engine.OnUpdate.push(() => {
    //rect.SetPosition(Engine.MouseX, Engine.MouseY);
});