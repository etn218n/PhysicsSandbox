let tri;
let particles;
let rampPlotter;

Engine.Awake = function() {
    Engine.ClearWindow = true;

    tri = new Triangle(new Vector2D(-1, -1), new Vector2D(-1, 1), new Vector2D(1, 0));

    particles = [ new Particle(new Vector2D()), 
                  new Particle(new Vector2D()),
                  new Particle(new Vector2D()) ];

    particles.forEach(p => p.hasGravity = false);

    let launchVector = new Vector2D(1, 1);
    launchVector.SetAngle(Math.PI / 3);
    launchVector.SetLength(20);

    particles[0].hasGravity = true;
    particles[0].velocity = launchVector;
    particles[1].velocity = new Vector2D(5, 0);
    particles[2].velocity = new Vector2D(-8, 8);

    particles[0].angularVelocity = 90;

    document.body.addEventListener("keydown", function(event) {
        if (event.key == 'a') {
        }
    });
};

// Engine.OnUpdate.push(() => {
//     if (Engine.FrameCount == 200)
//         console.log(particles[0].transform.angle);
// });

let maxHeight = 0;

Engine.FixedUpdate = function() {
    // if (!done) {
    //     let Ek = 0.5  * particles[0].mass * particles[0].velocity.SquareLength();
    //     let Ep = 9.81 * particles[0].mass * particles[0].Position().y;

    //     console.log(Ek + Ep);

    //     particles.forEach(p => {
    //         p.Move();
    //         p.Rotate(3);
    //     });

    //     if (particles[0].Position().y < 0)
    //        done = true;
    // }
};

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}