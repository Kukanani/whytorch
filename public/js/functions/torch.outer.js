const method = "torch.outer";
function do_function(fxnArgs) {
  let A = fxnArgs.A;
  let B = fxnArgs.B;
  const n = A.items.length;
  const m = B.items.length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = A.getItem([i]).value * B.getItem([j]).value;
      re.addRelation(A, [i]);
      re.addRelation(B, [j]);
      re.explainingEquation = (r) => A.getItem([i]).makeElem().outerHTML + " * " + B.getItem([j]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.outer.html">torch.outer</a>(A, B)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>outer</code> performs the <a href="https://en.wikipedia.org/wiki/Outer_product">outer product</a> of two tensors.</p>

  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  product of the <code>i</code>th element of <code>A</code> and the <code>j</code>th element of <code>B</code>.</p>
  </div>
`;

var fxnArgs = {};
let A = new Tensor("A", [1,2,3], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let B = new Tensor("B", [-1, NaN, 2], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.A = A;
fxnArgs.B = B;