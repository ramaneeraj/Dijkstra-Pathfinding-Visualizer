function getNeighbors(node){

    const neighbors=[];

    const {row,col}=node;

    if(row>0) neighbors.push(gridArray[row-1][col]);
    if(row<rows-1) neighbors.push(gridArray[row+1][col]);
    if(col>0) neighbors.push(gridArray[row][col-1]);
    if(col<cols-1) neighbors.push(gridArray[row][col+1]);

    return neighbors;

}

function dijkstra(startNode,endNode){

    const visitedNodes=[];

    startNode.distance=0;

    let unvisited=[];

    for(let row of gridArray){
        for(let node of row){
            unvisited.push(node);
        }
    }

    while(unvisited.length){

        unvisited.sort((a,b)=>a.distance-b.distance);

        const closest=unvisited.shift();

        if(closest.distance===Infinity) break;

        closest.visited=true;

        visitedNodes.push(closest);

        if(closest===endNode) break;

        const neighbors=getNeighbors(closest);

        for(let neighbor of neighbors){

            if(neighbor.visited) continue;

            let newDist=closest.distance+1;

            if(newDist<neighbor.distance){

                neighbor.distance=newDist;
                neighbor.previous=closest;

            }

        }

    }

    return visitedNodes;

}