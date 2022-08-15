class Background {
    constructor(ctx, backgroundWidth, backgroundHeight, backgroundImage) {
        this.ctx = ctx
        this.backgroundSize = { w: backgroundWidth, h: backgroundHeight }
        this.backgroundImage = backgroundImage
        this.instanceImage = undefined
        this.backgroundPosX = 0
        this.backgroundPosY = 0
        this.velY = 5

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.backgroundImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.backgroundPosX, this.backgroundPosY, this.backgroundSize.w, this.backgroundSize.h)
        this.ctx.drawImage(this.imageInstance, this.backgroundPosX, this.backgroundPosY - this.backgroundSize.h, this.backgroundSize.w, this.backgroundSize.h)
        this.move()
    }

    move() {
        if (this.backgroundPosY >= this.backgroundSize.h) {
            this.backgroundPosY = 0 
        }
        this.backgroundPosY += this.velY
    }
}