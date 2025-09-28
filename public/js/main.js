
function renderFxnArgs(fxnArgs) {
  document.getElementById("tensors").innerHTML = "";
  let i = 1;
  Object.values(fxnArgs).forEach((tensor, idx) => {
    if (tensor.name === "ans") {
      tensor.display(document.getElementById("tensors"), 0);
    } else {
      tensor.display(document.getElementById("tensors"), idx);
      i += 1;
    }
  });
}

let showAllFunctions = false;

function toggleFunctionList() {
  showAllFunctions = !showAllFunctions;
  populateSidebar();
  const btn = document.getElementById('toggle-functions-btn');
  btn.textContent = showAllFunctions ? 'Show only implemented' : 'Show all functions';
}

const supportedMethods = [
  'torch.gather',
  'torch.scatter',
  'torch.add',
  'torch.amax',
  'torch.amin',
  'torch.sub',
  'torch.subtract',
  'torch.matmul',
  'torch.mul',
  'torch.multiply',
  'torch.minimum',
  'torch.maximum',
  'torch.div',
  'torch.divide',
  'torch.sin',
  'torch.cos',
  'torch.tan',
  'torch.sinh',
  'torch.cosh',
  'torch.tanh'
];


// Group methods by category
const categories = {
  // 'Creation': ['zeros', 'zeros_like', 'ones', 'ones_like', 'arange', 'range', 'linspace', 'logspace', 'eye', 'empty', 'empty_like', 'empty_strided', 'full', 'full_like'],
  // 'Complex': ['dequantize', 'complex', 'polar', 'heaviside', 'adjoint', 'conj'],
  'Indexing': ['argwhere', 'cat', 'concat', 'concatenate', 'chunk', 'dsplit', 'column_stack', 'dstack', 'gather', 'hsplit', 'hstack', 'index_add', 'index_copy', 'index_reduce', 'index_select', 'masked_select', 'movedim', 'moveaxis', 'narrow', 'nonzero', 'permute', 'reshape', 'row_stack', 'select', 'scatter', 'diagonal_scatter', 'select_scatter', 'slice_scatter', 'scatter_add', 'scatter_reduce', 'split', 'squeeze', 'stack', 'swapaxes', 'swapdims', 't', 'take', 'take_along_dim', 'tensor_split', 'tile', 'transpose', 'unbind', 'unravel_index', 'unsqueeze', 'vsplit', 'vstack', 'where'],
  'Math': ['abs', 'absolute', 'add', 'addcdiv', 'addcmul', 'angle', 'bitwise_not', 'bitwise_and', 'bitwise_or', 'bitwise_xor', 'bitwise_left_shift', 'bitwise_right_shift', 'ceil', 'clamp', 'clip', 'conj_physical', 'copysign', 'cos', 'cosh', 'div', 'divide', 'digamma', 'erf', 'erfc', 'erfinv', 'exp', 'exp2', 'expm1', 'fix', 'float_power', 'floor', 'floor_divide', 'fmod', 'frac', 'frexp', 'gradient', 'imag', 'ldexp', 'lerp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'logaddexp', 'logaddexp2', 'logical_and', 'logical_not', 'logical_or', 'logical_xor', 'logit', 'hypot', 'i0', 'igamma', 'igammac', 'mul', 'multiply', 'mvlgamma', 'nan_to_num', 'neg', 'negative', 'nextafter', 'polygamma', 'positive', 'pow', 'rad2deg', 'real', 'reciprocal', 'remainder', 'round', 'rsqrt', 'sigmoid', 'sign', 'sgn', 'signbit', 'sin', 'sinc', 'sinh', 'softmax', 'sqrt', 'square', 'sub', 'subtract', 'tan', 'tanh', 'true_divide', 'trunc', 'xlogy'],
  'Statistics': ['amax', 'amin', 'max', 'min', 'maximum', 'minimum', 'dist', 'mean', 'nanmean', 'median', 'nanmedian', 'mode', 'norm', 'nansum', 'prod', 'std', 'std_mean', 'sum', 'var', 'var_mean'],
  'Sorting': ['sort', 'topk', 'msort', 'atleast_1d', 'atleast_2d', 'atleast_3d'],
  'Utilities': ['bincount', 'block_diag', 'broadcast_tensors', 'broadcast_to', 'cartesian_prod', 'cdist', 'clone', 'combinations', 'corrcoef', 'cov', 'cross', 'cummax', 'cummin', 'cumprod', 'cumsum', 'diag', 'diag_embed', 'diagflat', 'diagonal', 'diff', 'einsum', 'flatten', 'flip', 'fliplr', 'flipud', 'kron', 'rot90', 'gcd', 'histc', 'histogram', 'histogramdd', 'meshgrid', 'lcm', 'logcumsumexp', 'ravel', 'renorm', 'repeat_interleave', 'roll', 'searchsorted', 'tensordot', 'trace', 'tril', 'tril_indices', 'triu', 'triu_indices', 'unflatten', 'vander', 'view_as_real', 'view_as_complex', 'resolve_conj', 'resolve_neg'],
  'Linear Algebra': ['addbmm', 'addmm', 'addmv', 'addr', 'baddbmm', 'bmm', 'chain_matmul', 'cholesky', 'cholesky_inverse', 'cholesky_solve', 'dot', 'geqrf', 'ger', 'inner', 'inverse', 'det', 'logdet', 'slogdet', 'lu', 'lu_solve', 'lu_unpack', 'matmul', 'tensor_power', 'tensor_exp', 'mm', 'mv', 'orgqr', 'ormqr', 'outer', 'pinverse', 'qr', 'svd', 'svd_lowrank', 'pca_lowrank', 'lobpcg', 'trapz', 'trapezoid', 'cumulative_trapezoid', 'triangular_solve', 'vdot']
};

const allMethods = Object.values(categories).flatMap(x => x).map(name => 'torch.' + name);

// Populate sidebar with methods
function populateSidebar() {
  const sidebarContent = document.getElementById('sidebar-content');

  let html = '';
  html += `<button id="toggle-functions-btn" onclick="toggleFunctionList()" style="width:100%;margin-bottom:1em;">${showAllFunctions ? 'Show only implemented' : 'Show all functions'}</button>`;

  for (const [category, keywords] of Object.entries(categories)) {
    const categoryMethods = allMethods.filter(method => {
      const methodName = method.replace('torch.', '');
      return keywords.includes(methodName);
    });

    const filteredMethods = showAllFunctions ? categoryMethods : categoryMethods.filter(method => supportedMethods.includes(method));

    if (filteredMethods.length > 0) {
      html += `
        <div class="method-group">
          <h3>${category}</h3>
          <ul class="method-list">
      `;

      filteredMethods.forEach(method => {
        const isSupported = supportedMethods.includes(method);
        if (isSupported) {
          html += `<li><a href="/${method}/">${method}</a></li>`;
        } else if (showAllFunctions) {
          html += `<li><a href="/${method}/" class="unsupported">${method}</a></li>`;
        }
      });

      html += `
          </ul>
        </div>
      `;
    }
  }

  sidebarContent.innerHTML = html;
}

function clearAndDoFunction(fxnArgs) {
  document.getElementById("equation").innerHTML = "";
  Object.values(fxnArgs).forEach(t => t.dehighlightAllGlobal());
  Object.values(fxnArgs).forEach(t => t.removeAllRelations());
  try {
    document.getElementById("equation").innerHTML = "Calculating...";
    document.getElementById("tensors").classList.remove("error");
    return do_function(fxnArgs);
  }
  catch (e) {
    document.getElementById("tensors").classList.add("error");
    document.getElementById("equation").innerHTML = `Error: ${e.message}`;
    throw e;
  }
}

// Initialize page
function init() {
  // Populate sidebar
  populateSidebar();

  try {
    if (supportedMethods.includes(method)) {
      ans = clearAndDoFunction(fxnArgs);
      fxnArgs.ans = ans;

      document.getElementById('sourceCode').innerHTML = sourceCode;
      document.getElementById('explanation').innerHTML = explanation;
      document.getElementById('equation').innerHTML = "Click an element in <code>ans</code>";
      renderFxnArgs(fxnArgs);
    } else {
      document.getElementById('equation').innerHTML = `The JS code to explain <u>${method}</u> hasn't been written yet. Want to help write it?`;
    }
  }
  catch (e) {
    // if (e instanceof ReferenceError) {
    //   document.getElementById('equation').innerHTML = `Could not load JS for ${method}.`;
    // }
    // else {
    throw e;
    // }
  };

}
// Sidebar functionality
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  if (
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target) &&
    sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', init);
