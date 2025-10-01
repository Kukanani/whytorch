const method = "torch.tril";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let diagonal = fxnArgs.diagonal;
  let diagonalValue = diagonal.getItem([]).value;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      if (j - i <= diagonalValue) {
        re.value = input.getItem([i, j]).value;
        re.addRelation(input, [i, j]);
        re.explainingEquation = (r) => `${input.getItem([i, j]).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      } else {
        re.value = 0;
        re.addRelation(diagonal, []);
        re.explainingEquation = (r) => `below diagonal ${diagonal.getItem([]).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      }
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.tril.html">torch.tril</a>(input)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>tril</code> returns the lower <a href="https://en.wikipedia.org/wiki/Triangular_matrix">triangular matrix</a> of the input.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let diagonal = new Tensor("diagonal", 0, true, 4, document.getElementById("equation"), fxnArgs, -3, 3);
fxnArgs.input = input;
fxnArgs.diagonal = diagonal;
