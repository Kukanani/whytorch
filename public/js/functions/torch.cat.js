const method = "torch.cat";

function cat(tensors, dim, fxnArgs) {
  const tensorCount = tensors.length;
  const tensorLength = tensors[0].items.length;

  var dimVal = fxnArgs.dim.getItem([]).value;

  let shape = [0, 0];
  for (let i = 0; i < shape.length; ++i) {
    if (i === dimVal) {
      shape[i] = tensors.map(t => t.shape[i]).reduce((x, y) => x + y, 0)
    } else {
      shape[i] = tensors[0].shape[i];
    }
  }
  const resultValues = Array(shape[0]).fill(null).map(() => Array(shape[1]).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < shape[0]; i++) {
    for (let j = 0; j < shape[1]; j++) {

      var coords = [i, j];
      let re = result.getItem(coords);

      let sourceCoords = [i, j];
      let tensorIdx = 0;
      let source = tensors[tensorIdx];
      while(sourceCoords[dimVal] >= source.shape[dimVal]) {
        sourceCoords[dimVal] -= source.shape[dimVal];
        tensorIdx += 1;
        source = tensors[tensorIdx];
      }

      re.value = source.getItem(sourceCoords).value;
      re.addRelation(source, sourceCoords);
      re.explainingEquation = (r) => {

        let sourceCoords = [i, j];
        let tensorIdx = 0;
        let source = tensors[tensorIdx];
        while(sourceCoords[dimVal] >= source.shape[dimVal]) {
          sourceCoords[dimVal] -= source.shape[dimVal];
          tensorIdx += 1;
          source = tensors[tensorIdx];
        }
        return `${source.getItem(sourceCoords).makeElem().outerHTML} → ${r.makeElem().outerHTML}`;
      };
    }
  }
  return result;
}

function do_function(fxnArgs) {
  let tensors = [fxnArgs.tensor0, fxnArgs.tensor1];
  let dim = fxnArgs.dim;

  return cat(tensors, dim, fxnArgs);
}

sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.cat.html">torch.cat</a>((tensor0, tensor1, ...), dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>cat</code> concatenates tensors along an existing dimension.</p>
  </div>
`;
var fxnArgs = {};
let tensor0 = new Tensor("tensor0", [
  [1, 5],
  [4, 3],
  [8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let tensor1 = new Tensor("tensor1", [
  [-1, -5],
  [-4, -3],
  [-8, -9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
fxnArgs.tensor0 = tensor0;
fxnArgs.tensor1 = tensor1;
fxnArgs.dim = dim;
