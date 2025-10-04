const method = "torch.fliplr";
function do_function(fxnArgs) {
  let m = fxnArgs.m;
  const n = m.items.length;
  const width = m.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(width).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < width; j++) {
      let destCoords = [i, j];
      let srcCoords = [i, j];
      srcCoords[1] = (srcCoords[1] + 1) * -1;
      let re = result.getItem(destCoords);
      re.value = m.getItem(srcCoords).value
      re.addRelation(m, srcCoords);
      re.explainingEquation = (r) => {
        return `${m.getItem(srcCoords).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      }
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.fliplr.html">torch.fliplr</a>(m)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>fliplr</code> reverses a tensor along dimension 1 (<code>lr</code> = left-right).</p>
  </div>
`;
var fxnArgs = {};
let m = new Tensor("m", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.m = m;
