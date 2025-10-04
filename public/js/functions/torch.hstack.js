let method = "torch.hstack";
function do_function(fxnArgs) {
  let tensors = [fxnArgs.tensor0, fxnArgs.tensor1];
  let resultValues = [...fxnArgs.tensor0.data, ...fxnArgs.tensor1.data];
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);

  // Add relations and explanations
  var offset = 0;
  var tensorIdx = 0;
  for (let i = 0; i < resultValues.length; i++) {
    if (i == tensors[tensorIdx].items.length) {
      offset += tensors[tensorIdx].items.length;
      tensorIdx += 1;
    }
    var coords = [i - offset];
    let re = result.getItem([i]);
    re.value = tensors[tensorIdx].getItem(coords).value;
    re.addRelation(tensors[tensorIdx], coords);
    re.explainingEquation = (r) => {
      var tensorIdx = 0;
      var offset = 0;
      while (i - offset >= tensors[tensorIdx].items.length) {
        offset += tensors[tensorIdx].items.length;
        tensorIdx += 1;
      }
      var coords = [i - offset];
      return `${tensors[tensorIdx].getItem(coords).makeElem().outerHTML} → ` + r.makeElem().outerHTML;
    };
  }
  return result;
}

const sourceCode = `
  <code>ans = <a href="https://pytorch.org/docs/stable/generated/torch.hstack.html">torch.hstack</a>([tensor0, tensor1, ...])</code><br/>
`;

const explanation = `
  <div class="explanation">
  <p><code>hstack</code> joins a sequence of tensors along dimension 0 for one-dimensional inputs, and dimension 1 for other inputs (column-wise).</p>
  <p>All tensors must have the same shape.</p>
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
