const method = "torch.amin";
function do_function(fxnArgs) {
  var input = fxnArgs.input;
  var dim = fxnArgs.dim;
  var dimVal = fxnArgs.dim.getItem([]).value;
  const n = input.items.length;
  const m = input.items[1].length;
  const resultData = Array(n).fill(0);
  const result = new Tensor("ans", resultData, false, 0, document.getElementById("equation"), fxnArgs);

  for (let i = 0; i < n; i++) {
    let itemsToGroup = [];
    var coords = [];
    for (let j = 0; j < m; j++) {
      if (dimVal === 0) {
        var coords = [j, i];
      } else {
        var coords = [i, j];
      }
      itemsToGroup.push(input.getItem(coords));
    }
    result.getItem([i]).value = Math.min(...itemsToGroup.map(x => x.value));
    for(elem of itemsToGroup) {
      result.getItem([i]).addRelation(input, elem.coords);
      result.getItem([i]).addRelation(dim, []);
    }
    const addTermsHtml = itemsToGroup.map(x => x.makeElem().outerHTML).join(',');

    result.getItem([i]).explainingEquation = (r) => {
      var coordsHTML = "";
      for (let j = 0; j < 2; j++) {
        if(j === dimVal) {
          coordsHTML += `${makeDimAnnotatedElement(":", dim).outerHTML}`;
        } else {
          coordsHTML += i;
        }
        if (j === 0) {
          coordsHTML += ", ";
        }
      }
      return `min(input[${coordsHTML}]) = min(${addTermsHtml}) = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.amin.html">torch.amin</a>(input, dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>amin</code> finds the min of a tensor along a dimension.</p>
  <p>The <code>i</code>th item in <code>ans</code> is the
  minimum of all items of <code>input</code> along the <code>dim</code>th dimension.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
fxnArgs.input = input;
fxnArgs.dim = dim;