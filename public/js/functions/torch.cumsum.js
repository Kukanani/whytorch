const method = "torch.cumsum";

function addArray(arr) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function do_function(fxnArgs) {
  let input = fxnArgs.input;
  var dim = fxnArgs.dim;
  var dimVal = fxnArgs.dim.getItem([]).value;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {

      let itemsToGroup = [];
      var coords = [i, j];
      let re = result.getItem(coords);
      var upto = coords[dimVal] + 1;
      for (let k = 0; k < upto; k++) {
        coords[dimVal] = k;
        itemsToGroup.push(input.getItem(coords));
        re.addRelation(input, structuredClone(coords));
      }
      re.value = addArray(itemsToGroup.map(x => x.value));
      re.explainingEquation = (r) => {

        var itemHTMLs = [];
        var coords = [i, j];
        let re = result.getItem(coords);
        var upto = coords[dimVal] + 1;
        for (let k = 0; k < upto; k++) {
          coords[dimVal] = k;
          itemHTMLs.push(input.getItem(coords).makeElem().outerHTML);
        }
        groupedHTML = itemHTMLs.join(" + ");
        return groupedHTML + " = " + r.makeElem().outerHTML
      };
    }
  }
  return result;
}

sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.cumsum.html">torch.cumsum</a>(input, dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>cumsum</code> accumulates the sum of values along a dimension.</p>
  <p>The item in the <code>i</code>th position of <code>dim</code> in <code>ans</code> is the sum of all the items
  in <code>input</code> along <code>dim</code> up to and including the <code>i</code>th item.</p>
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
