let cirA, cirB, cirC, cirD, cirE;

Engine.OnAwake.push(() => {
    Engine.SetPixelsPerUnit(15);

    for (let i = 0; i < 11; i++)
    {
        let cir = new Circle(Random(1, 3), Random(-30, 30), Random(-30, 30));
            cir.velocity = new Vector2D(Random(-30, 30), Random(-30, 30));
            cir.mass = cir.radius;
    }
});