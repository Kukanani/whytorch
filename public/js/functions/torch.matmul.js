const method = "torch.matmul";
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
      let sum = 0;
      for (let k = 0; k < A.items[0].length; k++) {
        sum += A.getItem([i, k]).value * B.getItem([k, j]).value;
      }
      re.value = sum;
      for (let k = 0; k < A.items[0].length; k++) {
        re.addRelation(A, [i, k]);
        re.addRelation(B, [k, j]);
      }
      re.explainingEquation = (r) => {
        const terms = [];
        for (let k = 0; k < A.items[0].length; k++) {
          terms.push(A.getItem([i, k]).makeElem().outerHTML + " * " + B.getItem([k, j]).makeElem().outerHTML);
        }
        return terms.join(" + ") + " = " + r.makeElem().outerHTML;
      };
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.matmul.html">torch.matmul</a>(A, B)</code><br/>
  <code>ans = A @ B</code> <span class="codeAnnotation">(equivalent)</span><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>matmul</code> performs the <a href="https://en.wikipedia.org/wiki/Matrix_multiplication">matrix product</a> of two tensors.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the <a href="https://en.wikipedia.org/wiki/Dot_product">dot product</a> of the <code>i</code>th row of <code>A</code> and the <code>j</code>th column of <code>B</code>.</p>
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