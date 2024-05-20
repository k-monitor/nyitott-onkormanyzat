function catToColor(category) {
    switch (category) {
      case "atlathatosag":
        return "var(--cat-blue)"
      case "szamonkerhetoseg":
        return "var(--cat-green)"
      case "reszveteliseg":
        return "var(--cat-orange)"      
    }
  }

  function catToProjColor(category) {
    switch (category) {
      case "atlathatosag":
        return "var(--cat-blue-proj)"
      case "szamonkerhetoseg":
        return "var(--cat-green-proj)"
      case "reszveteliseg":
        return "var(--cat-orange-proj)"      
    }
  }

  export { catToColor, catToProjColor };
