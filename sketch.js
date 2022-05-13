let current = "S";
let next = "";
let n = 6;
let N = 200 
let pool = [];
let target = "FF--F--F++F--F--FF" //drawing commands of turtle graphics 

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
   translate(width/2,height);
  rotate(135);   //starting angle 
  //initalization //
  getFitness();
  generation();
  //create pool of N random DNAs // 
  for(let i = 0; i < N; i++){
    let randomSentence = " ";
     let code = int(random(32,128));
    let randChar = char(code);
    randomSentence += randChar;
    let dna = new DNA(randomSentence, target);
    pool.push(dna);
    for (let i =0; i< target.length; i++) {
    }
}
  getFitness();
}

function draw() {
  background(220);
  //selection//
  let matingPool = []
for(let i = 0; i < pool.length; i++){
     let eachDNA = pool[i];
     for(let j = 0; j < eachDNA.fitness; j++)
           matingPool.push(eachDNA);
  
}
  //reproduction
  //N  200
for(let i = 0; i < N; i++){
     let father = random(matingPool);
     let mother = random(matingPool);
     let child= [];
     for(let j = 0; j < father.sentence.length; j++){
        let gene = random([father.sentence[j], mother.sentence[j]]);
        child.push(gene);
     }
  for(let c = 0; c < child.length; c++) {
        if(random(1) < 0.01) child[c] = randChar;
     }
  let childDNA = new DNA(child.join("") ,  target);
     pool[i] = childDNA;
   let best = pool[0];
let maxFitness = best.fitness;
 for(let i = 1; i < pool.length; i++){
	let eachDNA = pool[i];
	if(maxFitness < eachDNA.fitness){
		maxFitness = eachDNA.fitness;
		best = eachDNA;
	}
} 
  print(generation.best.sentence.generation);  //best sentence to input tree drawing part
  if (best.fitness == target.length){
    print("Got it !!!");
    noLoop();
  }
  
}  
  
}
class DNA{
     constructor(sentence, target){
           this.sentence = sentence;
           this.fitness = getFitness(this.sentence, target);
     
  }
   
}
function getFitness(sentence , target) {
  let fitness = 0;
    for ( let j = 0; j < sentence.length ; j ++) {
      if (sentence[j] == target[j]);
        fitness ++;
    }
    return fitness;
}

function generation(){
  for (let iter = 0; iter < n; iter++){
    next = "";
    for (let i = 0; i < current.length; i++){
      let c = current[i];
      if (c=="S") next += "F";
      else if (c=="F") {
         
         next += "F[+F]F[-F]F";
      }
      else next += c;
    } 
    current = next;
  } 
  print(current); 
  turtle(current);
}

function turtle(current){
  let d = 50; //length of each line
  let angle = 45; //angle for rotation
  
  for(let i = 0; i <= current.length; i++){
    let command = current[i];
    if(command =="F"){
      translate(0,d);
      line(0,-d,0,0);
    }
    else if(command =="f"){
      translate(0,d);
    }
    else if(command=="+"){
      rotate(-angle);
    }
    else if(command=="-"){
      rotate(angle);
    }
    else if(command=="["){
      push();
    }
    else if(command=="]"){
      pop();
    }
  }
}
