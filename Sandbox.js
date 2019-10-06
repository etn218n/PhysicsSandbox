Engine.OnAwake.push(() => {
    //Exercise3();

    for (let i = 0; i < 100; i++) {
        let squareLength = Random(1, 2);
        let rect = new Rectangle(squareLength, squareLength);
            rect.Translate(Random(-35, 35), Random(-25, 25));
            rect.velocity = new Vector2D(Random(-10, 10), Random(-10, 10));
    }
});