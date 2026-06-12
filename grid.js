const rows = 20;
const cols = 40;

let gridArray = [];

function createGrid(){

    const grid = document.getElementById("grid");

    for(let i=0;i<rows;i++){

        const row = document.createElement("div");
        row.className="row";

        let rowArray=[];

        for(let j=0;j<cols;j++){

            const node = document.createElement("div");

            node.className="node";
            node.id = i + "-" + j;

            row.appendChild(node);

            rowArray.push({
                row:i,
                col:j,
                id:node.id,
                distance:Infinity,
                visited:false,
                previous:null
            });

        }

        grid.appendChild(row);
        gridArray.push(rowArray);

    }

}

createGrid();