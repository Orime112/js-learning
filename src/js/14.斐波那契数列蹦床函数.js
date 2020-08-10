function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function fibonacci (n, ac1, ac2) {
    (ac1 = ac1 || 1), (ac2 = ac2 || 1);
    return n <= 1 ? ac2 :fibonacci.bind(null, n - 1, ac2, ac1 + ac2);
}


trampoline(fibonacci (100000))
// Infinity
trampoline(fibonacci (10000))
// Infinity
trampoline(fibonacci (1000))
// 7.0330367711422765e+208