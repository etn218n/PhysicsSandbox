Engine.OnAwake.push(() => {
    //Exercise3();

    // for (let i = 0; i < 20; i++) {
    //     let p = new Rectangle(2, 2, Random(-30, 30), Random(-30, 30));
    //         p.velocity = new Vector2D(Random(-6, 6), Random(-6, 6));
    // }

    let rects = [];

    for (let i = 0; i < 20; i++) {
        let rect = new Rectangle(2, 2, 40, -28 + i * 3);
            rect.velocity = new Vector2D(Random(-30, -20), 0);
        rects.push(rect);
    }
});