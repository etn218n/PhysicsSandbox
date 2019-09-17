function Exercise3() {
    let ball1 = new Particle();
    ball1.mass = 1;
    
    let launchVelocity1 = new Vector2D(1, 1);
    launchVelocity1.SetAngle(60);
    launchVelocity1.SetLength(20);
    ball1.velocity = launchVelocity1;

    let ball2 = new Particle();
    ball2.mass = 1;
    
    let launchVelocity2 = new Vector2D(1, 1);
    launchVelocity2.SetAngle(20);
    launchVelocity2.SetLength(20);
    ball2.velocity = launchVelocity2;

    let coroutineA = new Coroutine(PrintEnergy, { name: "Ball 1", p: ball1 }),
        coroutineB = new Coroutine(PrintEnergy, { name: "Ball 2", p: ball2 });

    function* PrintEnergy() {
        let arg = yield
        let dt = 0;

        // sample the ball state every 1s since ball lauched at (0, 0) to freefall reaching y = -20
        while (arg.p.Position().y >= -20) {
            dt += Engine.DeltaTime;

            if (dt > 1000) {
                let Ek = 0.5  * arg.p.mass * arg.p.velocity.SquareLength(),
                    Ep = 9.81 * arg.p.mass *arg.p.Position().y,
                    E  = Ek + Ep; 

                console.log(arg.name);
                console.log("Position: (", + arg.p.Position().x + ", " + arg.p.Position().y + ")");
                console.log("Velocity: ", + arg.p.velocity.Length());
                console.log("Kinematic energy: " + Ek);
                console.log("Potential energy: " + Ep);
                console.log("Total energy: " + E);
                console.log("-------------------------------");

                dt = 0;
            }

            yield;
        }

        arg.p.Disable();
    }
}