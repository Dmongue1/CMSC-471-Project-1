// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('Game Over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = calcBestMove(skill, game, game.turn())[1];
    /*
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
    */
  } else {
    var move = randomMove();
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algoW=1, skillW=2, algoB=1, skillB=2) {
  if (game.game_over() === true) {
    console.log('game over');
    //  \n' + 'White: algo=' + algoW + ' skill=' + skillW + ' Black: algo=' + algoB + ' skill=' skillB
    return;
  }
  //randomizers for algo and skill, run once at start of game
  //algo randomizers need to be implemented once other evals are implemented
  if (algoW === 0){
    algoW = 1;
  }
  if (skillW === 0){
    //sets skill to a random int between 1 and 3
    skillW = Math.floor((Math.random() * 3) +1);
  }
  if (algoB === 0){
    algoB = 1;
  }
  if (skillB === 0){
    skillB = Math.floor((Math.random() * 3) +1);
  }
  console.log(algoW);
  console.log(skillW);
  console.log(algoB);
  console.log(skillB);
  
  var skill = game.turn() === 'w' ? skillW : skillB;
  var algo = game.turn() === 'w' ? algoW : algoB;
  makeMove(algo, skill);
  window.setTimeout(function() {
    playGame(algoW, skillW, algoB, skillB);
  }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
