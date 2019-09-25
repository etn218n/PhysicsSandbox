let p;

Engine.OnAwake.push(() => {
    p = new Rectangle([new Vector2D(-1, 1), new Vector2D(1, 1), new Vector2D(1, -1), new Vector2D(-1, -1)]);
    p.Translate(new Vector2D(2, 2));
    p.angularVelocity = 180;
    p.velocity = new Vector2D(2, 0);
});

Engine.OnUpdate.push(() => {
    if (Engine.MouseX.between(p.transformPoints[0].x, p.transformPoints[2].x) 
        && Engine.MouseY.between(p.transformPoints[0].y, p.transformPoints[2].y)) {
            p.color = "Red";
            //console.log(Engine.MouseX, Engine.MouseY);
        }
        else {
            p.color = "Gray";
        }
})

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}