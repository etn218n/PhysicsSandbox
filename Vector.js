class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Print() {
        console.log("(" + this.x + "," + this.y + ")");
    }

    Add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    Subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    Multiply(factor) {
        this.x *= factor;
        this.y *= factor;
    }

    Angle() {
        return Math.atan2(this.y, this.x);
    }

    SetAngle(angle) {
        let length = this.Length();
        
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    SetLength(length) {
        let angle = this.getAngle();

        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    DistanceTo(v) {
        return new Vector2(v.x - this.x, v.y - this.y).Length();
    }

    Normalized() {
        let length = this.Length();

        return new Vector2(this.x / length, this.y / length);
    }

    NormalizeSelf() {
        let length = this.Length();

        this.x = this.x / length;
        this.y = this.y / length;
    }

    VectorTo(v) {
        return new Vector2(v.x - this.x, v.y - this.y);
    }

    AngleTo(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    }
}

let Vector = {
    Add: function(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    },

    Subtract: function(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
}