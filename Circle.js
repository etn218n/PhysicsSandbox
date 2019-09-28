class Circle {
    constructor(x, y, r = 0.4) {
        this.transform = new Matrix2D();
        this.transform.Translate(new Vector2D(x, y));

        this.XAxis = new Vector2D(1, 0);
        this.YAxis = new Vector2D(0, 1);

        this.radius = r;

        this.mass = 1;
        this.hasGravity = true;

        this.velocity = new Vector2D();
        this.angularVelocity = 0;

        this.interTransform = new Matrix2D();
        this.isInterpolated = true;

        this.Renderer  = this.Draw.bind(this);
        this.Simulator = this.Simulate.bind(this);

        Engine.OnRender.push(this.Renderer);
        Engine.OnFixedUpdate.push(this.Simulator);
    }

    Disable() {
        Engine.OnRender.remove(this.Renderer);
        Engine.OnFixedUpdate.remove(this.Simulator);
    }
 
    Draw() {
        if (this.isInterpolated) {
            let interporlate = Engine.DeltaTime / Engine.FixedDeltaTime;
        
            this.interTransform.n02 += (this.transform.n02 - this.interTransform.n02) * interporlate;
            this.interTransform.n12 += (this.transform.n12 - this.interTransform.n12) * interporlate;

            let deltaAngle = 0;

            if (this.transform.angle < this.interTransform.angle)
                deltaAngle = (this.transform.angle + 360 - this.interTransform.angle) * interporlate;
            else
                deltaAngle = (this.transform.angle - this.interTransform.angle) * interporlate;

            let rotationDir = this.angularVelocity < 0 ? -1 : 1;

            this.interTransform.Rotate(deltaAngle * rotationDir);

            this.DrawBody(this.interTransform);
            this.DrawAxes(this.interTransform);
        }
        else {
            this.DrawBody(this.transform);
            this.DrawAxes(this.transform);
        } 
    }

    DrawBody(transform) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = 'gray';
        Context.arc(transform.n02, transform.n12, this.radius, 0, 2 * Math.PI, false);
        Context.stroke();
        Context.closePath();
        Context.restore();
    }

    DrawAxes(transform) {
        let XAxis = transform.Multiply(this.XAxis),
            YAxis = transform.Multiply(this.YAxis);

        // x axis
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#ff6767"; // very light red
        Context.moveTo(transform.n02, transform.n12);
        Context.lineTo(XAxis.x, XAxis.y);
        Context.stroke();
        Context.closePath();

        // y axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#009b4e"; // dark cyan
        Context.moveTo(transform.n02, transform.n12);
        Context.lineTo(YAxis.x, YAxis.y);
        Context.stroke();
        Context.closePath();
        Context.restore();
    }

    Translate(displacement) { this.transform.Translate(displacement);}
    LocalTranslate(displacement) { this.transform.LocalTranslate(displacement);}

    Up() { return this.transform.Up(); }
    Right() { return this.transform.Right(); }
    Position() { return this.transform.Position(); }
    PositionX() { return this.transform.PositionX(); }
    PositionY() { return this.transform.PositionY(); }
    Rotate(degree) { this.transform.Rotate(degree); }

    Simulate() {
        let scaledVelocity = Vector.Scale(this.velocity, Engine.SecondsPerFixedUpdate);

        // save the last postion updated by FixUpdate
        this.interTransform.n02 = this.transform.n02;
        this.interTransform.n12 = this.transform.n12;

        if (this.hasGravity) {
            this.velocity.y += -9.81 * Engine.SecondsPerFixedUpdate;
            this.transform.Translate(scaledVelocity);
        }
        else {  
            this.transform.Translate(scaledVelocity);
        }

        if (this.angularVelocity != 0) {
            this.interTransform.angle = this.transform.angle;
            this.transform.Rotate(this.angularVelocity * Engine.SecondsPerFixedUpdate);
        }
    }
}