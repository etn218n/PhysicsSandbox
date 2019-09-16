class Matrix2D {
    constructor(n00 = 1, n01 = 0, n02 = 0, n10 = 0, n11 = 1, n12 = 0) {
        this.n00 = n00;
        this.n01 = n01;
        this.n02 = n02;
        this.n10 = n10;
        this.n11 = n11;
        this.n12 = n12;

        this.angle = 0;
    }

    Up() { return new Vector2D(this.n01, this.n11); }
    Right() { return new Vector2D(this.n00, this.n10); }
    Angle() {return this.angle; }
    Position() { return new Vector2D(this.n02, this.n12); }

    Translate(displacement) {
        this.n02 += displacement.x;
        this.n12 += displacement.y;
    }

    LocalTranslate(displacement) {
        this.n02 += (displacement.x * this.n00) + (displacement.y * this.n01);
        this.n12 += (displacement.x * this.n10) + (displacement.y * this.n11);
    }

    Rotate(degree) {
        if (degree < 0)
            degree = 360 - degree;

        this.angle += degree;
        this.angle %= 360;

        let radian = 2 * this.angle * Math.PI / 180;

        let cosSign =  this.angle.between(0, 90) || this.angle.between(270, 360) ? 1 : -1;
        let sinSign =  this.angle.between(0, 180) ? 1 : -1;
        
        this.n00 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;
        this.n10 =  Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;

        this.n01 = -Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;
        this.n11 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;
    }

    Multiply(vector) {
        let result = new Vector2D();

        result.x = (vector.x * this.n00) + (vector.y * this.n01) + (vector.z * this.n02);
        result.y = (vector.x * this.n10) + (vector.y * this.n11) + (vector.z * this.n12);
        result.z = vector.z;

        return result;
    }

    Print() {
        console.log(' | ' + this.n00 + ' | ' + this.n01 + ' | ' + this.n02 + ' | ');
        console.log(' | ' + this.n10 + ' | ' + this.n11 + ' | ' + this.n12 + ' | ');
    }
}