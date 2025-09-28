const method = "torch.minimum";
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
      re.value = Math.min(input.getItem([i, j]).value, other.getItem([i, j]).value);
      re.addRelation(input, [i, j]);
      re.addRelation(other, [i, j]);
      re.explainingEquation = (r) => {
        return `min(${input.getItem([i, j]).makeElem().outerHTML}, ${other.getItem([i, j]).makeElem().outerHTML}) = ${r.makeElem().outerHTML}`;
      };
    }
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.minimum.html">torch.minimum</a>(input, other)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>minimum</code> finds the element-wise minimum of two tensors.</p>
  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  minimum of the items at the same indices in <code>input</code> and <code>other</code>, or <code>nan</code> if either item is <code>nan</code>.</p>
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
