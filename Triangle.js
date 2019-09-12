class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;

        this.transform = new Matrix2D();
    }

    Translate(displacement) { this.transform.Translate(displacement);}
    LocalTranslate(displacement) { this.transform.LocalTranslate(displacement);}

    Up() { return this.transform.Up(); }
    Right() { return this.transform.Right(); }
    Position() { return this.transform.Position(); }
    Rotate(degree) { this.transform.Rotate(degree); }

    Draw() {
        this.DrawAxes();

        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "gray";

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

    DrawAxes() {
        Context.save();

        let displacement = new Vector2D();

        // x axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#009b4e"; // dark cyan
        Context.moveTo(this.transform.n02, this.transform.n12);
        displacement.x = this.transform.n02 + this.Right().x * 3;
        displacement.y = this.transform.n12 + this.Right().y * 3;
        Context.lineTo(displacement.x, displacement.y);
        Context.stroke();
        Context.closePath();

        // y axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#ff6767"; // very light red
        Context.moveTo(this.transform.n02, this.transform.n12);
        displacement.x = this.transform.n02 + this.Up().x * 3;
        displacement.y = this.transform.n12 + this.Up().y * 3;
        Context.lineTo(displacement.x, displacement.y);
        Context.stroke();
        Context.closePath();

        Context.restore();
    }
}