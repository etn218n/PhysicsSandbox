class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;

        this.transform = new Matrix2D();
    }

    Translate(vector) {
        this.transform.Translate(vector);
    }

    Rotate(degree) {
        this.transform.Rotate(degree);
    }

    Draw() {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;

        let a = this.transform.Multiply(this.a);
        let b = this.transform.Multiply(this.b);
        let c = this.transform.Multiply(this.c);

        Context.moveTo(a.x, a.y);
        Context.lineTo(b.x, b.y);
        Context.lineTo(c.x, c.y);
        Context.lineTo(a.x, a.y);
        Context.stroke();

        Context.closePath();
        Context.restore();
    }
}