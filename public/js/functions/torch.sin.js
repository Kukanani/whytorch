const method = "torch.sin";
function do_function(fxnArgs) {
  let A = fxnArgs.A;
  const n = A.items.length;
  const m = A.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = Math.sin(A.getItem([i, j]).value).toFixed(3);
      re.addRelation(A, [i, j]);
      re.explainingEquation = (r) => `sin(${A.getItem([i, j]).makeElem().outerHTML} radians) = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.sin.html">torch.sin</a>(A)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>sin</code> performs the element-wise sine of the input tensor.</p>
  </div>
`;
var fxnArgs = {};
let A = new Tensor("A", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.A = A;
