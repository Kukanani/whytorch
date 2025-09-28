
const equationElem = document.getElementById("equation");

var tensors = [];

var t = new Tensor("A", [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9]], false, 1, equationElem, tensors);
t.getItem([0, 0]).makeExplainingEquation = () => "This is the top-left element of matrix A.";
t.getItem([1, 0]).makeExplainingEquation = () => "This is the (1, 0) element of matrix A.";
t.getItem([0, 2]).makeExplainingEquation = () => "This is the (0, 2) element of matrix A.";

var t2 = new Tensor("B", [1, 2, NaN], false, 2, equationElem, tensors);
t2.getItem([0]).addRelation(t, [0, 0]);
t2.getItem([0]).addRelation(t, [1, 0]);
t2.getItem([1]).addRelation(t, [1, 1]);
t2.getItem([2]).addRelation(t, [0, 2]);
t2.getItem([2]).addRelation(t, [1, 2]);
t2.getItem([2]).addRelation(t, [2, 2]);
t2.getItem([2]).addRelation(t, [3, 2]);
t2.getItem([2]).addRelation(t, [4, 2]);
t2.getItem([2]).addRelation(t, [5, 2]);

function nanexplain(d) {
  var s = d.makeElem().outerHTML + " means 'not a number', often the result of undefined operations like 0/0.";
  for (let [tensor, coords] of d.relations) {
    s += `<br> It is related to ${tensor.name}${coords.toString()} = ${tensor.getItem(coords).makeElem().outerHTML}`;
  }
  return s;
}

t2.getItem([2]).explainingEquation = nanexplain;

tensors = [t, t2];

t.display(document.getElementById("tensors"), 1);
t2.display(document.getElementById("tensors"), 2);