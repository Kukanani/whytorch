const method = "torch.cross";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let other = fxnArgs.other;
  const n = 3;
  const result = new Tensor("ans", [0, 0, 0], false, 0, document.getElementById("equation"), fxnArgs);
  var re0 = result.getItem([0]);
  re0.value = input.getItem([1]).value * other.getItem([2]).value - input.getItem([2]).value * other.getItem([1]).value;
  re0.addRelation(input, [1]);
  re0.addRelation(input, [2]);
  re0.addRelation(other, [1]);
  re0.addRelation(other, [2]);
  re0.explainingEquation = (r) => {
    var a1 = input.getItem([1]).makeElem().outerHTML;
    var a2 = input.getItem([2]).makeElem().outerHTML;
    var b1 = other.getItem([1]).makeElem().outerHTML;
    var b2 = other.getItem([2]).makeElem().outerHTML;
    return `${a1} * ${b2} - ${a2} * ${b1} = ${re0.makeElem().outerHTML}`
  };

  var re1 = result.getItem([1]);
  re1.value = input.getItem([2]).value * other.getItem([0]).value - input.getItem([0]).value * other.getItem([2]).value;
  re1.addRelation(input, [2]);
  re1.addRelation(input, [0]);
  re1.addRelation(other, [0]);
  re1.addRelation(other, [2]);
  re1.explainingEquation = (r) => {
    var a2 = input.getItem([2]).makeElem().outerHTML;
    var a0 = input.getItem([0]).makeElem().outerHTML;
    var b0 = other.getItem([0]).makeElem().outerHTML;
    var b2 = other.getItem([2]).makeElem().outerHTML;
    return `${a2} * ${b0} - ${a0} * ${b2} = ${re1.makeElem().outerHTML}`
  };

  var re2 = result.getItem([2]);
  re2.value = input.getItem([0]).value * other.getItem([1]).value - input.getItem([1]).value * other.getItem([0]).value;
  re2.addRelation(input, [0]);
  re2.addRelation(input, [1]);
  re2.addRelation(other, [1]);
  re2.addRelation(other, [0]);
  re2.explainingEquation = (r) => {
    var a0 = input.getItem([0]).makeElem().outerHTML;
    var a1 = input.getItem([1]).makeElem().outerHTML;
    var b1 = other.getItem([1]).makeElem().outerHTML;
    var b0 = other.getItem([0]).makeElem().outerHTML;
    return `${a0} * ${b1} - ${a1} * ${b0} = ${re2.makeElem().outerHTML}`
  };
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.cross.html">torch.cross</a>(input, other)</code><br/>
`;
const explanation = `
  <div class="explanation">
  <p><code>cross</code> calculates the <a href="https://en.wikipedia.org/wiki/Cross_product">cross product</a> of two tensors.</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [1, 2, 3], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let other = new Tensor("other", [0, -1, 5], true, 2, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.other = other;