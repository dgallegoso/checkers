class checkersGame {
    //This class will make the state for our minimax problem
    //Agent - 0 is the red, the bottom rows
    //Agent - 1 is black, the top rows
    // 1 - Red player
    // 2 - Red king
    // 3 - Black player
    // 4 - Black king

    constructor() {
        this.WIDTH = 8
        this.HEIGHT = 8
        this.numRedPieces = 8;
        this.numBlackPieces = 8;
        this.board = new Array(8);
        for (var i = 0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.board[i][j] = 0;
            } 
        }
        for (var i = 0; i < 3; i++){
            for(var j = (1 + i)%2; j < 8; j+=2) {
                this.board[i][j] = 1;
            }
        }
        for (var i = 5; i < 8; i++){
            for(var j = (i+1)%2; j < 8; j+=2) {
                this.board[i][j] = 3;
            }
        }

        //Binding
        this.isWin = this.isWin.bind(this);
        this.isLose = this.isLose.bind(this);
        this.getScore = this.getScore.bind(this);
        //this.generateSuccessor = this.generateSuccessor.bind();
        this.getLegalActions = this.getLegalActions.bind(this);
        this.inBounds = this.inBounds.bind(this);
        this.recursiveEatSearch = this.recursiveEatSearch.bind(this);
    }

    isWin(agent) {
        if (agent  == 0) {
            if (this.numBlackPieces == 0) {
                return true 
            }
        } else if (agent == 1) {
            if(this.numRedPieces == 0) {
                return true
            }
        }
        return false
    } 

    isLose(agent) {
        if (agent  == 0) {
            if (this.numRedPieces == 0) {
                return true
            }
        } else if (agent == 1) {
            if(this.numBlackPieces == 0) {
                return true
            }
        }
        return false
    }

    inBounds(x, y) {
        if (x >= 0 && x < this.WIDTH && y >= 0 && y < this.HEIGHT) {
            return true
        }
        return false
    }

    getScore() {
        if (this.isWin(0)) {
            return 1000
        } else if(this.isWin(1)) {
            return -1000
        } else {
            return this.numRedPieces - this.numBlackPieces
        }
    }

    // action = [[(0,0), ... , (4,4)], 1]
    // If the second element of the array is 1, then the action involves eating pieces
    // If not, then the action does not involve eating pieces. 
    /*
    generateSuccessor(action, agent) {
        var state = new checkersGame();
        state.numRedPieces = this.numRedPieces;
        state.numBlackPieces = this.numBlackPieces;
        state.board = this.board;

        var moves = action[0];
        var firstMove = moves[0];
        var lastMove = moves[moves.length - 1];

        if(action[1] == 0) {
            state.board[lastMove[0]][lastMove[1]] = state.board[firstMove[0]][firstMove[1]];
            state.board[firstMove[0]][firstMove[1]] = 0;
        } else {
            for (var i = 0; i < moves.length -1; i ++) {
                var first = moves[i]
                var second = moves[i+1]
                state.board[(first[0]+second[0])/2][(first[1]+second[1])/2] = 0
            }
            state.board[lastMove[0]][lastMove[1]] = state.board[firstMove[0]][firstMove[1]];
            state.board[firstMove[0]][firstMove[1]] = 0;
            if (agent == 0 ){
                state.numBlackPieces = state.numBlackPieces - moves.length + 1;
            } else {
                state.numRedPieces = state.numRedPieces - moves.length + 1;
            }
        }
        return state;
    }
    */
    getLegalActions(agent) {
        var actions = []
        if (agent == 0) {
            for(var x = 0; x < this.WIDTH; x++) {
                for(var y = 0; y < this.HEIGHT; y ++) {
                    if(this.board[y][x] == 1 || this.board[y][x] == 2) {
                        var path = [[x,y]];
                        var numActions = actions.length;
                        this.recursiveEatSearch(x, y, this.board[y][x], actions, path);
                        if (actions.length > numActions) {
                            continue;
                        }

                        if (this.inBounds(y+1, x+1) && this.board[y+1][x+1]==0) {
                            actions.push([[x,y],[x+1,y+1],0]);
                        }
                        if (this.inBounds(y+1, x-1) && this.board[y+1][x-1]==0) {
                            actions.push([[x, y],[x-1,y+1],0]);
                        }                       
                    } if(this.board[y][x] == 2) {
                        if (this.inBounds(y-1, x+1) && this.board[y-1][x+1]==0) {
                            actions.push([[x,y],[x+1,y-1],0]);
                        }
                        if (this.inBounds(y-1, x-1) && this.board[y-1][x-1]==0) {
                            actions.push([[x, y],[x-1,y-1],0]);
                        }  
                    }
                }
            }
        } else if (agent == 1) {
            for(var x = 0; x < this.WIDTH; x++) {
                for(var y = 0; y < this.HEIGHT; y ++) {
                    if(this.board[y][x] == 3 || this.board[y][x] == 4) {
                        var path = [[x,y]];
                        var numActions = actions.length;
                        this.recursiveEatSearch(x, y, this.board[y][x], actions, path);
                        if (actions.length > numActions) {
                            continue;
                        }

                        if (this.inBounds(y-1, x+1) && this.board[y-1][x+1]==0) {
                            actions.push([[x,y],[x+1,y-1],0]);
                        }
                        if (this.inBounds(y-1, x-1) && this.board[y-1][x-1]==0) {
                            actions.push([[x, y],[x-1,y-1],0]);
                        }                       
                    } if(this.board[y][x] == 4) {
                        if (this.inBounds(y+1, x+1) && this.board[y+1][x+1]==0) {
                            actions.push([[x,y],[x+1,y+1],0]);
                        }
                        if (this.inBounds(y+1, x-1) && this.board[y+1][x-1]==0) {
                            actions.push([[x, y],[x-1,y+1],0]);
                        }  
                    }
                }
            }
        }
        var canEat = false;
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (action[action.length - 1] == 1) {
                canEat = true;
            }
        }
        if (canEat) {
            for(var i = 0; i <actions.length; i++) {
                var action = actions[i];
                if (action[action.length - 1] == 0) {
                    actions.splice(i, 1);
                    i--;
                }
            }
        }
        return actions;
    }

    recursiveEatSearch(x, y, piece, actions, path) {
        if(piece == 1) {
            var foundMove = false;
            if (y+2 == 7) {
                console.log('upgrade?')
                piece = 2
            }
            if (this.inBounds(y+1, x+1) && this.board[y+1][x+1]>2 && this.inBounds(y+2, x+2) && this.board[y+2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y+2]);
                var oldValue = this.board[y+1][x+1];
                this.board[y+1][x+1] = 0;
                this.recursiveEatSearch(x+2, y+2, piece, actions, path);
                this.board[y+1][x+1] = oldValue
                path.pop();
            }
            if (this.inBounds(y+1, x-1) && this.board[y+1][x-1]>2 && this.inBounds(y+2, x-2) && this.board[y+2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y+2]);
                var oldValue = this.board[y+1][x-1];
                this.board[y+1][x-1] = 0;
                this.recursiveEatSearch(x-2, y+2, piece, actions, path);
                this.board[y+1][x-1] = 0;
                path.pop();
            }
            if(!foundMove && path.length > 1) {
                //console.log(path);

                var pathCopy = [];
                for (var i = 0; i < path.length; i++) {
                    pathCopy.push(path[i])
                }
                pathCopy.push(1)
                actions.push(pathCopy);

                //console.log(actions);
            }
        } else if (piece == 2) {
            var foundMove = false;
            if (this.inBounds(y+1, x+1) && this.board[y+1][x+1]>2 && this.inBounds(y+2, x+2) && this.board[y+2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y+2]);
                var oldValue = this.board[y+1][x+1];
                this.board[y+1][x+1] = 0;
                this.recursiveEatSearch(x+2, y+2, piece, actions, path);
                this.board[y+1][x+1] = oldValue;
                path.pop();
            }
            if (this.inBounds(y+1, x-1) && this.board[y+1][x-1]>2 && this.inBounds(y+2, x-2) && this.board[y+2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y+2]);
                var oldValue = this.board[y+1][x-1];
                this.board[y+1][x-1] = 0;
                this.recursiveEatSearch(x-2, y+2, piece, actions, path);
                this.board[y+1][x-1] = oldValue;
                path.pop();
            }
            if (this.inBounds(y-1, x+1) && this.board[y-1][x+1]>2 && this.inBounds(y-2, x+2) && this.board[y-2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y-2]);
                var oldValue = this.board[y-1][x+1];
                this.board[y-1][x+1] = 0;
                this.recursiveEatSearch(x+2, y-2, piece, actions, path);
                this.board[y-1][x+1] = oldValue
                path.pop();
            }
            if (this.inBounds(y-1, x-1) && this.board[y-1][x-1]>2 && this.inBounds(y-2, x-2) && this.board[y-2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y-2]);
                var oldValue = this.board[y-1][x-1];
                this.board[y-1][x-1] = 0;
                this.recursiveEatSearch(x-2, y-2, piece, actions, path);
                this.board[y-1][x-1] = oldValue;
                path.pop();
            }
            if(!foundMove && path.length > 1) {
                //console.log(path);

                var pathCopy = [];
                for (var i = 0; i < path.length; i++) {
                    pathCopy.push(path[i])
                }
                pathCopy.push(1)
                actions.push(pathCopy);

                //console.log(actions);
            }
        } else if(piece == 3) {
            var foundMove = false;
            if (y-2 == 0) {
                console.log('upgrade?')
                piece = 4
            }
            if (this.inBounds(y-1, x+1) && (this.board[y-1][x+1]==1 || this.board[y-1][x+1]==2)  && this.inBounds(y-2, x+2) && this.board[y-2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y-2]);
                var oldValue = this.board[y-1][x+1];
                this.board[y-1][x+1] = 0;
                this.recursiveEatSearch(x+2, y-2, piece, actions, path);
                this.board[y-1][x+1] = oldValue
                path.pop();
            }
            if (this.inBounds(y-1, x-1) && (this.board[y-1][x-1]==1 || this.board[y-1][x-1]==2) && this.inBounds(y-2, x-2) && this.board[y-2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y-2]);
                var oldValue = this.board[y-1][x-1];
                this.board[y-1][x-1] = 0;
                this.recursiveEatSearch(x-2, y-2, piece, actions, path);
                this.board[y-1][x-1] = 0;
                path.pop();
            }
            if(!foundMove && path.length > 1) {
                //console.log(path);

                var pathCopy = [];
                for (var i = 0; i < path.length; i++) {
                    pathCopy.push(path[i])
                }
                pathCopy.push(1)
                actions.push(pathCopy);

                //console.log(actions);
            }
        } else if (piece == 2) {
            var foundMove = false;
            if (this.inBounds(y+1, x+1) && (this.board[y+1][x+1] == 1 || this.board[y+1][x+1] == 2) && this.inBounds(y+2, x+2) && this.board[y+2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y+2]);
                var oldValue = this.board[y+1][x+1];
                this.board[y+1][x+1] = 0;
                this.recursiveEatSearch(x+2, y+2, piece, actions, path);
                this.board[y+1][x+1] = oldValue;
                path.pop();
            }
            if (this.inBounds(y+1, x-1) && (this.board[y+1][x-1] == 2 || this.board[y+1][x-1] == 1) && this.inBounds(y+2, x-2) && this.board[y+2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y+2]);
                var oldValue = this.board[y+1][x-1];
                this.board[y+1][x-1] = 0;
                this.recursiveEatSearch(x-2, y+2, piece, actions, path);
                this.board[y+1][x-1] = oldValue;
                path.pop();
            }
            if (this.inBounds(y-1, x+1) && (this.board[y-1][x+1] == 1 || this.board[y-1][x+1] == 2) && this.inBounds(y-2, x+2) && this.board[y-2][x+2]==0) {
                foundMove = true;
                path.push([x+2, y-2]);
                var oldValue = this.board[y-1][x+1];
                this.board[y-1][x+1] = 0;
                this.recursiveEatSearch(x+2, y-2, piece, actions, path);
                this.board[y-1][x+1] = oldValue
                path.pop();
            }
            if (this.inBounds(y-1, x-1) && (this.board[y-1][x-1] == 1 || this.board[y-1][x-1] == 2) && this.inBounds(y-2, x-2) && this.board[y-2][x-2]==0) {
                foundMove = true;
                path.push([x-2, y-2]);
                var oldValue = this.board[y-1][x-1];
                this.board[y-1][x-1] = 0;
                this.recursiveEatSearch(x-2, y-2, piece, actions, path);
                this.board[y-1][x-1] = oldValue;
                path.pop();
            }
            if(!foundMove && path.length > 1) {
                //console.log(path);

                var pathCopy = [];
                for (var i = 0; i < path.length; i++) {
                    pathCopy.push(path[i])
                }
                pathCopy.push(1)
                actions.push(pathCopy);

                //console.log(actions);
            }
        }
    }
}

game = new checkersGame();
game.board[3][2] = 3
game.board[6][1] = 2
game.board[6][5] = 0
game.board[5][2] = 1
game.board[7][4] = 0
game.board[6][5] = 3
game.board[5][6] = 0
console.log(game.board)
actions = game.getLegalActions(1)
console.log(actions)
