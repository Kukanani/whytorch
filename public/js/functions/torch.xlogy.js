const method = "torch.xlogy";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let other = fxnArgs.other;
  const n = input.items.length;
  const m = other.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = (input.getItem([i, j]).value * Math.log1p(other.getItem([i, j]).value)).toFixed(3);
      re.addRelation(input, [i, j]);
      re.addRelation(other, [i, j]);
      re.explainingEquation = (r) => `${input.getItem([i, j]).makeElem().outerHTML} * log(${other.getItem([i, j]).makeElem().outerHTML}) = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.add.html">torch.xlogy</a>(input, other)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  item in the same index of <code>input</code> times the natural logarithm of (1 plus the corresponding item in <code>other</code>)
  (see <a href="https://numpy.org/doc/2.1/reference/generated/numpy.log1p.html"><code>numpy.log1p</code></a>).</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 0],
  [7, 8, 0]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [
  [9, 8, 7],
  [6, 5, 4],
  [3, NaN, NaN]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;