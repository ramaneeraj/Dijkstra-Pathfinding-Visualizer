function animateVisitedNodes(visitedNodes){

    for(let i=0;i<visitedNodes.length;i++){

        setTimeout(()=>{

            const node=visitedNodes[i];

            document.getElementById(node.id)
            .classList.add("visited");

        },10*i);

    }

}