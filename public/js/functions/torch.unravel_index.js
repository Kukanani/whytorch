const method = "torch.unravel_index";
function do_function(fxnArgs) {
  let indices = fxnArgs.indices;
  let shape = fxnArgs.shape;
  const indices0 = new Tensor("indices0", Array(indices.data.length).fill(0), false, 0, document.getElementById("equation"), fxnArgs);
  const indices1 = new Tensor("indices1", Array(indices.data.length).fill(0), false, 0, document.getElementById("equation"), fxnArgs);

  for (let i = 0; i < indices.items.length; i++) {
    var i0item = indices0.getItem([i]);
    var i1item = indices1.getItem([i]);

    i0item.value = Math.floor(i / shape.getItem([1]).value);
    i1item.value = i % shape.getItem([1]).value;

    i0item.addRelation(indices, [i]);
    i0item.addRelation(shape, [0]);
    i0item.addRelation(shape, [1]);
    i0item.explainingEquation = (r) => {
      var i0item = indices0.getItem([i]);
      var i1item = indices1.getItem([i]);
      return `(${i0item.makeElem().outerHTML}, ${i1item.makeElem().outerHTML}) gives the (flattened) ${indices.getItem([i]).makeElem().outerHTML}th item in a ${shape.getItem([0]).makeElem().outerHTML} x ${shape.getItem([1]).makeElem().outerHTML} array`;
    }
    i1item.addRelation(indices, [i]);
    i1item.addRelation(shape, [0]);
    i1item.addRelation(shape, [1]);
    i1item.explainingEquation = (r) => {
      var i0item = indices0.getItem([i]);
      var i1item = indices1.getItem([i]);
      return `(${i0item.makeElem().outerHTML}, ${i1item.makeElem().outerHTML}) gives the (flattened) ${indices.getItem([i]).makeElem().outerHTML}th item in a ${shape.getItem([0]).makeElem().outerHTML} x ${shape.getItem([1]).makeElem().outerHTML} array`;
    }
  }
  return {
    indices0: indices0,
    indices1: indices1
  }
}
const sourceCode = `
  <code>(indices0, indices1, ...) = <a href=\"https://pytorch.org/docs/stable/generated/torch.unravel_index.html\">torch.unravel_index</a>(indices, shape)</code><br/>
`;
const explanation = `
  <p>Generates a list of multi-dimensional indices corresponding to a set of flattened (1D) <code>incides</code>
  for a tensor of shape <code>shape</code>.</p>

  <p>Note that neither input is a tensor of data, this function deals only with shapes and indices.</p>
`;

var fxnArgs = {};
let indices = new Tensor("indices", [0, 1, 2, 3, 4], true, 2, document.getElementById("equation"), fxnArgs, 0, 99);
let shape = new Tensor("shape", [3, 3], true, 3, document.getElementById("equation"), fxnArgs, 1, 99);
fxnArgs.indices = indices;
fxnArgs.shape = shape;