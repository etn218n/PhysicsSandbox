Engine.OnAwake.push(() => {
    Engine.SetPixelsPerUnit(15);

    let x = -40,
        y = -20;

    for (let i = 0; i < 25; i++)
    {
        if (x > 40)
        {
            y += 5;
            x = -40;
        }     

        let cir = new Circle(Random(1, 2), x, y);
            cir.velocity = new Vector2D(Random(-40, 40), Random(-40, 40));
            cir.mass = cir.radius;
            //cir.isExtrapolated = false;

        x += 5;
    }
});