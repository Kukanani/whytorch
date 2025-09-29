const method = "torch.outer";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let other = fxnArgs.other;
  const n = input.items.length;
  const m = other.items.length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = input.getItem([i]).value * other.getItem([j]).value;
      re.addRelation(input, [i]);
      re.addRelation(other, [j]);
      re.explainingEquation = (r) => input.getItem([i]).makeElem().outerHTML + " * " + other.getItem([j]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.outer.html">torch.outer</a>(input, other)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>outer</code> calculates the <a href="https://en.wikipedia.org/wiki/Outer_product">outer product</a> of two tensors.</p>

  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  product of the <code>i</code>th element of <code>input</code> and the <code>j</code>th element of <code>other</code>.</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [1,2,3], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [-1, NaN, 2], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;