function Exercise3() {
    for (let i = 0; i < 10; i++) {
        //let size = Math.random();
        let rect = new Rectangle(4, 6);
            rect.velocity = new Vector2D(Math.random() * 100, Math.random() * 100);
    }
}