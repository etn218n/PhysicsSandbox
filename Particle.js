class Particle {
    constructor(position) {
        this.transform  = new Matrix2D();
        this.transform.Translate(position);

        this.hasGravity = true;
        this.velocity   = new Vector2D(0, 0);
        this.mass       = 1;
    }

    Draw() {
        Context.save();

        this.DrawAxes();

        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = 'gray';
        Context.arc(this.transform.n02, this.transform.n12, 0.4, 0, 2 * Math.PI, false);
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
        displacement.x = this.transform.n02 + this.Right().x * 1.5;
        displacement.y = this.transform.n12 + this.Right().y * 1.5;
        Context.lineTo(displacement.x, displacement.y);
        Context.stroke();
        Context.closePath();

        // y axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#ff6767"; // very light red
        Context.moveTo(this.transform.n02, this.transform.n12);
        displacement.x = this.transform.n02 + this.Up().x * 1.5;
        displacement.y = this.transform.n12 + this.Up().y * 1.5;
        Context.lineTo(displacement.x, displacement.y);
        Context.stroke();
        Context.closePath();

        Context.restore();
    }

    Translate(displacement) { this.transform.Translate(displacement);}
    LocalTranslate(displacement) { this.transform.LocalTranslate(displacement);}

    Up() { return this.transform.Up(); }
    Right() { return this.transform.Right(); }
    Position() { return this.transform.Position(); }
    Rotate(degree) { this.transform.Rotate(degree); }

    Move() {
        if (this.hasGravity) {
            this.velocity.Add(new Vector2D(0, -9.81 / 60));

            // let localVelocity = new Vector2D(this.velocity.x, this.velocity.y);

            // localVelocity.x = this.velocity.x * this.transform.n00 + this.velocity.y * this.transform.n01;
            // localVelocity.y = this.velocity.x * this.transform.n10 + this.velocity.y * this.transform.n11;

            this.transform.Translate(this.velocity);
        }
        else {
            this.transform.Translate(this.velocity);
        }
    }

    MoveWith(velocity) {
        this.velocity = velocity;
        this.Move();
    }

    AccelerateWith(acceleration) {
        this.velocity.Add(acceleration);
        this.Move();
    }
}