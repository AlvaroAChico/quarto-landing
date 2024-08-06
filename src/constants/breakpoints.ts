export const breakpoints = {
  // Desktop
  desktopExtraLarge: "@media (min-width: 1920px)", // Pantallas extra grandes
  desktopLarge: "@media (min-width: 1440px)", // Escritorios grandes
  desktopMedium: "@media (min-width: 1200px) and (max-width: 1439px)", // Escritorios medianos
  desktopSmall: "@media (min-width: 1024px) and (max-width: 1199px)", // Escritorio estándar

  // Laptops
  laptop: "@media (min-width: 768px) and (max-width: 1023px)", // Laptops

  // Tablets
  tabletLarge: "@media (min-width: 600px) and (max-width: 767px)", // Tablets grandes
  tabletMedium: "@media (min-width: 480px) and (max-width: 599px)", // Tablets medianas
  tabletSmall: "@media (max-width: 479px)", // Tablets pequeñas y teléfonos grandes

  // Phones
  phoneLarge: "@media (min-width: 360px) and (max-width: 374px)", // Teléfonos grandes
  phoneMedium: "@media (min-width: 320px) and (max-width: 359px)", // Teléfonos medianos
  phoneSmall: "@media (max-width: 319px)", // Teléfonos pequeños

  // MIN
  desktopLargeMin: "@media (min-width: 1440px)",
  desktopMediumMin: "@media (min-width: 1200px)",
  desktopSmallMin: "@media (min-width: 1024px)",
  laptopMin: "@media (min-width: 768px)",
  tabletLargeMin: "@media (min-width: 600px)",
  tabletMediumMin: "@media (min-width: 480px)",
  tabletSmallMin: "@media (min-width: 0px)", // Para todos los tamaños de tablet y móviles
  phoneLargeMin: "@media (min-width: 360px)",
  phoneMediumMin: "@media (min-width: 320px)",

  // MAX
  desktopMediumMax: "@media (max-width: 1439px)",
  desktopSmallMax: "@media (max-width: 1199px)",
  laptopMax: "@media (max-width: 1023px)",
  tabletLargeMax: "@media (max-width: 767px)",
  tabletMediumMax: "@media (max-width: 599px)",
  tabletSmallMax: "@media (max-width: 479px)", // Para todos los tamaños de tablet y móviles
  phoneLargeMax: "@media (max-width: 374px)",
  phoneMediumMax: "@media (max-width: 359px)",
  phoneSmallMax: "@media (max-width: 329px)",

  // Values min
  desktopLargeValue: 1440,
  desktopMediumValue: 1200,
  desktopSmallValue: 1024,
  laptopValue: 768,
  tabletLargeValue: 600,
  tabletMediumValue: 480,
  tabletSmalValue: 0, // Valor mínimo para tablet y móvil en general
  phoneLargeValue: 360,
  phoneMediumValue: 320,
  phoneSmallValue: 0, // Valor mínimo para teléfonos pequeños
}
