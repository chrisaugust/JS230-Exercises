// PARENT NODE ID       DIRECT CHILDREN       INDIRECT CHILDREN
// div#1                     9                      12
// h1#2                      2                       1
// em#3                      1                       0
// p#4                       3                       1
// span#5                    1                       0
// a#6                       1                       1
// strong#7                  1                       0
// div#8                     1                       2
// p#9                       1                       1
// a#10                      1                       0

function walk(node, callback) {
  callback(node);
  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function countChildNodes(node) {
  let numDirectChildNodes = node.childNodes.length;
  let numIndirectChildNodes = 0;

  walk(node, (currentNode) => {
    if (currentNode !== node && currentNode.parentNode !== node) {
      numIndirectChildNodes += 1;
    }
  });

  return [numDirectChildNodes, numIndirectChildNodes];
}

let div1 = document.getElementById(1);
let kiddosAndGrandKiddos = countChildNodes(div1); // [9, 12]
