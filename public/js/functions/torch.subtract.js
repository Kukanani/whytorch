const method = "torch.subtract";
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
      re.value = A.getItem([i, j]).value - B.getItem([i, j]).value;
      re.addRelation(A, [i, j]);
      re.addRelation(B, [i, j]);
      re.explainingEquation = (r) => A.getItem([i, j]).makeElem().outerHTML + " - " + B.getItem([i, j]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
    }
  }
  return result;
}

sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.subtract.html">torch.subtract</a>(A, B)</code><br/>
  <code>ans = A - B</code> <span class="codeAnnotation">(equivalent)</span><br/>
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.subt.html">torch.sub</a>(A, B)</code><span class="codeAnnotation">(equivalent)</span><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>subtract</code> performs element-wise subtraction of two tensors.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  item at the <code>i</code>th row and <code>j</code>th column of <code>A</code> minus
  the item at the <code>i</code>th row and <code>j</code>th column of <code>B</code>.</p>
  </div>
`;
var fxnArgs = {};
let A = new Tensor("A", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let B = new Tensor("B", [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.A = A;
fxnArgs.B = B;
