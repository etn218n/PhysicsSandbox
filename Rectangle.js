class Rectangle extends Particle {
    constructor(width, height, x = 0, y = 0) {
        super(x, y);

        this.width  = width;
        this.height = height;

        this.labelFontSize = (this.width / this.height) * this.width > this.height ? this.width / 2 : this.height / 2;

        this.a = new Vector2D(-this.width / 2,  this.height / 2);
        this.b = new Vector2D( this.width / 2,  this.height / 2);
        this.c = new Vector2D( this.width / 2, -this.height / 2);
        this.d = new Vector2D(-this.width / 2, -this.height / 2);

        if (this.width > this.height)
            this.axisLength = (width / 2)  + 1;
        else
            this.axisLength = (height / 2) + 1;
    }

    HitWindowBoundingBox() {
        if (this.transform.n02 - (this.width / 2)  <= -Engine.CameraWidth)
            return new Vector2D(1, 0);

        if (this.transform.n02 + (this.width / 2)  >=  Engine.CameraWidth)
            return new Vector2D(-1, 0);

        if (this.transform.n12 - (this.height / 2) <= -Engine.CameraHeight)
            return new Vector2D(0, 1);

        if (this.transform.n12 + (this.height / 2)  >=  Engine.CameraHeight)
            return new Vector2D(0, -1);
 
        return null;
    }

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

            if (this.CheckAABB(this.td, this.tb, PhysicsEngine.ColliderList[i].td, PhysicsEngine.ColliderList[i].tb)) {
                PhysicsEngine.CollidedIndexList.unshift(thisIndex);
                return;
            }
        }
    }

    CheckAABB(Amin, Amax, Bmin, Bmax) {
        if (Amax.x < Bmin.x || Bmax.x < Amin.x)
            return false;
        
        if (Amax.y < Bmin.y || Bmax.y < Amin.y)
            return false;
            
        return true;
    }

    DrawLabel(transform) {
        Context.save();
        Context.translate(transform.n02, transform.n12);
        Context.scale(1, -1);

        Context.font = this.labelFontSize + "px Comic Sans MS";
        Context.textAlign = "center";
        Context.textBaseline = "middle";

        Context.fillText(this.id, 0, 0);
        Context.restore(); 
    }

    DrawBody(transform) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = this.color;

        this.ta = transform.MultiplyVector(this.a),
        this.tb = transform.MultiplyVector(this.b),
        this.tc = transform.MultiplyVector(this.c),
        this.td = transform.MultiplyVector(this.d);

        Context.moveTo(this.ta.x, this.ta.y);
        Context.lineTo(this.tb.x, this.tb.y);
        Context.lineTo(this.tc.x, this.tc.y);
        Context.lineTo(this.td.x, this.td.y);
        Context.lineTo(this.ta.x, this.ta.y);
        Context.stroke();

        Context.closePath();
        Context.restore();
    }
}