const method = "torch.aminmax";
function do_function(fxnArgs) {
  var input = fxnArgs.input;
  var dim = fxnArgs.dim;
  var dimVal = fxnArgs.dim.getItem([]).value;
  const n = input.items.length;
  const m = input.items[1].length;
  const minData = Array(n).fill(0);
  const maxData = Array(n).fill(0);
  const min = new Tensor("min", minData, false, 0, document.getElementById("equation"), fxnArgs);
  const max = new Tensor("max", maxData, false, 0, document.getElementById("equation"), fxnArgs);

  for (let i = 0; i < n; i++) {
    let itemsToGroup = [];
    var coords = [];
    for (let j = 0; j < m; j++) {
      if (dimVal === 0) {
        var coords = [j, i];
      } else {
        var coords = [i, j];
      }
      itemsToGroup.push(input.getItem(coords));
    }
    const addTermsHtml = itemsToGroup.map(x => x.makeElem().outerHTML).join(',');

    for(elem of itemsToGroup) {
      min.getItem([i]).addRelation(input, elem.coords);
      min.getItem([i]).addRelation(dim, []);
      max.getItem([i]).addRelation(input, elem.coords);
      max.getItem([i]).addRelation(dim, []);
    }

    min.getItem([i]).value = Math.min(...itemsToGroup.map(x => x.value));
    min.getItem([i]).explainingEquation = (r) => {
      var coordsHTML = "";
      for (let j = 0; j < 2; j++) {
        if(j === dimVal) {
          coordsHTML += `${makeDimAnnotatedElement(":", dim).outerHTML}`;
        } else {
          coordsHTML += i;
        }
        if (j === 0) {
          coordsHTML += ", ";
        }
      }
      return `min(input[${coordsHTML}]) = min(${addTermsHtml}) = ${r.makeElem().outerHTML}`;
    }

    max.getItem([i]).value = Math.max(...itemsToGroup.map(x => x.value));
    max.getItem([i]).explainingEquation = (r) => {
      var coordsHTML = "";
      for (let j = 0; j < 2; j++) {
        if(j === dimVal) {
          coordsHTML += `${makeDimAnnotatedElement(":", dim).outerHTML}`;
        } else {
          coordsHTML += i;
        }
        if (j === 0) {
          coordsHTML += ", ";
        }
      }
      return `max(input[${coordsHTML}]) = max(${addTermsHtml}) = ${r.makeElem().outerHTML}`;
    }
  }
  return {
    min: min,
    max: max
  };
}
sourceCode = `
  <code>(min, max) = <a href="https://docs.pytorch.org/docs/stable/generated/torch.aminmax.html">torch.aminmax</a>(input, dim)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>aminmax</code> finds the min and max of a tensor along a dimension.</p>
  <p>The <code>i</code>th item in <code>min</code> is the
  minimum of all items of <code>input</code> along the <code>dim</code>th dimension, and likewise for <code>max</code></p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
let dim = new Tensor("dim", 0, true, 4, document.getElementById("equation"), fxnArgs, 0, 1);
fxnArgs.input = input;
fxnArgs.dim = dim;