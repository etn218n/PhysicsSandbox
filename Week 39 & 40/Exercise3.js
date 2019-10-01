function Exercise3() {
    for (let i = 0; i < 25; i++) {
        let squareLength = Random(1, 2);
        let rect = new Rectangle(squareLength, squareLength);
            rect.Translate(Random(-25, 25), Random(-25, 25));
            rect.velocity = new Vector2D(2, 0);
    }

    for (let i = 0; i < 25; i++) {
        let squareLength = Random(1, 2);
        let rect = new Rectangle(squareLength, squareLength);
            rect.Translate(Random(-25, 25), Random(-25, 25));
            rect.velocity = new Vector2D(-2, 0);
    }

    for (let i = 0; i < 25; i++) {
        let squareLength = Random(1, 2);
        let rect = new Rectangle(squareLength, squareLength);
            rect.Translate(Random(-25, 25), Random(-25, 25));
            rect.velocity = new Vector2D(0, 2);
    }

    for (let i = 0; i < 25; i++) {
        let squareLength = Random(1, 2);
        let rect = new Rectangle(squareLength, squareLength);
            rect.Translate(Random(-25, 25), Random(-25, 25));
            rect.velocity = new Vector2D(0, -2);
    }
}