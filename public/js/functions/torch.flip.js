const method = "torch.flip";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let dim = fxnArgs.dim;
  let dimVal = dim.getItem([]).value;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let destCoords = [i, j];
      let srcCoords = [i, j];
      srcCoords[dimVal] = (srcCoords[dimVal] + 1) * -1;
      let re = result.getItem(destCoords);
      re.value = input.getItem(srcCoords).value
      re.addRelation(input, srcCoords);
      re.explainingEquation = (r) => {
        let srcCoords = [i, j];
        srcCoords[dimVal] = (srcCoords[dimVal] + 1) * -1;
        return `${input.getItem(srcCoords).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      }
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.flip.html">torch.flip</a>(input, dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>flip</code> reverses a tensor along the specified dimension(s).</p>
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
