class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
        this.ctx = ctx
        this.bulletPosX = playerPosX + playerWidth / 2
        this.bulletPosY = playerPosY + playerHeight /2
        this.bulletWidth = 4
        this.bulletHeight = 5
        this.velY = 5
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.bulletPosX, this.bulletPosY, this.bulletWidth, this.bulletHeight)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }

    move(){
        this.bulletPosY -= this.velY
    }

}