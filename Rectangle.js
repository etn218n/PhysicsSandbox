class Rectangle {
    constructor(points) {
        this.color = "gray";

        this.points = points;
        this.transformPoints = [];
        
        this.points.forEach(point => {
            this.transformPoints.push(new Vector2D());
        })

        this.transform = new Matrix2D();
        this.interTransform = new Matrix2D();

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

    HitBox() {
        
    }

    Draw() {
        this.DrawAxes();

        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = this.color;

        this.transformPoints[0] = this.transform.Multiply(this.points[0]);

        Context.moveTo(this.transformPoints[0].x, this.transformPoints[0].y);

        for (let i = 1; i < this.points.length; i++) {
            this.transformPoints[i] = this.transform.Multiply(this.points[i]);
            Context.lineTo(this.transformPoints[i].x, this.transformPoints[i].y);
        }

        Context.lineTo(this.transformPoints[0].x, this.transformPoints[0].y);
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
        
        // draw dot
        Context.fillStyle = "gray";
        Context.arc(this.transform.n02, this.transform.n12, 0.2, 0, 2 * Math.PI, false);
        Context.fill();

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