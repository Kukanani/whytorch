const method = "torch.tanh";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = Math.tanh(input.getItem([i, j]).value).toFixed(3);
      re.addRelation(input, [i, j]);
      re.explainingEquation = (r) => `tanh(${input.getItem([i, j]).makeElem().outerHTML}) = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.tanh.html">torch.tanh</a>(input)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>tanh</code> calculates the element-wise hyperbolic tangent of the input tensor.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 9);
fxnArgs.input = input;
