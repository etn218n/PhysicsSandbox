class Rectangle extends Particle {
    constructor(width, height, x = 0, y = 0) {
        super(x, y);

        this.width  = width;
        this.height = height;

        this.a = new Vector2D(-this.width / 2,  this.height / 2);
        this.b = new Vector2D( this.width / 2,  this.height / 2);
        this.c = new Vector2D( this.width / 2, -this.height / 2);
        this.d = new Vector2D(-this.width / 2, -this.height / 2);

        if (this.width > this.height)
            this.axisLength = (width / 2) + 1;
        else
            this.axisLength = (height / 2) + 1;
    }

    HitWindowBoundingBox() {
        if (this.transform.n02 - (this.width / 2)  <= -Engine.CameraWidth)
            return true;

        if (this.transform.n02 + (this.width / 2)  >=  Engine.CameraWidth)
            return true

        if (this.transform.n12 - (this.height / 2) <= -Engine.CameraHeight)
            return true;

        if (this.transform.n12 + (this.height / 2)  >=  Engine.CameraHeight)
            return true;
 
        return false
    }

    CollisionEngine() {
        if (this.HitWindowBoundingBox())
            this.velocity = new Vector2D(0, 0);

    }

    DrawBody(transform) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = this.color;

        let a = transform.MultiplyVector(this.a),
            b = transform.MultiplyVector(this.b),
            c = transform.MultiplyVector(this.c),
            d = transform.MultiplyVector(this.d);

        Context.moveTo(a.x, a.y);
        Context.lineTo(b.x, b.y);
        Context.lineTo(c.x, c.y);
        Context.lineTo(d.x, d.y);
        Context.lineTo(a.x, a.y);
        Context.stroke();

        Context.closePath();
        Context.restore();
    }
}