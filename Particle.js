class Particle {
    static GetID() {
        if (Particle.prototype.id === undefined)
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

        this.extrapolatedTransform = new Matrix2D();
        this.isExtrapolated = true;

        this.color = "Gray";
        this.radius = 0.4;

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

        Context.fillText(this.id, 0, 0.3);
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
        let thisIndex;

        for (let i = 0; i < PhysicsEngine.ColliderList.length; i++) {
            if (PhysicsEngine.ColliderList[i] === this) {
                thisIndex = i;
                break;
            }
        }

        for (let i = 0; i < PhysicsEngine.ColliderList.length; i++) {
            if (PhysicsEngine.ColliderList[i] === this)
                continue;

            let sumRadiusSquare = Math.pow(this.radius + PhysicsEngine.ColliderList[i].radius, 2),
                centerDistanceSquare = Math.pow(this.PositionX() - PhysicsEngine.ColliderList[i].PositionX(), 2) + Math.pow(this.PositionY() - PhysicsEngine.ColliderList[i].PositionY(), 2);
    
            if (centerDistanceSquare <= sumRadiusSquare) {
                PhysicsEngine.CollidedIndexList.unshift(thisIndex);
                return;
            }
        }
    }

    HitWindowBoundingBox() {
        if (this.transform.n02 - 0.4 <= -Engine.CameraWidth)
            return new Vector2D(1, 0);

        if (this.transform.n02 + 0.4 >= Engine.CameraWidth)
            return new Vector2D(-1, 0);

        if (this.transform.n12 - 0.4 <= -Engine.CameraHeight)
            return new Vector2D(0, 1);

        if(this.transform.n12 + 0.4 >= Engine.CameraHeight)
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
            this.extrapolatedTransform.angle = this.transform.angle;
            this.transform.Rotate(this.angularVelocity * Engine.SecondsPerFixedUpdate);
        } 
    }
}