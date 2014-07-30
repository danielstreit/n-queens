/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var i = 0; i < n; i++) {
    solution.attributes[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.attributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var perms = [];
  var matrices = [];

  var permutate = function() {
    var choices = [0, 1];
    var outcomes = [];
    var thusFar = [];

    var combos = function(roundsToGo) {
      if (roundsToGo === 0) {
        outcomes.push(thusFar.slice());
        return;
      }
      for (var i = 0; i < choices.length; i++) {
        thusFar.push(choices[i]);
        combos(roundsToGo - 1);
        thusFar.pop();
      }
    }
    combos(n*n);
    return outcomes;

  };

  perms = permutate();
  perms = perms.filter(function(el) {
      return el.reduce(function(a, b) {
        return a + b;
      }) === n;
    });
  perms.forEach(function(el) {
    var temp = [];
    while (el.length) {
      temp.push(el.splice(0, n));
    }
    matrices.push(temp);
  });

  matrices = matrices.filter(function(matrix) {
    var board = new Board(matrix);
    return !board.hasAnyRooksConflicts();
  });

  console.log('Number of solutions for ' + n + ' rooks:', matrices.length);
  return matrices.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
