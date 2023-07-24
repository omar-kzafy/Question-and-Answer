let currentIndex = 0;
let remainTemps = 2;
let spansAns = document.querySelectorAll('.quesAnswerd span');
let tictac = new Audio('files/tic-tac.mp3');
if (localStorage.getItem('gamesPlayed') === null) {
    localStorage.setItem('gamesPlayed',0);
}
if (localStorage.getItem('score') === null) {
    localStorage.setItem('score',0);
}
if (localStorage.getItem('questionAnswer') === null) {
    localStorage.setItem('questionAnswer',0);
}
let quesAns = Number(localStorage.getItem('questionAnswer'));
let Totalscore = Number(localStorage.getItem('score'));
let gamesP = Number(localStorage.getItem('gamesPlayed'));

let score = 0;

let wrongS = new Audio('files/wrong.mp3');
let correctS = new Audio('files/correct.mp3');
let halfhelp = document.getElementById('halfhelp');
let callhlep = document.getElementById('callhelp');
let peohelp = document.getElementById('peoplehelp');
let ansDivs = document.getElementsByClassName('ans');
let alertdiv = document.querySelector('.alert')
let quesArea = document.getElementsByClassName('question')[0];
let surv = document.querySelector('.surv');
let survSpans = document.querySelectorAll('.surv span');
survSpans = shuffle(survSpans)
document.querySelector('.surv button').onclick = () => {
    surv.style.display = 'none'
}
document.querySelector('.quesAnswerd i').onclick = () => {
    document.querySelector('.quesAnswerd').classList.toggle('moved');
    document.querySelector('.quesAnswerd i').classList.toggle('moved')
}
document.querySelector('.loseIns button').onclick = () => {
    location.href = location.href.slice(0,location.href.indexOf('play.html')) + 'index.html'
}
document.querySelector('.winleft button').onclick = () => {
    location.href = location.href.slice(0,location.href.indexOf('play.html')) + 'index.html'
}
function shuffle(array) {
    let currentIndexInner = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndexInner != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndexInner);
      currentIndexInner--;
  
      // And swap it with the current element.
      [array[currentIndexInner], array[randomIndex]] = [
        array[randomIndex], array[currentIndexInner]];
    }
  
    return array;
  }
function setScore() {
    document.querySelector('.score span').textContent = score
}
let cutbarspan = document.querySelector('.cutbar span');
let timer = 0;
let inter = setInterval(function () {
        timer += 0.01;
        cutbarspan.style.width = (timer / 60 * 100) + '%';
},10)
function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            questionsObject = shuffle(questionsObject)
            let qcount = questionsObject.length
            addQuestionData(questionsObject[currentIndex],qcount);
            Array.from(ansDivs).forEach(element => { 
                    element.onclick = () => {
                        if (element.classList.value.indexOf('disabled') === -1) {
                            let rigthAns = questionsObject[currentIndex].theRightAnswer;
                            checkAnswer(rigthAns,element.getAttribute('data-val'));
                            currentIndex++;
                            setTimeout(function() {
                                addQuestionData(questionsObject[currentIndex],qcount)
                            },1300)
                        } else {
                            return
                        }
                    }
            
            });
            halfhelp.onclick = function () {
                
                if (!halfhelp.classList.contains('disabled')) {
                    new Audio('files/helpChecked.mp3').play()
                    let rigthAns = questionsObject[currentIndex].theRightAnswer;
                    let anAraay = shuffle(Array.from(ansDivs).filter((e) => e.getAttribute('data-val') !== rigthAns));
                    anAraay[0].classList.add('disabled');
                    anAraay[1].classList.add('disabled');
                    halfhelp.classList.add('disabled');
                }
            }


            peohelp.onclick = function () {
                
                if (!peohelp.classList.contains('disabled')) {
                    new Audio('files/helpChecked.mp3').play()
                    let rigthAns = questionsObject[currentIndex].theRightAnswer;
                    let anAraay = shuffle(Array.from(ansDivs).filter((e) => e.getAttribute('data-val') !== rigthAns));
                    peohelp.classList.add('disabled');
                    surv.style.display = 'flex';
                    surv.style.left += '50%';
                    survSpans = shuffle(survSpans);
                    let wid1 = Math.floor(Math.random() * 60);
                    let wid2 = Math.floor(Math.random() * (100 - wid1 - 20));
                    let wid3 = Math.floor(Math.random() * (100 - wid1 - wid2));
                    let wid4 = (100 - wid1 - wid2 - wid3);
                    let biggest = [wid1,wid2,wid3,wid4].filter((e) => e >= wid1 && e >= wid2 && e >= wid3 && e >= wid4 );
                    let listnum = [wid1,wid2,wid3,wid4].filter((e) => e != biggest);
                    let randomNumber = Math.floor(Math.random() * 4);
                    for (let i = 0;i < 4; i++) {
                        if (i === randomNumber) {
                            survSpans[i].style.height = biggest + '%';
                            survSpans[i].setAttribute('data-ab',rigthAns);
                        } else if (i === 3 && i !== randomNumber) {
                            survSpans[i].style.height = listnum[2] + "%";
                            survSpans[i].setAttribute('data-ab',anAraay[2].getAttribute('data-val'))
                        } else if (i < 3 && i !== randomNumber) {
                            survSpans[i].style.height = listnum[i] + "%";
                            survSpans[i].setAttribute('data-ab',anAraay[i].getAttribute('data-val'));
                        }
                    }
                }
            }
            callhelp.onclick = function () {
                
                if (!callhelp.classList.contains('disabled')) {
                    new Audio('files/helpChecked.mp3').play()
                    let rigthAns = questionsObject[currentIndex].theRightAnswer;
                    [div] =Array.from(ansDivs).filter((e) => e.getAttribute('data-val') == rigthAns);
                    let ring = new Audio('files/vintage-phone-ringing-121778.mp3');
                    ring.play()
                    timer -= 9;
                    setTimeout(() => {
                        if (div.getAttribute('data-cr') === 'A-'){
                            new Audio('files/A.mp3').play();
                            timer -= 6;
                        }else if (div.getAttribute('data-cr') === 'B-'){
                            new Audio('files/B.mp3').play();
                            timer -= 8;
                        }else if (div.getAttribute('data-cr') === 'C-'){
                            new Audio('files/C.mp3').play();
                            timer -= 8;
                        }else if (div.getAttribute('data-cr') === 'D-'){
                            new Audio('files/D.mp3').play();
                            timer -= 5;
                        }
                    },9000)
                    callhelp.classList.add('disabled');
                }
            }

            setInterval(() => {
                if (timer > 60) {
                    timer = -1.3;
                    let rigthAns = questionsObject[currentIndex].theRightAnswer;
                    let falseAns = questionsObject[currentIndex].defaultWrong;
                    checkAnswer(rigthAns,falseAns);
                    currentIndex++;
                    setTimeout(function() {
                        addQuestionData(questionsObject[currentIndex],qcount)
                    },1300);
                }
            },100)
        }
    }
    myRequest.open("GET", "questions.json");
    myRequest.send();
}

function addQuestionData(obj,count) {
    if (currentIndex === 20) {
        document.querySelector('.winleft').style.display = 'flex';
        new Audio('files/windsound.mp3').play();
        new Audio('files/succes.mp3').play();
        tictac.pause();
        tictac.paused();
        tictac.loop = false;
        addLayer();
        score += 1000;
        clearInterval(inter)
        return;
    }
    if (remainTemps !== -1) {
        timer = 0;
        spansAns[currentIndex].classList.add('here');
        tictac.play()
        tictac.loop = true
        tictac.played
        ansDivs = document.getElementsByClassName('ans');
        Array.from(ansDivs).forEach(element => {
            element.classList.remove('disabled')
        })
        quesArea.innerHTML = ``;
        Array.from(ansDivs).forEach((e) => {
        e.innerHTML = ``
        })
        let quesTitle = document.createElement('h2');
        let quesText = document.createTextNode(obj.title);
        quesTitle.appendChild(quesText);
        quesArea.appendChild(quesTitle)
        ansDivs = shuffle(ansDivs);
        // for (let i = 1; i < 5; i++) {
        let ansq = 1
        shuffle([1,4,2,3]).forEach(function(num) {
            console.log(shuffle([1,4,2,3]));
            let ansTitle = document.createElement('h5')
            ansTitle.style.direction = 'rtl'
            let ansText = document.createTextNode(obj[`answer_${ansq}`]);
            ansTitle.appendChild(ansText);
            ansDivs[num - 1].appendChild(ansTitle);
            ansDivs[num - 1].setAttribute('data-val',obj[`answer_${ansq}`])
            ansq++;
        })
    }
    // 
}

function checkAnswer(rA, cA) {
    tictac.pause();
    timer -= 2
    if (rA === cA) {
        Array.from(ansDivs).forEach((ele) => {
            if (ele.getAttribute('data-val') === rA) {
                ele.classList.add('right');
                correctS.play()
                setTimeout(() => {ele.classList.remove('right')},1000)
            }
        })
        spansAns[currentIndex].classList.remove('here');
        spansAns[currentIndex].classList.add('right');
        addScore()
        setScore();
        document.querySelector('.score').classList.add('on');
        addCor()
        setTimeout(() =>{document.querySelector('.score').classList.remove('on')},1300)
    } else {
        isWrong();
        spansAns[currentIndex].classList.remove('here');
        spansAns[currentIndex].classList.add('wrong');
       function isWrong() {
            if (remainTemps === 0) {
                isLose();
                function isLose() {
                    currentIndex--;
                    addLayer();
                    Array.from(ansDivs).forEach((ele)=>{ele.classList.add('disabled')});
                    let loseIns = document.querySelector('.loseIns')
                    loseIns.style.display = 'flex';
                    loseIns.style.opacity = 1;
                    new Audio('files/fallSound.mp3').play();
                    clearInterval(inter);
                    tictac.pause();
                    tictac.paused;
                    tictac.loop = false;
                }
            } else {
                remainTemps--;
                wrongS.play()
                Array.from(ansDivs).forEach((ele) => {
                    if (ele.getAttribute('data-val') === cA) {
                        ele.classList.add('wrong');
                        setTimeout(() => {ele.classList.remove('wrong')},1000)
                    } else if (ele.getAttribute('data-val') === rA) {
                        ele.classList.add('right');
                        setTimeout(() => {ele.classList.remove('right')},1000)
                    }
                })
                alertdiv.style.display = 'flex';
                document.querySelector('.alert h3').innerHTML = `You have ${remainTemps + 1} temps remainig`               
                alertdiv.style.maxWidth = '250px';
                setTimeout(() => {alertdiv.style.display = 'none'},1500)
            }
        }
    }
}
function addGames() {
    gamesP++;
    window.localStorage.setItem('gamesPlayed',gamesP);
}
addGames()
function addScore() {
    if (timer < 15) {
        score += 30;
        Totalscore += 30;
        window.localStorage.setItem('score',Totalscore)
    } else if (timer < 22) {
        score +=20
        Totalscore += 20;
        window.localStorage.setItem('score',Totalscore)
    } else if (timer < 30) {
        score += 15
        Totalscore += 15;
        window.localStorage.setItem('score',Totalscore)
    }
}
function addCor() {
    quesAns++;
    localStorage.setItem('questionAnswer',quesAns);
}
function addLayer() {
    let backG = document.querySelector('.background');
    backG.style.display = 'block'
    backG.style.height = document.documentElement.scrollHeight;
    backG.style.width = document.documentElement.scrollWidth;
}
getQuestions();