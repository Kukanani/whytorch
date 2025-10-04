
function renderFxnArgs(fxnArgs) {
  document.getElementById("tensors").innerHTML = "";
  let i = 1;
  Object.values(fxnArgs).forEach((tensor, idx) => {
    if (tensor.name.startsWith("ans") || tensor.name.startsWith("indices") || tensor.name.startsWith("values")) {
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
  'torch.abs',
  'torch.absolute',
  'torch.add',
  'torch.addr',
  'torch.amax',
  'torch.amin',
  'torch.aminmax',
  'torch.cat',
  'torch.concat',
  'torch.concatenate',
  'torch.copysign',
  'torch.cos',
  'torch.cosh',
  'torch.cummax',
  'torch.cummin',
  'torch.cumprod',
  'torch.cumsum',
  'torch.cross',
  'torch.div',
  'torch.dot',
  'torch.divide',
  'torch.flip',
  'torch.fliplr',
  'torch.flipud',
  'torch.fmax',
  'torch.fmin',
  'torch.gather',
  'torch.hstack',
  'torch.index_select',
  'torch.kron',
  'torch.matmul',
  'torch.maximum',
  'torch.mean',
  'torch.minimum',
  'torch.mul',
  'torch.multiply',
  'torch.nanmean',
  'torch.outer',
  'torch.prod',
  'torch.scatter',
  'torch.scatter_add',
  'torch.sin',
  'torch.sinh',
  'torch.stack',
  'torch.sub',
  'torch.subtract',
  'torch.take',
  'torch.tan',
  'torch.tanh',
  'torch.trace',
  'torch.tril',
  'torch.triu',
  'torch.unravel_index',
  'torch.vstack',
  'torch.xlogy',
];


// Group methods by category
const categories = {
  'Creation': ['zeros', 'zeros_like', 'ones', 'ones_like', 'arange', 'range', 'linspace', 'logspace', 'eye', 'empty', 'empty_like', 'empty_strided', 'full', 'full_like'],
  // 'Complex': ['dequantize', 'complex', 'polar', 'heaviside', 'adjoint', 'conj'],
  'Indexing': ['argwhere', 'cat', 'concat', 'concatenate', 'chunk', 'dsplit', 'column_stack', 'dstack', 'gather', 'hsplit', 'hstack', 'index_add', 'index_copy', 'index_reduce', 'index_select', 'masked_select', 'movedim', 'moveaxis', 'narrow', 'nonzero', 'permute', 'reshape', 'row_stack', 'select', 'scatter', 'diagonal_scatter', 'select_scatter', 'slice_scatter', 'scatter_add', 'scatter_reduce', 'split', 'squeeze', 'stack', 'swapaxes', 'swapdims', 't', 'take', 'take_along_dim', 'tensor_split', 'tile', 'transpose', 'unbind', 'unravel_index', 'unsqueeze', 'vsplit', 'vstack', 'where', 'atleast_1d', 'atleast_2d', 'atleast_3d'],
  'Math': ['abs', 'absolute', 'add', 'addcdiv', 'addcmul', 'angle', 'bitwise_not', 'bitwise_and', 'bitwise_or', 'bitwise_xor', 'bitwise_left_shift', 'bitwise_right_shift', 'ceil', 'clamp', 'clip', 'conj_physical', 'copysign', 'cos', 'cosh', 'div', 'divide', 'digamma', 'erf', 'erfc', 'erfinv', 'exp', 'exp2', 'expm1', 'fix', 'float_power', 'floor', 'floor_divide', 'fmod', 'frac', 'frexp', 'gradient', 'imag', 'ldexp', 'lerp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'logaddexp', 'logaddexp2', 'logical_and', 'logical_not', 'logical_or', 'logical_xor', 'logit', 'hypot', 'i0', 'igamma', 'igammac', 'mul', 'multiply', 'mvlgamma', 'nan_to_num', 'neg', 'negative', 'nextafter', 'polygamma', 'positive', 'pow', 'rad2deg', 'real', 'reciprocal', 'remainder', 'round', 'rsqrt', 'sigmoid', 'sign', 'sgn', 'signbit', 'sin', 'sinc', 'sinh', 'softmax', 'sqrt', 'square', 'sub', 'subtract', 'tan', 'tanh', 'true_divide', 'trunc', 'xlogy'],
  'Statistics': ['amax', 'amin', 'aminmax', 'max', 'min', 'maximum', 'minimum', 'fmin', 'fmax', 'dist', 'mean', 'nanmean', 'median', 'nanmedian', 'mode', 'norm', 'nansum', 'prod', 'std', 'std_mean', 'sum', 'var', 'var_mean'],
  'Sorting': ['sort', 'topk', 'msort'],
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
    ans = do_function(fxnArgs);

    if (ans instanceof Tensor) {
      fxnArgs.ans = ans;
    } else {
      Object.assign(fxnArgs, ans);
    }
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
      clearAndDoFunction(fxnArgs);

      document.getElementById('sourceCode').innerHTML = sourceCode;
      document.getElementById('explanation').innerHTML = explanation;
      document.getElementById('equation').innerHTML = "Click/tap any element to explain it";
      renderFxnArgs(fxnArgs);
    } else {
      document.getElementById('equation').innerHTML = `<p>The JS code to explain <u>${method}</u> hasn't been written yet.</p><p><a href="https://github.dev/Kukanani/whytorch/blob/main/public/js/functions/${method}.js">Help write it.</a></p>`;
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
    !e.target === document.getElementById("#toggle-functions-btn") &&
    !sidebar.contains(e.target) &&
    sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', init);
