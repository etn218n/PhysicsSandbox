let tri;
let p;
let rampPlotter;

Engine.OnAwake.push(() => {
    Engine.ClearWindow = true;

    let launchVelocity = new Vector2D(1, 1);
    launchVelocity.SetAngle(45);
    launchVelocity.SetLength(10);

    p = new Particle();
    p.velocity = launchVelocity;

    let co = new Coroutine(function*() {
        let dt = 0;

        while (p.Position().y >= 0) {
            dt += Engine.DeltaTime;
            yield;
        }

        p.Disable();
        console.log(p.Position().y);
    });
});

Engine.OnRender.push(() => {
});

Engine.OnUpdate.push(() => {
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}