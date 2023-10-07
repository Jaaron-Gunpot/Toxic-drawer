function setup() {
    createCanvas(300, 300)
    background("blue")
}
async function genrateHate(sentenceToRate) {
    console.log("started predicting")
    // The minimum prediction confidence.
    const threshold = 0.85;
    let hateCounter = 0;
    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    toxicity.load(threshold).then(model => {

        model.classify(sentenceToRate).then(predictions => {
            for (let prediction of predictions) {
                if(prediction.results[0].match){
                    hateCounter++
                }
            }
            createShape(hateCounter)
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `false` or `true`).
            // If neither prediction exceeds the threshold, `match` is `null`.

            //console.log(predictions);
            /*
            prints:
            {
              "label": "identity_attack",
              "results": [{
                "probabilities": [0.9659664034843445, 0.03403361141681671],
                "match": false
              }]
            },
            {
              "label": "insult",
              "results": [{
                "probabilities": [0.08124706149101257, 0.9187529683113098],
                "match": true
              }]
            },
            ...
             */
        });
    });
}
function createShape(amountOfAggression){
    console.log("started drawing", amountOfAggression)
    ellipseMode(CENTER)
    stroke("red")
    fill("red")
    beginShape()
    for(let i=0, len=amountOfAggression*3;i<len;i++){
        vertex(random(50, 250), random(50, 250))
    }
    for(let i=0, len=(7-amountOfAggression)*3;i<len;i++){
        bezierVertex(random(50, 250), random(50, 250),random(50, 250), random(50, 250),random(50, 250), random(50, 250))
    }
    endShape()
}
function draw(){
    // ellipseMode(CENTER)
    // stroke("red")
    // fill("red")
    // beginShape()
    // for(let i=0;i<7;i++){
    //     vertex(random(0, 300), random(0, 300))
    // }
    // endShape()
}
let sentence = []
document.getElementById("submit").onclick = (e) => {
    background("blue")
    console.log("Submit clicked")
    let textBox = document.getElementById('fir')
    if (sentence.length >= 1) {
        sentence = []
        sentence.push(textBox.value)
    } else {
        sentence.push(textBox.value)
    }
    genrateHate(sentence)
}