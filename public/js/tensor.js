
class TensorItem {
  constructor(value, parent, coords, explainingEquation = null) {
    this.value = value;
    this.parent = parent;
    this.coords = coords;
    this.explainingEquation = explainingEquation;
    // relations: Array of [Tensor, coordinatesTuple]
    this.relations = [];
    this.highlighted = false;
  }

  makeExplainingEquation() {
    if (this.explainingEquation) {
      return this.explainingEquation(this);
    } else {
      return null;
    }
  }

  addRelation(tensor, coordinates) {
    this.relations.push([tensor, coordinates]);
    tensor.getItem(coordinates).relations.push([this.parent, this.coords]); // add back-reference
  }

  removeAllRelations() {
    this.relations.forEach(([tensor, coordinates]) => {
      const relatedItem = tensor.getItem(coordinates);
      relatedItem.relations = relatedItem.relations.filter(
        ([t, c]) => !(t === this.parent && c.toString() === this.coords.toString())
      );
    });
    this.relations = [];
  }

  getText() {
    return this.value.toString() + " - " + this.coords.toString();
  }

  makeRelationEquationsAndHighlight(equationsElem) {
    if (this.relations.length === 0) {
      return "";
    }
    const equationsList = [];
    const highlightList = [];
    const traverse = (sourceTensor, tensor, coords, visited = new Set(), propagate = true) => {
      const elem = tensor.getItem(coords);
      if (visited.has(elem)) return;
      visited.add(elem);
      const eq = elem.makeExplainingEquation();
      if (eq) {
        equationsList.push([elem.parent.orderNumber, eq]);
      }
      highlightList.push([tensor, coords]);
      if (propagate) {
        elem.relations.forEach(([relatedTensor, relatedCoords]) => {
          traverse(sourceTensor, relatedTensor, relatedCoords, visited, propagate = false);
        });
      }
    };
    traverse(this.parent, this.parent, this.coords);
    // Sort by orderNumber and join equations
    const sortedEquations = Object.values(equationsList)
      .sort((a, b) => a[0] - b[0])
      .map(([_, eq]) => eq);

    equationsElem.innerHTML = "";
    for (const [i, eqn] of sortedEquations.entries()) {
      let eqnElement = document.createElement("div");
      eqnElement.className = "equation-row";
      eqnElement.innerHTML = eqn;
      equationsElem.appendChild(eqnElement);
      if (i < sortedEquations.length - 1) {
        equationsElem.appendChild(document.createElement("br"));
      }
    }
    // this.highlightAndRelations(coords);
    for (let [tensor, c] of highlightList) {
      tensor.highlight(c);
    }
  }

  makeElem(d = null, editable = false, onClick = null, minVal = -9, maxVal = 99) {
    const tdElem = document.createElement("td");
    const containingElem = document.createElement("span");
    const itemElemType = editable ? "input" : "span";
    const spanElem = document.createElement(itemElemType);
    if (editable) {
      spanElem.type = "number";
      spanElem.min = minVal;
      spanElem.max = maxVal;
      spanElem.value = this.value;
      spanElem.addEventListener('change', (event) => {
        const newValue = parseFloat(event.target.value);
        this.value = newValue;
        this.parent.setData(this.coords, newValue);
        fxnArgs.ans = clearAndDoFunction(fxnArgs);
        renderFxnArgs(fxnArgs);
        this.parent.equationElem.innerHTML = "";
        this.parent.dehighlightAllGlobal();
        onClick();
      });
    }

    spanElem.addEventListener('click', () => onClick());
    spanElem.className = "number"
    spanElem.classList.add(this.parent.name + this.coords.join(''));
    if (d !== null) {
      const dimIndicatorElement = document.createElement("span");
      dimIndicatorElement.classList.add("hd" + d.orderNumber);
      const dimIndicatorElementInner = document.createElement("span");
      dimIndicatorElementInner.className = "hd-inner";
      dimIndicatorElementInner.textContent = d.name + " " + d.getItem([]).value;
      dimIndicatorElement.appendChild(dimIndicatorElementInner);
      spanElem.appendChild(dimIndicatorElement);
    }
    spanElem.appendChild(document.createTextNode(this.value));
    if (this.highlighted) {
      spanElem.classList.add("highlight");
      const highlightIndex = this.parent.highlights.findIndex(coords =>
        coords.length === this.coords.length && coords.every((v, i) => v === this.coords[i])
      );
      spanElem.classList.add("h" + this.parent.orderNumber + highlightIndex.toString());
    }
    containingElem.appendChild(spanElem);
    tdElem.appendChild(containingElem);
    return tdElem;
  }
}
class Tensor {
  nestElem(val, coords = []) {
    if (Array.isArray(val)) {
      return val.map((v, i) => this.nestElem(v, coords.concat(i)));
    } else {
      return new TensorItem(val, this, coords);
    }
  }
  static getShape(arr) {
    const shape = [];
    while (Array.isArray(arr)) {
      shape.push(arr.length);
      arr = arr[0];
    }
    return shape;
  }

  constructor(name, data, editable, order, equationElem, tensors, minVal, maxVal) {
    this.name = name;
    this.data = data;
    this.editable = editable;
    this.orderNumber = order;
    this.equationElem = equationElem;
    this.tensors = tensors;
    this.minVal = minVal;
    this.maxVal = maxVal;

    this.items = this.nestElem(data);
    this.shape = Tensor.getShape(data);
    this.highlights = [];
  }

  dehighlightAllGlobal() {
    Object.values(this.tensors).forEach(t => t.dehighlightAll());
  }

  removeAllRelations() {
    // go through any level of nesting and remove all relations
    const recurse = (item) => {
      if (item instanceof TensorItem) {
        item.removeAllRelations();
      } else if (Array.isArray(item)) {
        item.forEach(subitem => recurse(subitem));
      }
    };
    recurse(this.items);
  }

  getItem(coords) {
    var te = this.items;
    if (!(te instanceof Array)) return te; // scalar
    for (let c of coords) {
      te = te[c];
    }
    return te;
  }

  setData(coords, value) {
    var td = this.data;
    if (!(td instanceof Array)) {
      this.data = value;
    } else {
      for (let i = 0; i < coords.length - 1; i++) {
        td = td[coords[i]];
      }
      td[coords[coords.length - 1]] = value;
    }
    this.getItem(coords).value = value;
  }

  highlight(coords) {
    this.highlights.push(coords);
    this.getItem(coords).highlighted = true;
    const elems = document.getElementsByClassName(`${this.name}${coords.join('')}`);
    if (elems) {
      for (let elem of elems) {
        elem.classList.add("highlight");
        elem.classList.add("h" + this.orderNumber + (this.highlights.length - 1).toString());
      }
    }
  }

  dehighlightAll() {
    this.highlights.forEach(coords => {
      this.getItem(coords).highlighted = false;
      const elems = document.getElementsByClassName(`${this.name}${coords.join('')}`);
      if (elems) {
        for (let elem of elems) {
          elem.classList.remove("highlight");
          elem.classList.forEach(cls => {
            if (cls.startsWith("h" + this.orderNumber)) {
              elem.classList.remove(cls);
            }
          });
        }
      }
    });
    this.highlights = [];
  }

  describe(coords) {
    this.dehighlightAllGlobal();
    this.getItem(coords).makeRelationEquationsAndHighlight(this.equationElem);
  }

  display(parent) {
    const matrixDiv = document.createElement("div");
    matrixDiv.className = `matrix matrix-${this.orderNumber}`;

    const tensorNameDiv = document.createElement("div");
    tensorNameDiv.innerHTML = this.name;
    tensorNameDiv.className = "tensorname";

    // Create table
    const table = document.createElement("table");
    table.className = "matrix-table";

    if (this.shape.length === 0) {
      // Scalar case
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      const tensorItem = this.getItem([]);
      tr.appendChild(tensorItem.makeElem(null, this.editable, () => this.describe([]), this.minVal, this.maxVal));
      table.appendChild(tr);
    }
    else {
      // Build header row (column indices)
      const headerRow = document.createElement("tr");
      headerRow.appendChild(document.createElement("td")); // row index col (empty)
      headerRow.appendChild(document.createElement("td")); // outer left bracket (empty)
      headerRow.appendChild(document.createElement("td")); // inner left bracket (empty)
      for (let j = 0; j < this.shape[1]; j++) {
        const th = document.createElement("td");
        th.className = "matrix-index-col";
        th.textContent = j;
        headerRow.appendChild(th);
        if (j < this.shape[1] - 1) {
          headerRow.appendChild(document.createElement("td")); // comma col (empty)
        }
      }
      headerRow.appendChild(document.createElement("td")); // inner right bracket (empty)
      headerRow.appendChild(document.createElement("td")); // outer right bracket/row-trailing comma (empty)
      table.appendChild(headerRow);

      // Build matrix rows
      for (let i = 0; i < this.shape[0]; i++) {
        const tr = document.createElement("tr");
        // Row index
        const rowIdx = document.createElement("td");
        rowIdx.className = "matrix-index-row";
        rowIdx.textContent = i;
        tr.appendChild(rowIdx);

        // Outer left bracket
        const outerLeftBracket = document.createElement("td");
        outerLeftBracket.className = "bracket";
        if (i === 0) outerLeftBracket.innerHTML = "[";
        tr.appendChild(outerLeftBracket);

        if (this.shape.length > 1) {
          // Inner left bracket
          const innerLeftBracket = document.createElement("td");
          innerLeftBracket.innerHTML = "[";
          innerLeftBracket.className = "bracket";
          tr.appendChild(innerLeftBracket);
          // Matrix numbers and commas
          for (let j = 0; j < this.shape[1]; j++) {
            const tensorItem = this.getItem([]);
            tr.appendChild(this.items[i][j].makeElem(null, this.editable, () => this.describe([i, j], this.items), this.minVal, this.maxVal));
            if (j < this.shape[1] - 1) {
              const comma = document.createElement("td");
              comma.innerHTML = ",";
              comma.className = "bracket comma";
              tr.appendChild(comma);
            }
          }
          // Inner right bracket
          const innerRightBracket = document.createElement("td");
          innerRightBracket.innerHTML = "]";
          innerRightBracket.className = "bracket";
          tr.appendChild(innerRightBracket);
        }

        else {
          tr.appendChild(this.items[i].makeElem(null, this.editable, () => this.describe([i], this.items), this.minVal, this.maxVal));
        }

        // Outer right bracket or trailing comma
        const outerRightBracket = document.createElement("td");
        if (i == this.shape[0] - 1) {
          outerRightBracket.innerHTML = "]";
          outerRightBracket.className = "bracket";
        } else {
          outerRightBracket.innerHTML = ",";
          outerRightBracket.className = "bracket";
        }
        tr.appendChild(outerRightBracket);
        table.appendChild(tr);
      }
    }
    matrixDiv.appendChild(tensorNameDiv);
    matrixDiv.appendChild(table);
    parent.appendChild(matrixDiv);
  }
}

// module.exports = { Tensor, TensorItem };
