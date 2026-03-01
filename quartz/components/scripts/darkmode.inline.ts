// Dark-only site: force dark theme, no toggle, no themechange events dispatched.
// Components listening for "themechange" (graph, comments, mermaid) will never fire — this is intentional.
document.documentElement.setAttribute("saved-theme", "dark")
