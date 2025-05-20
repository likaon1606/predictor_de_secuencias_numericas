# 🔢 Secuencias Numéricas - Detector y Predictor

Esta aplicación permite detectar distintos tipos de secuencias numéricas y predecir sus próximos términos. Soporta secuencias con números enteros, decimales y fracciones, y muestra los resultados en formatos adecuados para cada tipo.

---

## 🔍 Tipos de Secuencias que Puede Detectar y Predecir

- ➖ **Secuencias Aritméticas**  
  Secuencias donde la diferencia entre términos consecutivos es constante.  
  *Ejemplo:*  
  `2, 5, 8, 11, 14` (suma constante de 3)  
  Próximos términos: `17, 20, 23`

- ✖️ **Secuencias Geométricas**  
  Secuencias donde cada término se obtiene multiplicando el anterior por un valor constante.  
  *Ejemplo:*  
  `3, 6, 12, 24` (multiplicación constante por 2)  
  Próximos términos: `48, 96, 192, 384`

- 📈 **Diferencias Crecientes**  
  Secuencias donde la diferencia entre términos consecutivos aumenta en una cantidad constante.  
  *Ejemplo:*  
  `1, 3, 7, 13, 21` (las diferencias aumentan en 2 cada vez)  
  Próximos términos: `31, 43, 57`

- 🔢 **Secuencia de Fibonacci**  
  Secuencias donde cada término es la suma de los dos anteriores.  
  *Ejemplo:*  
  `0, 1, 1, 2, 3, 5`  
  Próximos términos: `8, 13, 21, 34, 55`

- 🔲 **Cuadrados Perfectos**  
  Secuencias de números que son cuadrados perfectos.  
  *Ejemplo:*  
  `1, 4, 9, 16, 25` (1², 2², 3², ...)  
  Próximos términos: `36, 49, 64, 81`

- 🔎 **Números Primos**  
  Secuencias que contienen números primos consecutivos.  
  *Ejemplo:*  
  `2, 3, 5, 7, 11`  
  Próximos términos: `13, 17, 19, 23, 29`

- ➗ **Secuencias con Fracciones (Aritméticas y Geométricas)**  
  Secuencias con términos fraccionarios, que pueden ser aritméticas (suma constante) o geométricas (multiplicación constante).  
  *Ejemplo Aritmético:*  
  `1/2, 1, 3/2, 2` (suma constante de 1/2)  
  Próximos términos: `5/2, 3, 7/2`  
  
  *Ejemplo Geométrico:*  
  `1/3, 2/3, 4/3, 8/3` (multiplicación constante por 2)  
  Próximos términos: `16/3, 32/3, 64/3`

---

## 🛠️ Cómo Usar la Aplicación

1. **📝 Ingresar la Secuencia**  
   Introduce la secuencia numérica que deseas analizar. Puede contener números enteros, decimales o fracciones (por ejemplo, `3/4`).

2. **⚙️ Ejecutar el Análisis**  
   La aplicación detectará el tipo de secuencia más probable y calculará los próximos términos.

3. **📊 Ver Resultados**  
   Se muestran hasta tres tipos de resultados:  
   - **Enteros:** Si la secuencia es entera y aplica.  
   - **Decimales:** Si la secuencia puede expresarse en números decimales.  
   - **Fracciones:** Si la secuencia es fraccionaria, mostrará la predicción en formato fraccional para mayor claridad.

---

## 🎯 Ejemplos para Probar

- `2, 5, 8, 11, 14` → Secuencia aritmética, próximos: `17, 20, 23`  
- `3, 6, 12, 24` → Secuencia geométrica, próximos: `48, 96, 192, 384`  
- `1, 3, 7, 13, 21` → Diferencias crecientes, próximos: `31, 43, 57`  
- `0, 1, 1, 2, 3, 5` → Fibonacci, próximos: `8, 13, 21, 34, 55`  
- `1/2, 1, 3/2, 2` → Fracciones aritméticas, próximos: `5/2, 3, 7/2`  
- `1/3, 2/3, 4/3, 8/3` → Fracciones geométricas, próximos: `16/3, 32/3, 64/3`

---

## 📋 Requisitos

- Navegador web moderno  
- (Si aplica) Node.js para ejecutar localmente

---

## 🚀 Instalación y Ejecución

```bash
# Clona el repositorio
git clone https://github.com/likaon1606/secuencias-numéricas.git

# Entra al directorio del proyecto
cd secuencias-numéricas

# Instala dependencias (si las hay)
npm install

# Ejecuta la aplicación
npm start


## 📬 Contacto

- **GitHub:** [https://github.com/likaon1606](https://github.com/likaon1606)  
- **Portafolio:** [https://ariel-fuentes-garcia-programador.com](https://ariel-fuentes-garcia-programador.com)  
- **Celular:** +52 5532604568  
- **Correo:** [ariel.fuentesgarcia@gmail.com](mailto:ariel.fuentesgarcia@gmail.com)  
