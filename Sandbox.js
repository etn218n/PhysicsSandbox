Engine.OnAwake.push(() => {
    //Exercise3();

    for (let i = 0; i < 40; i++) {
        let p = new Particle(Random(-20, 20), Random(-20, 20));
            p.velocity = new Vector2D(Random(-50, 50), Random(-50, 50));
            p.velocity = new Vector2D(20, 20);
    }

    //let rect = new Rectangle();

    // let p1 = new Particle();
    //     p1.velocity = new Vector2D(5, 0);

    // let p2 = new Particle(10, 0);
    //     p2.velocity = new Vector2D(-5, 0);

    // let p3 = new Particle(0, 5);
    //     p3.velocity = new Vector2D(5, 0);

    // let p4 = new Particle(30, 5);
    //     p4.velocity = new Vector2D(-5, 0);

    // console.log(Particle.prototype.colliderList.length);
});

function Random(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);

    return Math.random() * (max - min) + min;
}