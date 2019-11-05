class Matrix2D {
    constructor(n00 = 1, n01 = 0, n02 = 0, n10 = 0, n11 = 1, n12 = 0) {
        this.n00 = n00;
        this.n01 = n01;
        this.n02 = n02;
        this.n10 = n10;
        this.n11 = n11;
        this.n12 = n12;

        this.angle = 0;

        this.lastRotationDir = "CCW";
    }

    Up()  { return new Vector2D(this.n01, this.n11); }
    UpX() { return this.n01; }
    UpY() { return this.n11; }

    Right()  { return new Vector2D(this.n00, this.n10); }
    RightX() { return this.n00; }
    RightY() { return this.n10; }

    Angle()  { return this.angle; }

    Position()  { return new Vector2D(this.n02, this.n12); }
    PositionX() { return this.n02; }
    PositionY() { return this.n12; }

    Translate(x, y) {
        this.n02 += x;
        this.n12 += y;
    }

    TranslateVector(displacement) {
        this.n02 += displacement.x;
        this.n12 += displacement.y;
    }

    LocalTranslate(x, y) {
        this.n02 += (x * this.n00) + (y * this.n01);
        this.n12 += (x * this.n10) + (y * this.n11);
    }

    LocalTranslateVector(displacement) {
        this.n02 += (displacement.x * this.n00) + (displacement.y * this.n01);
        this.n12 += (displacement.x * this.n10) + (displacement.y * this.n11);
    }

    SetPosition(x, y) {
        this.n02 = x;
        this.n12 = y;
    }

    SetPositionVector(position) {
        this.n02 = position.x;
        this.n12 = position.y;
    }
    
    Rotate(degree) {
        if (degree >= 0) {
            if (this.lastRotationDir === "CW")
                this.angle = 360 - this.angle;

            this.angle += Math.abs(degree);
            this.angle %= 360;

            let cosSign =  this.angle.between(0, 90) || this.angle.between(270, 360) ? 1 : -1;
            let sinSign =  this.angle.between(0, 180) ? 1 : -1;

            let radian = 2 * this.angle * Math.PI / 180;
        
            this.n00 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;
            this.n10 =  Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;

            this.n01 = -Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;
            this.n11 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;

            this.lastRotationDir = "CCW";
        }
        else {
            if (this.lastRotationDir === "CCW")
                this.angle = 360 - this.angle;

            this.angle += Math.abs(degree);
            this.angle %= 360;

            let cosSign =  this.angle.between(0, 90) || this.angle.between(270, 360) ? 1 : -1;
            let sinSign =  this.angle.between(0, 180) ? 1 : -1;

            let radian = 2 * this.angle * Math.PI / 180;
        
            this.n00 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;
            this.n10 = -Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;

            this.n01 =  Math.sqrt((1 - Math.cos(radian)) / 2) * sinSign;
            this.n11 =  Math.sqrt((1 + Math.cos(radian)) / 2) * cosSign;

            this.lastRotationDir = "CW";
        }
    }

    MultiplyVector(v) {
        let result = new Vector2D();

        result.x = (v.x * this.n00) + (v.y * this.n01) + (v.z * this.n02);
        result.y = (v.x * this.n10) + (v.y * this.n11) + (v.z * this.n12);
        result.z = v.z;

        return result;
    }

    Print() {
        console.log(' | ' + this.n00 + ' | ' + this.n01 + ' | ' + this.n02 + ' | ');
        console.log(' | ' + this.n10 + ' | ' + this.n11 + ' | ' + this.n12 + ' | ');
    }
}