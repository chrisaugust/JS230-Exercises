// Write a JavaScript function that takes an element's id and returns
// the DOM tree of the element in a 2d array. The first subarray contains
// the element and its siblings, the second contains the parent of the 
// element and its siblings, so on and so forth, all the way up to the
// 'grandest' parent. Assume the 'grandest' parent is the element with
// an id of 1.
//
//
// ALGORITHM
// - initialize empty 'DOMTree' array
// - search for Element by id, assign to currentNode
// - get parentNode of currentNode
// - append all childNodes of parentNode to DOMTree
// - set currentNode to parentNode
// - repeat until id === 1

function domTreeTracer(id) {
  const domTree = [];
  let currentNode = document.getElementById(id)

  do { 
    let siblingsCollection = currentNode.parentElement.children;
    let currentLevel = [];

    for (let i = 0; i < siblingsCollection.length; i += 1) {
      currentLevel.push(siblingsCollection[i].nodeName);
    }
    domTree.push(currentLevel);
    currentNode = currentNode.parentElement;
  } while (currentNode.nodeName !== 'BODY')

  return domTree;
}

// TESTS
domTreeTracer(1); // [["ARTICLE"]];
domTreeTracer(2); //  [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(22); // [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

