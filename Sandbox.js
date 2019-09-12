let tri;
let particles;

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
    launchVector.Print();

    particles[0].velocity = launchVector;
    particles[1].velocity = new Vector2D(1, 0);
    particles[2].velocity = new Vector2D(-1, 1);
    particles[0].hasGravity = true;
};

Engine.Update = function() {
    particles.forEach(p => {
        p.Draw();
    })
};

let maxHeight = 0;

Engine.FixedUpdate = function() {

    Timer(3000);

    if (particles[0].Position().y > maxHeight)
        maxHeight = particles[0].Position().y;

    particles.forEach(p => {
        p.Move();
        p.Rotate(3);
    })
};

let done = false;

async function Timer(ms) {
    await Sleep(ms);

    if (done == false) {
        particles[1].Position().Print();
        console.log("Max Height: " + maxHeight);
        done = true;
    }
}

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}