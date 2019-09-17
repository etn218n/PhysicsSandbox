class Triangle {
    constructor(a, b, c) {
        this.a = new Vector2D(a.x, a.y);
        this.b = new Vector2D(b.x, b.y);
        this.c = new Vector2D(c.x, c.y);

        this.transform = new Matrix2D();

        this.velocity = new Vector2D();
        this.angularVelocity = 0;
        this.hasGravity = false;

        this.Renderer = this.Draw.bind(this);
        Engine.OnRender.push(this.Renderer);

        this.Simulator = this.Simulate.bind(this);
        Engine.OnFixedUpdate.push(this.Simulator);
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

    Simulate() {
        let scaledVelocity = Vector.Scale(this.velocity, Engine.SecondsPerFixedUpdate);

        if (this.hasGravity) {
            this.velocity.y += -9.81 * Engine.SecondsPerFixedUpdate;
            this.transform.Translate(scaledVelocity);
        }
        else {  
            this.transform.Translate(scaledVelocity);
        }

        if (this.angularVelocity != 0)
            this.Rotate(this.angularVelocity * Engine.SecondsPerFixedUpdate);
    }
}