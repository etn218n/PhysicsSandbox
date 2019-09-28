let p;
let rect;
let tri;

Engine.OnAwake.push(() => {
    rect = new Rectangle(3, 4);
    rect.Translate(2, 2);
    rect.angularVelocity = 720;
    rect.isInterpolated = true;

    p = new Particle(6, 6);
    p.angularVelocity = 720;
    p.isInterpolated = true;

    tri = new Triangle(0, 1, 1, 0, -1, 0);
    tri.Translate(-2, -2);
    tri.angularVelocity = 720;
    tri.isInterpolated = true;
});