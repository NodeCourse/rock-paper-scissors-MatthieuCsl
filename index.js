const express = require('express');
const app = express();
const randomItem = require('random-item');
const choices = ['paper', 'rock', 'scissors'];

// Use Pug to render views
app.set('view engine', 'pug');
// Serve assets from the public folder
app.use(express.static('public'));

//renseigner scenarios comparaison resultats
function compareResult (playerChoice, iaChoice) {
  let resultat;

  if (playerChoice == iaChoice) {
    resultat = "Draw game";
  }
  else if (playerChoice == "paper" && iaChoice == "rock") {
    resultat = "You won";
  }
  else if (playerChoice == "paper" && iaChoice == "scissors") {
    resultat = "You lost";
  }
  else if (playerChoice == "scissors" && iaChoice == "rock") {
    resultat = "You lost";
  }
  else if (playerChoice == "scissors" && iaChoice == "paper") {
    resultat = "You won";
  }
  else if (playerChoice == "rock" && iaChoice == "paper") {
    resultat = "You lost";
  }
  else if (playerChoice == "rock" && iaChoice == "scissors") {
    resultat = "You won";
}
  return resultat;
}

// Render the home page
app.get('/', (req, res) => {
    // Express will look for a page named homepage.pug
    // in the "views" folder so you should have a "views/homepage.pug" file
    res.render('homepage');
});

// Render the paper page
app.get('/:choice*?', (req, res) => {
  let playerChoice = req.params.choice;

  if(choices.includes(playerChoice)) {
    let iaChoice =randomItem(choices);
      // See above comment about render
    res.render('choice', {
      user: playerChoice,
      computer: iaChoice,
      resu: compareResult(playerChoice, iaChoice)
      });
  } else {
    res.render('homepage');
  }
});

app.listen(3000);
