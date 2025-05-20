import { useState } from "react";

const decimalToFraction = (decimal, tolerance = 1.0e-6) => {
  if (Number.isInteger(decimal)) return decimal.toString();

  let numerator = 1;
  let denominator = 1;
  let error = Math.abs(numerator / denominator - decimal);

  while (error > tolerance) {
    if (numerator / denominator < decimal) numerator++;
    else denominator++;
    error = Math.abs(numerator / denominator - decimal);
  }

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  return `${numerator}/${denominator}`;
};

const parseSequence = (input) => {
  // Retorna array de números decimales y un flag si hay fracciones en el input
  let hasFraction = false;
  const numbers = input
    .split(/[\s,]+/)
    .map((num) => {
      if (num.includes("/")) {
        hasFraction = true;
        const [a, b] = num.split("/").map(Number);
        return b ? a / b : NaN;
      }
      return parseFloat(num);
    })
    .filter((n) => !isNaN(n));
  return { numbers, hasFraction };
};

const detectPattern = (seq, n) => {
  const len = seq.length;
  if (len < 2) return [];

  // Aritmética
  const diff = seq[1] - seq[0];
  const isArithmetic = seq.every(
    (val, i) => i === 0 || Math.abs(seq[i] - seq[i - 1] - diff) < 1e-10
  );
  if (isArithmetic) {
    return Array.from({ length: n }, (_, i) => seq[len - 1] + diff * (i + 1));
  }

  // Geométrica
  const ratio = seq[1] / seq[0];
  const isGeometric = seq.every(
    (val, i) => i === 0 || Math.abs(seq[i] / seq[i - 1] - ratio) < 1e-10
  );
  if (isGeometric) {
    return Array.from(
      { length: n },
      (_, i) => seq[len - 1] * ratio ** (i + 1)
    );
  }

  // Diferencias crecientes
  const diffs = seq.slice(1).map((v, i) => v - seq[i]);
  const diffDelta = diffs[1] - diffs[0];
  const isGrowingDiff = diffs.every(
    (d, i) => i === 0 || Math.abs(diffs[i] - diffs[i - 1] - diffDelta) < 1e-10
  );
  if (isGrowingDiff) {
    let next = seq[len - 1];
    let nextDiff = diffs[diffs.length - 1];
    const prediction = [];
    for (let i = 0; i < n; i++) {
      nextDiff += diffDelta;
      next += nextDiff;
      prediction.push(next);
    }
    return prediction;
  }

  // Fibonacci
  const isFibo = seq.every(
    (v, i) => i < 2 || Math.abs(v - seq[i - 1] - seq[i - 2]) < 1e-10
  );
  if (isFibo) {
    const prediction = [];
    let tempSeq = [...seq];
    for (let i = 0; i < n; i++) {
      const nextVal = tempSeq[tempSeq.length - 1] + tempSeq[tempSeq.length - 2];
      tempSeq.push(nextVal);
      prediction.push(nextVal);
    }
    return prediction;
  }

  // Cuadrados perfectos
  const isSquare = seq.every(
    (v, i) => Math.abs(v - (i + 1) ** 2) < 1e-10
  );
  if (isSquare) {
    return Array.from({ length: n }, (_, i) => (len + i + 1) ** 2);
  }

  // Números primos
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  const isPrimeSeq = seq.every((v) => isPrime(v));
  if (isPrimeSeq) {
    let lastPrime = seq[len - 1];
    const prediction = [];
    while (prediction.length < n) {
      lastPrime++;
      if (isPrime(lastPrime)) prediction.push(lastPrime);
    }
    return prediction;
  }

  return ["Patrón no reconocido"];
};

export default function SequencePredictor() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(2);
  const [resultDecimal, setResultDecimal] = useState([]);
  const [resultFraction, setResultFraction] = useState([]);
  const [resultInteger, setResultInteger] = useState([]);
  const [hasFraction, setHasFraction] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { numbers, hasFraction } = parseSequence(input);
    setHasFraction(hasFraction);

    if (numbers.length < 2) {
      setError("Ingresa al menos dos números válidos");
      setResultDecimal([]);
      setResultFraction([]);
      setResultInteger([]);
      return;
    }
    const prediction = detectPattern(numbers, count);
    if (typeof prediction[0] === "string") {
      setError(prediction[0]);
      setResultDecimal([]);
      setResultFraction([]);
      setResultInteger([]);
      return;
    }

    // Separar en enteros y decimales
    const integers = prediction.filter((n) => Number.isInteger(n));
    const decimals = prediction.filter((n) => !Number.isInteger(n));
    setResultInteger(integers);
    setResultDecimal(decimals);

    if (hasFraction) {
      setResultFraction(prediction.map((num) => decimalToFraction(num)));
    } else {
      setResultFraction([]);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4 text-center text-primary">Predictor de Secuencias</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sequenceInput" className="form-label">
            Secuencia (números o fracciones separados por coma o espacio):
          </label>
          <input
            type="text"
            id="sequenceInput"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej: 1, 2, 3 o 1/2 1 3/2"
            autoComplete="off"
          />
        </div>
        <div className="mb-3 d-flex align-items-center gap-3">
          <label htmlFor="countInput" className="form-label mb-0">
            Cantidad a predecir:
          </label>
          <input
            type="number"
            id="countInput"
            min="1"
            max="10"
            className="form-control"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            style={{ maxWidth: 80 }}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Predecir
        </button>
      </form>

      {error && (
        <div className="alert alert-warning mt-4" role="alert">
          {error}
        </div>
      )}

      {!error && (
        <>
          {resultInteger.length > 0 && (
            <div className="mt-4">
              <h5>Resultado Enteros:</h5>
              <div className="alert alert-success" style={{ minHeight: 40 }}>
                {resultInteger.join(", ")}
              </div>
            </div>
          )}

          {resultDecimal.length > 0 && (
            <div className="mt-4">
              <h5>Resultado Decimales:</h5>
              <div className="alert alert-warning" style={{ minHeight: 40 }}>
                {resultDecimal.map((num) => num.toFixed(6)).join(", ")}
              </div>
            </div>
          )}

          {hasFraction && resultFraction.length > 0 && (
            <div className="mt-4">
              <h5>Resultado Fracciones:</h5>
              <div className="alert alert-info" style={{ minHeight: 40 }}>
                {resultFraction.join(", ")}
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .fade-in {
          animation: fadeIn 0.8s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
