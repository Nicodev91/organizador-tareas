# 📚 Documentación del Organizador de Tareas

> **Explicado como si tuvieras 12 años** — no necesitas ser experto para entenderlo.

---

## 📋 Índice

1. [¿Qué es este proyecto?](#1-qué-es-este-proyecto)
2. [¿Cómo funciona el flujo?](#2-cómo-funciona-el-flujo)
3. [Archivos del proyecto (y para qué sirve cada uno)](#3-archivos-del-proyecto)
4. [Explicación de cada archivo](#4-explicación-de-cada-archivo)
   - [index.css — Los colores y estilos](#41-indexcss)
   - [types.ts — Las "fichas" de datos](#42-typests)
   - [useLocalStorage.ts — La "memoria" que no se olvida](#43-uselocalstoragets)
   - [TaskCard.tsx — Una tarea individual](#44-taskcardtsx)
   - [AddTaskForm.tsx — Formulario para crear tareas](#45-addtaskformtsx)
   - [AddSectionForm.tsx — Formulario para crear secciones](#46-addsectionformtsx)
   - [TaskSection.tsx — Una sección con sus tareas](#47-tasksectiontsx)
   - [App.tsx — El cerebro de la aplicación](#48-apptsx)
   - [main.tsx — El punto de entrada](#49-maintsx)
5. [Variables creadas por nosotros](#5-variables-creadas-por-nosotros)
6. [Palabras reservadas de TypeScript/JavaScript](#6-palabras-reservadas)
7. [Cosas propias de React y para qué sirven](#7-cosas-propias-de-react)
8. [Principios de Clean Code que usamos](#8-principios-de-clean-code)

---

## 1. ¿Qué es este proyecto?

Es una **aplicación web** para organizar tus tareas. Piensa en ella como una **libreta digital** donde puedes:

- Crear **secciones** (como carpetas): "Estudios", "Trabajo", "Personal", etc.
- Dentro de cada sección, agregar **tareas** con título y descripción.
- Cambiar el estado de cada tarea: **Pendiente → En progreso → Completada**.
- Filtrar tareas para ver solo las que te interesen.
- Renombrar o eliminar secciones y tareas.
- Todo se **guarda automáticamente** en tu navegador (aunque cierres la página, los datos siguen ahí).

---

## 2. ¿Cómo funciona el flujo?

Imagina que la aplicación es como un **restaurante**:

```
Usuario (tú) → haces clic en botones
    ↓
App.tsx (el gerente) → recibe tus órdenes y decide qué hacer
    ↓
Componentes (los meseros) → muestran la información en pantalla
    ↓
localStorage (la bodega) → guarda los datos para no perderlos
```

**Flujo completo cuando agregas una tarea:**

1. Haces clic en "Agregar tarea".
2. Se abre un formulario (AddTaskForm).
3. Escribes el título y descripción, y presionas "Agregar".
4. AddTaskForm llama a `onAdd(titulo, descripcion)`.
5. TaskSection recibe eso y llama a `addTask` en App.tsx.
6. App.tsx crea la nueva tarea y actualiza `sections`.
7. `useLocalStorage` guarda los cambios en el navegador.
8. React detecta el cambio y **vuelve a pintar** la pantalla automáticamente.

---

## 3. Archivos del proyecto

```
organizador-tareas/
├── src/
│   ├── index.css             ← Colores y estilos base
│   ├── main.tsx              ← Punto de entrada (enciende la app)
│   ├── App.tsx               ← Cerebro principal
│   ├── types.ts              ← Definiciones de datos (las "fichas")
│   ├── hooks/
│   │   └── useLocalStorage.ts ← Hook para guardar datos
│   └── components/
│       ├── TaskCard.tsx       ← Una tarea visual
│       ├── AddTaskForm.tsx    ← Formulario para crear tareas
│       ├── AddSectionForm.tsx ← Formulario para crear secciones
│       └── TaskSection.tsx    ← Una sección con sus tareas
├── index.html                ← Página HTML base
├── vite.config.ts            ← Configuración de Vite
├── package.json              ← Dependencias del proyecto
└── tsconfig.json             ← Configuración de TypeScript
```

---

## 4. Explicación de cada archivo

### 4.1 `index.css`

Este archivo define **los colores y estilos generales** usando Tailwind CSS.

```css
@import "tailwindcss";

@theme {
  --color-primary: #6366f1;        /* Color principal (índigo) */
  --color-primary-dark: #4f46e5;   /* Índigo más oscuro */
  --color-primary-light: #a5b4fc;  /* Índigo más claro */
  --color-surface: #f8fafc;        /* Fondo general (gris clarito) */
  --color-surface-card: #ffffff;   /* Fondo de tarjetas (blanco) */
  --color-border: #e2e8f0;        /* Color de bordes */
  --color-text: #1e293b;          /* Color del texto principal */
  --color-text-secondary: #64748b; /* Color del texto secundario */
  --color-success: #22c55e;       /* Verde para "completado" */
  --color-warning: #f59e0b;       /* Amarillo para "pendiente" */
  --color-danger: #ef4444;        /* Rojo para eliminar/errores */
}
```

**Analogía:** Es como escoger los colores de tu cuaderno antes de empezar a escribir. Decidimos que el color principal será índigo, los textos serán grises oscuros, los bordes grises claros, etc.

### 4.2 `types.ts`

Define **las formas de los datos** que vamos a usar. Es como crear **moldes** o **fichas** para asegurarnos de que siempre metemos la información correcta.

```ts
// TaskStatus solo puede ser uno de estos 3 valores (nada más)
export type TaskStatus = "pending" | "in-progress" | "completed";

// Una tarea siempre tiene que tener:
export interface Task {
  id: string;            // Identificador único (como el DNI)
  title: string;         // Título de la tarea
  description: string;   // Descripción (explicación más larga)
  status: TaskStatus;    // Estado actual
  createdAt: string;     // Fecha y hora de creación
}

// Una sección que contiene tareas:
export interface Section {
  id: string;            // Identificador único de la sección
  title: string;         // Nombre de la sección (ej: "Estudios")
  tasks: Task[];         // Lista de tareas dentro de esta sección
}

// ViewFilter es para los filtros: "all" o cualquier estado
export type ViewFilter = "all" | TaskStatus;
```

**Analogía:** Imagina que tienes una **ficha de personaje** para un juego de rol. La ficha te obliga a escribir el nombre, la clase y los puntos de vida. Si no llenas bien la ficha, el juego no funciona. `interfaces` y `types` son esas fichas.

**Palabra reservada aquí:**
- `export` — Permite que otros archivos usen esto.
- `type` — Crea un tipo personalizado (como crear una categoría nueva).
- `interface` — Define la estructura de un objeto.

### 4.3 `useLocalStorage.ts`

Este es un **Hook personalizado** de React. Su trabajo es guardar y leer datos del `localStorage` del navegador (la "memoria" de tu navegador que no se borra al cerrar la página).

```ts
import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Intenta leer lo que ya estaba guardado
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;  // Si algo sale mal, usa el valor inicial
    }
  });

  // Esta función actualiza tanto React como localStorage
  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}
```

**¿Qué hace paso a paso?**

1. **`localStorage.getItem(key)`** — Busca en el navegador si ya hay datos guardados con ese nombre (`key`).
2. **`JSON.parse(item)`** — Convierte el texto guardado en datos reales (porque en localStorage todo es texto).
3. **`setStoredValue`** — Actualiza React para que la pantalla se refresque.
4. **`localStorage.setItem(key, JSON.stringify(...))`** — Guarda los datos convertidos a texto en el navegador.

**Analogía:** Es como tener una **caja fuerte**. Cuando guardas algo (`setValue`), lo pones en la caja fuerte y también le avisas a React para que actualice la pantalla. Cuando abres la página de nuevo (`getItem`), sacas lo que había en la caja.

**Cosas de React aquí:**
- `useState` — Hook de React que crea una variable "reactiva" (cuando cambia, la pantalla se actualiza).
- `<T>` — Esto es un **genérico** de TypeScript. Significa "funciona con cualquier tipo de dato" (puedes guardar strings, números, listas, etc.).
- `const [algo, setAlgo] = useState(...)` — Destructuring: `algo` es el valor actual, `setAlgo` es la función para cambiarlo.

### 4.4 `TaskCard.tsx`

Muestra **una tarea individual** en pantalla. Cada tarea se ve como una tarjeta.

**Cómo funciona su lógica:**

```ts
const nextStatus: Record<TaskStatus, TaskStatus> = {
  pending: "in-progress",      // Pendiente → En progreso
  "in-progress": "completed",  // En progreso → Completada
  completed: "pending",        // Completada → Pendiente (vuelve a empezar)
};
```

Cada vez que haces clic en el circulito (checkbox), la tarea **cambia al siguiente estado** automáticamente. Es como un **carrusel** que da vueltas.

**Qué muestra:**

| Elemento | Descripción |
|----------|-------------|
| Círculo (checkbox) | Muestra el estado actual. Si está completada, aparece un check ✓ |
| Título | Nombre de la tarea. Si está completada, aparece tachado |
| Badge (etiqueta) | Muestra "Pendiente" (amarillo), "En progreso" (azul) o "Completada" (verde) |
| Descripción | Texto opcional que explica la tarea |
| Fecha | Cuándo se creó (ej: "7 jun, 14:30") |
| Botón X | Elimina la tarea (solo aparece al pasar el mouse) |

**Propiedades (props) que recibe:**
- `task` — Los datos de la tarea.
- `onStatusChange` — Función para cambiar el estado.
- `onDelete` — Función para eliminar.

**Palabras reservadas aquí:**
- `Record<A, B>` — Tipo de TypeScript que significa "un objeto donde las claves son A y los valores son B".
- `const` — Crea una constante (no se puede reasignar).
- `export function` — Hace que la función esté disponible para otros archivos.

### 4.5 `AddTaskForm.tsx`

Es un formulario que aparece cuando haces clic en **"Agregar tarea"**.

**Flujo:**

1. **Estado inicial:** Solo ves un botón punteado que dice "Agregar tarea".
2. **Haces clic:** `setIsOpen(true)` → ahora se muestra el formulario.
3. **Escribes** el título y (opcionalmente) una descripción.
4. **Presionas "Agregar":** `handleSubmit` se ejecuta:
   - Si el título está vacío, no hace nada (`if (!title.trim()) return`).
   - Llama a `onAdd(title, description)` para pasar los datos al componente padre.
   - Limpia los campos (`setTitle("")`, `setDescription("")`).
   - Cierra el formulario (`setIsOpen(false)`).
5. **Presionas "Cancelar":** solo cierra el formulario sin hacer nada.

**Analogía:** Es un cajón que se abre cuando tiras de él. Cuando terminas de usarlo, se cierra y se limpia solo.

**Variables creadas por nosotros:**
- `title` — Lo que escribes en el campo de título.
- `description` — Lo que escribes en el área de descripción.
- `isOpen` — Controla si el formulario está abierto (`true`) o cerrado (`false`).

**cosas de React aquí:**
- `useState("")` — Crea una variable reactiva que empieza vacía.
- `onChange={(e) => setTitle(e.target.value)}` — Cada vez que escribes, actualiza la variable `title`.
- `onSubmit={handleSubmit}` — Cuando envías el formulario, ejecuta `handleSubmit`.
- `e.preventDefault()` — Evita que la página se recargue al enviar un formulario.

### 4.6 `AddSectionForm.tsx`

Similar a AddTaskForm, pero para crear **secciones enteras** en lugar de tareas.

**Extra especial:** Tiene **sugerencias rápidas** (Estudios, Trabajo, Personal, Proyectos, Salud, Lecturas). Son botones que al hacer clic crean la sección directamente, sin necesidad de escribir.

**Propiedades:**
- `onAdd` — Función que recibe el título de la nueva sección.

### 4.7 `TaskSection.tsx`

Este es el componente que muestra **una sección completa** con su nombre, filtros y tareas.

**Tres cosas importantes hace:**

1. **Muestra el título** de la sección — Puedes hacer clic en él para renombrarlo.
2. **Filtros** — Tiene botones para ver "Todas", "Pendientes", "En progreso" y "Completadas".
3. **Lista de tareas** — Muestra todas las tareas que coinciden con el filtro activo.

**El filtro funciona así:**
```ts
const filteredTasks =
  filter === "all"
    ? section.tasks                    // Muestra todas
    : section.tasks.filter((t) => t.status === filter); // Solo las que coinciden
```

**Analogía:** Es como una **carpeta con separadores**. Tienes separadores para "Todo", "Pendiente", "En progreso", "Completado". Mueves la pestaña del separador y solo ves lo que elegiste.

**Variables creadas por nosotros:**
- `filters` — Lista de opciones de filtro (constante, no cambia).
- `filter` — El filtro actualmente seleccionado (empieza en "all").
- `isEditing` — Controla si estamos renombrando la sección.
- `editTitle` — El título temporal mientras se edita.
- `filteredTasks` — Las tareas que pasan el filtro (se calcula cada vez que cambia `filter` o `section.tasks`).

**Cosas de React aquí:**
- `.filter(...)` — Método de JavaScript que crea una nueva lista solo con los elementos que cumplen una condición.
- `.map(...)` — Método que recorre una lista y genera algo nuevo por cada elemento.
- `onBlur={handleRename}` — Cuando el input pierde el foco (haces clic fuera), se guarda el nuevo nombre.

### 4.8 `App.tsx`

Es el **cerebro** de toda la aplicación. Aquí vive toda la lógica principal.

**¿Qué contiene?**

**a) Datos iniciales (secciones por defecto):**
```ts
const defaultSections: Section[] = [
  { id: generateId(), title: "Estudios", tasks: [] },
  { id: generateId(), title: "Trabajo", tasks: [] },
  { id: generateId(), title: "Personal", tasks: [] },
];
```
Cuando alguien abre la app por primera vez, ya tiene estas tres secciones.

**b) Funciones principales (6 operaciones básicas):**

| Función | ¿Qué hace? |
|---------|------------|
| `addSection(title)` | Crea una sección nueva y la agrega a la lista |
| `deleteSection(id)` | Elimina una sección por su ID |
| `renameSection(id, title)` | Cambia el nombre de una sección |
| `addTask(sectionId, title, desc)` | Agrega una tarea a una sección específica |
| `changeTaskStatus(sectionId, taskId, status)` | Cambia el estado de una tarea |
| `deleteTask(sectionId, taskId)` | Elimina una tarea de una sección |

**c) Estadísticas en el Header:**
```ts
const totalTasks = sections.reduce((acc, s) => acc + s.tasks.length, 0);
const completedTasks = sections.reduce(
  (acc, s) => acc + s.tasks.filter((t) => t.status === "completed").length, 0
);
```
Cuenta cuántas tareas hay en total y cuántas están completadas, para mostrarlo en el encabezado con una **barra de progreso**.

**Analogía:** App.tsx es como el **director de una orquesta**. No toca ningún instrumento, pero le dice a cada músico (componente) cuándo y qué tocar.

**Palabras clave de la estructura:**
- `export default function App()` — Define el componente principal y lo exporta para que `main.tsx` lo use.
- `return (...)` — Todo lo que está entre paréntesis es lo que se va a dibujar en pantalla (JSX).
- `{sections.map(...)}` — Recorre todas las secciones y crea un `TaskSection` por cada una.

### 4.9 `main.tsx`

Es el archivo más simple. Solo **enciende la aplicación**.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**¿Qué hace?**
1. Busca un elemento HTML con `id="root"` en `index.html`.
2. Renderiza la aplicación React dentro de ese elemento.
3. `StrictMode` es un modo de desarrollo que ayuda a encontrar errores.

**Analogía:** Es como **presionar el botón de encendido** de la consola de videojuegos. Solo eso hace: prender todo.

---

## 5. Variables creadas por nosotros

Estas son variables que **nosotros inventamos** y les pusimos nombre:

### En `App.tsx`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `sections` | `Section[]` | La lista completa de todas las secciones |
| `defaultSections` | `Section[]` | Las 3 secciones con las que arranca la app |
| `totalTasks` | `number` | Cuántas tareas hay en total |
| `completedTasks` | `number` | Cuántas tareas están completadas |

### En `TaskSection.tsx`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `filter` | `ViewFilter` | Qué filtro está seleccionado ahora |
| `isEditing` | `boolean` | Si estamos editando el nombre de la sección |
| `editTitle` | `string` | El nombre temporal mientras se edita |
| `filteredTasks` | `Task[]` | Las tareas después de aplicar el filtro |
| `filters` | `array` | Las opciones del filtro (constante, no cambia nunca) |

### En `AddTaskForm.tsx`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `title` | `string` | El título que el usuario está escribiendo |
| `description` | `string` | La descripción que el usuario está escribiendo |
| `isOpen` | `boolean` | Si el formulario está abierto o cerrado |

### En `AddSectionForm.tsx`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `title` | `string` | El nombre de la nueva sección |
| `isOpen` | `boolean` | Si el formulario está abierto |
| `suggestions` | `string[]` | Lista de nombres sugeridos (constante) |

### En `TaskCard.tsx`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `statusColors` | `Record<TaskStatus, string>` | Colores para cada estado |
| `statusLabels` | `Record<TaskStatus, string>` | Etiqueta en español para cada estado |
| `nextStatus` | `Record<TaskStatus, TaskStatus>` | A qué estado debe ir después |

### En `useLocalStorage.ts`
| Variable | Tipo | ¿Para qué sirve? |
|----------|------|------------------|
| `storedValue` | `T` | El valor guardado actualmente |
| `setValue` | `function` | Función para actualizar el valor |

---

## 6. Palabras reservadas

Estas son **palabras que ya existen en TypeScript/JavaScript** y tienen un significado especial. No puedes usarlas como nombre de variable.

### Más comunes en este proyecto:

| Palabra | ¿Qué significa? |
|---------|-----------------|
| `import` | Trae código de otro archivo para usarlo aquí |
| `export` | Permite que otros archivos usen lo que definiste aquí |
| `function` | Define una función (un bloque de código que hace algo) |
| `const` | Crea una variable que no se puede cambiar (constante) |
| `return` | Devuelve un valor desde una función |
| `if` / `else` | Ejecuta código solo si se cumple una condición |
| `try` / `catch` | Intenta hacer algo; si falla, atrapa el error |
| `new` | Crea una nueva instancia de algo (ej: `new Date()`) |
| `void` | La función no devuelve nada |

### Palabras reservadas de TypeScript:

| Palabra | ¿Qué significa? |
|---------|-----------------|
| `type` | Crea un tipo personalizado |
| `interface` | Define la estructura de un objeto |
| `extends` | Una interfaz hereda de otra |
| `as` | "Trata esto como si fuera este tipo" (conversión forzada) |
| `keyof` | Obtiene las claves de un tipo |

---

## 7. Cosas propias de React

React es una **biblioteca (librería)** para construir interfaces de usuario. Estas son las cosas de React que usamos:

### 7.1 Hooks — "Ganchos" que te dan superpoderes

Los hooks son funciones especiales que te permiten usar características de React. Su nombre siempre empieza con `use`.

#### `useState` — El más importante

```tsx
const [variable, setVariable] = useState(valorInicial);
```

- **`variable`** — El valor actual (puede ser string, número, booleano, lista, etc.).
- **`setVariable`** — La función para cambiar el valor. Cuando la llamas, React actualiza la pantalla automáticamente.

**Ejemplo real:**
```tsx
const [title, setTitle] = useState("");
// title vale ""
setTitle("Hola");  // Ahora title vale "Hola" y la pantalla se actualiza
```

**Analogía:** `useState` es como un **pizarrón mágico**. Escribes algo, y al instante todos los que miran el pizarrón ven lo nuevo. No tienes que borrar y reescribir todo.

#### `useState` con función inicial:

```tsx
const [storedValue, setStoredValue] = useState<T>(() => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
});
```

Aquí le decimos a React: "Cuando te prepares, primero ejecuta esta función para saber cuál es el valor inicial". La función solo se ejecuta **una vez**, al principio.

### 7.2 Props — Cómo los componentes se pasan mensajes

Los **props** (propiedades) son como **argumentos** que le pasas a un componente.

```tsx
// El padre le pasa datos al hijo:
<TaskCard task={miTarea} onDelete={eliminarTarea} />

// El hijo los recibe y los usa:
export function TaskCard({ task, onDelete }: TaskCardProps) {
  // task tiene los datos de la tarea
  // onDelete es la función para eliminar
}
```

**Analogía:** Los props son como **mensajes en una botella**. El componente padre manda un mensaje al hijo con información o instrucciones.

### 7.3 Eventos — Lo que pasa cuando el usuario hace algo

| Evento | ¿Cuándo ocurre? | Ejemplo |
|--------|-----------------|---------|
| `onClick` | Haces clic en algo | `onClick={() => setIsOpen(true)}` |
| `onChange` | Escribes en un input | `onChange={(e) => setTitle(e.target.value)}` |
| `onSubmit` | Envías un formulario | `onSubmit={handleSubmit}` |
| `onBlur` | Sales de un input (pierde foco) | `onBlur={handleRename}` |
| `onKeyDown` | Presionas una tecla | `onKeyDown={(e) => e.key === "Enter" && handleRename()}` |

### 7.4 JSX — HTML dentro de JavaScript (o TypeScript)

JSX te permite escribir **HTML dentro de código TypeScript**. Es como si pudieras mezclar ambos lenguajes.

```tsx
return (
  <div className="tarjeta">
    <h1>{titulo}</h1>           {/* Las {} son para poner código TS */}
    <button onClick={saludar}>  {/* Los eventos usan camelCase */}
      Click aquí
    </button>
  </div>
);
```

**Reglas del JSX:**
- Siempre debe haber **un solo elemento padre** (todo dentro de un `<div>` o `<>...</>`).
- Las clases CSS se escriben como `className` (no `class`).
- Las `{}` te permiten poner expresiones de TypeScript dentro del HTML.

### 7.5 El Virtual DOM — Por qué React es rápido

Cuando algo cambia, React **no vuelve a dibujar toda la página**. En lugar de eso:

1. Crea un "borrador" en memoria de cómo debería verse la página (el Virtual DOM).
2. Compara el borrador con lo que hay actualmente en pantalla.
3. Solo actualiza las partes que cambiaron.

**Analogía:** Es como si en lugar de repintar toda una pared con un rodillo, usaras un pincel para retocar solo la parte que tiene un rayón.

---

## 8. Principios de Clean Code

Estos son principios que seguimos para que el código sea **limpio, fácil de leer y fácil de mantener**.

### 8.1 Nombres significativos

Cada variable, función y componente tiene un nombre que **explica qué hace**.

- ❌ Mal: `const a = (b: any) => { ... }`
- ✅ Bien: `const addTask = (title: string) => { ... }`
- ❌ Mal: `<div id="x1">`
- ✅ Bien: `<section className="task-section">`

**Regla:** Si necesitas un comentario para explicar qué hace algo, es mejor cambiar el nombre.

### 8.2 Una sola responsabilidad

Cada componente hace **solo una cosa** y la hace bien.

| Componente | Responsabilidad |
|------------|-----------------|
| `TaskCard` | Muestra una tarea individual |
| `AddTaskForm` | Formulario para crear tareas |
| `AddSectionForm` | Formulario para crear secciones |
| `TaskSection` | Muestra una sección con sus tareas |
| `App` | Coordina todo (el cerebro) |

**Analogía:** Es como una cocina. El chef (App) no pela las papas, lava los platos y cocina al mismo tiempo. Delega: un ayudante pela, otro lava, y el chef solo cocina.

### 8.3 Composición sobre herencia

En lugar de crear un componente enorme que hace de todo, **componemos componentes pequeños** para construir cosas grandes.

```
App
├── TaskSection
│   ├── TaskCard
│   ├── TaskCard
│   └── AddTaskForm
├── TaskSection
│   ├── TaskCard
│   └── AddTaskForm
└── AddSectionForm
```

**Analogía:** Es como Lego. No tienes una pieza gigante que es un castillo completo. Tienes piezas pequeñas (bloques) que juntas forman el castillo.

### 8.4 Evitar código duplicado (DRY — Don't Repeat Yourself)

- Los tipos de datos se definen **una sola vez** en `types.ts` y se reusan en todos lados.
- Los colores se definen **una sola vez** en `index.css` y se referencian por nombre.

### 8.5 Tipado fuerte (TypeScript)

Usamos TypeScript para **atrapar errores antes de que ocurran**. Si intentas pasar un dato del tipo incorrecto, TypeScript te avisará antes de ejecutar el programa.

```ts
// ✅ Correcto: task.status solo acepta estos 3 valores
task.status = "completed";

// ❌ Error: TypeScript no deja
task.status = "half-done";  // Error: "half-done" no es válido
```

**Analogía:** Es como tener un **revisor** que mira tu tarea antes de entregarla. Si escribiste algo mal, te avisa antes de que el profesor (el navegador) la vea.

### 8.6 Inmutabilidad (no modificar, reemplazar)

Nunca modificamos los datos directamente. En lugar de eso, **creamos una copia modificada**.

```ts
// ❌ Mal: modificar directamente
section.tasks.push(newTask);

// ✅ Bien: crear un nuevo array con la tarea agregada
{ ...section, tasks: [...section.tasks, newTask] }
```

**Analogía:** Es como tener un libro de firmas. No borras las firmas viejas para añadir una nueva. En su lugar, agregas una hoja nueva al final del libro.

### 8.7 Separación de lógica y presentación

Los componentes solo se preocupan por **mostrar cosas en pantalla**. La lógica de negocios (crear, eliminar, filtrar) vive en `App.tsx` y se pasa como props.

- `App.tsx` → sabe **qué hacer** (la lógica).
- Los componentes → saben **cómo mostrarlo** (la presentación).

---

## Resumen visual del flujo de datos

```
                    App.tsx (dueño de los datos)
                   /      |       |       \
                  ↓       ↓       ↓        ↓
          TaskSection  TaskSection ...  AddSectionForm
            /    |                         (crea secciones)
           ↓     ↓
     TaskCard  AddTaskForm
    (muestra)   (crea tareas)

  Los datos fluyen hacia ABAJO (via props)
  Las acciones fluyen hacia ARRIBA (via funciones)
```

> **Los datos siempre van hacia abajo** (de padre a hijo por props).
> **Las acciones siempre van hacia arriba** (el hijo llama una función que le pasó el padre).

---

## ¿Por qué usamos estas tecnologías?

| Tecnología | ¿Para qué sirve? | Analogía |
|------------|------------------|----------|
| **React** | Crea interfaces interactivas | El motor del auto |
| **TypeScript** | Evita errores antes de ejecutar | El manual de instrucciones |
| **Tailwind CSS** | Da estilo sin escribir CSS aparte | La pintura y decoración |
| **Vite** | Compila y recarga rápido | El turbo del auto |
| **localStorage** | Guarda datos en el navegador | La caja fuerte |
