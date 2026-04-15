let prestonyams = 0;
let yampower = 1;
let mnghmoney = 15;
let goontime;
let robogoon = false;
let robogoonmax = false;

const prestonmilestone = [500, 1000, 3000, 5000, 10000];
let woahachieved = [];

const screamBox = document.getElementById('yam-display');
const thePreston = document.getElementById('click-video');
const backgroundNoise = document.getElementById('bg-music');
const drainWalletBtn = document.getElementById('upgrade-btn');
const startWall = document.getElementById('overlay');
const painDisplay = document.getElementById('price-display');
const powerDisplay = document.getElementById('inc-display');

const prestonStart = 8;
const prestonEnd = 11;
const soundStart = 3;

startWall.addEventListener('click', () => {
    startWall.style.display = 'none';
    thePreston.currentTime = prestonStart;
    backgroundNoise.volume = 0.75;
    backgroundNoise.currentTime = soundStart;
    backgroundNoise.loop = true;
    backgroundNoise.play().catch(e => console.error(e));
});

function checkGoonMilestones() {
    prestonmilestone.forEach(goal => {
        if (prestonyams >= goal && !woahachieved.includes(goal)) {
            woahachieved.push(goal);
            prestonyams += 1000;
            yampower += 1;
            screamBox.innerText = prestonyams + " YAMS";
            powerDisplay.innerText = yampower;
            alert(`MILESTONE REACHED: ${goal} YAMS!\nReward: +1,000 Yams and +1 Click Power!`);
        }
    });
}

thePreston.addEventListener('mousedown', (e) => {
    e.preventDefault();
    prestonyams += yampower;
    screamBox.innerText = prestonyams + " YAMS";
    checkGoonMilestones();
    thePreston.play();
    thePreston.style.transform = "scale(1.2)";
    setTimeout(() => { thePreston.style.transform = "scale(1)"; }, 100);
    clearTimeout(goontime);
    goontime = setTimeout(() => { thePreston.pause(); }, 500);
});

thePreston.addEventListener('timeupdate', () => {
    if (thePreston.currentTime >= prestonEnd || thePreston.currentTime < prestonStart) {
        thePreston.currentTime = prestonStart;
    }
});

drainWalletBtn.addEventListener('click', () => {
    if (prestonyams >= mnghmoney) {
        prestonyams -= mnghmoney;
        yampower += 1;
        mnghmoney *= 2;
        screamBox.innerText = prestonyams + " YAMS";
        powerDisplay.innerText = yampower;
        painDisplay.innerText = mnghmoney;
    }
});

function buyAuto1() {
    if (prestonyams >= 150 && !robogoon) {
        prestonyams -= 150;
        robogoon = true;
        document.getElementById('autoclicker-1').style.display = 'none';
        setInterval(() => {
            prestonyams += yampower;
            screamBox.innerText = prestonyams + " YAMS";
            checkGoonMilestones();
        }, 1500);
    }
}

function buyAuto2() {
    if (prestonyams >= 300 && !robogoonmax) {
        prestonyams -= 300;
        robogoonmax = true;
        document.getElementById('autoclicker-2').style.display = 'none';
        setInterval(() => {
            prestonyams += (yampower * 2);
            screamBox.innerText = prestonyams + " YAMS";
            checkGoonMilestones();
        }, 1000);
    }
}
