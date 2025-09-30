const method = "torch.cummax";

function maxArray(arr) {
  return arr.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), 1e10);
}

function do_function(fxnArgs) {
  let input = fxnArgs.input;
  var dim = fxnArgs.dim;
  var dimVal = fxnArgs.dim.getItem([]).value;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("values", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  const indicesValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const indices = new Tensor("indices", indicesValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {

      let itemsToGroup = [];
      var coords = [i, j];
      let re = result.getItem(coords);
      var upto = coords[dimVal] + 1;

      let ind = indices.getItem(coords);

      for (let k = 0; k < upto; k++) {
        coords[dimVal] = k;
        itemsToGroup.push(input.getItem(coords));
        re.addRelation(input, structuredClone(coords));
        ind.addRelation(input, structuredClone(coords));
      }
      re.value = maxArray(itemsToGroup.map(x => x.value));
      re.explainingEquation = (r) => {
        var itemHTMLs = [];
        var coords = [i, j];
        var upto = coords[dimVal] + 1;
        for (let k = 0; k < upto; k++) {
          coords[dimVal] = k;
          itemHTMLs.push(input.getItem(coords).makeElem().outerHTML);
        }
        groupedHTML = itemHTMLs.join(",");
        return `max(${groupedHTML}) = ${r.makeElem().outerHTML}`;
      };

      let valuesToGroup = itemsToGroup.map(x => x.value);
      ind.value = valuesToGroup.indexOf(Math.max(...valuesToGroup));
      ind.explainingEquation = (r) => {
        var itemHTMLs = [];
        var coords = [i, j];
        var upto = coords[dimVal] + 1;
        for (let k = 0; k < upto; k++) {
          coords[dimVal] = k;
          itemHTMLs.push(input.getItem(coords).makeElem().outerHTML);
        }
        groupedHTML = itemHTMLs.join(",");
        return `index(max(${groupedHTML})) = ${r.makeElem().outerHTML}`;
      };
    }
  }
  return {
    result: result,
    indices: indices
  };
}

sourceCode = `
  <code>(values, indices) = <a href="https://docs.pytorch.org/docs/stable/generated/torch.cummax.html">torch.cummax</a>(input, dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>cummax</code> accumulates the maximum of values along a dimension and returns their location.</p>
  <p>The item in the <code>i</code>th position of <code>dim</code> in <code>values</code> is the maximum of all the items
  in <code>input</code> along <code>dim</code> up to and including the <code>i</code>th item.</p>
  <p>The item in the <code>i</code>th position of <code>dim</code> in <code>indices</code> is the index along <code>dim</code>
  where the maximum item was found (only considering items up to and including the <code>i</code>th item)</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 5, 2],
  [4, 3, 7],
  [8, 9, 6]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
fxnArgs.input = input;
fxnArgs.dim = dim;
