class Particle {
    constructor(position = new Vector2D()) {
        this.transform = new Matrix2D();
        this.transform.Translate(position);
        
        this.mass = 1;
        this.hasGravity = true;

        this.velocity = new Vector2D();
        this.angularVelocity = 0;

        this.n02 = 0;
        this.n10 = 0;

        this.lastPosition = new Vector2D();
        this.isInterpolated = true;

        this.renderID = Engine.OnRender.length;
        Engine.OnRender.push(this.Draw.bind(this));

        this.physicID = Engine.OnFixedUpdate.length;
        Engine.OnFixedUpdate.push(this.Simulate.bind(this));
    }

    Disable() {
        if (this.renderID == -1 || this.physicID == -1)
            return;

        Engine.OnRender.splice(this.renderID, 1);
        Engine.OnFixedUpdate.splice(this.physicID, 1);

        this.renderID = -1;
        this.physicID = -1;
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
    Rotate(angularVelocity) { this.transform.Rotate(angularVelocity * Engine.SecondsPerFixedUpdate); }

    Simulate() {
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

        if (this.angularVelocity != 0)
            this.Rotate(this.angularVelocity);
    }
}