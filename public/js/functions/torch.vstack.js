const method = "torch.vstack";

function stack(tensors, dim, fxnArgs) {
  let dimVal = dim.getItem([0]).value;

  const tensorCount = tensors.length;
  const tensorLength = tensors[0].items.length;

  let resultValues;
  if (dimVal === 0) {
    resultValues = tensors.map(tensor => [...tensor.items]);
  } else {
    resultValues = Array(tensorLength)
      .fill(null)
      .map((_, idx) => tensors.map(tensor => tensor.getItem([idx]).value));
  }

  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);

  // Add relations and explanations
  for (let i = 0; i < tensorCount; i++) {
    for (let j = 0; j < tensorLength; j++) {
      var coords = [];
      if (dimVal === 0) {
        coords = [i, j];
      } else if (dimVal === 1) {
        coords = [j, i];
      }
      let re = result.getItem(coords);
      re.value = tensors[i].getItem([j]).value;
      re.addRelation(tensors[i], [j]);
      re.addRelation(dim, []);
      re.explainingEquation = (r) => {
        var coordsHTML = "";
        if (dimVal === 0) {
          coordsHTML = `${makeDimAnnotatedElement(i, d=dim).outerHTML}, ${j}`;
        } else if (dimVal === 1) {
          coordsHTML = `${i}, ${makeDimAnnotatedElement(j, d=dim).outerHTML}`;
        }
        return `ans[${coordsHTML}] = tensor${coords[0]}[${coords[1]}] → ` + r.makeElem().outerHTML;
      };
    }
  }
  return result;
}

function do_function(fxnArgs) {
  let tensors = [fxnArgs.tensor0, fxnArgs.tensor1];
  let dummyDim = new Tensor("dim", 0, true, 99, document.getElementById("equation"), fxnArgs, 0, 0);

  return stack(tensors, dummyDim, fxnArgs);
}

const sourceCode = `
  <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.vstack.html">torch.vstack</a>([tensor0, tensor1, ...])</code><br/>
`;

const explanation = `
  <div class="explanation">
  <p><code>vstack</code> joins a sequence of tensors along a "vertical" dimension 0 (row-wise).</p>
  <p>All tensors must have the same shape. The output will be at least 2D.</p>
  </div>
`;

// Example usage
var fxnArgs = {};
let tensor0 = new Tensor("tensor0",
  [10, 20, 30], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let tensor1 = new Tensor("tensor1",
  [70, 80, 90], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);

fxnArgs.tensor0 = tensor0;
fxnArgs.tensor1 = tensor1;
