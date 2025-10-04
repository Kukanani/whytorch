const method = "torch.trace";
function do_function(fxnArgs) {
  let input = fxnArgs.input;
  const n = input.items.length;
  const m = input.items[0].length;
  const resultValues = 0;
  const result = new Tensor("ans", resultValues, false, 0, document.getElementById("equation"), fxnArgs);
  let re = result.getItem([]);
  for (let i = 0; i < n; i++) {
    re.value += input.getItem([i, i]).value;
    re.addRelation(input, [i, i]);
  }
  re.explainingEquation = (r) => {
    let groupHTML = "";
    for (let i = 0; i < n; i++) {
      groupHTML += input.getItem([i, i]).makeElem().outerHTML
      if (i < n-1) {
        groupHTML += " + ";
      }
    };
    return `${groupHTML} = ${r.makeElem().outerHTML}`;
  }
  return result;
}
sourceCode = `
  <code>ans = <a href="https://docs.pytorch.org/docs/stable/generated/torch.trace.html">torch.trace</a>(input)</code><br/>
`;
explanation = `
  <div class="explanation">
  <p><code>trace</code> calculates sum of the values along the central diagonal of <code>input</code>.</p>
  </div>
`;
var fxnArgs = {};
let input = new Tensor("input", [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], true, 1, document.getElementById("equation"), fxnArgs, -9, 99);
fxnArgs.input = input;
