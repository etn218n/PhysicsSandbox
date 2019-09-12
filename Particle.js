class Particle {
    constructor(position) {
        this.transform  = new Matrix2D();
        this.transform.Translate(position);
        
        this.hasGravity = true;
        this.velocity   = new Vector2D();
        this.mass       = 1;

        this.n02 = 0;
        this.n10 = 0;

        this.lastPosition = new Vector2D();
        this.isInterpolated = true;
    }
 
    Draw() {
        if (this.isInterpolated) {
            let interporlate = Engine.Lag / Engine.FixedDeltaTime;
        
            this.lastPosition.x = this.lastPosition.x + (this.transform.n02 - this.lastPosition.x) * interporlate;
            this.lastPosition.y = this.lastPosition.y + (this.transform.n12 - this.lastPosition.y) * interporlate;

            this.DrawBodyAt(this.lastPosition.x, this.lastPosition.y);
            this.DrawAxesAt(this.lastPosition.x, this.lastPosition.y);
        }
        else {
            this.DrawBodyAt(this.transform.n02, this.transform.n12);
            this.DrawAxesAt(this.transform.n02, this.transform.n12);
        } 
    }

    DrawBodyAt(x, y) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = 'gray';
        Context.arc(x, y, 0.4, 0, 2 * Math.PI, false);
        Context.stroke();
        Context.closePath();
        Context.restore();
    }

    DrawAxesAt(x, y) {
        let displacement = new Vector2D();

        // x axis
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#009b4e"; // dark cyan
        Context.moveTo(x, y);
        displacement.x = x + this.Right().x * 1.5;
        displacement.y = y + this.Right().y * 1.5;
        Context.lineTo(displacement.x, displacement.y);
        Context.stroke();
        Context.closePath();

        // y axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#ff6767"; // very light red
        Context.moveTo(x, y);
        displacement.x = x + this.Up().x * 1.5;
        displacement.y = y + this.Up().y * 1.5;
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
        let scaledVelocity = Vector.Scale(this.velocity, Engine.SecondsPerFixedUpdate);

        this.lastPosition.x = this.transform.n02;
        this.lastPosition.y = this.transform.n12;

        if (this.hasGravity) {
            this.velocity.y += -9.81 * Engine.SecondsPerFixedUpdate;
            this.transform.Translate(scaledVelocity);
        }
        else {  
            this.transform.Translate(scaledVelocity);
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