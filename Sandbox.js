let cirA, cirB, cirC, cirD, cirE;

Engine.OnAwake.push(() => {
    Engine.SetPixelsPerUnit(15);

    for (let i = 0; i < 17; i++)
    {
        let cir = new Circle(Random(1, 3), Random(-30, 30), Random(-30, 30));
            cir.velocity = new Vector2D(Random(-30, 30), Random(-30, 30));
            cir.mass = cir.radius;
    }

    // cirA = new Circle(2, 0, 10);
    // cirA.velocity = new Vector2D(13, -20);
    // cirA.mass = 4;

    // cirB = new Circle(1, 1, 0);
    // cirB.velocity = new Vector2D(10, 23);
    // cirB.mass = 2;

    // cirC = new Circle(1, 1, -10);
    // cirC.velocity = new Vector2D(10, 23);
    // cirC.mass = 2;

    // cirD = new Circle(3, -10, -10);
    // cirD.velocity = new Vector2D(-10, 23);
    // cirD.mass = 3;

    // cirE = new Circle(3, -20, -10);
    // cirE.velocity = new Vector2D(-10, 23);
    // cirE.mass = 3;
});

Engine.OnFixedUpdate.push(() => {
    // if (CircleCollide(cirA, cirB))
    //     ResolveCollision(1, cirA, cirB);
});

function CircleCollide(a, b) {
    let sumRadiusSquare = Math.pow(a.radius + b.radius, 2),
        centerDistanceSquare = Math.pow(a.PositionX() - b.PositionX(), 2) + Math.pow(a.PositionY() - b.PositionY(), 2);
    
    if (centerDistanceSquare <= sumRadiusSquare)
        return true;
}

function ResolveCollision(Cr, a, b) {
    if (Cr === 1) {
        IdealElasticCollision(a, b);
    }
    else if (Cr === 0) {
        PerfectlyInelasticCollision(a, b);
    }
    else if (Cr < 1) {
        InelasticCollision(a, b);
    }
}

function PerfectlyInelasticCollision(a, b) {
    let finalVelocity = new Vector2D();

    finalVelocity.x = (a.mass * a.velocity.x + b.mass * b.velocity.x) / (a.mass + b.mass);
    finalVelocity.y = (a.mass * a.velocity.y + b.mass * b.velocity.y) / (a.mass + b.mass);

    a.velocity = finalVelocity;
    b.velocity = finalVelocity;
}

function InelasticCollision(a, b) {
}

function IdealElasticCollision(a, b) {
    let vC = new Vector2D(b.PositionX() - a.PositionX(), b.PositionY() - a.PositionY());
        vC.NormalizeSelf();

    // angle between vector from center of A to center of B and the x-axis
    let angle = Math.atan2(vC.y, vC.x) * 180 / Math.PI;
        console.log(angle);

    let rotMatrix = new Matrix2D();
        rotMatrix.Rotate(-angle);
    let inverserotMatrix = new Matrix2D();
        inverserotMatrix.Rotate(angle);

    let vA = rotMatrix.MultiplyVector(a.velocity);
        vB = rotMatrix.MultiplyVector(b.velocity);

    let vAafter = new Vector2D();
        vAafter.x = ((a.mass - b.mass) / (a.mass + b.mass) * vA.x) + ((2 * b.mass) / (a.mass + b.mass) * vB.x);
        vAafter.y = vA.y;
    let vBafter = new Vector2D();
        vBafter.x = ((b.mass - a.mass) / (a.mass + b.mass) * vB.x) + ((2 * a.mass) / (a.mass + b.mass) * vA.x);
        vBafter.y = vB.y;

    let vAfinal = inverserotMatrix.MultiplyVector(vAafter),
        vBfinal = inverserotMatrix.MultiplyVector(vBafter);

    a.velocity = vAfinal;
    b.velocity = vBfinal;
}