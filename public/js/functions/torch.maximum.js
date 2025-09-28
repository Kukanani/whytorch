const method = "torch.mul";
function do_function(fxnArgs) {
  let A = fxnArgs.A;
  let B = fxnArgs.B;
  const n = A.items.length;
  const m = B.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = A.getItem([i, j]).value * B.getItem([i, j]).value;
      re.addRelation(A, [i, j]);
      re.addRelation(B, [i, j]);
      re.explainingEquation = (r) => {
        return `max(${A.getItem([i, j]).makeElem().outerHTML}, ${B.getItem([i, j]).makeElem().outerHTML} = ${r.makeElem().outerHTML}`;
      };
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.maximum.html">torch.maximum</a>(A, B)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>maximum</code> finds the element-wise maximum of two tensors.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  maximum of the items at the same indices in <code>A</code> and <code>B</code>, or <code>nan</code> if either item is <code>nan</code>.</p>
  </div>
`;
var fxnArgs = {};
let A = new Tensor("A", [
  [1, 2, NaN],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let B = new Tensor("B", [
  [9, 8, 7],
  [6, NaN, 4],
  [3, 2, 1]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.A = A;
fxnArgs.B = B;
