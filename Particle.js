class Particle {
    static GetID() {
        if (Particle.prototype.id === undefined)
            Particle.prototype.id = 1;
        
        return Particle.prototype.id++;
    }

    constructor(r = 0.4, x = 0, y = 0) {
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

        this.extrapolatedTransform = new Matrix2D();
        this.isExtrapolated = true;

        this.color = "Gray";
        this.radius = r;

        this.Renderer  = this.Draw.bind(this);
        this.MotionUpdater = this.OnMotionUpdate.bind(this);
        this.CollisionUpdater = this.OnCollisionUpdate.bind(this);

        Engine.OnRender.push(this.Renderer);
        PhysicsEngine.OnMotionUpdate.push(this.MotionUpdater);  
        PhysicsEngine.OnCollisionUpdate.push(this.CollisionUpdater);  
        PhysicsEngine.ColliderList.push(this);
    }

    set axisLength(length) {
        this.xAxis.x = length;
        this.yAxis.y = length;
    }

    Disable() {
        Engine.OnRender.remove(this.Renderer);
        PhysicsEngine.OnMotionUpdate.remove(this.MotionUpdater);
        PhysicsEngine.OnCollisionUpdate.remove(this.CollisionUpdater);
        PhysicsEngine.ColliderList.remove(this);
    }
 
    Draw() {
        if (this.isExtrapolated) {
            let interporlate = Engine.Lag / Engine.FixedDeltaTime;
        
            this.extrapolatedTransform.n02 += (this.transform.n02 - this.extrapolatedTransform.n02) * interporlate;
            this.extrapolatedTransform.n12 += (this.transform.n12 - this.extrapolatedTransform.n12) * interporlate;

            let deltaAngle = 0;

            if (this.transform.angle < this.extrapolatedTransform.angle)
                deltaAngle = (this.transform.angle + 360 - this.extrapolatedTransform.angle) * interporlate;
            else
                deltaAngle = (this.transform.angle - this.extrapolatedTransform.angle) * interporlate;

            let rotationDir = this.angularVelocity < 0 ? -1 : 1;

            this.extrapolatedTransform.Rotate(deltaAngle * rotationDir);

            this.DrawBody(this.extrapolatedTransform);
            //this.DrawAxes(this.extrapolatedTransform);
            this.DrawLabel(this.extrapolatedTransform);
        }
        else {
            this.DrawBody(this.transform);
            //this.DrawAxes(this.transform);
            this.DrawLabel(this.transform);
        } 
    }

    DrawBody(transform) {
        Context.save();
        Context.fillStyle = this.color;
        Context.arc(transform.n02, transform.n12, this.radius, 0, 2 * Math.PI, false);
        Context.fill();
        Context.restore();
    }

    DrawLabel(transform) {
        Context.save();
        Context.translate(transform.n02, transform.n12);
        Context.scale(1, -1);

        Context.font = "1px Comic Sans MS";
        Context.textAlign = "center";
        Context.textBaseline = "middle";

        Context.fillText(this.id, 0, 0);
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

    SetPosition(x, y) { this.transform.SetPosition(x, y); }
    SetPositionVector(position) { this.transform.SetPositionVector(position); }

    Rotate(degree) { this.transform.Rotate(degree); }

    HitOther() {
        for (let i = 0; i < PhysicsEngine.ColliderList.length - 1; i++) 
        {
            for (let j = i + 1; j < PhysicsEngine.ColliderList.length; j++)
             {
                let cirA = PhysicsEngine.ColliderList[i];
                    cirB = PhysicsEngine.ColliderList[j];

                if (this.CircleCollide(cirA, cirB))
                    this.IdealElasticCollision(cirA, cirB);
            }
        }
    }

    CircleCollide(a, b) {
        let sumRadiusSquare = Math.pow(a.radius + b.radius, 2),
            centerDistanceSquare = Math.pow(a.PositionX() - b.PositionX(), 2) + Math.pow(a.PositionY() - b.PositionY(), 2);
        
        if (centerDistanceSquare <= sumRadiusSquare)
            return true;

        return false;
    }

    IdealElasticCollision(a, b) {
        let vC = new Vector2D(b.PositionX() - a.PositionX(), b.PositionY() - a.PositionY());
            vC.NormalizeSelf();
    
        // angle between vector from center of A to center of B and the x-axis
        let angle = Math.atan2(vC.y, vC.x) * 180 / Math.PI;
    
        let rotMatrix = new Matrix2D();
            rotMatrix.Rotate(-angle);
        let inverserotMatrix = new Matrix2D();
            inverserotMatrix.Rotate(angle);
    
        let vA = rotMatrix.MultiplyVector(a.velocity),
            vB = rotMatrix.MultiplyVector(b.velocity);
    
        let vAafter = new Vector2D();
            vAafter.x = ((a.mass - b.mass) / (a.mass + b.mass) * vA.x) + ((2 * b.mass) / (a.mass + b.mass) * vB.x);
            vAafter.y = vA.y;
        let vBafter = new Vector2D();
            vBafter.x = ((b.mass - a.mass) / (a.mass + b.mass) * vB.x) + ((2 * a.mass) / (a.mass + b.mass) * vA.x);
            vBafter.y = vB.y;
    
        let vAfinal = inverserotMatrix.MultiplyVector(vAafter),
            vBfinal = inverserotMatrix.MultiplyVector(vBafter);
    
        a.velocity = vAfinal;
        b.velocity = vBfinal;
    }

    HitWindowBoundingBox() {
        if (this.transform.n02 - this.radius <= -Engine.CameraWidth)
            return new Vector2D(1, 0);

        if (this.transform.n02 + this.radius >= Engine.CameraWidth)
            return new Vector2D(-1, 0);

        if (this.transform.n12 - this.radius <= -Engine.CameraHeight)
            return new Vector2D(0, 1);

        if(this.transform.n12 + this.radius >= Engine.CameraHeight)
            return new Vector2D(0, -1);
 
        return null;
    }

    OnCollisionUpdate() {
        let hit = this.HitWindowBoundingBox();

        if (hit !== null) {
            if (hit.x !== 0)
                this.velocity.x = -this.velocity.x;

            if (hit.y !== 0)
                this.velocity.y = -this.velocity.y;
        }

        this.HitOther();
    }

    OnMotionUpdate() {
        let scaledVelocity = Vector.Scale(this.velocity, Engine.SecondsPerFixedUpdate);

        // save the last postion updated by FixUpdate
        this.extrapolatedTransform.n02 = this.transform.n02;
        this.extrapolatedTransform.n12 = this.transform.n12;

        if (this.hasGravity) {
            this.velocity.y += -9.81 * Engine.SecondsPerFixedUpdate;
            this.transform.TranslateVector(scaledVelocity);
        }
        else {  
            this.transform.TranslateVector(scaledVelocity);
        }

        if (this.angularVelocity != 0) {
            this.transform.Rotate(this.angularVelocity * Engine.SecondsPerFixedUpdate);
        } 

        this.extrapolatedTransform.angle = this.transform.angle;
    }
}