class Plotter {
    constructor() {
        this.points = [];
        this.index  = 0;
        this.animationEnded = false;
    }

    AddPoint(x, y) {
        this.points.push(new Vector2D(x, y));
    }

    GeneratePoints(range, f, dx = 0.1) {
        let min = Math.min.apply(Math, range),
            max = Math.max.apply(Math, range);

        for (let x = min; x <= max; x += dx) {
            if (x > max)
                this.AddPoint(x, f(max));
            else
                this.AddPoint(x, f(x));
        }
    }

    Log() {
        this.points.forEach(p => p.Print());
    }

    Plot() {
        if (this.points.length == 0)
            return;

        Context.beginPath();
        Context.lineWidth = 0.1;

        Context.moveTo(this.points[0].x, this.points[0].y);

        this.points.forEach(p => {
            Context.lineTo(p.x, p.y);
            Context.stroke();
        });

        Context.closePath();
    }

    PlotTo(index) {
        if (this.points.length == 0)
            return;
            
        Context.beginPath();
        Context.lineWidth = 0.1;

        Context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i <= index; i++) {
            Context.lineTo(this.points[i].x, this.points[i].y);
            Context.stroke();
        }

        Context.closePath();
    }

    Animate(loopAnimation = false) {
        this.PlotTo(this.index);

        this.index += 1;

        if (this.index == this.points.length)
            this.animationEnded = true;
        
        if (this.animationEnded && loopAnimation)
            this.ResetAnimation();
    }

    ResetAnimation() {
        this.animationEnded = false;
        this.index  = 0;
    }
}