const method = "torch.copysign";
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
      // torch.copysign: result = abs(input) * sign(other)
      const inputVal = input.getItem([i, j]).value;
      const otherVal = other.getItem([i, j]).value;
      let sign = Math.sign(otherVal);
      if (sign === 0) {
        sign = 1;
      }
      re.value = Math.abs(inputVal) * sign;
      re.addRelation(input, [i, j]);
      re.addRelation(other, [i, j]);
      re.explainingEquation = (r) =>
        `${input.getItem([i, j]).makeElem().outerHTML} with sign of ${other.getItem([i, j]).makeElem().outerHTML} = ${r.makeElem().outerHTML}`;
    }
  }
  return result;
}
const sourceCode = `
    <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.copysign.html">torch.copysign</a>(input, other)</code><br/>
`;
const explanation = `
    <div class="explanation">
    <p><code>copysign</code> returns a tensor where each element is the absolute value of <code>input</code> with the sign of the corresponding element in <code>other</code>.</p>
    <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is <code>abs(input[i, j])</code> with the sign of <code>other[i, j]</code>.</p>
    </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [
  [9, -8, 7],
  [0, 5, -4],
  [3, -2, 1]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;