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
  } else if (algo === 2) {  //<-------------------------------------------------------------change once other evals implemented
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
    console.log('Game Over');
    console.log('White: algo=' + algoW + ' skill=' + skillW);
    console.log('Black: algo=' + algoB + ' skill=' + skillB);
    if (game.in_stalemate() === true){
       console.log('Stalemate');
    } else if (game.turn() === 'w'){
       console.log('White wins');
    } else {
       console.log('Black wins');
    }
    return;
  }
  
  //randomizers for algo and skill, run once at start of game
  //algo randomizers need to be implemented once other evals are implemented
  
  //booleans for which pieces are randomized, so user-specified values won't be affected by the re-randomizer
  var aW_Random = false;
  var sW_Random = false;
  var aB_Random = false;
  var sB_Random = false;

  if (algoW === 0){
    algoW = 1; //<----------------------------------------------------------------------------change once other evals implemented
    aW_Random = true;
  }
  if (skillW === 0){
    //sets skill to a random int between 1 and 3
    skillW = Math.floor((Math.random() * 3) +1);
    sW_Random = true;
  }
  if (algoB === 0){
    algoB = 1;  //<---------------------------------------------------------------------------change once other evals implemented
    aB_Random = true;
  }
  if (skillB === 0){
    skillB = Math.floor((Math.random() * 3) +1);
    sB_Random = true
  }

  //re-randomizer for when two random or semirandom players are identical
  if (aW_Random || sW_Random || aB_Random || sB_Random){
    //loop in case re-randomization gives same values as initial randomization
    while (algoW === algoB && skillW === skillB){
      if (aW_Random){
        //algoW = Math.floor((Math.random() * 3) +1);  <------------------------------------change once other evals implemented
      } else if (aB_Random){
        //algoB = Math.floor((Math.random() * 3) +1);  <------------------------------------change once other evals implemented
      } else if (sW_Random){
        skillW = Math.floor((Math.random() * 3) +1);
      } else {
        skillB = Math.floor((Math.random() * 3) +1);
      }
    }
  }
  
  console.log('White: algo=' + algoW + ' skill=' + skillW);
  console.log('Black: algo=' + algoB + ' skill=' + skillB);
  
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
