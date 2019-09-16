Engine.OnAwake.push(() => {
    for (let i = 0; i < 20; i++) {
        let p = new Particle();
        p.hasGravity = false;
        p.velocity = new Vector2D((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
        p.angularVelocity = 360;
    }
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}