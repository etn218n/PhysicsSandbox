Engine.OnAwake.push(() => {
    //Exercise3();

    for (let i = 0; i < 20; i++) {
        let p = new Rectangle(2, 2, Random(-30, 30), Random(-30, 30));
            p.velocity = new Vector2D(Random(-6, 6), Random(-6, 6));
            //p.velocity = new Vector2D(20, 20);
    }

    // let rect1 = new Rectangle(5, 5, 0, 0);
    //     rect1.velocity = new Vector2D(1, 0);
        
    // let rect2 = new Rectangle(5, 5, 15, 0);
    //     rect2.velocity = new Vector2D(-1, 0);
});