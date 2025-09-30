const method = "torch.mul";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let other = fxnArgs.other;
  const n_input = input.items.length;
  const m_input = input.items[0].length;
  const n_other = other.items.length;
  const m_other = other.items[0].length;
  const n = n_input * n_other;
  const m = m_input * m_other;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i_input = 0; i_input < n_input; i_input++) {
    for (let j_input = 0; j_input < m_input; j_input++) {
      for (let i_other = 0; i_other < n_other; i_other++) {
        for (let j_other = 0; j_other < m_other; j_other++) {
          let re = result.getItem([i_input * n_other + i_other, j_input * m_other + j_other]);
          re.value = input.getItem([i_input, j_input]).value * other.getItem([i_other, j_other]).value;
          re.addRelation(input, [i_input, j_input]);
          re.addRelation(other, [i_other, j_other]);
          re.explainingEquation = (r) => input.getItem([i_input, j_input]).makeElem().outerHTML + " * " + other.getItem([i_other, j_other]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
        }
      }
    }
  }
  return result;
}

sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.kron.html">torch.kron</a>(input, other)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>kron</code> calculates the <a href="https://en.wikipedia.org/wiki/Kronecker_product">Kronecker product</a> of two tensors.</p>
  <p><code>ans</code> is a block matrix, where the block in the <code>i</code>th row and <code>j</code>th column of <code>ans</code> is the
  item at the <code>i</code>th row and <code>j</code>th column of <code>input</code> multiplied by each of the items in <code>other</code>.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, -2, 3],
  [-4, 5, -6]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [
  [1, 2],
  [3, 4]
], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;
