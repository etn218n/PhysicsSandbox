let p;
let rect;
let tri;

Engine.OnAwake.push(() => {
    rect = new Rectangle(3, 4);
    rect.Translate(2, 2);
    rect.angularVelocity = 360;
    rect.isExtrapolated = true;

    p = new Particle(6, 6);
    p.angularVelocity = 360;
    p.isExtrapolated = true;

    tri = new Triangle(0, 1, 1, 0, -1, 0);
    tri.Translate(-2, -2);
    tri.angularVelocity = 360;
    tri.isExtrapolated = true;
});

Engine.OnUpdate.push(() => {
    rect.SetPosition(Engine.MouseX, Engine.MouseY);
});