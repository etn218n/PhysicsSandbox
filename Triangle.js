class Triangle extends Particle{
    constructor(ax, ay, bx, by, cx, cy, x = 0, y = 0) {
        super(x, y)

        this.a = new Vector2D(ax, ay);
        this.b = new Vector2D(bx, by);
        this.c = new Vector2D(cx, cy);
    }

    DrawBody(transform) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = this.color;

        let a = transform.MultiplyVector(this.a),
            b = transform.MultiplyVector(this.b),
            c = transform.MultiplyVector(this.c);

        Context.moveTo(a.x, a.y);
        Context.lineTo(b.x, b.y);
        Context.lineTo(c.x, c.y);
        Context.lineTo(a.x, a.y);
        Context.stroke();

        Context.closePath();
        Context.restore();
    }
}