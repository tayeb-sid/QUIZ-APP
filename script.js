 const body = document.getElementsByTagName("body")[0];
 const startBtn = document.getElementById("start-btn");
 startBtn.addEventListener("click",startGame);

 const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click",nextQst);

 const questionContainer = document.getElementsByClassName("qst-container")[0];
 const answersContainer = document.getElementsByClassName("answers-container")[0];



 
 // si on veut des differentes qst a chaque debut de partie
 //on  choisie au hasard avec random
qstIndex = 0;
score = 0;
 function startGame(){
    startBtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    answersContainer.classList.remove("hide");
    setQuestion(qstIndex);
    selectAnswer();


}
function setQuestion(index){
    questionContainer.innerText=qstList[index].questionText;
    answerList = qstList[index].answerList;
    for(a of answerList){
        aContainer = document.createElement("button");
        aContainer.classList.add("answer");
        aContainer.innerText=a.answerText;
        aContainer.dataset.correct = a.correct;
        answersContainer.append(aContainer);
    
    }
    
    qstIndex++;

}

function selectAnswer(){
    for(let i= 0;i<answersContainer.childElementCount;i++){

        answersContainer.children[i].addEventListener("click",()=>{
            nextBtn.classList.remove("hide");
            answersContainer.classList.add("blocked");
            answersContainer.children[i].classList.add("clicked");
            if(answersContainer.children[i].dataset.correct == "true"){
                answersContainer.children[i].classList.add("right");
                body.classList.add("right");
                score++;
             } 
            else{
                answersContainer.children[i].classList.add("wrong");
                body.classList.add("wrong")
                showCorrectAnswer(answersContainer);

            }          
        })
    }        
}
function showCorrectAnswer(answersContainer){
    for(let j=0;j<answersContainer.childElementCount;j++){
        if(answersContainer.children[j].dataset.correct == "true")
        answersContainer.children[j].classList.add("right");
    }
}

function clear(answersContainer){
    answersContainer.childNodes.forEach((child)=>{
        child.classList.add("hide");
    })
}
function showScore(){
    answersContainer.classList.add("hide");
    nextBtn.classList.add("hide");
    questionContainer.innerText="Your Score: "+score+"/"+maxNbQst;

}
function nextQst(){
    clear(answersContainer);
    if(qstIndex<maxNbQst){

        nextBtn.classList.add("hide");
        
        answersContainer.classList.remove("blocked");
        body.classList.remove("wrong");
        body.classList.remove("right");
        
        setQuestion(qstIndex);
        selectAnswer();
    }
    else {
        showScore()
        score= 0;
        qstIndex=0;
        //sort the list in a random order everytime we restart
        qstList.sort(()=>Math.random() - 0.5);
        resetALL()
        startBtn.innerText = "Restart";

    }
    
    
}

function resetALL(){
        answersContainer.classList.remove("blocked");
        body.classList.remove("wrong");
        body.classList.remove("right");
        startBtn.classList.remove("hide");

}
// un tableau contenant les questions et pour chaque qst la liste de  ses réponses
//chaque question est un enregistrement qui contient  l'énoncé de la qst et un tableau qui contient les réponses potentielles
// chaque réponse elle meme est un enregistrement qui contient le text de la reponse et un booléen qui indique si la réponse correspendante est vraie ou fausse

const qstList=[
    // qst1  
    {
        questionText: "what is 2+2",
        answerList:[
            {answerText: "4", correct:  true},
            {answerText: "222", correct:  false},
            {answerText: "221", correct:  false},
            {answerText: "223", correct:  false}
            
        ]
    },
    // qst2

    {
        questionText: "what is 0/0",
        answerList:[
            {answerText: "0", correct : false},
            {answerText: "undifined", correct : true}
        ]
    },
    //    qst3

    { 
        questionText: "The Best Club in the world is . . .",
        answerList:[
            {answerText: "Barcelona", correct : true},
            {answerText: "Real Madrid", correct : false}
        ]
    },
    { 
        questionText: "who is the best player in History",
        answerList:[
            {answerText: "2009 Messi", correct : true},
            {answerText: "2011 Messi", correct : true},
            {answerText: "2012 Messi", correct : true},
            {answerText: "2015 Messi", correct : true},
            {answerText: "2019 Messi", correct : true},
            {answerText: "Just Messi", correct : true}



        ]
    },
    { 
        questionText: "Who is the 2nd best player in the world",
        answerList:[
            {answerText: "Ronaldo", correct : false},
            {answerText: "Injured Messi", correct : true}
        ]
    }
]
maxNbQst = qstList.length;
console.log(qstList)