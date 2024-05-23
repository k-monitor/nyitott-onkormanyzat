function catToColor(category) {
    switch (category) {
      case "atlathatosag":
        return "var(--cat-blue)"
      case "szamonkerhetoseg":
        return "var(--cat-orange)"
      case "reszveteliseg":
        return "var(--cat-green)"      
    }
  }
  function catToFixColor(category) {
    switch (category) {
      case "atlathatosag":
        return "#4498c4"
      case "szamonkerhetoseg":
        return "#e58500"
      case "reszveteliseg":
        return "#61af1d"      
    }
  }
  function catToColorName(category) {
    switch (category) {
      case "atlathatosag":
        return "blue"
      case "szamonkerhetoseg":
        return "orange"
      case "reszveteliseg":
        return "green"      
    }
  }

  function catTotText(category) {
    switch (category) {
      case "atlathatosag":
        return "átláthatóság"
      case "szamonkerhetoseg":
        return "számonkérhetőség"
      case "reszveteliseg":
        return "részvételiség"      
    }
  }

  function catToProjColor(category) {
    switch (category) {
      case "atlathatosag":
        return "var(--cat-blue-proj)"
      case "szamonkerhetoseg":
        return "var(--cat-orange-proj)"
      case "reszveteliseg":
        return "var(--cat-green-proj)"      
    }
  }

  export { catToColor, catToProjColor, catToFixColor, catToColorName, catTotText };
