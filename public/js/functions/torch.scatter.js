const method = "torch.scatter";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  let dim = fxnArgs.dim;
  let dimVal = dim.getItem([0]).value;
  let index = fxnArgs.index;
  let src = fxnArgs.src;
  var resultData = structuredClone(input.data);
  const result = new Tensor("ans", resultData, false, 0, document.getElementById("equation"), fxnArgs);

  for (let i = 0; i < result.items.length; i++) {
    for (let j = 0; j < result.items[i].length; j++) {
      result.getItem([i, j]).addRelation(input, [i, j]);
      result.getItem([i, j]).explainingEquation = (r) => {
        return `input[${i}, ${j}] = ` + input.getItem([i, j]).makeElem().outerHTML + " → " + r.makeElem().outerHTML;
      };
    }
  }

  for (let i = 0; i < index.items.length; i++) {
    for (let j = 0; j < index.items[i].length; j++) {
      let coords = [i, j];
      var iitem = index.getItem([i, j]);
      var sitem = src.getItem([i, j]);
      coords[dimVal] = iitem.value;
      var ritem = result.getItem(coords);
      ritem.value = sitem.value;
      ritem.removeAllRelations();
      ritem.addRelation(src, [i, j]);
      ritem.addRelation(index, [i, j]);
      ritem.addRelation(input, coords);
      ritem.addRelation(dim, []);
      ritem.explainingEquation = (r) => {
        let coords = [i, j];
        var iitem = index.getItem([i, j]);
        var sitem = src.getItem([i, j]);
        coords[dimVal] = iitem.value;
        return `src[${index.getItem([i, j]).makeElem(d=dim).outerHTML}, ${j}] = ${src.getItem([i, j]).makeElem().outerHTML} → ${r.makeElem().outerHTML} (overwrites ${input.getItem(coords).makeElem().outerHTML})`;
      };
    }
  }
  for (let i = 0; i < src.items.length; i++) {
    for (let j = 0; j < src.items[i].length; j++) {
      var sitem = src.getItem([i, j]);
      if(sitem.relations.length === 0) {
        sitem.explainingEquation = (r) => {
          return `${r.makeElem().outerHTML} does not appear in <code>${result.name}</code> because it is beyond the size of <code>${index.name}</code>`;
        };
      }
    }
  }
  return result;
}
const sourceCode = `
  <code>ans = <a href=\"https://pytorch.org/docs/stable/generated/torch.scatter.html\">torch.scatter</a>(input, dim, index, src)</code><br/>
`;
const explanation = `
  <p><code>scatter</code> writes values from <code>src</code> into <code>input</code> at the indices specified by <code>index</code> along dimension <code>dim</code>.</p>
  <p>For each location in <code>index</code>, the result contains the value from <code>src</code> at that index.</p>
`;

var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
let index = new Tensor("index", [
  [2, 0, 0],
  [0, 0, 1]
], true, 2, document.getElementById("equation"), fxnArgs, 0, 2);
let src = new Tensor("src", [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
], true, 3, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
fxnArgs.dim = dim;
fxnArgs.index = index;
fxnArgs.src = src;