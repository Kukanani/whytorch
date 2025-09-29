const method = "torch.addr";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let vec1 = fxnArgs.vec1;
  let vec2 = fxnArgs.vec2;
  const n = input.data.length;
  const m = input.data[0].length;
  const resultValues = structuredClone(input.data);
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let re = result.getItem([i, j]);
      re.value = input.getItem([i, j]).value + vec1.getItem([i]).value * vec2.getItem([j]).value;
      re.addRelation(vec1, [i]);
      re.addRelation(vec2, [j]);
      re.addRelation(input, [i, j]);
      re.explainingEquation = (r) => input.getItem([i, j]).makeElem().outerHTML + " + " + vec1.getItem([i]).makeElem().outerHTML + " * " + vec2.getItem([j]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.addr.html">torch.addr</a>(input, vec1, vec2)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>addr</code> calculates the <a href="https://en.wikipedia.org/wiki/Outer_product">outer product</a> of two tensors and adds it to the input.</p>

  <p>The item in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  product of the <code>i</code>th element of <code>vec1</code> and the <code>j</code>th element of <code>vec2</code>, plus the corresponding item in <code>input</code>.</p>

  <p>If <code>input</code> is all 0s, then this function is equivalent to <code>torch.outer</code>.
  </div>
`;

var fxnArgs = {};
let vec1 = new Tensor("vec1", [1,2,3], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
let vec2 = new Tensor("vec2", [-1, NaN, 2], true, 3, document.getElementById("equation"), fxnArgs, -9, 99);
let input = new Tensor("input", [[0, 1, 2], [-3, -3, -3], [0, 0, 0]], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.vec1 = vec1;
fxnArgs.vec2 = vec2;