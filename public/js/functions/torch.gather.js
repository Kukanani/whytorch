const method = "torch.gather";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let dim = fxnArgs.dim;
  let dimVal = dim.getItem([0]).value;
  let index = fxnArgs.index;
  const n = index.items.length;
  const m = index.items[0].length;
  const resultValues = Array(n).fill(null).map(() => Array(m).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  if (dimVal === 0) {
    for (let i = 0; i < index.items.length; i++) {
      const row = [];
      for (let j = 0; j < index.items[i].length; j++) {
        let re = result.getItem([i, j]);
        re.value = input.getItem([index.getItem([i, j]).value, j]).value;
        re.addRelation(input, [index.getItem([i, j]).value, j]);
        re.addRelation(index, [i, j]);
        re.addRelation(dim, []);
        re.explainingEquation = (r) => {
          return `input[${index.getItem([i, j]).makeElem(d=dim).outerHTML}, ${j}] → ` + input.getItem([index.getItem([i, j]).value, i]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
        };
      }
    }
  } else if (dimVal === 1) {
    for (let i = 0; i < index.items.length; i++) {
      const row = [];
      for (let j = 0; j < index.items[i].length; j++) {
        let re = result.getItem([i, j]);
        re.value = input.getItem([i, index.getItem([i, j]).value]).value;
        re.addRelation(input, [i, index.getItem([i, j]).value]);
        re.addRelation(index, [i, j]);
        re.addRelation(dim, []);
        re.explainingEquation = (r) => {
          return `input[${i}, ${index.getItem([i, j]).makeElem(d=dim).outerHTML}] → ` + input.getItem([index.getItem([i, j]).value, i]).makeElem().outerHTML + " = " + r.makeElem().outerHTML;
        };
      }
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href=\"https://pytorch.org/docs/stable/generated/torch.gather.html\">torch.gather</a>(input, dim, index)</code><br/>
`;
const explanation = `
  <div class=\"explanation\">
  <p><code>gather</code> collects values from <code>input</code> at the indices specified by <code>index</code> along dimension <code>dim</code>.</p>
  <p>For each location in <code>index</code>, the result contains the value from <code>input</code> at that index.</p>
  </div>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
let index = new Tensor("index", [
  [2, 1, 0],
  [0, 1, 1]
], true, 2, document.getElementById("equation"), fxnArgs, 0, 2);
fxnArgs.input = input;
fxnArgs.index = index;
fxnArgs.dim = dim;