const method = "torch.fmax";
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
      if(isNaN(input.getItem([i, j]).value)) {
        re.value = other.getItem([i, j]).value;
      } else if(isNaN(other.getItem([i, j]).value)) {
        re.value = input.getItem([i, j]).value;
      } else {
        re.value = Math.max(input.getItem([i, j]).value, other.getItem([i, j]).value);
      }
      re.addRelation(input, [i, j]);
      re.addRelation(other, [i, j]);
      re.explainingEquation = (r) => {
        return `max(${input.getItem([i, j]).makeElem().outerHTML}, ${other.getItem([i, j]).makeElem().outerHTML}) = ${r.makeElem().outerHTML}`;
      };
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.fmax.html">torch.fmax</a>(input, other)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>fmax</code> finds the element-wise maximum of two tensors, robust to <code>nan</code> values.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  fmax of the items at the same indices in <code>input</code> and <code>other</code>, or <code>nan</code> if both items are <code>nan</code>.</p>
  <p>This function is the same as <code>torch.maximum</code>, except, that it only produces <code>nan</code> if <u>both</u> elements are <code>nan</code>.
  If one is <code>nan</code>, the non-<code>nan</code> value is used instead.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, NaN],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [
  [9, 8, 7],
  [6, NaN, 4],
  [3, 2, 1]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;
