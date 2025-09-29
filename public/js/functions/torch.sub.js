const method = "torch.sub";
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
      re.value = input.getItem([i, j]).value - other.getItem([i, j]).value;
      re.addRelation(input, [i, j]);
      re.addRelation(other, [i, j]);
      re.explainingEquation = (r) => input.getItem([i, j]).makeElem().outerHTML + " - " + other.getItem([i, j]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
    }
  }
  return result;
}

sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.sub.html">torch.sub</a>(input, other)</code><br/>
  <code>ans = input - other</code> <span class="codeAnnotation">(equivalent)</span><br/>
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.subtract.html">torch.subtract</a>(input, other)</code><span class="codeAnnotation">(equivalent)</span><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>sub</code> performs element-wise subtraction of two tensors.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  item at the <code>i</code>th row and <code>j</code>th column of <code>input</code> minus
  the item at the <code>i</code>th row and <code>j</code>th column of <code>other</code>.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;
