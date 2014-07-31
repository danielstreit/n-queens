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
  var matrix = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matrix.push([i, j]);
    }
  }

  var answers = [];
  var inner = function inner(arr, solution) {
    var holder;
    var solution = solution || [];
    if (arr.length === 1) {
      solution.push(arr[0]);
      answers.push(solution);
    } else {
      for (var i = 0; i < Math.sqrt(arr.length); i++) {
        solution.push(arr[i]);
        holder = arr.filter(function(el) {
          if (el[0] === arr[i][0] ||
              el[1] === arr[i][1]) {
            return false;
          }
          return true;
        });
        inner(holder, solution.slice());
        solution.pop();
      }
    }
  }
  inner(matrix);
 // console.log(answers)

  console.log('Number of solutions for ' + n + ' rooks:', answers.length);
  return answers.length;

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var matrix = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matrix.push([i, j]);
    }
  }

  var answers = [];
  var inner = function inner(arr, solution) {
    var holder;
    var solution = solution || [];
    parent = parent || null;
    if (arr.length === 1) {
      solution.push(arr[0]);
      answers.push(solution);
    } else {
      for (var i = 0; i < Math.sqrt(arr.length); i++) {
        solution.push(arr[i]);
        holder = arr.filter(function(el) {
          if (el[0] === arr[i][0] ||
              el[1] === arr[i][1] ||
              Math.abs(arr[i][0] - el[0]) === Math.abs(arr[i][1] - el[1])) {
            return false;
          }
          return true;
        });
        inner(holder, solution.slice());
        solution.pop();
      }
    }
  }

  inner(matrix);
  answers = answers.filter(function(item) {
    return item.length === n;
  });

  console.log(answers[0]);

  var board = new Board({n: n});
  if (answers.length > 0) {
    answers[0].forEach(function(point) {
      board.togglePiece(point[0], point[1]);
    });
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.attributes));
  return board.attributes;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var matrix = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matrix.push([i, j]);
    }
  }

  var answers = [];
  var inner = function inner(arr, solution) {
    var holder;
    var solution = solution || [];
    parent = parent || null;
    if (arr.length === 1) {
      solution.push(arr[0]);
      answers.push(solution);
    } else {
      for (var i = 0; i < Math.sqrt(arr.length); i++) {
        solution.push(arr[i]);
        holder = arr.filter(function(el) {
          if (el[0] === arr[i][0] ||
              el[1] === arr[i][1] ||
              Math.abs(arr[i][0] - el[0]) === Math.abs(arr[i][1] - el[1])) {
            return false;
          }
          return true;
        });
        inner(holder, solution.slice());
        solution.pop();
      }
    }
  }

  inner(matrix);
  answers = answers.filter(function(item) {
    return item.length === n;
  });
  var temp = [];
  answers.forEach(function(answer) {
    temp.push(stringifyAndSortAnswer(answer));
  });

  answers = _.unique(temp);

  console.log('Number of solutions for ' + n + ' queens:', answers.length);
  return answers.length;
};

var stringifyAndSortAnswer = function(a) {
  var result = [];
  a.forEach(function(point) {
    result.push('' + point[0] + point[1]);
  });
  return result.sort().join();
}
