//let p;

Engine.OnAwake.push(() => {
    // for (let i = 0; i < 1; i++) {
    //     let p = new Particle();
    //     p.hasGravity = false;
    //     p.velocity = new Vector2D((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
    //     p.angularVelocity = 360;
    //     p.Rotate(-45);
    //     p.angularVelocity = -10;
    // }

    // let p = new Particle();
    //     p.hasGravity = false;
    //     p.angularVelocity = -10;

    Exercise5();
});

Engine.OnUpdate.push(() => {
    //console.log(p.transform.angle); 
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}