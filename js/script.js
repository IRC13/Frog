     //***Incoming data***//
    //Start coordinates
    var startPoints = {
    x: 11,
    y: 7
    },
    
    //Finish coordinates
    finishPoint = {
        x: 9,
        y: 10
    },
    
    //Max coordinates values
    field = {
        x: 16,
        y: 10
    },

    //Disabled points coordinates (points with trees)
    enemyTree1 = {
        x: 14,
        y: 9
    },
    enemyTree2 = {
        x: 5,
        y: 8
    },

    //Possible frog's movements
    movement = {
        forward: forward,
        leftShort: leftShort,
        leftLong: leftLong,
        rightShort: rightShort,
        rightLong: rightLong
    },

    //Control data 
    frogs = [],
    results = [],
    jumps = 1000;

    //Possible movements description functions
    function forward(coordinates) {
        newCoordinates = {
            x : coordinates.x + 3,
            y : coordinates.y
        }
        if(newCoordinates.x > field.x){
            newCoordinates.x = newCoordinates.x - field.x;
        }
        return newCoordinates;
        
    }

    function leftShort(coordinates) {
        newCoordinates = {
            x : coordinates.x + 1,
            y : coordinates.y + 2
        }
        if(newCoordinates.x > field.x){
            newCoordinates.x = newCoordinates.x - field.x;
        }
        return newCoordinates;
        
    }

    function leftLong(coordinates) {
        newCoordinates = {
            x : coordinates.x + 2,
            y : coordinates.y + 1
        }
        if(newCoordinates.x > field.x){
            newCoordinates.x = newCoordinates.x - field.x;
        }
        return newCoordinates;
        
    }

    function rightShort(coordinates) {
        newCoordinates = {
            x : coordinates.x + 1,
            y : coordinates.y - 2
        }
        if(newCoordinates.x > field.x){
            newCoordinates.x = newCoordinates.x - field.x;
        }
        return newCoordinates;
        
    }

    function rightLong(coordinates) {
        newCoordinates = {
            x : coordinates.x + 2,
            y : coordinates.y - 1
        }
        if(newCoordinates.x > field.x){
            newCoordinates.x = newCoordinates.x - field.x;
        }
        return newCoordinates
    }

    //Start of the movement
    function GO(){
    alert('Результат Ви можете побачити в консолі!');
    var frog = {
        x: startPoints.x,
        y: startPoints.y,
        id: 0,
        jumps: 0,
        child: [],
        parent: 'I am root, baby!'
    },
    jump = 0;
    frogs.length = 0;
    frogs.push(frog);
    function runFrogRun(frogs) {
        if (jump >= jumps) {
                return;
        }
        for (frog in frogs) {        
            if (frogs[frog].jumps >= jumps) {
                return;
            }
            var frogCoordinates = {
                x: frogs[frog].x,
                y: frogs[frog].y
            },
                newCoordinates = {
                    forward: forward(frogCoordinates),
                    leftS: leftShort(frogCoordinates),
                    leftL: leftLong(frogCoordinates),
                    shortS: rightShort(frogCoordinates),
                    shortL: rightLong(frogCoordinates)
                }
            for (obj in newCoordinates) {
                if (newCoordinates[obj].x <= field.x && (newCoordinates[obj].y > 0 && newCoordinates[obj].y <= field.y) && ((newCoordinates[obj].x != enemyTree1.x && newCoordinates[obj].y != enemyTree1.y) || (newCoordinates[obj].x != enemyTree2.x && newCoordinates[obj].y != enemyTree2.y))) {
                        newCoordinates[obj].id = frogs[frog].id+1 ;
                        newCoordinates[obj].jumps = frogs[frog].jumps+1 ;
                        newCoordinates[obj].child = [];
                        newCoordinates[obj].parent = frogs[frog];
                    if (newCoordinates[obj].x === finishPoint.x && newCoordinates[obj].y === finishPoint.y) {
                        results.push(newCoordinates[obj]);
                    }
                    else {
                        frogs[frog].child.push(newCoordinates[obj]);
                    }
                }
            }
            runFrogRun(frogs[frog].child);
        }
        jump++;
    };

    //Counting results
    function displayFrog(){
        var min = 9999,
            goldenFrog = {};
        for (var i = 0; i < results.length; i++) {
            if(results[i].jumps < min) {
                min = results[i].jumps;
                goldenFrog = results[i];
            }
        }
        
        console.log('Мінімальна кількість стрибків до цілі: ' + min);
        console.log('Шлях до скарбу ↓');
        console.dir(goldenFrog);
    }
        
        //Go go frog!
        runFrogRun(frogs);
        displayFrog();        
}
