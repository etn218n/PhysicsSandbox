function Exercise3() {
    let ball = new Particle();
    ball.Translate(new Vector2D(0, 0));
    ball.mass = 1;
    
    launchVelocity = new Vector2D(1, 1);
    launchVelocity.SetAngle(60);
    launchVelocity.SetLength(50);
    ball.velocity = launchVelocity;

    let coroutine = new Coroutine(PrintEnergy, { p: ball });

    function CalculateEnergy(ball) {
        let Ek = 0.5  * ball.mass * ball.velocity.SquareLength(),
            Ep = 9.81 * ball.mass * ball.Position().y;

        return Ek + Ep;
    }

    function* PrintEnergy() {
        let arg = yield;

        let dt = 0;

        while (arg.p.Position().y >= 0) {
            dt += Engine.DeltaTime;

            if (dt > 1000) {
                console.log("Total energy: " + CalculateEnergy(arg.p));
                dt = 0;
            }

            yield;
        }

        arg.p.Disable();
    }
}