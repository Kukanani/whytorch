const method = "torch.abs";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = Math.abs(input.getItem([i, j]).value);
      re.addRelation(input, [i, j]);
      re.explainingEquation = (r) => `abs(${input.getItem([i, j]).makeElem().outerHTML}) = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.abs.html">torch.abs</a>(input)</code><br/>
  <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.absolute.html">torch.absolute</a>(input)</code> <span class="codeAnnotation">(equivalent)</span><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>abs</code> calculates the element-wise absolute value of the input tensor.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, -2, 3],
  [-4, 5, -6],
  [7, -8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 9);
fxnArgs.input = input;
