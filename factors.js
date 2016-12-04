
// Heuristics!!!!

// 00 01 02
// 10 11 12
// 20 21 22


function numberOfPawns(state) {
    var numRedPawns= 0;
    var numBlackPawns = 0;
    for (var i = 0; i < state.WIDTH; i++) {
        for (var j = 0; j < state,WIDTH; j++) {
            if (state.board[i][j] == 1) {
                numRedKings++;
            } else if (state.board[i][j] == 3) {
                numBlackKings++;
            }
        }
    }
    return (numRedPawns - numBlackPawns);
}

function numberOfKings(state) {
    var numRedKings = 0;
    var numBlackKings = 0;
    for (var i = 0; i < state.WIDTH; i++) {
        for (var j = 0; j < state,WIDTH; j++) {
            if (state.board[i][j] == 2) {
                numRedKings++;
            } else if (state.board[i][j] == 4) {
                numBlackKings++;
            }

        }
    }
    return (numRedKings - numBlackKings);
}

function numSafePawns(state) {
    var numRedPawns = 0;
    var numBlackPawns = 0;
    for (var i = 0; i < state.WIDTH; i++) {
        for (var j = 0; j < state,WIDTH; j++) {
            if (i == 0 || i == 7 || j == 0 || j == 7) {
                if (state.board[i][j] == 1) {
                    numRedPawns++;
                } else if (state.board[i][j] == 3) {
                    numBlackPawns++;
                }
            }
        }
    }
    return (numRedPawns - numBlackPawns);
}

function numSafeKings(state) {
    var numRedKings = 0;
    var numBlackKings = 0;
    for (var i = 0; i < state.WIDTH; i++) {
        for (var j = 0; j < state,WIDTH; j++) {
            if (i == 0 || i == 7 || j == 0 || j == 7) {
                if (state.board[i][j] == 2) {
                    numRedKings++;
                } else if (state.board[i][j] == 4) {
                    numBlackKings++;
                }
            }
        }
    }
    return (numRedKings - numBlackKings);
}


function numMovablePawns (state) {
    var numRedPawns = 0;
    var numBlackPawns = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 1) {
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    numRedPawns++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    numRedPawns++;
                }
            } else if (state.board[y][x] == 3) {
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    numBlackPawns++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    numBlackPawns++;
                }
            }
        }
    }
    return (numRedPawns - numBlackPawns);
}

function numMovableKings (state) {
    var numRedKings = 0;
    var numBlackKings = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 2) {
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    numRedKings++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    numRedKings++;
                }
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    numRedKings++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    numRedKings++;
                }
            } else if (state.board[y][x] == 3) {
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    numBlackKings++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    numBlackKings++;
                }
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    numBlackKings++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    numBlackKings++;
                }
            }
        }
    }
    return (numRedKings - numBlackKings);
}



function distanceToPromotion(state) {
    var RedPawnDistance = 0;
    var BlackPawnDistance = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 1) {
                RedPawnDistance = RedPawnDistance + (state.HEIGHT - 1 - y);
            }
            if (state.board[y][x] == 3) {
                BlackPawnDistance = BlackPawnDistance + y
            }
        }
    }
    return (RedPawnDistance - BlackPawnDistance)
}

function promotionAvailability(state) {
    var RedAvailability = 0;
    var BlackAvailability = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        if (state.board[0][x] == 0) {
            BlackAvailability++;
        }
        if (state.board[state.HEIGHT - 1][x] == 0) {
            RedAvailability++;
        }
    }
    return (RedAvailability - BlackAvailability);
}

function numDefenders(state) {
    var RedDefenders = 0;
    var BlackDefenders = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (y == state.HEIGHT || y == (state.HEIGHT - 1)) {
                if (state.board[y][x] == 1 || state.board[y][x] == 2) {
                    BlackDefenders++;
                }
            }
            if (y == 0 || y == 1) {
                if (state.board[y][x] == 3 || state.board[y][x] == 4) {
                    RedDefenders++;
                }
            }

        }
    }
    return (RedDefenders - BlackDefenders)
}

function numAttackers(state) {
    var RedAttackers = 0;
    var BlackAttackers = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (y == 0 || y == 1 || y == 2) {
                if (state.board[y][x] == 1 || state.board[y][x] == 2) {
                    BlackAttackers++;
                }
            }
            if (y == state.HEIGHT || y == (state.HEIGHT - 1) || y == (state.HEIGHT - 2)) {
                if (state.board[y][x] == 3 || state.board[y][x] == 4) {
                    RedAttackers++;
                }
            }
        }
    }
    return (RedAttackers - BlackAttackers)
}

function numCentralPawns(state) { //3,4,5,6
    var RedCentralPawns = 0;
    var BlackCentralPawns = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (x >= 3 && x <= 6 && y >= 3 && y <= 6) {
                if (state.board[y][x] == 1) {
                    RedCentralPawns++;
                } else if (state.board[y][x] == 3) {
                    BlackCentralPawns++;
                }
            }
        }
    }
    return (RedCentralPawns - BlackCentralPawns)
}

function numCentralKings(state) { //3,4,5,6
    var RedCentralPawns = 0;
    var BlackCentralPawns = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (x >= 3 && x <= 6 && y >= 3 && y <= 6) {
                if (state.board[y][x] == 2) {
                    RedCentralKings++;
                } else if (state.board[y][x] == 4) {
                    BlackCentralKings++;
                }
            }
        }
    }
    return (RedCentralKings - BlackCentralKings)
}
function numPawnsMainDiagonal(state){
    var RedPawnsMD = 0;
    var BlackPawnsMD = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (x + y == (state.WIDTH - 1)) {
                if (state.board[y][x] == 1) {
                    RedPawnsMD++;
                } else if (state.board[y][x] == 3) {
                    BlackPawnsMD++;
                }
            }
        }
    }
    return (RedPawnsMD - BlackPawnsMD)
}

function numKingsMainDiagonal(state){
    var RedKingsMD = 0;
    var BlackKingsMD = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (x + y == (state.WIDTH - 1)) {
                if (state.board[y][x] == 2) {
                    RedKingsMD++;
                } else if (state.board[y][x] == 4) {
                    BlackKingsMD++;
                }
            }
        }
    }
    return (RedKingsMD - BlackKingsMD)
}

function numPawnsDoubleDiagonal(state){
    var RedPawnsDD = 0;
    var BlackPawnsDD = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if ((x - y) == 1 || (y - x) == 1) {
                if (state.board[y][x] == 1) {
                    RedPawnsDD++;
                } else if (state.board[y][x] == 3) {
                    BlackPawnsDD++;
                }
            }
        }
    }
    return (RedPawnsMD - BlackPawnsMD)
}

function numKingsDoubleDiagonal(state){
    var RedKingsDD = 0;
    var BlackKingsDD = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if ((x - y) == 1 || (y - x) == 1) {
                if (state.board[y][x] == 2) {
                    RedKingsDD++;
                } else if (state.board[y][x] == 4) {
                    BlackKingsDD++;
                }
            }
        }
    }
    return (RedKingsMD - BlackKingsMD)
}

function numLonerPawns (state) {
    var RedLonerPawns = 0;
    var BlackLonerPawns = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for (var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 1) {
                var redLonerCounter = 0
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    redLonerCounter++;
                }
                if (redLonerCounter == 4) {
                    RedLonerPawns++;
                }
            } else if (state.board[y][x] == 3) {
                var blackLonerCounter = 0
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    blackLonerCounter++;
                }
                if (blackLonerCounter == 4) {
                    BlackLonerPawns++;
                }
            }
        }
    }
    return (RedLonerPawns - BlackLonerPawns);
}

function numLonerKings (state) {
    var RedLonerKings = 0;
    var BlackLonerKings = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for (var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 2) {
                var redLonerCounter = 0
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    redLonerCounter++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    redLonerCounter++;
                }
                if (redLonerCounter == 4) {
                    RedLonerKings++;
                }
            } else if (state.board[y][x] == 4) {
                var blackLonerCounter = 0
                if (state.inBounds(y-1, x+1) && state.board[y-1][x+1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y-1, x-1) && state.board[y-1][x-1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y+1, x+1) && state.board[y+1][x+1]==0) {
                    blackLonerCounter++;
                }
                if (state.inBounds(y+1, x-1) && state.board[y+1][x-1]==0) {
                    blackLonerCounter++;
                }
                if (blackLonerCounter == 4) {
                    BlackLonerKings++;
                }
            }
        }
    }
    return (RedLonerKings - BlackLonerKings);
}


function numLonerHoles(state) {
    RedHoles = 0;
    BlackHoles = 0;
    for (var x = 0; x < state.WIDTH; x++) {
        for(var y = 0; y < state.HEIGHT; y ++) {
            if (state.board[y][x] == 0) {
                var numRedNeighbors = 0;
                var numBlackNeighbors = 0;
                if (state.inBounds(y+1, x+1) && (state.board[y+1][x+1] ==1 || state.board[y+1][x+1] == 2)) {
                    numRedNeighbors++;
                } else if (state.inBounds(y+1, x+1) && (state.board[y+1][x+1]== 3 || state.board[y+1][x+1]== 4)) {
                    numBlackNeighbors++;
                }
                if (state.inBounds(y+1, x-1) && (state.board[y+1][x-1]==1 || state.board[y+1][x-1]== 2)) {
                    numRedNeighbors++;
                } else if (state.inBounds(y+1, x-1) && (state.board[y+1][x-1]== 3 || state.board[y+1][x-1]== 4)) {
                    numBlackNeighbors++;
                }
                if (state.inBounds(y-1, x+1) && (state.board[y-1][x+1]==1 || state.board[y-1][x+1]== 2)) {
                    numRedNeighbors++;
                } else if (state.inBounds(y-1, x+1) && (state.board[y-1][x+1]== 3 || state.board[y-1][x+1]== 4)) {
                    numBlackNeighbors++;
                }
                if (state.inBounds(y-1, x-1) && (state.board[y-1][x-1]==1 || state.board[y-1][x-1]== 2)) {
                    numRedNeighbors++;
                } else if (state.inBounds(y-1, x-1) && (state.board[y-1][x-1]== 3 || state.board[y-1][x-1]== 4)) {
                    numBlackNeighbors++;
                }
                if (numRedNeighbors >= 3) {
                    RedHoles += 1;
                } else if (numBlackNeighbors >= 3) {
                    BlackHoles += 1;
                }
            }
        }
    }
    return (RedHoles - BlackHoles);
}
