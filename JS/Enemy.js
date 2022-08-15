class Enemy {
    constructor(ctx, enemyWidth, enemyHeight, enemyPosX, enemyPosY, speed, canvasSize, enemyImage) {

        this.ctx = ctx
        this.enemySize = { w: enemyWidth, h: enemyHeight }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemySpeed = speed
        this.canvasSize = canvasSize
        this.enemyImage = enemyImage
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.enemyImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }

    move() {
        if (this.enemyPos.x >= this.canvasSize.w - this.enemySize.w || this.enemyPos.x < 0) {
            this.moveDown()
            this.turnAround()
        }
        this.enemyPos.x += this.enemySpeed



    }

    moveDown() {
        this.enemyPos.y += 20
    }

    turnAround() {
        this.enemySpeed *= -1
    }

    shootEnemy(enemyBullet, randomEnemy) {
        enemyBullet.push(new EnemyBullet(this.ctx, randomEnemy.enemyPos.x, randomEnemy.enemyPos.y, randomEnemy.enemySize.w, randomEnemy.enemySize.h))
    }
}
