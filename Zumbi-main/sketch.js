var fundo, atirador, coracao;
var backImg, coracaoImg, coracao2Img, coracao3Img, atirador, atirador2Img, atirador3Img, zumbiImg;
var zumbiGroup, zumbi;
var bala
var life = 3;
var gameState = "fight"
var heart1, heart2, heart3;
function preload() {
    backImg = loadImage("assets/bg.jpeg");
    heart1Img = loadImage("assets/heart_1.png")
    heart2Img = loadImage("assets/heart_2.png")
    heart3Img = loadImage("assets/heart_3.png")
    atirador1Img = loadImage("assets/shooter_1.png");
    atirador2Img = loadImage("assets/shooter_2.png");
    atirador3Img = loadImage("assets/shooter_3.png");
    balaImg = loadImage("assets/ballet.png");

    zumbiImg = loadImage("assets/zombie.png");



}

function setup() {

    createCanvas(windowWidth, windowHeight);

    //adicione a imagem de fundo
    fundo = createSprite(displayWidth / 2 + 50, displayHeight / 2 + 40, 20, 20);
    fundo.addImage(backImg);
    fundo.scale = 1.3;

    //crie o sprite do jogador
    atirador = createSprite(550, displayHeight - 300, 50, 50);
    atirador.addImage(atirador1Img);
    atirador.scale = 0.5;
    atirador.debug = true;
    atirador.setCollider("rectangle", 0, 0, 300, 400);

    heart1 = createSprite(displayWidth - 150, 40, 20, 20)
    heart1.visible = false
    heart1.addImage("heart1", heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth - 100, 40, 20, 20)
    heart2.visible = false
    heart2.addImage("heart2", heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth - 150, 40, 20, 20)
    heart3.addImage("heart3", heart3Img)
    heart3.scale = 0.4

    zumbiGroup = new Group();

}

function draw() {
    background(0);

    if (gameState === "fight") {

        if (life === 3) {
            heart3.visible = true
            heart1.visible = false
            heart2.visible = false
        }
        if (life === 2) {
            heart2.visible = true
            heart1.visible = false
            heart3.visible = false
        }
        if (life === 1) {
            heart1.visible = true
            heart3.visible = false
            heart2.visible = false
        }

        //vá para gameState "lost" (perdeu) quando restar 0 vidas 
        if (life === 0) {
            heart1.visible = false
            heart3.visible = false
            heart2.visible = false
            gameState = "lost"
        }
    }
    //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
    if (keyDown("UP_ARROW") || touches.length > 0) {
        atirador.y = atirador.y - 30;
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
        atirador.y = atirador.y + 30;
    }

    //libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
    if (keyWentDown("space")) {
        atirador.addImage(atirador3Img);
    }

    if (keyWentDown("space")) {
        bala = createSprite(atirador.x, atirador.y);
        bala.addImage(balaImg);
        bala.velocityX = 18;
        bala.scale = 0.2;
        bala.debug = true;
        bala.lifetime = displayHeight;
        bala.setCollider("rectangle", 0, 0, 200, 100);
    }
    //o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
    else if (keyWentUp("space")) {
        atirador.addImage(atirador1Img);
    }
    if (zumbiGroup.isTouching(atirador)) {
        for (var i = 0; i < zumbiGroup.length; i++) {

            if (zumbiGroup[i].isTouching(atirador)) {
                zumbiGroup[i].destroy();
            }
        }
    }
    if (zumbiGroup.isTouching(bala)) {
        for (var i = 0; 1 < zumbiGroup.length; i++) {
            if (zumbiGroup[i].isTouching(bala)) {
                zumbiGroup[i].destroy();
            }
        }
    }



    spawnZumbi();
    drawSprites();

}

function spawnZumbi() {
    if (frameCount % 100 === 0) {
        var zumbi = createSprite(displayWidth - 150, displayHeight - 300, -150, 50);
        zumbi.y = Math.round(random(displayHeight / 2, displayHeight));
        zumbi.addImage(zumbiImg);
        zumbi.scale = 0.3;
        zumbi.velocityX = random(-10, -3);
        //zumbi.setCollider("rectangle", 0, 0, 300, 400);
        //atribua tempo de vida à variável
        zumbi.lifetime = displayHeight;
        //adicione cada nuvem ao grupo
        zumbiGroup.add(zumbi);
    }
}
if (gameState == "lost") {

    textSize(100)
    fill("red")



}
else if (gameState == "won") {

    textSize(100)
    fill("yellow")
    text("Você Ganhou ", 400, 400)
    zombieGroup.destroyEach();
    player.destroy();

}
else if (gameState == "bullet") {

    textSize(50)
    fill("yellow")
    text("Você ficou sem balas!!!", 470, 410)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();

}
