class Plotter {
    constructor() {
        this.points = [];
        this.color  = "gray";
        this.index  = 0;
        this.animationEnded = false;
    }

    Add(x, y) {
        this.points.push(new Vector2D(x, y));
    }

    AddPoint(newPoint) {
        this.points.push(newPoint);
    }

    GeneratePoints(range, f, dx = 0.1) {
        let min = Math.min.apply(Math, range),
            max = Math.max.apply(Math, range);

        for (let x = min; x <= max; x += dx) {
            if (x > max)
                this.Add(x, f(max));
            else
                this.Add(x, f(x));
        }
    }

    Log() {
        this.points.forEach(p => p.Print());
    }

    Plot() {
        if (this.points.length == 0)
            return;

        Context.save();
        Context.beginPath();
        Context.strokeStyle = this.color;
        Context.lineWidth = 0.1;

        Context.moveTo(this.points[0].x, this.points[0].y);

        this.points.forEach(p => {
            Context.lineTo(p.x, p.y);
            Context.stroke();
        });

        Context.closePath();
        Context.restore();
    }

    PlotTo(index) {
        if (this.points.length == 0)
            return;
            
        Context.save();
        Context.beginPath();
        Context.strokeStyle = this.color;
        Context.lineWidth = 0.1;

        Context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i <= index; i++) {
            Context.lineTo(this.points[i].x, this.points[i].y);
            Context.stroke();
        }

        Context.closePath();
        Context.restore();
    }

    Animate(loopAnimation = false) {
        this.PlotTo(this.index);

        if (!this.animationEnded) {
            this.index += 1;

            if (this.index == this.points.length - 1) {
                this.animationEnded = true;
            }
        }
        else if (loopAnimation)
            this.ResetAnimation();
    }

    ResetAnimation() {
        this.animationEnded = false;
        this.index  = 0;
    }
}