function Exercise2() {
    let trajectoryPlotter;
    let p;
    let launchVelocity;

    // create 5 trajectories
    p = [ new Particle(), new Particle(), new Particle(), new Particle(), new Particle() ];

    launchVelocity = [ new Vector2D(1, 1), new Vector2D(1, 1), new Vector2D(1, 1), new Vector2D(1, 1), new Vector2D(1, 1) ];

    trajectoryPlotter = [ new Plotter(), new Plotter(), new Plotter(), new Plotter(), new Plotter() ];

    launchVelocity[0].SetAngle(45);
    launchVelocity[0].SetLength(20);
    p[0].velocity = launchVelocity[0];
    trajectoryPlotter[0].color = "blue";

    launchVelocity[1].SetAngle(60);
    launchVelocity[1].SetLength(20);
    p[1].velocity = launchVelocity[1];
    trajectoryPlotter[1].color = "green";

    launchVelocity[2].SetAngle(30);
    launchVelocity[2].SetLength(20);
    p[2].velocity = launchVelocity[2];
    trajectoryPlotter[2].color = "red";

    launchVelocity[3].SetAngle(15);
    launchVelocity[3].SetLength(20);
    p[3].velocity = launchVelocity[3];
    trajectoryPlotter[3].color = "purple";

    launchVelocity[4].SetAngle(75);
    launchVelocity[4].SetLength(20);
    p[4].velocity = launchVelocity[4];
    trajectoryPlotter[4].color = "cyan";

    let coroutineA = new Coroutine(SampleTrajectory, { name: "45 degree", p: p[0], plotter: trajectoryPlotter[0] }),
        coroutineB = new Coroutine(SampleTrajectory, { name: "60 degree", p: p[1], plotter: trajectoryPlotter[1] }),
        coroutineC = new Coroutine(SampleTrajectory, { name: "30 degree", p: p[2], plotter: trajectoryPlotter[2] }),
        coroutineD = new Coroutine(SampleTrajectory, { name: "15 degree", p: p[3], plotter: trajectoryPlotter[3] }),
        coroutineE = new Coroutine(SampleTrajectory, { name: "75 degree", p: p[4], plotter: trajectoryPlotter[4] });

    Engine.OnRender.push(() => {
        for (let i = 0; i < trajectoryPlotter.length; i++) {
            trajectoryPlotter[i].Plot();
        }
    });

    function* SampleTrajectory() {
        let arg = yield;

        let dt = 0;
        let maxHeight = 0;

        arg.plotter.AddPoint(arg.p.Position());

        while (arg.p.Position().y >= -0.4) {
            dt += Engine.DeltaTime;

            if (arg.p.Position().y > maxHeight)
                maxHeight = arg.p.Position().y;

            if (dt > 100) {
                arg.plotter.AddPoint(arg.p.Position());
                dt = 0;
            }

            yield;
        }

        console.log("(" + arg.name + ")" + " Max Height:   " + maxHeight);
        console.log("(" + arg.name + ")" + " Max Distance: " + arg.p.Position().x);

        arg.p.Disable();
    }
}