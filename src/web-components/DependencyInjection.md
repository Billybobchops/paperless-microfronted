# Why We Use Dependency Injection (DI) Over Blanket Lazy Loading

> **Summary:** DI gives us **fewer network requests**, **faster first paint**, **stable styling**, and **simpler failure modes**. Blanket lazy loading adds overhead and UX risks that aren't necessary for common DS primitives.

---

## Background

Paperless consumes UI primitives from the InvoiceCloud Design System via **Module Federation**. We needed to choose between two strategies:

- **Dependency Injection (DI):** dynamically import DS components once in the wrapper, then pass them down to the view as props.
- **React.lazy everywhere:** use `React.lazy(() => import('remoteDesignSystem/Component'))` for each DS component.

---

## Why DI is the Better Default

1. **Eliminates network waterfalls**  
   - DI allows us to batch imports with `Promise.all`.  
   - All required DS components load up-front.  
   - Avoids dozens of micro-requests.

2. **Better First Paint (LCP/CLS)**  
   - Primitives (Buttons, Headings, Inputs, etc.) are available for the first render.  
   - No fallback flashes or layout shifts caused by Suspense resolving later.

3. **Stable Styling**  
   - Stylesheets are adopted into Shadow DOM **before** rendering.  
   - Prevents flashes of unstyled content (FOUC).

4. **Fewer Failure Points**  
   - In MF, each lazy component is another chunk that can 404 during rollout.  
   - DI centralizes async edges into one predictable batch.

5. **Simpler Caching & Diagnostics**  
   - A handful of predictable requests cache better.  
   - Traces and error logs are cleaner.

6. **Explicit & Testable**  
   - The view receives DS components as props.  
   - Dependencies are obvious and easy to stub in tests.

---

## When to Use Lazy Loading

Use `React.lazy` **surgically** for **heavy or rarely used** UI:
- Charts, editors, big modals, specialized pickers.
- Wrap with `<Suspense>` and provide meaningful fallbacks.
- Consider prefetching on hover/idle.

```tsx
const Chart = React.lazy(() => import('remoteDesignSystem/Chart'));

<Suspense fallback={<Spinner />}>
  {showChart && <Chart data={...} />}
</Suspense>

# Drawbacks of Blanket Lazy Loading

While `React.lazy` can be useful for deferring large, rarely used components (charts, editors, etc), **blanket lazy loading for every design system primitive is harmful**. Here are the key drawbacks:

---

## 1. Waterfall Requests
Every primitive (`Button`, `Text`, `Input`, `Badge`, etc.) becomes its own network request and Suspense cycle.  
Even over HTTP/2/3 this adds extra headers, TLS, and scheduling overhead → slower time-to-interactive (TTI).

---

## 2. Worse UX Metrics
- **LCP (Largest Contentful Paint):** above-the-fold UI is delayed because primitives show fallback spinners before loading.  
- **CLS (Cumulative Layout Shift):** fallbacks swap out for the real UI, causing layout jumps.

---

## 3. FOUC (Flash of Unstyled Content)
Design system components often inject CSS on mount. Lazy primitives mean the stylesheet isn't loaded until after the component is requested, producing flashes of unstyled content.

---

## 4. Brittle MF Deployments
With Module Federation, each lazy component import is another chunk URL.  
During staggered deployments, mismatched or missing chunks can cause 404s. Every lazy import becomes another potential failure point.

---

## 5. Prefetching Complexity
Naive `React.lazy` doesn't preload code. Without explicit `/* webpackPrefetch */` or runtime prefetch logic, users pay the full fetch + compile cost on the **first interaction everywhere**.

---

## 6. Developer Experience Friction
- Many design system libraries export **named components**.  
- `React.lazy` expects **default exports**, forcing wrappers and re-exports.  
- This adds noise, reduces tree-shaking, and can confuse sourcemaps.

---

## 7. Cache Fragmentation
Splitting primitives into dozens of tiny chunks reduces cache effectiveness. Each chunk pays request/response overhead and often has poor reuse, compared to a few well-bundled imports.

---

## Bottom Line
Use `React.lazy` **selectively** for *heavy, non-critical* components.  
For primitives and above-the-fold UI, **Dependency Injection (DI)** or direct imports are more performant, stable, and maintainable.