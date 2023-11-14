window.addEventListener('load', function () {

    var flagCount = 10;
    // document.querySelector('.new-game').addEventListener('click', function () {
    var tileEl = this.document.querySelectorAll('.tile')

    //Map tiles to a new array with a key to indicate if they have a mine or not, false by default
    let tiles = Array.from(tileEl)
    const assignKey = (arr, key, value) => {
        arr.map(obj => {
            obj[key] = value;
        })
    }

    assignKey(tiles, 'hasMine', false)

    //Mine generation CONTAINS VALUES TO BE CHANGED LATER
    const mines = 10;
    var minesRemaining = 10;                                                   //Change later to scale
    for (var i = 0; i < mines; i++) {
        function randWhole(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        var randTileId = `d${randWhole(1, 10)}-${randWhole(1, 10)}`     //Change later to scale 
        var mineTile = this.document.querySelector(`#${randTileId}`)
        //Loop to ensure no mines overlap
        while (mineTile.hasMine) {
            randTileId = `d${randWhole(1, 10)}-${randWhole(1, 10)}`     //Change later to scale 
            mineTile = this.document.querySelector(`#${randTileId}`)
            if (mineTile.hasMine === false) {
                break;
            } else {
                continue;
            }
        }

        // mineTile.className = 'tile mine';                               //REMOVE LATER, just for seeing where mine is
        mineTile.hasMine = true;
    }

    //Script for opening tiles when clicked
    tileEl.forEach(tile => {
        tile.addEventListener('click', event => {
            if (event.target.className === 'tile closed' && event.target.hasMine === false) {
                event.target.className = 'tile open'

                //Count adjacent mines when a tile is opened
                var adjacentMines = 0;
                const tileLoc = event.target.id.split('')

                var adjacentTopLeft = [tileLoc[0], parseInt(tileLoc[1]) - 1, tileLoc[2], parseInt(tileLoc[3]) - 1].join('')
                var adjacentTop = [tileLoc[0], parseInt(tileLoc[1]) - 1, tileLoc[2], parseInt(tileLoc[3])].join('')
                var adjacentTopRight = [tileLoc[0], parseInt(tileLoc[1]) - 1, tileLoc[2], parseInt(tileLoc[3]) + 1].join('')
                var adjacentLeft = [tileLoc[0], parseInt(tileLoc[1]), tileLoc[2], parseInt(tileLoc[3]) - 1].join('')
                var adjacentRight = [tileLoc[0], parseInt(tileLoc[1]), tileLoc[2], parseInt(tileLoc[3]) + 1].join('')
                var adjacentBottomLeft = [tileLoc[0], parseInt(tileLoc[1]) + 1, tileLoc[2], parseInt(tileLoc[3]) - 1].join('')
                var adjacentBottom = [tileLoc[0], parseInt(tileLoc[1]) + 1, tileLoc[2], parseInt(tileLoc[3])].join('')
                var adjacentBottomRight = [tileLoc[0], parseInt(tileLoc[1]) + 1, tileLoc[2], parseInt(tileLoc[3]) + 1].join('')

                const adjacentTiles = [
                    adjacentTopLeft,
                    adjacentTop,
                    adjacentTopRight,
                    adjacentLeft,
                    adjacentRight,
                    adjacentBottomLeft,
                    adjacentBottom,
                    adjacentBottomRight
                ]

                adjacentTiles.forEach(t => {
                    const tile = document.querySelector(`#${t}`)
                    if (tile !== null && tile.hasMine === true) {
                        adjacentMines++
                    }
                })

                //Open adjacent tiles if the clicked tiles has adjacentMines === 0
                if (adjacentMines !== 0) {
                    event.target.innerHTML = adjacentMines;
                } else if (adjacentMines === 0) {
                    adjacentTiles.forEach(t => {
                        const tile = document.querySelector(`#${t}`)
                        if (tile !== null && tile.className === 'tile closed') {
                            let clickEvent = new Event('click');
                            tile.dispatchEvent(clickEvent)
                        }
                    })
                }

            } else if (event.target.className === 'tile closed' && event.target.hasMine === true) {
                tileEl.forEach(tile => {
                    if (tile.hasMine === true) {
                        tile.className = 'mine'
                    } else if (tile.className === 'tile closed') {
                        tile.className = 'closed'
                    }
                })
            }
        })

        var countEl = this.document.querySelector('.flag-count');
        countEl.innerHTML = flagCount;
        tile.addEventListener('contextmenu', (event) => {
            if (event.target.className === 'tile closed' && event.target.hasMine === false) {
                event.target.className = 'tile flag';
                flagCount--;
                countEl.innerHTML = flagCount;
            } else if (event.target.className === 'tile closed' && event.target.hasMine === true) {
                event.target.className = 'tile flag';
                minesRemaining--;
                flagCount--;
                countEl.innerHTML = flagCount;
            } else if (event.target.className === 'tile flag' && event.target.hasMine === false) {
                event.target.className = 'tile closed';
                flagCount++;
                countEl.innerHTML = flagCount;
            } else if (event.target.className === 'tile flag' && event.target.hasMine === true) {
                event.target.className = 'tile closed';
                minesRemaining++;
                flagCount++;
                countEl.innerHTML = flagCount;
            }

            //Victory state
            if (minesRemaining === 0) {
                this.document.querySelectorAll('.flag').forEach(tile => {
                    tile.className = 'win'
                })
                this.document.querySelectorAll('.closed').forEach(tile => {
                    tile.className = 'tile open'
                })
            }
        })
        
    })
});
// });

//Make it so that the game can be restarted