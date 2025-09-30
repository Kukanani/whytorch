const method = "torch.dot";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let other = fxnArgs.other;
  const n = input.items.length;
  const result = new Tensor("ans", 0, false, 0, document.getElementById("equation"), fxnArgs);
  var re = result.getItem([]);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += input.getItem([i]).value * other.getItem([i]).value;
    re.addRelation(input, [i]);
    re.addRelation(other, [i]);
  }
  re.value = sum;
  re.explainingEquation = (r) => {
    const terms = [];
    for (let i = 0; i < n; i++) {
      terms.push(input.getItem([i]).makeElem().outerHTML + " * " + other.getItem([i]).makeElem().outerHTML);
    }
    return terms.join(" + ") + " = " + r.makeElem().outerHTML;
  };
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.dot.html">torch.dot</a>(input, other)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>dot</code> calculates the <a href="https://en.wikipedia.org/wiki/Dot_product">dot product</a> of two tensors.</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [1, 2, 3], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [0, -1, 5], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;