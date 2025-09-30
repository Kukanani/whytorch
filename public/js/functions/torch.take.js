const method = "torch.take";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let index = fxnArgs.index;
  const n = index.items.length;
  const m = index.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < index.items.length; i++) {
    for (let j = 0; j < index.items[i].length; j++) {
      let re = result.getItem([i, j]);
      let orderItem = index.getItem([i, j]);
      let coords = [Math.floor(orderItem.value / m), orderItem.value % m];
      re.value = input.getItem(coords).value;
      re.addRelation(input, coords);
      re.addRelation(index, [i, j]);
      re.explainingEquation = (r) => {
        return `input.flatten()[${orderItem.makeElem().outerHTML}] = input[${coords}] = ${input.getItem(coords).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      };
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.take.html">torch.take</a>(input, index)</code><br/>
`;
const explanation = `
  <div class="explanation">
    <p><code>torch.take</code> takes values at the specified indices, assuming that the source data is flattened (the index "counts sequentially" through the source).</p>
    <p>Each element in <code>ans</code> is the value of <code>input</code> at the (flattened) index specified by the corresponding item in <code>index</code>.</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let index = new Tensor("index", [
  [0, 2, 7],
  [1, 3, 5]
], true, 2, document.getElementById("equation"), fxnArgs, 0, input.data.length * input.data[0].length - 1);
fxnArgs.input = input;
fxnArgs.index = index;