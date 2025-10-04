const method = "torch.index_select";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let dim = fxnArgs.dim;
  let dimVal = dim.getItem([0]).value;
  let index = fxnArgs.index;
  let outputShape = structuredClone(input.shape);

  let unchangedDim = 0;
  if (unchangedDim == dimVal) {
    unchangedDim = 1;
  }
  outputShape[dimVal] = index.shape[0];
  const resultValues = Array(outputShape[0]).fill(null).map(() => Array(outputShape[1]).fill(0));
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  for (let i = 0; i < outputShape[dimVal]; i++) {
    let indexCoords = [i];
    for (let j = 0; j < outputShape[unchangedDim]; j++) {
      let resultCoords = [0, 0];
      resultCoords[dimVal] = i;
      resultCoords[unchangedDim] = j;
      let re = result.getItem(resultCoords);
      let lookupCoords = [0, 0];
      lookupCoords[unchangedDim] = j;
      lookupCoords[dimVal] = index.getItem(indexCoords).value;
      re.value = input.getItem(lookupCoords).value;
      re.addRelation(input, lookupCoords);
      re.addRelation(index, indexCoords);
      re.addRelation(dim, []);
      re.explainingEquation = (r) => {
        let lookupCoords = [0, 0];
        lookupCoords[unchangedDim] = j;
        lookupCoords[dimVal] = index.getItem(indexCoords).value;
        var indexElems = [0, 0];
        indexElems[unchangedDim] = String(j);
        indexElems[dimVal] = index.getItem(indexCoords).makeElem(d=dim).outerHTML;
        return `input[${indexElems.join(", ")}] = ` + input.getItem(lookupCoords).makeElem().outerHTML + " → " + r.makeElem().outerHTML;
      };
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href=\"https://pytorch.org/docs/stable/generated/torch.index_select.html\">torch.index_select</a>(input, dim, index)</code><br/>
`;
const explanation = `
  <p>Selects values from <code>input</code> at the indices specified by <code>index</code> along dimension <code>dim</code>.</p>
  <p><code>torch.gather</code> is a more generic version of this function which allows taking different items along
  <code>dim</code> for different positions in the output.</p>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
let index = new Tensor("index", [0, 2], true, 2, document.getElementById("equation"), fxnArgs, 0, 4);
fxnArgs.input = input;
fxnArgs.index = index;
fxnArgs.dim = dim;