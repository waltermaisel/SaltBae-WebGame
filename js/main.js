var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
	}
};

var posAngleDeg = 90;
var posAngleRad;
var clockwise;
var counterClockwise;
var isMoving;
var playerAtTop = false;
var playerAtBottom = false;
var playerAtLeft = false;
var playerAtRight = false;
var salting = false;
var saltStream;
var saltCount = 100;
var saltInc;
var saltDec;
var saltMeterOutline;
var saltMeterInside;
var score = 0;
var scoreText;
var time = 60;
var clock;
var gameOver = false;
var tween;
var saltbombs = 2;
var saltbomb;
var killbomb;
var saltbombing = false;
var startScreen = true;
var endScreen = false;
var preStart = false;
var iconOnStart = true;
var iconOnOptions = false;
var iconOnDifficulty = false;
var iconOnSpeaker = false;
var startScreenDownKeyDown = false;
var endScreenDownKeyDown = false;
var startScreenUpKeyDown = false;
var endScreenUpKeyDown = false;
var optionsScreen = false;
var iconOnShootKey = false;
var iconOnBombKey = false;
var iconOnUpKey = false;
var iconOnDownKey = false;
var iconOnLeftKey = false;
var iconOnRightKey = false;
var iconOnOptBack = false;
var startScreenEnterKeyDown = false;
var endScreenEnterKeyDown = false;
var startScreenSpaceKeyDown = false;
var endScreenSpaceKeyDown = false;
var endScreenWKeyDown = false;
var endScreenSKeyDown = false;
var endScreenJKeyDown = false;
var endScreenKKeyDown = false;
var shootKey = "SHIFT";
var shootKeyDisplay = "SHIFT";
var bombKey = "SPACE";
var bombKeyDisplay = "SPACE";
var upKey = "UP"
var upKeyDisplay = "↑"
var downKey = "DOWN"
var downKeyDisplay = "↓"
var leftKey = "LEFT"
var leftKeyDisplay = "←"
var rightKey = "RIGHT"
var rightKeyDisplay = "→"
var choosingKey = false;
var difficultyScreen = false;
var difficulty = "easy";
var iconOnEasy = false;
var iconOnMedium = false;
var iconOnHard = false;
var iconOnBack = false;
var fx;
var scoreSummary;
var gameTime = false;
var cursorOnPlayAgain = false;
var cursorOnStartScreen = false;
var preStarted = false;
var shakerGenRate = 0.0667;
var soundOn = true;
var soundToggled = false;
var startScreenJKeyDown = false;
var startScreenKKeyDown = false;
var startScreenWKeyDown = false;
var startScreenSKeyDown = false;
var startScreenAKeyDown = false;
var startScreenDKeyDown = false;
var gameTimeJKeyDown = false;
var gameTimeKKeyDown = false;
var shakeSounded = false;
var bgfxPlaying = false;

var font = new FontFaceObserver('East Sea Dokdo', {});

font.load('MH').then(function () {}, function () {
//  alert('Fonts did not load properly, click/tap reload button or hit CTRL + R please!');
});
var game = new Phaser.Game(config);

var approxeq = function(v1, v2, epsilon) {
  if (epsilon == null) {
    epsilon = 0.001;
  }
  return Math.abs(v1 - v2) < epsilon;
};

function preload ()
{
	this.load.image('saltbae', 'assets/saltbae.png');
	this.load.image('bgboard', 'assets/bgboard.png');
	this.load.image('salt', 'assets/grain.png');
	this.load.image('meat', 'assets/meat.png');
	this.load.image('shaker', 'assets/shaker.png');
	this.load.image('shakerIcon', 'assets/shakericon.png');
	this.load.image('speakerOn', 'assets/speakeron.png');
	this.load.image('speakerOff', 'assets/speakeroff.png');
	this.load.audio('sfx', ['assets/saltshake.mp3']);
	this.load.audio('bombfx', ['assets/bomb.mp3']);
	this.load.audio('bgfx', ['assets/bg.mp3']);
	this.load.audio('dingfx', ['assets/ding.mp3']);
}

function create ()
{
	this.add.image(400, 300, 'bgboard');
	saltbae     = this.add.sprite(400, 500, 'saltbae');
	salt        = this.physics.add.sprite(900, 900, 'salt');
	meat1       = this.physics.add.sprite(config.width/2 - 60, config.height/2, 'meat');
	meat2       = this.physics.add.sprite(config.width/2 + 60, config.height/2, 'meat');
	shaker1     = this.physics.add.sprite(config.width, config.height, 'shaker');
	shaker2     = this.physics.add.sprite(config.width, config.height, 'shaker');
	shaker3     = this.physics.add.sprite(config.width, config.height, 'shaker');
	shaker4     = this.physics.add.sprite(config.width, config.height, 'shaker');
	shaker5     = this.physics.add.sprite(config.width, config.height, 'shaker');
	shakerIcon1 = this.physics.add.sprite(13, config.height - 20, 'shakerIcon');
	shakerIcon2 = this.physics.add.sprite(33, config.height - 20, 'shakerIcon');
	shakerIcon3 = this.physics.add.sprite(53, config.height - 20, 'shakerIcon');
	shakerIcon4 = this.physics.add.sprite(73, config.height - 20, 'shakerIcon');
	shakerIcon5 = this.physics.add.sprite(93, config.height - 20, 'shakerIcon');
	shakerIcon6 = this.physics.add.sprite(13, config.height - 40, 'shakerIcon');
	shakerIcon7 = this.physics.add.sprite(33, config.height - 40, 'shakerIcon');
	shakerIcon8 = this.physics.add.sprite(53, config.height - 40, 'shakerIcon');
	shakerIcon9 = this.physics.add.sprite(73, config.height - 40, 'shakerIcon');
	shaker1.setVisible(false);
	shaker2.setVisible(false);
	shaker3.setVisible(false);
	shaker4.setVisible(false);
	shaker5.setVisible(false);
	shakerIcon3.setVisible(false);
	shakerIcon4.setVisible(false);
	shakerIcon5.setVisible(false);
	shakerIcon6.setVisible(false);
	shakerIcon7.setVisible(false);
	shakerIcon8.setVisible(false);
	shakerIcon9.setVisible(false);
	outGraphics = this.add.graphics();
	inGraphics  = this.add.graphics();

	outGraphics.lineStyle(2, 0xffffff, 1);
	saltMeterOutline = outGraphics.strokeRect(6, 6, 108, 28);

	scoreText = this.add.text(config.width - 6, 4, 'score: 0', { fontFamily: 'Trebuchet MS', fontSize: '26px', color: '#ffffff' }).setOrigin(1, 0);
	timerStaticText = this.add.text(config.width - 28, 30, 'time: ', {fontFamily: 'Trebuchet MS', fontSize: '26px', color: '#ffffff' }).setOrigin(1, 0);
	timerText = this.add.text(config.width - 6, 30, time, {fontFamily: 'Trebuchet MS', fontSize: '26px', color: '#ffffff' }).setOrigin(1, 0);
	pointsText0 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText1 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText2 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText3 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText4 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText5 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText6 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText7 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText8 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);
	pointsText9 = this.add.text(config.width - 100, config.height - 100, '+10', {fontFamily: 'Courier', fontSize: '16px', color: '#ffffff' }).setVisible(false);

	startScreenArea = this.add.graphics();
	startScreenArea.fillStyle(0x000000, 0.7);
	startScreenAreaBg = startScreenArea.fillRect(0, 0, config.width, config.height, 0.7);
	startScreenAreaTitle = this.add.text(config.width/2, config.height*.3, 'Salt Bae: the Game', {fontSize: '116px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5);
	startScreenAreaStart = this.add.text(config.width/2 - 60, config.height*.5, 'Start', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setFontStyle('bold');
	startScreenAreaOptions = this.add.text(config.width/2 - 60, config.height*.5+42, 'Options', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	startScreenAreaDifficulty = this.add.text(config.width/2 - 60, config.height*.5+90, 'Difficulty', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	startScreenAreaIcon1 =  this.add.sprite(config.width/2 - 85, config.height*.573, 'shaker');
	startScreenAreaIcon2 =  this.add.sprite(config.width/2 - 85, config.height*.65, 'shaker').setVisible(false);
	startScreenAreaIcon3 =  this.add.sprite(config.width/2 - 85, config.height*.72, 'shaker').setVisible(false);
	startScreenAreaIcon4 =  this.add.sprite(config.width*.89, config.height*.94, 'shaker').setVisible(false);
	speakerOn   = this.add.sprite(config.width/1.05, config.height/1.07, 'speakerOn');
	speakerOff  = this.add.sprite(config.width/1.05, config.height/1.07, 'speakerOff').setVisible(false);

	endScreenArea = this.add.graphics().setVisible(false);
	endScreenArea.fillStyle(0x000000, 0.7);
	endScreenAreaBg = endScreenArea.fillRect(0, 0, config.width, config.height, 0.7).setVisible(false);
	endScreenAreaDifficulty = this.add.text(config.width/2, config.height*.15, 'difficulty: ' + difficulty, {fontSize: '72px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5).setVisible(false);
	endScreenAreaScore = this.add.text(config.width/2, config.height*.3, 'Your Score: ' + score, {fontSize: '116px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5).setVisible(false);
	endScreenAreaSummary = this.add.text(config.width/2, config.height*.45, scoreSummary, {fontSize: '72px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5).setVisible(false);
	endScreenAreaPlayAgain = this.add.text(config.width/2 - 60, config.height*.6, 'Play Again', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	endScreenAreaStartScreen = this.add.text(config.width/2 - 60, config.height*.7, 'Start Screen', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	endScreenAreaIcon1 = this.add.sprite(config.width/2 - 85, config.height*.67, 'shaker').setVisible(false);
	endScreenAreaIcon2 = this.add.sprite(config.width/2 - 85, config.height*.77, 'shaker').setVisible(false);

	optionsScreenAreaTitle = this.add.text(config.width/2, config.height*.15, 'Options', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5);
	difficultyScreenAreaTitle = this.add.text(config.width/2, config.height*.15, 'Difficulty', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5).setVisible(false);
	difficultyScreenAreadiff = this.add.text(config.width/2, config.height*.27, 'Setting: ' + difficulty, {fontSize: '48px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setOrigin(0.5).setVisible(false);
	difficultyScreenAreaEasy   = this.add.text(config.width/2 - 60, config.height*.5-100,    'Easy',   {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setFontStyle('bold').setVisible(false);
	difficultyScreenAreaMedium = this.add.text(config.width/2 - 60, config.height*.5+47-100, 'Medium', {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	difficultyScreenAreaHard   = this.add.text(config.width/2 - 60, config.height*.5+90-100, 'Hard',   {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	difficultyScreenAreaBack   = this.add.text(config.width/2 - 60, config.height*.5+70,     'Back',   {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	difficultyScreenAreaIcon1 =  this.add.sprite(config.width/2 - 85, config.height*.41, 'shaker').setVisible(false);
	difficultyScreenAreaIcon2 =  this.add.sprite(config.width/2 - 85, config.height*.49, 'shaker').setVisible(false);
	difficultyScreenAreaIcon3 =  this.add.sprite(config.width/2 - 85, config.height*.57, 'shaker').setVisible(false);
	difficultyScreenAreaIcon4 =  this.add.sprite(config.width/2 - 85, config.height*.69, 'shaker').setVisible(false);
	difficultyScreenAreaIcon5 =  this.add.sprite(config.width*.89, config.height*.94, 'shaker').setVisible(false);
	optionsScreenAreaShoot = this.add.text(config.width*.2, config.height*.25, 'Set Shoot Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyShoot = this.add.text(config.width*.7, config.height*.25, shootKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaBomb = this.add.text(config.width*.2, config.height*.33, 'Set Bomb Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyBomb = this.add.text(config.width*.7, config.height*.33, bombKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaUp = this.add.text(config.width*.2, config.height*.41, 'Set Up Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyUp = this.add.text(config.width*.7, config.height*.41, upKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaDown = this.add.text(config.width*.2, config.height*.49, 'Set Down Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyDown = this.add.text(config.width*.7, config.height*.49, downKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaLeft = this.add.text(config.width*.2, config.height*.57, 'Set Left Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyLeft = this.add.text(config.width*.7, config.height*.57, leftKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaRight = this.add.text(config.width*.2, config.height*.65, 'Set Right Key', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"');
	optionsScreenAreaKeyRight = this.add.text(config.width*.7, config.height*.65, rightKeyDisplay, {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaBack = this.add.text(config.width*.2, config.height*.73, 'Back', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaKeyBack = this.add.text(config.width*.7, config.height*.73, 'Back', {fontSize: '64px', color: '#ffffff' }).setFontFamily('"East Sea Dokdo"').setVisible(false);
	optionsScreenAreaIcon1 =  this.add.sprite(config.width*.2 - 30, config.height*.32, 'shaker').setVisible(false);
	optionsScreenAreaIcon2 =  this.add.sprite(config.width*.2 - 30, config.height*.40, 'shaker').setVisible(false);
	optionsScreenAreaIcon3 =  this.add.sprite(config.width*.2 - 30, config.height*.48, 'shaker').setVisible(false);
	optionsScreenAreaIcon4 =  this.add.sprite(config.width*.2 - 30, config.height*.56, 'shaker').setVisible(false);
	optionsScreenAreaIcon5 =  this.add.sprite(config.width*.2 - 30, config.height*.64, 'shaker').setVisible(false);
	optionsScreenAreaIcon6 =  this.add.sprite(config.width*.2 - 30, config.height*.72, 'shaker').setVisible(false);
	optionsScreenAreaIcon7 =  this.add.sprite(config.width*.2 - 30, config.height*.80, 'shaker').setVisible(false);
	optionsScreenAreaIcon8 =  this.add.sprite(config.width*.9 - 8, config.height*.94, 'shaker').setVisible(false);
	optionsScreenAreaTitle.setVisible(false);
	optionsScreenAreaShoot.setVisible(false);
	optionsScreenAreaBomb.setVisible(false);
	optionsScreenAreaUp.setVisible(false);
	optionsScreenAreaDown.setVisible(false);
	optionsScreenAreaLeft.setVisible(false);
	optionsScreenAreaRight.setVisible(false);

	preStartArea = this.add.graphics();
	preStartReadyText = this.add.text(config.width/2, config.height*.25, 'Ready...', {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setAlpha(0).setScale(8, 8).setOrigin(0.5);
	preStartGoText = this.add.text(-100, config.height*.25, 'GO!!', {fontSize: '64px', color: '#ffffff', }).setFontFamily('"East Sea Dokdo"').setFontStyle('bold').setOrigin(0.5);

	fx = this.sound.add('sfx');
	fx.setVolume(0);
	bombfx = this.sound.add('bombfx');
	bgfx = this.sound.add('bgfx');
	dingfx = this.sound.add('dingfx');

	preStartGoEnterTween = this.tweens.add({
		targets: preStartGoText,
		x: { value: config.width/2, duration: 500, ease: 'Power2' },
		paused: true,
		onComplete: function (tween, targets, myImage) {preStartGoExitTween.restart()}
	})
	preStartGoExitTween = this.tweens.add({
		targets: preStartGoText,
		x: { value: config.width + 100, duration: 500, ease: 'Power2' },
		paused: true,
		delay: 1000,
		onComplete: setGameStartVars
	})
	preStartReadyEnterTween = this.tweens.add({
		targets: preStartReadyText,
		alpha: 1,
		scaleX: 1,
		scaleY: 1,
		duration: 1000,
		paused: true,
		onComplete: function (tween, targets, myImage) {preStartReadyExitTween.restart()}
	});
	preStartReadyExitTween = this.tweens.add({
		targets: preStartReadyText,
		alpha: 0,
		duration: 1000,
		paused: true,
		onComplete: function (tween, targets, myImage) {preStartGoEnterTween.restart()}
	});

	cursors = this.input.keyboard.createCursorKeys();

	keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[shootKey]);
	keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[bombKey]);
	keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

	difficultyIconTween1 = this.tweens.add({
		targets: difficultyScreenAreaIcon1,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	difficultyIconTween2 = this.tweens.add({
		targets: difficultyScreenAreaIcon2,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	difficultyIconTween3 = this.tweens.add({
		targets: difficultyScreenAreaIcon3,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	difficultyIconTween4 = this.tweens.add({
		targets: difficultyScreenAreaIcon4,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	difficultyIconTween5 = this.tweens.add({
		targets: difficultyScreenAreaIcon5,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween1 = this.tweens.add({
		targets: optionsScreenAreaIcon1,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween2 = this.tweens.add({
		targets: optionsScreenAreaIcon2,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween3 = this.tweens.add({
		targets: optionsScreenAreaIcon3,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween4 = this.tweens.add({
		targets: optionsScreenAreaIcon4,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween5 = this.tweens.add({
		targets: optionsScreenAreaIcon5,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween6 = this.tweens.add({
		targets: optionsScreenAreaIcon6,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween7 = this.tweens.add({
		targets: optionsScreenAreaIcon7,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	optionsIconTween8 = this.tweens.add({
		targets: optionsScreenAreaIcon8,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	startSaltIconTween1 = this.tweens.add({
		targets: startScreenAreaIcon1,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	startSaltIconTween2 = this.tweens.add({
		targets: startScreenAreaIcon2,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	startSaltIconTween3 = this.tweens.add({
		targets: startScreenAreaIcon3,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	startSaltIconTween4 = this.tweens.add({
		targets: startScreenAreaIcon4,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	endScreenAreaIconTween1 = this.tweens.add({
		targets: endScreenAreaIcon1,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	endScreenAreaIconTween2 = this.tweens.add({
		targets: endScreenAreaIcon2,
		props: {
			y: { value: '-=10', duration: 200 }
		},
		paused: false,
		yoyo: true,
		repeat: -1
	});
	tween0 = this.tweens.add({
		targets: pointsText0,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween1 = this.tweens.add({
		targets: pointsText1,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween2 = this.tweens.add({
		targets: pointsText2,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween3 = this.tweens.add({
		targets: pointsText3,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween4 = this.tweens.add({
		targets: pointsText4,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween5 = this.tweens.add({
		targets: pointsText5,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween6 = this.tweens.add({
		targets: pointsText6,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween7 = this.tweens.add({
		targets: pointsText7,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween8 = this.tweens.add({
		targets: pointsText8,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});
	tween9 = this.tweens.add({
		targets: pointsText9,
		props: {
			y: { value: '-=10', duration: 1000 }
		},
		paused: true,
		onComplete: onCompleteHandler
	});

	shakeStartTween = this.tweens.add({
		targets: fx,
		volume: 10,
		duration: 700,
		//paused: true,
		onStart: function () {fx.play()}
	});
	shakePauseTween = this.tweens.add({
		targets: fx,
		volume: 0,
		duration: 700,
		//pause: true,
		onComplete: function () {fx.stop()}
	});
}


function onCompleteHandler (tween, targets, myImage)
{
	targets[0].setVisible(false);
}

function setGameStartVars ()
{
	if (difficulty == "easy")
	{
		shakerGenRate = 0.09;
		saltbombs = 3;
	}
	if (difficulty == "medium")
	{
		shakerGenRate = 0.0667;
		saltbombs = 2;
	}
	if (difficulty == "hard")
	{
		shakerGenRate = 0.045;
		saltbombs = 1;
	}
	shaker1.setVisible(false);
	shaker2.setVisible(false);
	shaker3.setVisible(false);
	shaker4.setVisible(false);
	shaker5.setVisible(false);
	meat1.x = config.width/2 - 60
	meat1.y = config.height/2
	meat2.x = config.width/2 + 60
	meat2.y = config.height/2
	preStart = false;
	gameTime = true;
	time = 60;
	score = 0;
	scoreText.setText('score: ' + score);
	clock = setInterval(function () {time -= 1}, 1000);
}

function update ()
{
	if (soundOn == true && bgfxPlaying == false)
	{
		bgfx.play();
		bgfxPlaying = true;
	}
	if (soundOn == false && bgfxPlaying == true)
	{
		bgfx.stop();
		bgfxPlaying = false;
	}
	if (startScreen == true)
	{
		if (cursors.up.isDown == false && startScreenUpKeyDown == true)
		{
			startScreenUpKeyDown = false;
		}
		if (cursors.down.isDown == false && startScreenDownKeyDown == true)
		{
			startScreenDownKeyDown = false;
		}
		if (keyEnter.isDown == false && startScreenEnterKeyDown == true)
		{
			startScreenEnterKeyDown = false;
		}
		if (keySpace.isDown == false && startScreenSpaceKeyDown == true)
		{
			startScreenSpaceKeyDown = false;
		}
		if (keyJ.isDown == false && startScreenJKeyDown == true)
		{
			startScreenJKeyDown = false;
		}
		if (keyJ.isDown == false && endScreenJKeyDown == true)
		{
			endScreenJKeyDown = false;
		}
		if (keyK.isDown == false && startScreenKKeyDown == true)
		{
			startScreenKKeyDown = false;
		}
		if (keyK.isDown == false && endScreenKKeyDown == true)
		{
			endScreenKKeyDown = false;
		}
		if (keyW.isDown == false && startScreenWKeyDown == true)
		{
			startScreenWKeyDown = false;
		}
		if (keyS.isDown == false && startScreenSKeyDown == true)
		{
			startScreenSKeyDown = false;
		}
		if (iconOnStart == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && endScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false && endScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false && endScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false && endScreenKKeyDown == false)
			{
				startScreen = false;
				preStart = true;
				startScreenArea.setVisible(false);
				startScreenAreaTitle.setVisible(false);
				startScreenAreaStart.setVisible(false);
				startScreenAreaOptions.setVisible(false);
				startScreenAreaDifficulty.setVisible(false);
				startScreenAreaIcon1.setVisible(false);
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon4.setVisible(false);
				iconOnStart = false;
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				startScreenAreaIcon1.setVisible(false);
				startScreenAreaIcon4.setVisible(true);
				iconOnStart = false;
				iconOnSpeaker = true;
				startScreenAreaStart.setFontStyle('normal');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				startScreenAreaIcon1.setVisible(false);
				startScreenAreaIcon2.setVisible(true);
				iconOnStart = false;
				iconOnOptions = true;
				startScreenAreaStart.setFontStyle('normal');
				startScreenAreaOptions.setFontStyle('bold');
			}
		}
		if (iconOnOptions == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenEnterKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenKKeyDown = true;
				}
				optionsScreen = true;
				startScreen = false;
				iconOnShootKey = true;
				startScreenAreaTitle.setVisible(false);
				startScreenAreaStart.setVisible(false);
				startScreenAreaOptions.setVisible(false);
				startScreenAreaDifficulty.setVisible(false);
				startScreenAreaIcon1.setVisible(false);
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon4.setVisible(false);
				optionsScreenAreaTitle.setVisible(true);
				optionsScreenAreaShoot.setVisible(true);
				optionsScreenAreaShoot.setFontStyle('bold');
				optionsScreenAreaBomb.setVisible(true);
				optionsScreenAreaUp.setVisible(true);
				optionsScreenAreaDown.setVisible(true);
				optionsScreenAreaLeft.setVisible(true);
				optionsScreenAreaRight.setVisible(true);
				optionsScreenAreaBack.setVisible(true);
				optionsScreenAreaIcon1.setVisible(true);
				optionsScreenAreaKeyShoot.setVisible(true);
				optionsScreenAreaKeyBomb.setVisible(true);
				optionsScreenAreaKeyUp.setVisible(true);
				optionsScreenAreaKeyDown.setVisible(true);
				optionsScreenAreaKeyLeft.setVisible(true);
				optionsScreenAreaKeyRight.setVisible(true);
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon1.setVisible(true);
				iconOnOptions = false;
				iconOnStart = true;
				startScreenAreaOptions.setFontStyle('normal');
				startScreenAreaStart.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon3.setVisible(true);
				iconOnOptions = false;
				iconOnDifficulty = true;
				startScreenAreaOptions.setFontStyle('normal');
				startScreenAreaDifficulty.setFontStyle('bold');
			}
		}
		if (iconOnDifficulty == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				iconOnDifficulty = false;
				difficultyScreen = true;
				startScreen = false;
				iconOnEasy = true;
				startScreenAreaTitle.setVisible(false);
				startScreenAreaStart.setVisible(false);
				startScreenAreaOptions.setVisible(false);
				startScreenAreaDifficulty.setVisible(false);
				startScreenAreaIcon1.setVisible(false);
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon4.setVisible(false);
				difficultyScreenAreaTitle.setVisible(true);
				difficultyScreenAreadiff.setText('Setting: ' + difficulty);
				difficultyScreenAreadiff.setVisible(true);
				difficultyScreenAreaEasy.setVisible(true);
				difficultyScreenAreaMedium.setVisible(true);
				difficultyScreenAreaHard.setVisible(true);
				difficultyScreenAreaBack.setVisible(true);
				difficultyScreenAreaIcon1.setVisible(true);
				difficultyScreenAreaEasy.setFontStyle('bold');
				startScreenAreaDifficulty.setFontStyle('normal');

			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon2.setVisible(true);
				iconOnDifficulty = false;
				iconOnOptions = true;
				startScreenAreaDifficulty.setFontStyle('normal');
				startScreenAreaOptions.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon4.setVisible(true);
				iconOnDifficulty = false;
				iconOnSpeaker = true;
				startScreenAreaDifficulty.setFontStyle('normal');
			}
		}
		if (iconOnSpeaker == true)
		{
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				startScreenAreaIcon4.setVisible(false);
				startScreenAreaIcon3.setVisible(true);
				iconOnSpeaker = false;
				iconOnDifficulty = true;
				startScreenAreaDifficulty.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				startScreenAreaIcon4.setVisible(false);
				startScreenAreaIcon1.setVisible(true);
				iconOnSpeaker = false;
				iconOnStart = true;
				startScreenAreaStart.setFontStyle('bold');
			}
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				if (soundOn == false && soundToggled == false)
				{
					soundOn = true;
					speakerOn.setVisible(true);
					speakerOff.setVisible(false);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
				if (soundOn == true && soundToggled == false)
				{
					soundOn = false;
					speakerOn.setVisible(false);
					speakerOff.setVisible(true);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
			}
			if (keySpace.isUp == true && soundToggled == true ||
				keyEnter.isUp == true && soundToggled == true ||
				keyJ.isUp == true && soundToggled == true ||
				keyK.isUp == true && soundToggled == true)
			{
				soundToggled = false;
			}
		}
	}

	if (difficultyScreen == true)
	{
		if (cursors.up.isDown == false && startScreenUpKeyDown == true)
		{
			startScreenUpKeyDown = false;
		}
		if (cursors.down.isDown == false && startScreenDownKeyDown == true)
		{
			startScreenDownKeyDown = false;
		}
		if (keyEnter.isDown == false && startScreenEnterKeyDown == true)
		{
			startScreenEnterKeyDown = false;
		}
		if (keySpace.isDown == false && startScreenSpaceKeyDown == true)
		{
			startScreenSpaceKeyDown = false;
		}
		if (keyJ.isDown == false && startScreenJKeyDown == true)
		{
			startScreenJKeyDown = false;
		}
		if (keyK.isDown == false && startScreenKKeyDown == true)
		{
			startScreenKKeyDown = false;
		}
		if (keyW.isDown == false && startScreenWKeyDown == true && choosingKey == false)
		{
			startScreenWKeyDown = false;
		}
		if (keyS.isDown == false && startScreenSKeyDown == true && choosingKey == false)
		{
			startScreenSKeyDown = false;
		}
		if (iconOnEasy == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				difficulty = "easy"
				difficultyScreenAreadiff.setText('Setting: ' + difficulty);
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenEnterKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenKKeyDown = true;
				}
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				difficultyScreenAreaIcon1.setVisible(false);
				difficultyScreenAreaIcon5.setVisible(true);
				iconOnEasy = false;
				iconOnSpeaker = true;
				difficultyScreenAreaEasy.setFontStyle('normal');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				difficultyScreenAreaIcon1.setVisible(false);
				difficultyScreenAreaIcon2.setVisible(true);
				iconOnEasy = false;
				iconOnMedium = true;
				difficultyScreenAreaEasy.setFontStyle('normal');
				difficultyScreenAreaMedium.setFontStyle('bold');
			}
		}
		if (iconOnMedium == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				difficulty = "medium"
				difficultyScreenAreadiff.setText('Setting: ' + difficulty);
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenEnterKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenKKeyDown = true;
				}
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				difficultyScreenAreaIcon2.setVisible(false);
				difficultyScreenAreaIcon1.setVisible(true);
				iconOnMedium = false;
				iconOnEasy = true;
				difficultyScreenAreaMedium.setFontStyle('normal');
				difficultyScreenAreaEasy.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				difficultyScreenAreaIcon2.setVisible(false);
				difficultyScreenAreaIcon3.setVisible(true);
				iconOnMedium = false;
				iconOnHard = true;
				difficultyScreenAreaMedium.setFontStyle('normal');
				difficultyScreenAreaHard.setFontStyle('bold');
			}
		}
		if (iconOnHard == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				difficulty = "hard"
				difficultyScreenAreadiff.setText('Setting: ' + difficulty);
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenEnterKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenKKeyDown = true;
				}
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				difficultyScreenAreaIcon3.setVisible(false);
				difficultyScreenAreaIcon2.setVisible(true);
				iconOnHard = false;
				iconOnMedium = true;
				difficultyScreenAreaHard.setFontStyle('normal');
				difficultyScreenAreaMedium.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				difficultyScreenAreaIcon3.setVisible(false);
				difficultyScreenAreaIcon4.setVisible(true);
				iconOnHard = false;
				iconOnBack = true;
				difficultyScreenAreaHard.setFontStyle('normal');
				difficultyScreenAreaBack.setFontStyle('bold');
			}
		}
		if (iconOnBack == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				iconOnBack = false;
				difficultyScreen = false;
				startScreen = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenEnterKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenKKeyDown = true;
				}
				iconOnStart = true;
				startScreenAreaTitle.setVisible(true);
				startScreenAreaStart.setVisible(true);
				startScreenAreaOptions.setVisible(true);
				startScreenAreaDifficulty.setVisible(true);
				startScreenAreaIcon1.setVisible(true);
				startScreenAreaIcon2.setVisible(false);
				startScreenAreaIcon3.setVisible(false);
				startScreenAreaIcon4.setVisible(false);
				difficultyScreenAreaTitle.setVisible(false);
				difficultyScreenAreadiff.setVisible(false);
				difficultyScreenAreaEasy.setVisible(false);
				difficultyScreenAreaMedium.setVisible(false);
				difficultyScreenAreaHard.setVisible(false);
				difficultyScreenAreaBack.setVisible(false);
				difficultyScreenAreaIcon4.setVisible(false);
				difficultyScreenAreaBack.setFontStyle('normal');
				startScreenAreaStart.setFontStyle('bold');
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				difficultyScreenAreaIcon4.setVisible(false);
				difficultyScreenAreaIcon3.setVisible(true);
				iconOnBack = false;
				iconOnHard = true;
				difficultyScreenAreaBack.setFontStyle('normal');
				difficultyScreenAreaHard.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				difficultyScreenAreaIcon4.setVisible(false);
				difficultyScreenAreaIcon5.setVisible(true);
				iconOnBack = false;
				iconOnSpeaker = true;
				difficultyScreenAreaBack.setFontStyle('normal');
			}
		}
		if (iconOnSpeaker == true)
		{
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				difficultyScreenAreaIcon5.setVisible(false);
				difficultyScreenAreaIcon4.setVisible(true);
				iconOnSpeaker = false;
				iconOnBack = true;
				difficultyScreenAreaBack.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				difficultyScreenAreaIcon5.setVisible(false);
				difficultyScreenAreaIcon1.setVisible(true);
				iconOnSpeaker = false;
				iconOnEasy = true;
				difficultyScreenAreaEasy.setFontStyle('bold');
			}
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				if (soundOn == false && soundToggled == false)
				{
					soundOn = true;
					speakerOn.setVisible(true);
					speakerOff.setVisible(false);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
				if (soundOn == true && soundToggled == false)
				{
					soundOn = false;
					speakerOn.setVisible(false);
					speakerOff.setVisible(true);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
			}
			if (keySpace.isUp == true && soundToggled == true &&
				keyJ.isUp == true &&
				keyK.isUp == true &&
				keyEnter.isUp == true)
			{
				soundToggled = false;
			}
		}
	}

	if (optionsScreen == true)
	{
		if (cursors.up.isUp == true && startScreenUpKeyDown == true && choosingKey == false)
		{
			startScreenUpKeyDown = false;
		}
		if (cursors.down.isUp == true && startScreenDownKeyDown == true && choosingKey == false)
		{
			startScreenDownKeyDown = false;
		}
		if (keyEnter.isDown == false && startScreenEnterKeyDown == true && choosingKey == false)
		{
			startScreenEnterKeyDown = false;
		}
		if (keySpace.isDown == false && startScreenSpaceKeyDown == true && choosingKey == false)
		{
			startScreenSpaceKeyDown = false;
		}
		if (keyJ.isDown == false && startScreenJKeyDown == true && choosingKey == false)
		{
			startScreenJKeyDown = false;
		}
		if (keyK.isDown == false && startScreenKKeyDown == true && choosingKey == false)
		{
			startScreenKKeyDown = false;
		}
		if (keyW.isDown == false && startScreenWKeyDown == true && choosingKey == false)
		{
			startScreenWKeyDown = false;
		}
		if (keyS.isDown == false && startScreenSKeyDown == true && choosingKey == false)
		{
			startScreenSKeyDown = false;
		}
		if (iconOnShootKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					shootKey = event.key.toUpperCase();
					shootKeyDisplay = shootKey;
					if (shootKey == "CONTROL") {shootKeyDisplay = shootKey = "CTRL"};
					if (shootKey == " ") {shootKeyDisplay = shootKey = "SPACE"};
					if (shootKey == "CAPSLOCK") {shootKey = "CAPS_LOCK"; shootKeyDisplay = "CAPSLOCK"};
					if (shootKey == "ESCAPE") {shootKeyDisplay = shootKey = "ESC"};
					if (shootKey == "PAGEUP") {shootKey = "PAGE_UP"; shootKeyDisplay = "PAGEUP"};
					if (shootKey == "PAGEDOWN") {shootKey = "PAGE_DOWN"; shootKeyDisplay = "PAGEDOWN"};
					if (shootKey == "ARROWUP") {shootKey = "UP"; shootKeyDisplay = "↑"};
					if (shootKey == "ARROWDOWN") {shootKey = "DOWN"; shootKeyDisplay = "↓"};
					if (shootKey == "ARROWLEFT") {shootKey = "LEFT"; shootKeyDisplay = "←"};
					if (shootKey == "ARROWRIGHT") {shootKey = "RIGHT"; shootKeyDisplay = "→"};
					if (shootKey == "0") {shootKey = "ZERO"; shootKeyDisplay = "0"};
					if (shootKey == "1") {shootKey = "ONE"; shootKeyDisplay = "1"};
					if (shootKey == "2") {shootKey = "TWO"; shootKeyDisplay = "2"};
					if (shootKey == "3") {shootKey = "THREE"; shootKeyDisplay = "3"};
					if (shootKey == "4") {shootKey = "FOUR"; shootKeyDisplay = "4"};
					if (shootKey == "5") {shootKey = "FIVE"; shootKeyDisplay = "5"};
					if (shootKey == "6") {shootKey = "SIX"; shootKeyDisplay = "6"};
					if (shootKey == "7") {shootKey = "SEVEN"; shootKeyDisplay = "7"};
					if (shootKey == "8") {shootKey = "EIGHT"; shootKeyDisplay = "8"};
					if (shootKey == "9") {shootKey = "NINE"; shootKeyDisplay = "9"};
					if (shootKey == ";") {shootKey = "SEMICOLON"; shootKeyDisplay = ";"};
					if (shootKey == ",") {shootKey = "COMMA"; shootKeyDisplay = ","};
					if (shootKey == "-") {shootKey = "MINUS"; shootKeyDisplay = "-"};
					if (shootKey == ".") {shootKey = "PERIOD"; shootKeyDisplay = "."};
					if (shootKey == "/") {shootKey = "FORWARD_SLASH"; shootKeyDisplay = "/"};
					if (shootKey == "\\") {shootKey = "BACK_SLASH"; shootKeyDisplay = "\\"};
					if (shootKey == "'") {shootKey = "QUOTES"; shootKeyDisplay = "'"};
					if (shootKey == "[") {shootKey = "OPEN_BRACKET"; shootKeyDisplay = "["};
					if (shootKey == "]") {shootKey = "CLOSE_BRACKET"; shootKeyDisplay = "]"};
					optionsScreenAreaKeyShoot.setText(shootKeyDisplay);
					keyJ = this.addKey(Phaser.Input.Keyboard.KeyCodes[shootKey]);
					choosingKey = false;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon1.setVisible(false);
				optionsScreenAreaIcon8.setVisible(true);
				iconOnShootKey = false;
				iconOnSpeaker = true;
				optionsScreenAreaShoot.setFontStyle('normal');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon1.setVisible(false);
				optionsScreenAreaIcon2.setVisible(true);
				iconOnShootKey = false;
				iconOnBombKey = true;
				optionsScreenAreaShoot.setFontStyle('normal');
				optionsScreenAreaBomb.setFontStyle('bold');
			}
		}
		if (iconOnBombKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					bombKey = event.key.toUpperCase();
					bombKeyDisplay = bombKey;
					if (bombKey == "CONTROL") {bombKeyDisplay = bombKey = "CTRL"};
					if (bombKey == " ") {bombKeyDisplay = bombKey = "SPACE"};
					if (bombKey == "CAPSLOCK") {bombKey = "CAPS_LOCK"; bombKeyDisplay = "CAPSLOCK"};
					if (bombKey == "ESCAPE") {bombKeyDisplay = bombKey = "ESC"};
					if (bombKey == "PAGEUP") {bombKey = "PAGE_UP"; bombKeyDisplay = "PAGEUP"};
					if (bombKey == "PAGEDOWN") {bombKey = "PAGE_DOWN"; bombKeyDisplay = "PAGEDOWN"};
					if (bombKey == "ARROWUP") {bombKey = "UP"; bombKeyDisplay = "↑"};
					if (bombKey == "ARROWDOWN") {bombKey = "DOWN"; bombKeyDisplay = "↓"};
					if (bombKey == "ARROWLEFT") {bombKey = "LEFT"; bombKeyDisplay = "←"};
					if (bombKey == "ARROWRIGHT") {bombKey = "RIGHT"; bombKeyDisplay = "→"};
					if (bombKey == "0") {bombKey = "ZERO"; bombKeyDisplay = "0"};
					if (bombKey == "1") {bombKey = "ONE"; bombKeyDisplay = "1"};
					if (bombKey == "2") {bombKey = "TWO"; bombKeyDisplay = "2"};
					if (bombKey == "3") {bombKey = "THREE"; bombKeyDisplay = "3"};
					if (bombKey == "4") {bombKey = "FOUR"; bombKeyDisplay = "4"};
					if (bombKey == "5") {bombKey = "FIVE"; bombKeyDisplay = "5"};
					if (bombKey == "6") {bombKey = "SIX"; bombKeyDisplay = "6"};
					if (bombKey == "7") {bombKey = "SEVEN"; bombKeyDisplay = "7"};
					if (bombKey == "8") {bombKey = "EIGHT"; bombKeyDisplay = "8"};
					if (bombKey == "9") {bombKey = "NINE"; bombKeyDisplay = "9"};
					if (bombKey == ";") {bombKey = "SEMICOLON"; bombKeyDisplay = ";"};
					if (bombKey == ",") {bombKey = "COMMA"; bombKeyDisplay = ","};
					if (bombKey == "-") {bombKey = "MINUS"; bombKeyDisplay = "-"};
					if (bombKey == ".") {bombKey = "PERIOD"; bombKeyDisplay = "."};
					if (bombKey == "/") {bombKey = "FORWARD_SLASH"; bombKeyDisplay = "/"};
					if (bombKey == "\\") {bombKey = "BACK_SLASH"; bombKeyDisplay = "\\"};
					if (bombKey == "'") {bombKey = "QUOTES"; bombKeyDisplay = "'"};
					if (bombKey == "[") {bombKey = "OPEN_BRACKET"; bombKeyDisplay = "["};
					if (bombKey == "]") {bombKey = "CLOSE_BRACKET"; bombKeyDisplay = "N/A"};
					if (bombKey == "=") {bombKey = "EQUALS"; bombKeyDisplay = "N/A"};
					optionsScreenAreaKeyBomb.setText(bombKeyDisplay);
					keyK = this.addKey(Phaser.Input.Keyboard.KeyCodes[bombKey]);
					choosingKey = false;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon2.setVisible(false);
				optionsScreenAreaIcon1.setVisible(true);
				iconOnBombKey = false;
				iconOnShootKey = true;
				optionsScreenAreaBomb.setFontStyle('normal');
				optionsScreenAreaShoot.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon2.setVisible(false);
				optionsScreenAreaIcon3.setVisible(true);
				iconOnBombKey = false;
				iconOnUpKey = true;
				optionsScreenAreaBomb.setFontStyle('normal');
				optionsScreenAreaUp.setFontStyle('bold');
			}
		}
		if (iconOnUpKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					upKey = event.key.toUpperCase();
					upKeyDisplay = upKey;
					if (upKey == "CONTROL") {upKeyDisplay = upKey = "CTRL"};
					if (upKey == " ") {upKeyDisplay = upKey = "SPACE"};
					if (upKey == "CAPSLOCK") {upKey = "CAPS_LOCK"; upKeyDisplay = "CAPSLOCK"};
					if (upKey == "ESCAPE") {upKeyDisplay = upKey = "ESC"};
					if (upKey == "PAGEUP") {upKey = "PAGE_UP"; upKeyDisplay = "PAGEUP"};
					if (upKey == "PAGEDOWN") {upKey = "PAGE_DOWN"; upKeyDisplay = "PAGEDOWN"};
					if (upKey == "ARROWUP") {upKey = "UP"; upKeyDisplay = "↑"};
					if (upKey == "ARROWDOWN") {upKey = "DOWN"; upKeyDisplay = "↓"};
					if (upKey == "ARROWLEFT") {upKey = "LEFT"; upKeyDisplay = "←"};
					if (upKey == "ARROWRIGHT") {upKey = "RIGHT"; upKeyDisplay = "→"};
					if (upKey == "0") {upKey = "ZERO"; upKeyDisplay = "0"};
					if (upKey == "1") {upKey = "ONE"; upKeyDisplay = "1"};
					if (upKey == "2") {upKey = "TWO"; upKeyDisplay = "2"};
					if (upKey == "3") {upKey = "THREE"; upKeyDisplay = "3"};
					if (upKey == "4") {upKey = "FOUR"; upKeyDisplay = "4"};
					if (upKey == "5") {upKey = "FIVE"; upKeyDisplay = "5"};
					if (upKey == "6") {upKey = "SIX"; upKeyDisplay = "6"};
					if (upKey == "7") {upKey = "SEVEN"; upKeyDisplay = "7"};
					if (upKey == "8") {upKey = "EIGHT"; upKeyDisplay = "8"};
					if (upKey == "9") {upKey = "NINE"; upKeyDisplay = "9"};
					if (upKey == ";") {upKey = "SEMICOLON"; upKeyDisplay = ";"};
					if (upKey == ",") {upKey = "COMMA"; upKeyDisplay = ","};
					if (upKey == "-") {upKey = "MINUS"; upKeyDisplay = "-"};
					if (upKey == ".") {upKey = "PERIOD"; upKeyDisplay = "."};
					if (upKey == "/") {upKey = "FORWARD_SLASH"; upKeyDisplay = "/"};
					if (upKey == "\\") {upKey = "BACK_SLASH"; upKeyDisplay = "\\"};
					if (upKey == "'") {upKey = "QUOTES"; upKeyDisplay = "'"};
					if (upKey == "[") {upKey = "OPEN_BRACKET"; upKeyDisplay = "["};
					if (upKey == "]") {upKey = "CLOSE_BRACKET"; upKeyDisplay = "N/A"};
					if (upKey == "=") {upKey = "EQUALS"; upKeyDisplay = "N/A"};
					optionsScreenAreaKeyUp.setText(upKeyDisplay);
					keyW = this.addKey(Phaser.Input.Keyboard.KeyCodes[upKey]);
					choosingKey = false;
					startScreenWKeyDown = true;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false && choosingKey == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false && choosingKey == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon3.setVisible(false);
				optionsScreenAreaIcon2.setVisible(true);
				iconOnUpKey = false;
				iconOnBombKey = true;
				optionsScreenAreaUp.setFontStyle('normal');
				optionsScreenAreaBomb.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false && choosingKey == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false && choosingKey == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon3.setVisible(false);
				optionsScreenAreaIcon4.setVisible(true);
				iconOnUpKey = false;
				iconOnDownKey = true;
				optionsScreenAreaUp.setFontStyle('normal');
				optionsScreenAreaDown.setFontStyle('bold');
			}
		}
		if (iconOnDownKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					downKey = event.key.toUpperCase();
					downKeyDisplay = downKey;
					if (downKey == "CONTROL") {downKeyDisplay = downKey = "CTRL"};
					if (downKey == " ") {downKeyDisplay = downKey = "SPACE"};
					if (downKey == "CAPSLOCK") {downKey = "CAPS_LOCK"; downKeyDisplay = "CAPSLOCK"};
					if (downKey == "ESCAPE") {downKeyDisplay = downKey = "ESC"};
					if (downKey == "PAGEUP") {downKey = "PAGE_UP"; downKeyDisplay = "PAGEUP"};
					if (downKey == "PAGEDOWN") {downKey = "PAGE_DOWN"; downKeyDisplay = "PAGEDOWN"};
					if (downKey == "ARROWUP") {downKey = "UP"; downKeyDisplay = "↑"};
					if (downKey == "ARROWDOWN") {downKey = "DOWN"; downKeyDisplay = "↓"};
					if (downKey == "ARROWLEFT") {downKey = "LEFT"; downKeyDisplay = "←"};
					if (downKey == "ARROWRIGHT") {downKey = "RIGHT"; downKeyDisplay = "→"};
					if (downKey == "0") {downKey = "ZERO"; downKeyDisplay = "0"};
					if (downKey == "1") {downKey = "ONE"; downKeyDisplay = "1"};
					if (downKey == "2") {downKey = "TWO"; downKeyDisplay = "2"};
					if (downKey == "3") {downKey = "THREE"; downKeyDisplay = "3"};
					if (downKey == "4") {downKey = "FOUR"; downKeyDisplay = "4"};
					if (downKey == "5") {downKey = "FIVE"; downKeyDisplay = "5"};
					if (downKey == "6") {downKey = "SIX"; downKeyDisplay = "6"};
					if (downKey == "7") {downKey = "SEVEN"; downKeyDisplay = "7"};
					if (downKey == "8") {downKey = "EIGHT"; downKeyDisplay = "8"};
					if (downKey == "9") {downKey = "NINE"; downKeyDisplay = "9"};
					if (downKey == ";") {downKey = "SEMICOLON"; downKeyDisplay = ";"};
					if (downKey == ",") {downKey = "COMMA"; downKeyDisplay = ","};
					if (downKey == "-") {downKey = "MINUS"; downKeyDisplay = "-"};
					if (downKey == ".") {downKey = "PERIOD"; downKeyDisplay = "."};
					if (downKey == "/") {downKey = "FORWARD_SLASH"; downKeyDisplay = "/"};
					if (downKey == "\\") {downKey = "BACK_SLASH"; downKeyDisplay = "\\"};
					if (downKey == "'") {downKey = "QUOTES"; downKeyDisplay = "'"};
					if (downKey == "[") {downKey = "OPEN_BRACKET"; downKeyDisplay = "["};
					if (downKey == "]") {downKey = "CLOSE_BRACKET"; downKeyDisplay = "N/A"};
					if (bombKey == "=") {downKey = "EQUALS"; downKeyDisplay = "N/A"};
					optionsScreenAreaKeyDown.setText(downKeyDisplay);
					keyS = this.addKey(Phaser.Input.Keyboard.KeyCodes[downKey]);
					choosingKey = false;
					startScreenSKeyDown = true;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false && choosingKey == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false && choosingKey == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon4.setVisible(false);
				optionsScreenAreaIcon3.setVisible(true);
				iconOnDownKey = false;
				iconOnUpKey = true;
				optionsScreenAreaDown.setFontStyle('normal');
				optionsScreenAreaUp.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false && choosingKey == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false && choosingKey == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon4.setVisible(false);
				optionsScreenAreaIcon5.setVisible(true);
				iconOnDownKey = false;
				iconOnLeftKey = true;
				optionsScreenAreaDown.setFontStyle('normal');
				optionsScreenAreaLeft.setFontStyle('bold');
			}
		}
		if (iconOnLeftKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					leftKey = event.key.toUpperCase();
					leftKeyDisplay = leftKey;
					if (leftKey == "CONTROL") {leftKeyDisplay = leftKey = "CTRL"};
					if (leftKey == " ") {leftKeyDisplay = leftKey = "SPACE"};
					if (leftKey == "CAPSLOCK") {leftKey = "CAPS_LOCK"; leftKeyDisplay = "CAPSLOCK"};
					if (leftKey == "ESCAPE") {leftKeyDisplay = leftKey = "ESC"};
					if (leftKey == "PAGEUP") {leftKey = "PAGE_UP"; leftKeyDisplay = "PAGEUP"};
					if (leftKey == "PAGEDOWN") {leftKey = "PAGE_DOWN"; leftKeyDisplay = "PAGEDOWN"};
					if (leftKey == "ARROWUP") {leftKey = "UP"; leftKeyDisplay = "↑"};
					if (leftKey == "ARROWDOWN") {leftKey = "DOWN"; leftKeyDisplay = "↓"};
					if (leftKey == "ARROWLEFT") {leftKey = "LEFT"; leftKeyDisplay = "←"};
					if (leftKey == "ARROWRIGHT") {leftKey = "RIGHT"; leftKeyDisplay = "→"};
					if (leftKey == "0") {leftKey = "ZERO"; leftKeyDisplay = "0"};
					if (leftKey == "1") {leftKey = "ONE"; leftKeyDisplay = "1"};
					if (leftKey == "2") {leftKey = "TWO"; leftKeyDisplay = "2"};
					if (leftKey == "3") {leftKey = "THREE"; leftKeyDisplay = "3"};
					if (leftKey == "4") {leftKey = "FOUR"; leftKeyDisplay = "4"};
					if (leftKey == "5") {leftKey = "FIVE"; leftKeyDisplay = "5"};
					if (leftKey == "6") {leftKey = "SIX"; leftKeyDisplay = "6"};
					if (leftKey == "7") {leftKey = "SEVEN"; leftKeyDisplay = "7"};
					if (leftKey == "8") {leftKey = "EIGHT"; leftKeyDisplay = "8"};
					if (leftKey == "9") {leftKey = "NINE"; leftKeyDisplay = "9"};
					if (leftKey == ";") {leftKey = "SEMICOLON"; leftKeyDisplay = ";"};
					if (leftKey == ",") {leftKey = "COMMA"; leftKeyDisplay = ","};
					if (leftKey == "-") {leftKey = "MINUS"; leftKeyDisplay = "-"};
					if (leftKey == ".") {leftKey = "PERIOD"; leftKeyDisplay = "."};
					if (leftKey == "/") {leftKey = "FORWARD_SLASH"; leftKeyDisplay = "/"};
					if (leftKey == "\\") {leftKey = "BACK_SLASH"; leftKeyDisplay = "\\"};
					if (leftKey == "'") {leftKey = "QUOTES"; leftKeyDisplay = "'"};
					if (leftKey == "[") {leftKey = "OPEN_BRACKET"; leftKeyDisplay = "["};
					if (leftKey == "]") {leftKey = "CLOSE_BRACKET"; leftKeyDisplay = "N/A"};
					if (leftKey == "=") {leftKey = "EQUALS"; leftKeyDisplay = "N/A"};
					optionsScreenAreaKeyLeft.setText(leftKeyDisplay);
					keyA = this.addKey(Phaser.Input.Keyboard.KeyCodes[leftKey]);
					choosingKey = false;
					startScreenAKeyDown = true;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false && choosingKey == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false && choosingKey == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon5.setVisible(false);
				optionsScreenAreaIcon4.setVisible(true);
				iconOnLeftKey = false;
				iconOnDownKey = true;
				optionsScreenAreaLeft.setFontStyle('normal');
				optionsScreenAreaDown.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false && choosingKey == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false && choosingKey == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon5.setVisible(false);
				optionsScreenAreaIcon6.setVisible(true);
				iconOnLeftKey = false;
				iconOnRightKey = true;
				optionsScreenAreaLeft.setFontStyle('normal');
				optionsScreenAreaRight.setFontStyle('bold');
			}
		}
		if (iconOnRightKey == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyJ.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyK.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false ||
				keyEnter.isDown == true && startScreenSpaceKeyDown == false && startScreenEnterKeyDown == false && startScreenJKeyDown == false && startScreenKKeyDown == false && choosingKey == false)
			{
				choosingKey = true;
				if (keySpace.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyEnter.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				if (keyK.isDown == true)
				{
					startScreenSpaceKeyDown = true;
					startScreenEnterKeyDown = true;
					startScreenJKeyDown = true;
					startScreenKKeyDown = true;
				}
				this.input.keyboard.once('keydown', function (event) {
					console.log(event.key.toUpperCase());
					rightKey = event.key.toUpperCase();
					rightKeyDisplay = rightKey;
					if (rightKey == "CONTROL") {rightKeyDisplay = rightKey = "CTRL"};
					if (rightKey == " ") {rightKeyDisplay = rightKey = "SPACE"};
					if (rightKey == "CAPSLOCK") {rightKey = "CAPS_LOCK"; rightKeyDisplay = "CAPSLOCK"};
					if (rightKey == "ESCAPE") {rightKeyDisplay = rightKey = "ESC"};
					if (rightKey == "PAGEUP") {rightKey = "PAGE_UP"; rightKeyDisplay = "PAGEUP"};
					if (rightKey == "PAGEDOWN") {rightKey = "PAGE_DOWN"; rightKeyDisplay = "PAGEDOWN"};
					if (rightKey == "ARROWUP") {rightKey = "UP"; rightKeyDisplay = "↑"};
					if (rightKey == "ARROWDOWN") {rightKey = "DOWN"; rightKeyDisplay = "↓"};
					if (rightKey == "ARROWLEFT") {rightKey = "LEFT"; rightKeyDisplay = "←"};
					if (rightKey == "ARROWRIGHT") {rightKey = "RIGHT"; rightKeyDisplay = "→"};
					if (rightKey == "0") {rightKey = "ZERO"; rightKeyDisplay = "0"};
					if (rightKey == "1") {rightKey = "ONE"; rightKeyDisplay = "1"};
					if (rightKey == "2") {rightKey = "TWO"; rightKeyDisplay = "2"};
					if (rightKey == "3") {rightKey = "THREE"; rightKeyDisplay = "3"};
					if (rightKey == "4") {rightKey = "FOUR"; rightKeyDisplay = "4"};
					if (rightKey == "5") {rightKey = "FIVE"; rightKeyDisplay = "5"};
					if (rightKey == "6") {rightKey = "SIX"; rightKeyDisplay = "6"};
					if (rightKey == "7") {rightKey = "SEVEN"; rightKeyDisplay = "7"};
					if (rightKey == "8") {rightKey = "EIGHT"; rightKeyDisplay = "8"};
					if (rightKey == "9") {rightKey = "NINE"; rightKeyDisplay = "9"};
					if (rightKey == ";") {rightKey = "SEMICOLON"; rightKeyDisplay = ";"};
					if (rightKey == ",") {rightKey = "COMMA"; rightKeyDisplay = ","};
					if (rightKey == "-") {rightKey = "MINUS"; rightKeyDisplay = "-"};
					if (rightKey == ".") {rightKey = "PERIOD"; rightKeyDisplay = "."};
					if (rightKey == "/") {rightKey = "FORWARD_SLASH"; rightKeyDisplay = "/"};
					if (rightKey == "\\") {rightKey = "BACK_SLASH"; rightKeyDisplay = "\\"};
					if (rightKey == "'") {rightKey = "QUOTES"; rightKeyDisplay = "'"};
					if (rightKey == "[") {rightKey = "OPEN_BRACKET"; rightKeyDisplay = "["};
					if (rightKey == "]") {rightKey = "CLOSE_BRACKET"; rightKeyDisplay = "N/A"};
					if (rightKey == "=") {rightKey = "EQUALS"; rightKeyDisplay = "N/A"};
					optionsScreenAreaKeyRight.setText(rightKeyDisplay);
					keyD = this.addKey(Phaser.Input.Keyboard.KeyCodes[rightKey]);
					choosingKey = false;
					startScreenDKeyDown = true;
				});
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false && choosingKey == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false && choosingKey == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon6.setVisible(false);
				optionsScreenAreaIcon5.setVisible(true);
				iconOnRightKey = false;
				iconOnLeftKey = true;
				optionsScreenAreaRight.setFontStyle('normal');
				optionsScreenAreaLeft.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false && choosingKey == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false && choosingKey == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon6.setVisible(false);
				optionsScreenAreaIcon7.setVisible(true);
				iconOnRightKey = false;
				iconOnOptBack = true;
				optionsScreenAreaRight.setFontStyle('normal');
				optionsScreenAreaBack.setFontStyle('bold');
			}
		}
		if (iconOnOptBack == true)
		{
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false)
			{
				iconOnOptBack = false;
				iconOnOptions = true;
				startScreen = true;
				optionsScreen = false;
				if (keyEnter.isDown == true)
				{
				startScreenEnterKeyDown = true;
				}
				if (keySpace.isDown == true)
				{
				startScreenSpaceKeyDown = true;
				}
				if (keyJ.isDown == true)
				{
				startScreenJKeyDown = true;
				}
				if (keyK.isDown == true)
				{
				startScreenKKeyDown = true;
				}
				startScreenArea.setVisible(true);
				startScreenAreaTitle.setVisible(true);
				startScreenAreaStart.setVisible(true);
				startScreenAreaOptions.setVisible(true);
				startScreenAreaDifficulty.setVisible(true);
				startScreenAreaIcon2.setVisible(true);
				optionsScreenAreaTitle.setVisible(false);
				optionsScreenAreaShoot.setVisible(false);
				optionsScreenAreaBomb.setVisible(false);
				optionsScreenAreaUp.setVisible(false);
				optionsScreenAreaDown.setVisible(false);
				optionsScreenAreaLeft.setVisible(false);
				optionsScreenAreaRight.setVisible(false);
				optionsScreenAreaBack.setVisible(false);
				optionsScreenAreaBack.setFontStyle('normal');
				optionsScreenAreaIcon7.setVisible(false);
				optionsScreenAreaKeyShoot.setVisible(false);
				optionsScreenAreaKeyBomb.setVisible(false);
				optionsScreenAreaKeyUp.setVisible(false);
				optionsScreenAreaKeyDown.setVisible(false);
				optionsScreenAreaKeyLeft.setVisible(false);
				optionsScreenAreaKeyRight.setVisible(false);
			}
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon7.setVisible(false);
				optionsScreenAreaIcon6.setVisible(true);
				iconOnOptBack = false;
				iconOnRightKey = true;
				optionsScreenAreaBack.setFontStyle('normal');
				optionsScreenAreaRight.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon7.setVisible(false);
				optionsScreenAreaIcon8.setVisible(true);
				iconOnOptBack = false;
				iconOnSpeaker = true;
				optionsScreenAreaBack.setFontStyle('normal');
			}
		}
		if (iconOnSpeaker == true)
		{
			if (cursors.up.isDown == true && startScreenDownKeyDown == false && startScreenUpKeyDown == false ||
				keyW.isDown == true && startScreenWKeyDown == false && startScreenSKeyDown == false)
			{
				if (cursors.up.isDown == true)
				{
					startScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					startScreenWKeyDown = true;
				}
				optionsScreenAreaIcon8.setVisible(false);
				optionsScreenAreaIcon7.setVisible(true);
				iconOnSpeaker = false;
				iconOnOptBack = true;
				optionsScreenAreaBack.setFontStyle('bold');
			}
			if (cursors.down.isDown == true && startScreenUpKeyDown == false && startScreenDownKeyDown == false ||
				keyS.isDown == true && startScreenSKeyDown == false && startScreenWKeyDown == false)
			{
				if (cursors.down.isDown == true)
				{
					startScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					startScreenSKeyDown = true;
				}
				optionsScreenAreaIcon8.setVisible(false);
				optionsScreenAreaIcon1.setVisible(true);
				iconOnSpeaker = false;
				iconOnShootKey = true;
				optionsScreenAreaShoot.setFontStyle('bold');
			}
			if (keySpace.isDown == true && startScreenSpaceKeyDown == false ||
				keyJ.isDown == true && startScreenJKeyDown == false ||
				keyK.isDown == true && startScreenKKeyDown == false ||
				keyEnter.isDown == true && startScreenEnterKeyDown == false)
			{
				if (soundOn == false && soundToggled == false)
				{
					soundOn = true;
					speakerOn.setVisible(true);
					speakerOff.setVisible(false);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
				if (soundOn == true && soundToggled == false)
				{
					soundOn = false;
					speakerOn.setVisible(false);
					speakerOff.setVisible(true);
					soundToggled = true;
					if (keySpace.isDown == true)
					{
						startScreenSpaceKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						startScreenEnterKeyDown = true;
					}
					if (keyJ.isDown == true)
					{
						startScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						startScreenKKeyDown = true;
					}
				}
			}
			if (keySpace.isUp == true && soundToggled == true &&
				keyJ.isUp == true &&
				keyK.isUp == true &&
				keyEnter.isUp == true)
			{
				soundToggled = false;
			}
		}
	}

	if (preStart == true)
	{
		if (preStarted == false)
		{
			preStartReadyEnterTween.restart();
			preStarted = true;
		}
	}


	if (gameOver == true)
	{
		if(shakeSounded == true)
		{
			fx.stop();
		}
		if (gameTimeJKeyDown == true && keyJ.isDown == false)
		{
			gameTimeJKeyDown = false;
		}
		if (gameTimeKKeyDown == true && keyK.isDown == false)
		{
			gameTimeKKeyDown = false;
		}
		if (cursors.up.isDown == false && endScreenUpKeyDown == true)
		{
			endScreenUpKeyDown = false;
		}
		if (cursors.down.isDown == false && endScreenDownKeyDown == true)
		{
			endScreenDownKeyDown = false;
		}
		if (keyEnter.isDown == false && endScreenEnterKeyDown == true)
		{
			endScreenEnterKeyDown = false;
		}
		if (keySpace.isDown == false && endScreenSpaceKeyDown == true)
		{
			endScreenSpaceKeyDown = false;
		}
		if (keyW.isDown == false && endScreenWKeyDown == true)
		{
			endScreenWKeyDown = false;
		}
		if (keyS.isDown == false && endScreenSKeyDown == true)
		{
			endScreenSKeyDown = false;
		}
		if (keyJ.isDown == false && endScreenJKeyDown == true)
		{
			endScreenJKeyDown = false;
		}
		if (keyK.isDown == false && endScreenKKeyDown == true)
		{
			endScreenKKeyDown = false;
		}
		if (cursorOnPlayAgain == true)
		{
			if (gameTimeJKeyDown == false && gameTimeKKeyDown == false)
			{
				if (keyEnter.isDown == true || keySpace.isDown == true || keyJ.isDown == true || keyK.isDown == true)
				{
					endScreenArea.setVisible(false);
					endScreenAreaBg.setVisible(false);
					endScreenAreaDifficulty.setVisible(false);
					endScreenAreaScore.setVisible(false);
					endScreenAreaSummary.setVisible(false);
					endScreenAreaPlayAgain.setVisible(false);
					endScreenAreaStartScreen.setVisible(false);
					endScreenAreaIcon1.setVisible(false);
					gameOver = false;
					preStart = true;
					if (keyJ.isDown == true)
					{
						endScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						endScreenKKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						endScreenEnterKeyDown = true;
					}
					if (keySpace.isDown == true)
					{
						endScreenSpaceKeyDown = true;
					}
				}
			}
			if (cursors.up.isDown == true && endScreenUpKeyDown == false ||
				keyW.isDown == true && endScreenWKeyDown == false)
			{
				endScreenAreaIcon1.setVisible(false);
				endScreenAreaIcon2.setVisible(true);
				cursorOnPlayAgain = false;
				cursorOnStartScreen = true;
				if (cursors.up.isDown == true)
				{
					endScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					endScreenWKeyDown = true;
				}
			}
			if (cursors.down.isDown == true && endScreenDownKeyDown == false ||
				keyS.isDown == true && endScreenSKeyDown == false)
			{
				endScreenAreaIcon1.setVisible(false);
				endScreenAreaIcon2.setVisible(true);
				cursorOnPlayAgain = false;
				cursorOnStartScreen = true;
				if (cursors.down.isDown == true)
				{
					endScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					endScreenSKeyDown = true;
				}
			}
		}
		if (cursorOnStartScreen == true)
		{
			if (gameTimeJKeyDown == false && gameTimeKKeyDown == false)
			{
				if (keyEnter.isDown == true || keySpace.isDown == true || keyJ.isDown == true || keyK.isDown == true)
				{

					endScreenArea.setVisible(false);
					endScreenAreaBg.setVisible(false);
					endScreenAreaDifficulty.setVisible(false);
					endScreenAreaScore.setVisible(false);
					endScreenAreaSummary.setVisible(false);
					endScreenAreaPlayAgain.setVisible(false);
					endScreenAreaStartScreen.setVisible(false);
					endScreenAreaIcon2.setVisible(false);
					gameOver = false;
					startScreen = true;
					iconOnStart = true;
					if (keyJ.isDown == true)
					{
						endScreenJKeyDown = true;
					}
					if (keyK.isDown == true)
					{
						endScreenKKeyDown = true;
					}
					if (keyEnter.isDown == true)
					{
						endScreenEnterKeyDown = true;
					}
					if (keySpace.isDown == true)
					{
						endScreenSpaceKeyDown = true;
					}
					startScreenArea.setVisible(true);
					startScreenAreaBg.setVisible(true);
					startScreenAreaTitle.setVisible(true);
					startScreenAreaStart.setVisible(true);
					startScreenAreaOptions.setVisible(true);
					startScreenAreaDifficulty.setVisible(true);
					startScreenAreaIcon1.setVisible(true);
					startScreenAreaIcon2.setVisible(false);
					startScreenAreaIcon3.setVisible(false);
					startScreenAreaIcon4.setVisible(false);
				}
			}
			if (cursors.up.isDown == true && endScreenUpKeyDown == false ||
				keyW.isDown == true && endScreenWKeyDown == false)
			{
				endScreenAreaIcon1.setVisible(true);
				endScreenAreaIcon2.setVisible(false);
				cursorOnPlayAgain = true;
				cursorOnStartScreen = false;
				if (cursors.up.isDown == true)
				{
					endScreenUpKeyDown = true;
				}
				if (keyW.isDown == true)
				{
					endScreenWKeyDown = true;
				}
			}
			if (cursors.down.isDown == true && endScreenDownKeyDown == false ||
				keyS.isDown == true && endScreenSKeyDown == false)
			{
				endScreenAreaIcon1.setVisible(true);
				endScreenAreaIcon2.setVisible(false);
				cursorOnPlayAgain = true;
				cursorOnStartScreen = false;
				if (cursors.down.isDown == true)
				{
					endScreenDownKeyDown = true;
				}
				if (keyS.isDown == true)
				{
					endScreenSKeyDown = true;
				}
			}
		}
	}

	if (gameTime == true)
	{
		if (difficulty == "easy")
		{
			shakerGenRate = 0.09;
		}
		if (difficulty == "medium")
		{
			shakerGenRate = 0.0667;
		}
		if (difficulty == "hard")
		{
			shakerGenRate = 0.045;
		}
		if (saltbombs == 0)
		{
			shakerIcon1.setVisible(false);
			shakerIcon2.setVisible(false);
			shakerIcon3.setVisible(false);
			shakerIcon4.setVisible(false);
			shakerIcon5.setVisible(false);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 1)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(false);
			shakerIcon3.setVisible(false);
			shakerIcon4.setVisible(false);
			shakerIcon5.setVisible(false);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 2)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(false);
			shakerIcon4.setVisible(false);
			shakerIcon5.setVisible(false);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);

		}
		if (saltbombs == 3)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(false);
			shakerIcon5.setVisible(false);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 4)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(false);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 5)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(true);
			shakerIcon6.setVisible(false);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 6)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(true);
			shakerIcon6.setVisible(true);
			shakerIcon7.setVisible(false);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 7)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(true);
			shakerIcon6.setVisible(true);
			shakerIcon7.setVisible(true);
			shakerIcon8.setVisible(false);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 8)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(true);
			shakerIcon6.setVisible(true);
			shakerIcon7.setVisible(true);
			shakerIcon8.setVisible(true);
			shakerIcon9.setVisible(false);
		}
		if (saltbombs == 9)
		{
			shakerIcon1.setVisible(true);
			shakerIcon2.setVisible(true);
			shakerIcon3.setVisible(true);
			shakerIcon4.setVisible(true);
			shakerIcon5.setVisible(true);
			shakerIcon6.setVisible(true);
			shakerIcon7.setVisible(true);
			shakerIcon8.setVisible(true);
			shakerIcon9.setVisible(true);
		}


		timerText.setText(time);
		if (time > 20)
		{
			timerText.setColor('#FFFFFF');
		}
		if (time == 20)
		{
			timerText.setColor('#FFFF00');
		}
		if (time == 9)
		{
			timerText.setColor('#FF0000');
		}
		if (time <= 0)
		{
			gameTime = false;
			gameOver = true;
			dingfx.play();
			if (saltStream != null)
			{
				saltStream.setQuantity(0);
			}
			preStarted = false;
			endScreenArea.setVisible(true);
			endScreenAreaBg.setVisible(true);
			endScreenAreaDifficulty.setVisible(true);
			endScreenAreaScore.setText('Your Score: ' + score + '...');
			endScreenAreaScore.setVisible(true);
			if (score <= 400)
			{
				endScreenAreaSummary.setText('...do you even salt, bro?');
			}
			if (score > 400 && score < 600)
			{
				endScreenAreaSummary.setText('...choppin\' it up pretty nicely!');
			}
			if (score >= 600)
			{
				endScreenAreaSummary.setText('...you\'re the MEAT MASTER!!!');
			}
			endScreenAreaSummary.setVisible(true);
			endScreenAreaPlayAgain.setVisible(true);
			endScreenAreaStartScreen.setVisible(true);
			endScreenAreaIcon1.setVisible(true);
			clearInterval(clock);
			cursorOnPlayAgain = true;
		}
		if (saltMeterInside != null)
		{
			inGraphics.clear();
		}
		inGraphics.fillStyle(0xffffff, 1);
		saltMeterInside = inGraphics.fillRect(10, 10, saltCount, 20);



		if (keyA.isDown && playerAtLeft == false  && saltbae.y <= 300 ||
			keyD.isDown && playerAtRight == false && saltbae.y >= 300)
		{
		clockwise = false;
		counterClockwise = true;
		isMoving = true;
		}
		if (keyA.isDown && playerAtLeft == false  && saltbae.y >= 300 ||
			keyD.isDown && playerAtRight == false && saltbae.y <= 300)
		{
		counterClockwise = false;
		clockwise = true;
		isMoving = true;
		}
		if (keyW.isDown && playerAtTop == false    && saltbae.x >= 400 ||
			keyS.isDown && playerAtBottom == false && saltbae.x <= 400)
		{
		clockwise = false;
		counterClockwise = true;
		isMoving = true;
		}
		if (keyW.isDown && playerAtTop == false    && saltbae.x <= 400 ||
			keyS.isDown && playerAtBottom == false && saltbae.x >= 400)
		{
		counterClockwise = false;
		clockwise = true;
		isMoving = true;
		}
		if (keyA.isUp == true && keyD.isUp == true &&
			keyW.isUp   == true && keyS.isUp  == true)
		{
		isMoving = false;
		playerAtLeft = false;
		playerAtRight = false;
		playerAtTop = false;
		playerAtBottom = false;
		}
		if (keyW.isDown && approxeq(saltbae.y, config.height/2, 0.1) == false) {
		playerAtLeft = false;
		playerAtRight = false;
		}
		if (keyS.isDown && approxeq(saltbae.y, config.height/2, 0.1) == false) {
			playerAtLeft = false;
			playerAtRight = false;
		}
		if (keyA.isDown && approxeq(saltbae.x, config.width/2, 0.1) == false) {
		  playerAtTop = false;
		  playerAtBottom = false;
		}
		if (keyD.isDown && approxeq(saltbae.x, config.width/2, 0.1) == false) {
		  playerAtTop = false;
		  playerAtBottom = false;
		}
		if (keyW.isDown &&
		  approxeq(saltbae.x, config.width/2, 0.1) &&
		  Math.round(saltbae.y) <= config.height/2) {
		isMoving = false;
		playerAtTop = true;
	  }
	  if (keyS.isDown &&
		  approxeq(saltbae.x, config.width/2, 0.1) &&
		  Math.round(saltbae.y) >= config.height/2) {
		isMoving = false;
		playerAtBottom = true;
	  }
	  if (keyA.isDown &&
		  Math.round(saltbae.x) <= config.width/2 &&
		  approxeq(saltbae.y, config.height/2, 0.1)) {
		isMoving = false;
		playerAtLeft = true;
	  }
	  if (keyD.isDown &&
		  Math.round(saltbae.x) >= config.width/2 &&
		  approxeq(saltbae.y, config.height/2, 0.1)) {
		isMoving = false;
		playerAtRight = true;
	  }


		if (counterClockwise && isMoving) posAngleDeg -= 2;
		if (clockwise && isMoving) posAngleDeg += 2;
		if (posAngleDeg > 360) posAngleDeg -= 360;
		if (posAngleDeg < 0) posAngleDeg += 360;
		posAngleRad = posAngleDeg * Math.PI / 180;
		saltbae.x = Math.cos(posAngleRad)*(5.5*config.width/12)+config.width/2;
		saltbae.y = Math.sin(posAngleRad)*(5.5*config.height/12)+config.height/2;
		saltbae.angle = posAngleDeg - 270;

		var particles  = this.add.particles('salt');
		var saltbomber = this.add.particles('salt');

		if (keyK.isDown == false && gameTimeKKeyDown == true)
		{
			gameTimeKKeyDown = false;
		}
		if (keyK.isDown && saltbombs > 0 && saltbombing == false && gameTimeKKeyDown == false)
		{
			bombfx.play()
			if (saltbomb != null)
			{
				saltbomb.setQuantity(8);
				saltbombing = true;
				saltbombs -= 1;
				killbomb = setTimeout(function () {saltbomb.setQuantity(0); saltbombing = false}, 200);
			}
			if (saltbomb == null)
			{
				saltbomb = saltbomber.createEmitter({
					x: config.width / 2,
					y: config.height / 2,
					lifespan: 600,
					speed: 500,
					gravityY: 0,
					scale: {start: 0, end: 1.4 },
					quantity: 8,
					angle: { min: 0, max: 360 }
				})
				saltbombing = true;
				saltbombs -= 1;
				killbomb = setTimeout(function () {saltbomb.setQuantity(0); saltbombing = false}, 200);
			}
		}
		if (keyK.isDown == true && gameTimeKKeyDown == false)
		{
			gameTimeKKeyDown = true;
		}
		if (keyJ.isDown == false && gameTimeJKeyDown == true)
		{
			gameTimeJKeyDown = false;
		}
		if (saltStream != null && saltStream.alive.length > 0 && shakeSounded == false)
		{
			if (soundOn == true)
			{
				if (shakePauseTween.state == 23) shakePauseTween.stop();
				if (shakeStartTween.state == 26) shakeStartTween.restart();
				if (shakeStartTween.state == 25) shakeStartTween.play();
			}
			shakeSounded = true;
		}
		if (saltStream != null && saltStream.alive.length == 0 && shakeSounded == true)
		{
			if (soundOn == true)
			{
				if (shakeStartTween.state == 23) shakeStartTween.stop();
				if (shakePauseTween.state == 26) shakePauseTween.restart();
				if (shakePauseTween.state == 25) shakePauseTween.play();
			}
			shakeSounded = false;
		}
		if (keyJ.isDown && salting == false && saltCount > 0)
		{
			if (gameTimeJKeyDown == false)
			{
				gameTimeJKeyDown = true;
			}
			if (saltStream == null)
			{
				saltStream = particles.createEmitter({
					lifespan: 600,
					speed: { min: 400, max: 600 },
					gravityY: 0,
					scale: { start: 0, end: 1.4 },
					quantity: 2,
				});
			}
			if (saltStream != null)
			{
				saltStream.setQuantity(2);
			}
			saltStream.startFollow(saltbae);
			salting = true;
			clearInterval(saltInc);
			saltDec = setInterval(function () {saltCount -= 10}, 10);
		}
		if (keyJ.isUp && salting == true)
		{
			saltStream.setQuantity(0);
			salting = false;
			clearInterval(saltDec);
			saltInc = setInterval(function () {saltCount += 10}, 10);
		}
		if (keyJ.isUp && salting == false && saltCount == 0)
		{
			clearInterval(saltDec);
			clearInterval(saltInc);
			saltCount = 10;
			saltInc = setInterval(function () {saltCount += 10}, 10);
		}

		if (saltStream != null)
		{
			saltStream.setAngle({ min: saltbae.angle + 88, max: saltbae.angle + 92 });
			if (saltCount <= 0)
			{
				saltStream.setQuantity(0);
				clearInterval(saltDec);
			}
			for (i = 0; i < saltStream.alive.length; i++)
			{
				if (saltStream.alive[i].x > meat1.x - meat1.displayWidth/2 && saltStream.alive[i].x < meat1.x + meat1.displayWidth/2 &&
					saltStream.alive[i].y > meat1.y - meat1.displayHeight/2 && saltStream.alive[i].y < meat1.y + meat1.displayHeight/2)
				{
					saltStream.setQuantity(0);
					salting = false;
					clearInterval(saltDec);
					var pointPopup = true;
					if (saltCount < 100 && salting == true)
					{
						saltInc = setInterval(function () {saltCount += 10}, 10);
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true &&
						pointsText8.visible == true && pointsText9.visible == false)
					{
						pointsText9.x = meat1.x
						pointsText9.y = meat1.y
						tween9.data[0].start = meat1.y
						pointsText9.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true && pointsText8.visible == false)
					{
						pointsText8.x = meat1.x
						pointsText8.y = meat1.y
						tween8.data[0].start = meat1.y
						pointsText8.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true && pointsText7.visible == false)
					{
						pointsText7.x = meat1.x
						pointsText7.y = meat1.y
						tween7.data[0].start = meat1.y
						pointsText7.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true && pointsText6.visible == false)
					{
						pointsText6.x = meat1.x
						pointsText6.y = meat1.y
						tween6.data[0].start = meat1.y
						pointsText6.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true && pointsText5.visible == false)
					{
						pointsText5.x = meat1.x
						pointsText5.y = meat1.y
						tween5.data[0].start = meat1.y
						pointsText5.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true && pointsText4.visible == false)
					{
						pointsText4.x = meat1.x
						pointsText4.y = meat1.y
						tween4.data[0].start = meat1.y
						pointsText4.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true && pointsText3.visible == false)
					{
						pointsText3.x = meat1.x
						pointsText3.y = meat1.y
						tween3.data[0].start = meat1.y
						pointsText3.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true && pointsText2.visible == false)
					{
						pointsText2.x = meat1.x
						pointsText2.y = meat1.y
						tween2.data[0].start = meat1.y
						pointsText2.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true && pointsText1.visible == false)
					{
						pointsText1.x = meat1.x
						pointsText1.y = meat1.y
						tween1.data[0].start = meat1.y
						pointsText1.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == false)
					{
						pointsText0.x = meat1.x
						pointsText0.y = meat1.y
						tween0.data[0].start = meat1.y
						pointsText0.setVisible(true);
						pointPopup = false;
					}
					meat1.disableBody(true, true);
					meat1.x = config.width;
					meat1.y = config.height;
					setTimeout(function () {meat1.enableBody(true, 200+Math.random()*400, 200+Math.random()*200, true, true)}, 500);
					score += 10;
					scoreText.setText('score: ' + score);
					if (Math.random() < shakerGenRate)
					{
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == true &&
							shaker5.visible == false)
						{
							shaker5.x = 200+Math.random()*400;
							shaker5.y = 200+Math.random()*200;
							shaker5.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == false)
						{
							shaker4.x = 200+Math.random()*400;
							shaker4.y = 200+Math.random()*200;
							shaker4.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == false)
						{
							shaker3.x = 200+Math.random()*400;
							shaker3.y = 200+Math.random()*200;
							shaker3.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == false)
						{
							shaker2.x = 200+Math.random()*400;
							shaker2.y = 200+Math.random()*200;
							shaker2.setVisible(true);
						}
						if (shaker1.visible == false)
						{
							shaker1.x = 200+Math.random()*400;
							shaker1.y = 200+Math.random()*200;
							shaker1.setVisible(true);
						}
					}
				}
				if (saltStream.alive[i].x > meat2.x - meat2.displayWidth/2 && saltStream.alive[i].x < meat2.x + meat2.displayWidth/2 &&
					saltStream.alive[i].y > meat2.y - meat2.displayHeight/2 && saltStream.alive[i].y < meat2.y + meat2.displayHeight/2)
				{
					saltStream.setQuantity(0);
					salting = false;
					clearInterval(saltDec);
					var pointPopup = true;
					if (saltCount < 100 && salting == true)
					{
						saltInc = setInterval(function () {saltCount += 10}, 10);
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true &&
						pointsText8.visible == true && pointsText9.visible == false)
					{
						pointsText9.x = meat2.x
						pointsText9.y = meat2.y
						tween9.data[0].start = meat2.y
						pointsText9.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true && pointsText8.visible == false)
					{
						pointsText8.x = meat2.x
						pointsText8.y = meat2.y
						tween8.data[0].start = meat2.y
						pointsText8.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true && pointsText7.visible == false)
					{
						pointsText7.x = meat2.x
						pointsText7.y = meat2.y
						tween7.data[0].start = meat2.y
						pointsText7.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true && pointsText6.visible == false)
					{
						pointsText6.x = meat2.x
						pointsText6.y = meat2.y
						tween6.data[0].start = meat2.y
						pointsText6.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true && pointsText5.visible == false)
					{
						pointsText5.x = meat2.x
						pointsText5.y = meat2.y
						tween5.data[0].start = meat2.y
						pointsText5.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true && pointsText4.visible == false)
					{
						pointsText4.x = meat2.x
						pointsText4.y = meat2.y
						tween4.data[0].start = meat2.y
						pointsText4.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true && pointsText3.visible == false)
					{
						pointsText3.x = meat2.x
						pointsText3.y = meat2.y
						tween3.data[0].start = meat2.y
						pointsText3.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true && pointsText2.visible == false)
					{
						pointsText2.x = meat2.x
						pointsText2.y = meat2.y
						tween2.data[0].start = meat2.y
						pointsText2.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true && pointsText1.visible == false)
					{
						pointsText1.x = meat2.x
						pointsText1.y = meat2.y
						tween1.data[0].start = meat2.y
						pointsText1.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == false)
					{
						pointsText0.x = meat2.x
						pointsText0.y = meat2.y
						tween0.data[0].start = meat2.y
						pointsText0.setVisible(true);
						pointPopup = false;
					}
					meat2.disableBody(true, true);
					meat2.x = config.width;
					meat2.y = config.height;
					setTimeout(function () {meat2.enableBody(true, 200+Math.random()*400, 200+Math.random()*200, true, true)}, 500);
					score += 10;
					scoreText.setText('score: ' + score);
					if (Math.random() < shakerGenRate)
					{
						if (shaker1.visible == true &&
							shaker2.visible == true && shaker3.visible == true &&
							shaker4.visible == true && shaker5.visible == false)
						{
							shaker5.x = 200+Math.random()*400;
							shaker5.y = 200+Math.random()*200;
							shaker5.setVisible(true);
						}
						if (shaker1.visible == true &&
							shaker2.visible == true && shaker3.visible == true &&
							shaker4.visible == false)
						{
							shaker4.x = 200+Math.random()*400;
							shaker4.y = 200+Math.random()*200;
							shaker4.setVisible(true);
						}
						if (shaker1.visible == true &&
							shaker2.visible == true && shaker3.visible == false)
						{
							shaker3.x = 200+Math.random()*400;
							shaker3.y = 200+Math.random()*200;
							shaker3.setVisible(true);
						}
						if (shaker1.visible == true &&
							shaker2.visible == false)
						{
							shaker2.x = 200+Math.random()*400;
							shaker2.y = 200+Math.random()*200;
							shaker2.setVisible(true);
						}
						if (shaker1.visible == false)
						{
							shaker1.x = 200+Math.random()*400;
							shaker1.y = 200+Math.random()*200;
							shaker1.setVisible(true);
						}
					}
				}
				if (saltStream.alive[i].x > shaker1.x - shaker1.displayWidth/2 && saltStream.alive[i].x < shaker1.x + shaker1.displayWidth/2 &&
					saltStream.alive[i].y > shaker1.y - shaker1.displayHeight/2 && saltStream.alive[i].y < shaker1.y + shaker1.displayHeight/2)
				{
					saltbombs += 1;
					shaker1.setVisible(false);
					shaker1.x = config.width;
					shaker1.y = config.height;
				}
				if (saltStream.alive[i].x > shaker2.x - shaker2.displayWidth/2 && saltStream.alive[i].x < shaker2.x + shaker2.displayWidth/2 &&
					saltStream.alive[i].y > shaker2.y - shaker2.displayHeight/2 && saltStream.alive[i].y < shaker2.y + shaker2.displayHeight/2)
				{
					saltbombs += 1;
					shaker2.setVisible(false);
					shaker2.x = config.width;
					shaker2.y = config.height;
				}
				if (saltStream.alive[i].x > shaker3.x - shaker3.displayWidth/2 && saltStream.alive[i].x < shaker3.x + shaker3.displayWidth/2 &&
					saltStream.alive[i].y > shaker3.y - shaker3.displayHeight/2 && saltStream.alive[i].y < shaker3.y + shaker3.displayHeight/2)
				{
					saltbombs += 1;
					shaker3.setVisible(false);
					shaker3.x = config.width;
					shaker3.y = config.height;
				}
				if (saltStream.alive[i].x > shaker4.x - shaker4.displayWidth/2 && saltStream.alive[i].x < shaker4.x + shaker4.displayWidth/2 &&
					saltStream.alive[i].y > shaker4.y - shaker4.displayHeight/2 && saltStream.alive[i].y < shaker4.y + shaker4.displayHeight/2)
				{
					saltbombs += 1;
					shaker4.setVisible(false);
					shaker4.x = config.width;
					shaker4.y = config.height;
				}
				if (saltStream.alive[i].x > shaker5.x - shaker5.displayWidth/2 && saltStream.alive[i].x < shaker5.x + shaker5.displayWidth/2 &&
					saltStream.alive[i].y > shaker5.y - shaker5.displayHeight/2 && saltStream.alive[i].y < shaker5.y + shaker5.displayHeight/2)
				{
					saltbombs += 1;
					shaker5.setVisible(false);
					shaker5.x = config.width;
					shaker5.y = config.height;
				}
			}
		}

		if (saltbomb != null)
		{
			for (i = 0; i < saltbomb.alive.length; i++)
			{
				if (saltbomb.alive[i].x > meat1.x - meat1.displayWidth/2 && saltbomb.alive[i].x < meat1.x + meat1.displayWidth/2 &&
					saltbomb.alive[i].y > meat1.y - meat1.displayHeight/2 && saltbomb.alive[i].y < meat1.y + meat1.displayHeight/2)
				{
					var pointPopup = true;
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true &&
						pointsText8.visible == true && pointsText9.visible == false)
					{
						pointsText9.x = meat1.x
						pointsText9.y = meat1.y
						tween9.data[0].start = meat1.y
						pointsText9.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true && pointsText8.visible == false)
					{
						pointsText8.x = meat1.x
						pointsText8.y = meat1.y
						tween8.data[0].start = meat1.y
						pointsText8.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true && pointsText7.visible == false)
					{
						pointsText7.x = meat1.x
						pointsText7.y = meat1.y
						tween7.data[0].start = meat1.y
						pointsText7.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true && pointsText6.visible == false)
					{
						pointsText6.x = meat1.x
						pointsText6.y = meat1.y
						tween6.data[0].start = meat1.y
						pointsText6.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true && pointsText5.visible == false)
					{
						pointsText5.x = meat1.x
						pointsText5.y = meat1.y
						tween5.data[0].start = meat1.y
						pointsText5.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true && pointsText4.visible == false)
					{
						pointsText4.x = meat1.x
						pointsText4.y = meat1.y
						tween4.data[0].start = meat1.y
						pointsText4.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true && pointsText3.visible == false)
					{
						pointsText3.x = meat1.x
						pointsText3.y = meat1.y
						tween3.data[0].start = meat1.y
						pointsText3.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true && pointsText2.visible == false)
					{
						pointsText2.x = meat1.x
						pointsText2.y = meat1.y
						tween2.data[0].start = meat1.y
						pointsText2.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true && pointsText1.visible == false)
					{
						pointsText1.x = meat1.x
						pointsText1.y = meat1.y
						tween1.data[0].start = meat1.y
						pointsText1.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == false)
					{
						pointsText0.x = meat1.x
						pointsText0.y = meat1.y
						tween0.data[0].start = meat1.y
						pointsText0.setVisible(true);
						pointPopup = false;
					}
					meat1.disableBody(true, true);
					meat1.x = config.width;
					meat1.y = config.height;
					setTimeout(function () {meat1.enableBody(true, 200+Math.random()*400, 200+Math.random()*200, true, true)}, 500);
					score += 10;
					scoreText.setText('score: ' + score);
					if (Math.random() < shakerGenRate)
					{
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == true &&
							shaker5.visible == false)
						{
							shaker5.x = 200+Math.random()*400;
							shaker5.y = 200+Math.random()*200;
							shaker5.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == false)
						{
							shaker4.x = 200+Math.random()*400;
							shaker4.y = 200+Math.random()*200;
							shaker4.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == false)
						{
							shaker3.x = 200+Math.random()*400;
							shaker3.y = 200+Math.random()*200;
							shaker3.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == false)
						{
							shaker2.x = 200+Math.random()*400;
							shaker2.y = 200+Math.random()*200;
							shaker2.setVisible(true);
						}
						if (shaker1.visible == false)
						{
							shaker1.x = 200+Math.random()*400;
							shaker1.y = 200+Math.random()*200;
							shaker1.setVisible(true);
						}
					}
				}
				if (saltbomb.alive[i].x > meat2.x - meat2.displayWidth/2 && saltbomb.alive[i].x < meat2.x + meat2.displayWidth/2 &&
					saltbomb.alive[i].y > meat2.y - meat2.displayHeight/2 && saltbomb.alive[i].y < meat2.y + meat2.displayHeight/2)
				{
					var pointPopup = true;
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true &&
						pointsText8.visible == true && pointsText9.visible == false)
					{
						pointsText9.x = meat2.x
						pointsText9.y = meat2.y
						tween9.data[0].start = meat2.y
						pointsText9.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true &&
						pointsText7.visible == true && pointsText8.visible == false)
					{
						pointsText8.x = meat2.x
						pointsText8.y = meat2.y
						tween8.data[0].start = meat2.y
						pointsText8.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true &&
						pointsText6.visible == true && pointsText7.visible == false)
					{
						pointsText7.x = meat2.x
						pointsText7.y = meat2.y
						tween7.data[0].start = meat2.y
						pointsText7.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true &&
						pointsText5.visible == true && pointsText6.visible == false)
					{
						pointsText6.x = meat2.x
						pointsText6.y = meat2.y
						tween6.data[0].start = meat2.y
						pointsText6.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true &&
						pointsText4.visible == true && pointsText5.visible == false)
					{
						pointsText5.x = meat2.x
						pointsText5.y = meat2.y
						tween5.data[0].start = meat2.y
						pointsText5.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true &&
						pointsText3.visible == true && pointsText4.visible == false)
					{
						pointsText4.x = meat2.x
						pointsText4.y = meat2.y
						tween4.data[0].start = meat2.y
						pointsText4.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true &&
						pointsText2.visible == true && pointsText3.visible == false)
					{
						pointsText3.x = meat2.x
						pointsText3.y = meat2.y
						tween3.data[0].start = meat2.y
						pointsText3.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true &&
						pointsText1.visible == true && pointsText2.visible == false)
					{
						pointsText2.x = meat2.x
						pointsText2.y = meat2.y
						tween2.data[0].start = meat2.y
						pointsText2.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == true && pointsText1.visible == false)
					{
						pointsText1.x = meat2.x
						pointsText1.y = meat2.y
						tween1.data[0].start = meat2.y
						pointsText1.setVisible(true);
						pointPopup = false;
					}
					if (pointPopup == true && pointsText0.visible == false)
					{
						pointsText0.x = meat2.x
						pointsText0.y = meat2.y
						tween0.data[0].start = meat2.y
						pointsText0.setVisible(true);
						pointPopup = false;
					}
					meat2.disableBody(true, true);
					meat2.x = config.width;
					meat2.y = config.height;
					setTimeout(function () {meat2.enableBody(true, 200+Math.random()*400, 200+Math.random()*200, true, true)}, 500);
					score += 10;
					scoreText.setText('score: ' + score);
					if (Math.random() < shakerGenRate)
					{
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == true &&
							shaker5.visible == false)
						{
							shaker5.x = 200+Math.random()*400;
							shaker5.y = 200+Math.random()*200;
							shaker5.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == true && shaker4.visible == false)
						{
							shaker4.x = 200+Math.random()*400;
							shaker4.y = 200+Math.random()*200;
							shaker4.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == true &&
							shaker3.visible == false)
						{
							shaker3.x = 200+Math.random()*400;
							shaker3.y = 200+Math.random()*200;
							shaker3.setVisible(true);
						}
						if (shaker1.visible == true && shaker2.visible == false)
						{
							shaker2.x = 200+Math.random()*400;
							shaker2.y = 200+Math.random()*200;
							shaker2.setVisible(true);
						}
						if (shaker1.visible == false)
						{
							shaker1.x = 200+Math.random()*400;
							shaker1.y = 200+Math.random()*200;
							shaker1.setVisible(true);
						}
					}
				}
				if (saltbomb.alive[i].x > shaker1.x - shaker1.displayWidth/2 && saltbomb.alive[i].x < shaker1.x + shaker1.displayWidth/2 &&
					saltbomb.alive[i].y > shaker1.y - shaker1.displayHeight/2 && saltbomb.alive[i].y < shaker1.y + shaker1.displayHeight/2)
				{
					saltbombs += 1;
					shaker1.setVisible(false);
					shaker1.x = config.width;
					shaker1.y = config.height;
				}
				if (saltbomb.alive[i].x > shaker2.x - shaker2.displayWidth/2 && saltbomb.alive[i].x < shaker2.x + shaker2.displayWidth/2 &&
					saltbomb.alive[i].y > shaker2.y - shaker2.displayHeight/2 && saltbomb.alive[i].y < shaker2.y + shaker2.displayHeight/2)
				{
					saltbombs += 1;
					shaker2.setVisible(false);
					shaker2.x = config.width;
					shaker2.y = config.height;
				}
				if (saltbomb.alive[i].x > shaker3.x - shaker3.displayWidth/2 && saltbomb.alive[i].x < shaker3.x + shaker3.displayWidth/2 &&
					saltbomb.alive[i].y > shaker3.y - shaker3.displayHeight/2 && saltbomb.alive[i].y < shaker3.y + shaker3.displayHeight/2)
				{
					saltbombs += 1;
					shaker3.setVisible(false);
					shaker3.x = config.width;
					shaker3.y = config.height;
				}
				if (saltbomb.alive[i].x > shaker4.x - shaker4.displayWidth/2 && saltbomb.alive[i].x < shaker4.x + shaker4.displayWidth/2 &&
					saltbomb.alive[i].y > shaker4.y - shaker4.displayHeight/2 && saltbomb.alive[i].y < shaker4.y + shaker4.displayHeight/2)
				{
					saltbombs += 1;
					shaker4.setVisible(false);
					shaker4.x = config.width;
					shaker4.y = config.height;
				}
				if (saltbomb.alive[i].x > shaker5.x - shaker5.displayWidth/2 && saltbomb.alive[i].x < shaker5.x + shaker5.displayWidth/2 &&
					saltbomb.alive[i].y > shaker5.y - shaker5.displayHeight/2 && saltbomb.alive[i].y < shaker5.y + shaker5.displayHeight/2)
				{
					saltbombs += 1;
					shaker5.setVisible(false);
					shaker5.x = config.width;
					shaker5.y = config.height;
				}
			}
		}

		if (pointsText0.visible == true && tween0.state != 23)
		{
			tween0.restart();
		}
		if (pointsText1.visible == true && tween1.state != 23)
		{
			tween1.restart();
		}
		if (pointsText2.visible == true && tween2.state != 23)
		{
			tween2.restart();
		}
		if (pointsText3.visible == true && tween3.state != 23)
		{
			tween3.restart();
		}
		if (pointsText4.visible == true && tween4.state != 23)
		{
			tween4.restart();
		}
		if (pointsText5.visible == true && tween5.state != 23)
		{
			tween5.restart();
		}
		if (pointsText6.visible == true && tween6.state != 23)
		{
			tween6.restart();
		}
		if (pointsText7.visible == true && tween7.state != 23)
		{
			tween7.restart();
		}
		if (pointsText8.visible == true && tween8.state != 23)
		{
			tween8.restart();
		}
		if (pointsText9.visible == true && tween9.state != 23)
		{
			tween9.restart();
		}

		if (saltCount == 100)
		{
			clearInterval(saltInc);
		}
		if (saltCount > 100)
		{
			clearInterval(saltInc);
			saltCount = 100;
		}
	}
}
