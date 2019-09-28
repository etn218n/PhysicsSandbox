class Particle {
    static GetID() {
        if (Particle.prototype.id == undefined)
            Particle.prototype.id = 1;
        
        return Particle.prototype.id++;
    }

    constructor(x = 0, y = 0) {
        this.id = Particle.GetID();

        this.transform = new Matrix2D();
        this.transform.Translate(x, y);

        this.xAxis = new Vector2D(1, 0);
        this.yAxis = new Vector2D(0, 1);
        this.axisLength = 1;

        this.mass = 1;
        this.hasGravity = false;

        this.velocity = new Vector2D();
        this.angularVelocity = 0;

        this.interTransform = new Matrix2D();
        this.isInterpolated = true;

        this.color = "Gray";

        this.Renderer  = this.Draw.bind(this);
        this.Simulator = this.Simulate.bind(this);

        Engine.OnRender.push(this.Renderer);
        Engine.OnFixedUpdate.push(this.Simulator);  
    }

    set axisLength(length) {
        this.xAxis.x = length;
        this.yAxis.y = length;
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
        Context.fillStyle = this.color;
        Context.arc(transform.n02, transform.n12, 0.4, 0, 2 * Math.PI, false);
        Context.fill();
        Context.restore();
    }

    DrawAxes(transform) {
        let xAxis = transform.MultiplyVector(this.xAxis),
            yAxis = transform.MultiplyVector(this.yAxis);

        // x axis
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#ff6767"; // very light red
        Context.moveTo(transform.n02, transform.n12);
        Context.lineTo(xAxis.x, xAxis.y);
        Context.stroke();
        Context.closePath();

        // y axis
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = "#009b4e"; // dark cyan
        Context.moveTo(transform.n02, transform.n12);
        Context.lineTo(yAxis.x, yAxis.y);
        Context.stroke();
        Context.closePath();
        Context.restore();
    }

    Translate(x, y) { this.transform.Translate(x, y); }
    TranslateVector(displacement) { this.transform.TranslateVector(displacement);}

    LocalTranslate(x, y) { this.transform.LocalTranslate(x, y);}
    LocalTranslateVector(displacement) { this.transform.LocalTranslateVector(displacement);}

    Up()  { return this.transform.Up();  }
    UpX() { return this.transform.UpX(); }
    UpY() { return this.transform.UpY(); }

    Right()  { return this.transform.Right();  }
    RightX() { return this.transform.RightX(); }
    RightY() { return this.transform.RightY(); }

    Position()  { return this.transform.Position();  }
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
            this.transform.TranslateVector(scaledVelocity);
        }
        else {  
            this.transform.TranslateVector(scaledVelocity);
        }

        if (this.angularVelocity != 0) {
            this.interTransform.angle = this.transform.angle;
            this.transform.Rotate(this.angularVelocity * Engine.SecondsPerFixedUpdate);
        }
    }
}