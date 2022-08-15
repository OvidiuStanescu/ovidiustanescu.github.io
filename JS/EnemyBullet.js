class EnemyBullet {
    constructor(ctx, enemyPosX, enemyPosY, enemyWidth, enemyHeight) {
        this.ctx = ctx
        this.enemyBulletPosX = enemyPosX + enemyWidth / 2
        this.enemyBulletPosY = enemyPosY + enemyHeight / 2
        this.enemyBulletWidth = 6
        this.enemyBulletHeight = 6
        this.velY = 5
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.enemyBulletPosX, this.enemyBulletPosY, this.enemyBulletWidth, this.enemyBulletHeight)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }

    move() {
        this.enemyBulletPosY += this.velY
    }


}