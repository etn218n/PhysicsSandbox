let cirA, cirB;

Engine.OnAwake.push(() => {
    cirA = new Circle(3, 3, 0.4);
    cirA.Translate(new Vector2D(-2, 3));
    cirA.hasGravity = false;
    cirA.velocity = new Vector2D(1, 0);

    cirB = new Circle(0, 0, 1);
    cirB.hasGravity = false;
    cirB.velocity = new Vector2D(1, 1);
});

Engine.OnFixedUpdate.push(() => {
    let sumRadiusSquare = Math.pow(cirA.radius + cirB.radius, 2);
        centerDistanceSquare = Math.pow(cirA.PositionX() - cirB.PositionX(), 2) + Math.pow(cirA.PositionY() - cirB.PositionY(), 2)

    if (centerDistanceSquare <= sumRadiusSquare) {
        cirA.Disable();
        cirB.Disable();
    }
});