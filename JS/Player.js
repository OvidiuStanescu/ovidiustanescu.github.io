class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, canvasSize, playerImage) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerSize = { w: playerWidth, h: playerHeight }
        this.playerImage = playerImage
        this.imageInstance = undefined
        this.canvasSize = canvasSize

        this.init()


    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.playerImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

    }

    moveRight() {
        if (this.playerPos.x + this.playerSize.w >= this.canvasSize.w - 50) {
            this.playerPos.x = this.canvasSize.w - this.playerSize.w - 50
        }
        this.playerPos.x += 50
    }

    moveLeft() {
        if (this.playerPos.x <= 50) {
            this.playerPos.x = 50
        }
        this.playerPos.x -= 50
    }

     shoot(bullet) {
        bullet.push(new Bullet(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h))
     }

     
}