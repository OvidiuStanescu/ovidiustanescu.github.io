window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        document.querySelector('.game-intro').setAttribute('class', 'game-intro hide')
        document.querySelector('.lifeScoreDisplay').classList.toggle('hide')
        document.querySelector('canvas').classList.toggle('hide')
        startGame()
        canvasApp.reset()
        canvasApp.start()
    }

    document.getElementById('try-again-button').onclick = () => {
        document.querySelector('.you-lose').setAttribute('class', 'you-lose hide')
        document.querySelector('.lifeScoreDisplay').classList.toggle('hide')
        document.querySelector('canvas').classList.toggle('hide')
        startGame()
        canvasApp.reset()
        canvasApp.start()
    }
}




function startGame() {
    canvasApp.init('#canvas')

}

const canvasApp = {
    name: 'Space Invaders',
    author: 'Jorge Hermo y Ovidiu Stanescu',
    version: '1.0.0',
    license: undefined,
    description: 'Primer proyecto juego Space Invaders',
    canvasSize: {
        w: undefined,
        h: undefined
    },
    FPS: 60,
    framesCounter: 0,
    framesIndex: 0,
    //score
    score: 0,
    scoreBox: undefined,
    //life
    life: undefined,
    lifeBox: undefined,
    //musiquita
    music: undefined,
    // arrays
    enemyBullet: [],
    bullet: [],
    randomEnemy: [],
    enemiesPos: [
        { x: 600, y: 50 },
        { x: 650, y: 50 },
        { x: 700, y: 50 },
        { x: 750, y: 50 },
        { x: 800, y: 50 },
        { x: 850, y: 50 },
        { x: 900, y: 50 },
        { x: 950, y: 50 },
        { x: 1000, y: 50 },
        { x: 1050, y: 50 },
        { x: 600, y: 100 },
        { x: 650, y: 100 },
        { x: 700, y: 100 },
        { x: 750, y: 100 },
        { x: 800, y: 100 },
        { x: 850, y: 100 },
        { x: 900, y: 100 },
        { x: 950, y: 100 },
        { x: 1000, y: 100 },
        { x: 1050, y: 100 },
        { x: 600, y: 150 },
        { x: 650, y: 150 },
        { x: 700, y: 150 },
        { x: 750, y: 150 },
        { x: 800, y: 150 },
        { x: 850, y: 150 },
        { x: 900, y: 150 },
        { x: 950, y: 150 },
        { x: 1000, y: 150 },
        { x: 1050, y: 150 },
        { x: 600, y: 200 },
        { x: 650, y: 200 },
        { x: 700, y: 200 },
        { x: 750, y: 200 },
        { x: 800, y: 200 },
        { x: 850, y: 200 },
        { x: 900, y: 200 },
        { x: 950, y: 200 },
        { x: 1000, y: 200 },
        { x: 1050, y: 200 },
    ],
    enemies: [],
    enemySpeed: 10,
    ctx: undefined,

    init(canvasId) {
                this.music = new Audio('./audio/space chase.wav')
                this.music.play()
                this.music.volumen = 1
        this.scoreBox = document.querySelector('#scoreElement')
        this.lifeBox = document.querySelector('#lifeElement')
        this.ctx = document.querySelector(canvasId).getContext('2d')
        this.setDimensions(canvasId)
        this.setEventListeners()
    },

    setDimensions(canvasId) {
        this.canvasSize = { w: window.innerWidth, h: window.innerHeight }
        document.querySelector(canvasId).setAttribute('width', this.canvasSize.w)
        document.querySelector(canvasId).setAttribute('height', this.canvasSize.h)
    },

    //EventListener

    setEventListeners() {
        document.onkeydown = e => {
            const { key } = e
            switch (key) {
                case 'ArrowLeft':
                    this.player.moveLeft()
                    break;
                case 'ArrowRight':
                    this.player.moveRight()
                    break;
                case ' ':
                    this.player.shoot(this.bullet)
                    this.music = new Audio('./audio/shoot.wav')
                    this.music.play()
                    this.music.volumen = 0.1
                    break;
            }
        }
    },

    start() {

        this.createEnviroment()
        this.interval = setInterval(() => {
            if (this.randomEnemy.length == 0) {
                this.selectRamndomEnemy()
            }
            this.framesIndex++
            if (this.framesIndex % 20 === 0) {
                if (this.enemies.length > 0) {
                    this.enemies[0].shootEnemy(this.enemyBullet, this.randomEnemy[0])
                }

            }
            this.randomEnemy = []


            this.frameCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()

            this.isPlayerCollision() ? this.gameOver() : null
            this.isEnemyBulletCollision()
        }, 1000 / this.FPS)
    },

    createEnviroment() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, 'Background.png')
        this.player = new Player(this.ctx, this.canvasSize.w / 2.1, this.canvasSize.h / 1.2, 100, 100, this.canvasSize, 'Space Ship.png')// esta mal hay que darle valores relativo
        this.enemiesPos.forEach(enemy => {
            this.enemies.push(new Enemy(this.ctx, 50, 50, enemy.x, enemy.y, this.enemySpeed, this.canvasSize, "Invader.png"));
        });

    },



    drawAll() {
        this.background.draw()
        this.player.draw()
        this.enemies.forEach(enemy => {
            enemy.move()
            enemy.draw()
        })
        this.bullet.forEach((bullet) => {
            bullet.move()
            bullet.draw()
            this.clearBullet()

        })
        this.enemyBullet.forEach((enemyBullet) => {
            enemyBullet.move()
            enemyBullet.draw()
            this.clearEnemyBullet()
        })
        this.isEnemyCollision()
        this.isPlayerCollision()
        this.isEnemyBulletCollision()
    },

    //collisions

    isEnemyCollision() {
        this.enemies.forEach((enemy) => {
            this.bullet.forEach((bullets) => {
                if (enemy.enemyPos.x < bullets.bulletPosX + bullets.bulletWidth &&
                    enemy.enemyPos.x + enemy.enemySize.w > bullets.bulletPosX &&
                    enemy.enemyPos.y < bullets.bulletPosY + bullets.bulletHeight &&
                    enemy.enemySize.h + enemy.enemyPos.y > bullets.bulletPosY) {
                    this.music = new Audio('./audio/invaderkilled.wav')
                    this.music.play()
                    this.music.volumen = 0.1
                    this.score += 100
                    this.scoreBox.innerHTML = this.score
                    let removedId = this.enemies.indexOf(enemy)
                    this.enemies.splice(removedId, 1)
                    this.bullet.splice(bullets, 1)
                    if (this.enemies.length === 0) {
                        this.enemiesPos.forEach(enemy => {
                            this.enemies.push(new Enemy(this.ctx, 50, 50, enemy.x, enemy.y, 10, this.canvasSize, "Invader.png"));
                        });
                        // this.gameWin()
                    }
                    //tenemos que meter un queryselector y que cambie la imagen a you win!!
                }
            })
        })

    },
    gameWin() {
        document.querySelector('.lifeScoreDisplay').setAttribute('class', 'lifeScoreDisplay hide')
        document.querySelector('canvas').setAttribute('class', 'canvas hide')
        document.querySelector('.you-win').classList.toggle('hide')
    },
    isPlayerCollision() {
        this.enemies.forEach(enemy => {
            if (
                enemy.enemyPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                enemy.enemyPos.x + enemy.enemySize.w > this.player.playerPos.x &&
                enemy.enemyPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                enemy.enemySize.h + enemy.enemyPos.y > this.player.playerPos.y) {
                this.music = new Audio('./audio/explosion.wav')
                this.music.play()
                this.music.volumen = 0.1
                this.gameOver()
                this.reset()
            }
        })

    },

    isEnemyBulletCollision() {
        this.enemyBullet.forEach(enemyBullets => {
            if (enemyBullets.enemyBulletPosX < this.player.playerPos.x + this.player.playerSize.w &&
                enemyBullets.enemyBulletPosX + enemyBullets.enemyBulletWidth > this.player.playerPos.x &&
                enemyBullets.enemyBulletPosY < this.player.playerPos.y + this.player.playerSize.h &&
                enemyBullets.enemyBulletHeight + enemyBullets.enemyBulletPosY > this.player.playerPos.y) {
                this.enemyBullet.splice(enemyBullets, 1)
                this.music = new Audio('./audio/explosionCrunch_003.ogg')
                this.music.play()
                this.music.volumen = 0.1
                this.life--
                this.lifeBox.innerHTML = this.life
                if (this.life === 0) {
                    this.gameOver()
                    document.getElementById("showScore").textContent = "Total Score: " + this.score
                }
            }
        })
    },

    reset() {
        clearInterval(this.interval)
        this.framesCounter = 0,
            this.framesIndex = 0,
            //score
            this.score = 0,
            this.scoreBox.innerHTML = this.score
        //life
        this.life = 3
        this.lifeBox.innerHTML = this.life
        // arrays
        this.enemyBullet = []
        this.bullet = []
        this.randomEnemy = []
        this.enemiesPos = [
            { x: 600, y: 50 },
            { x: 650, y: 50 },
            { x: 700, y: 50 },
            { x: 750, y: 50 },
            { x: 800, y: 50 },
            { x: 850, y: 50 },
            { x: 900, y: 50 },
            { x: 950, y: 50 },
            { x: 1000, y: 50 },
            { x: 1050, y: 50 },
            { x: 600, y: 100 },
            { x: 650, y: 100 },
            { x: 700, y: 100 },
            { x: 750, y: 100 },
            { x: 800, y: 100 },
            { x: 850, y: 100 },
            { x: 900, y: 100 },
            { x: 950, y: 100 },
            { x: 1000, y: 100 },
            { x: 1050, y: 100 },
            { x: 600, y: 150 },
            { x: 650, y: 150 },
            { x: 700, y: 150 },
            { x: 750, y: 150 },
            { x: 800, y: 150 },
            { x: 850, y: 150 },
            { x: 900, y: 150 },
            { x: 950, y: 150 },
            { x: 1000, y: 150 },
            { x: 1050, y: 150 },
            { x: 600, y: 200 },
            { x: 650, y: 200 },
            { x: 700, y: 200 },
            { x: 750, y: 200 },
            { x: 800, y: 200 },
            { x: 850, y: 200 },
            { x: 900, y: 200 },
            { x: 950, y: 200 },
            { x: 1000, y: 200 },
            { x: 1050, y: 200 },
        ]
        this.enemies = []
    },

    selectRamndomEnemy() {
        let randomNum = Math.floor(Math.random() * this.enemies.length)
        this.randomEnemy.push(this.enemies[randomNum])
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)

    },

    clearBullet() {
        this.bullet = this.bullet.filter(elem => elem.bulletPosY >= 0)

    },

    clearEnemyBullet() {
        this.enemyBullet = this.enemyBullet.filter(elem => elem.enemyBulletPosY < this.canvasSize.h)
    },

    gameOver() {
        document.querySelector('.lifeScoreDisplay').setAttribute('class', 'lifeScoreDisplay hide')
        document.getElementById('canvas').setAttribute('class', 'canvas hide')
        document.querySelector('.you-lose').classList.toggle('hide')
    },

}
