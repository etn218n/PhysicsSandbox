class Circle extends Particle{
    constructor(r = 0.4, x = 0, y = 0) {
        super(r, x, y);

        this.axisLength = r + 1;
    }

    DrawBody(transform) {
        Context.save();
        Context.beginPath();
        Context.lineWidth = 0.1;
        Context.strokeStyle = this.color;
        Context.arc(transform.n02, transform.n12, this.radius, 0, 2 * Math.PI, false);
        Context.stroke();
        Context.closePath();
        Context.restore();
    }
}