import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        products: "Products",
        about: "About",
        contact: "Contact"
      },
      hero: {
        title: "Artisan Coffee",
        subtitle: "Crafted with passion, served with excellence",
        cta: "Explore Our Coffees"
      },
      products: {
        title: "Our Coffee Selection",
        espresso: {
          name: "Espresso",
          description: "A concentrated coffee beverage brewed by forcing hot water through finely-ground coffee beans."
        },
        americano: {
          name: "Americano",
          description: "Espresso diluted with hot water, creating a lighter version of espresso with the same rich flavor."
        },
        cappuccino: {
          name: "Cappuccino",
          description: "Cappuccino is a latte made with more foam than steamed milk, often topped with cocoa powder."
        },
        latte: {
          name: "Latte",
          description: "Latte is a coffee drink made with espresso and steamed milk. Rich, creamy, balanced."
        },
        macchiato: {
          name: "Macchiato",
          description: "An espresso with a small amount of milk, creating a strong coffee with a hint of creaminess."
        },
        mocha: {
          name: "Mocha",
          description: "Mocha is a coffee beverage where dark espresso meets rich chocolate and creamy milk."
        },
        "flat-white": {
          name: "Flat White",
          description: "A coffee drink consisting of espresso with microfoam, similar to a latte but with a stronger coffee flavor."
        },
        "cold-brew": {
          name: "Cold Brew",
          description: "Coffee brewed with cold water over an extended period, resulting in a smooth, low-acid coffee."
        },
        affogato: {
          name: "Affogato",
          description: "A simple Italian dessert-coffee consisting of vanilla gelato topped with hot espresso."
        },
        "irish-coffee": {
          name: "Irish Coffee",
          description: "A cocktail consisting of hot coffee, Irish whiskey, and sugar, stirred and topped with cream."
        },
        "turkish-coffee": {
          name: "Turkish Coffee",
          description: "A method of preparing coffee where finely powdered roast coffee beans are boiled in a pot with water."
        },
        "vietnamese-coffee": {
          name: "Vietnamese Coffee",
          description: "Strong coffee with sweetened condensed milk, traditionally brewed with a metal drip filter."
        },
        "nitro-cold-brew": {
          name: "Nitro Cold Brew",
          description: "Cold brew coffee infused with nitrogen gas, creating a creamy texture similar to beer."
        },
        frappe: {
          name: "Frappe",
          description: "A blended iced coffee drink made with instant coffee, water, sugar, and milk, topped with whipped cream."
        }
      },
      story: {
        title: "Our Standards",
        subtitle: "Commitment to excellence",
        description1: "At Artisan Coffee, we adhere to the highest industry standards to deliver exceptional quality in every cup. Our beans are sourced from certified organic farms and undergo rigorous quality control at every stage.",
        description2: "Our roasting process uses precision temperature control and expert timing to unlock the full potential of each bean. We maintain traceability from farm to cup, ensuring transparency and sustainability in our supply chain.",
        description3: "Every batch is tested for optimal flavor profiles, and our baristas are trained in the latest brewing techniques. We believe in continuous improvement and innovation to provide you with the perfect coffee experience."
      },
      checkout: {
        shipping: "Shipping Information",
        payment: "Payment Details",
        review: "Review Your Order",
        name: "Full Name",
        email: "Email Address",
        address: "Shipping Address",
        city: "City",
        zip: "ZIP",
        cardInfo: "Card Information",
        cardNumber: "Card number",
        expiry: "MM / YY",
        cvc: "CVC",
        back: "Back",
        continue: "Continue to Payment",
        reviewOrder: "Review Order",
        placeOrder: "Place Order",
        secure: "Payments are secure and encrypted"
      },
      footer: {
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        products: "Productos",
        about: "Acerca de",
        contact: "Contacto"
      },
      hero: {
        title: "Café Artesanal",
        subtitle: "Elaborado con pasión, servido con excelencia",
        cta: "Explora Nuestros Cafés"
      },
      products: {
        title: "Nuestra Selección de Café",
        espresso: {
          name: "Espresso",
          description: "Una bebida concentrada de café preparada forzando agua caliente a través de granos de café finamente molidos."
        },
        americano: {
          name: "Americano",
          description: "Espresso diluido con agua caliente, creando una versión más ligera del espresso con el mismo rico sabor."
        },
        cappuccino: {
          name: "Cappuccino",
          description: "Un cappuccino es un latte hecho con más espuma que leche al vapor, a menudo espolvoreado con cacao en polvo."
        },
        latte: {
          name: "Latte",
          description: "Un latte es una bebida de café hecha con espresso y leche al vapor. Rico, cremoso, equilibrado."
        },
        macchiato: {
          name: "Macchiato",
          description: "Un espresso con una pequeña cantidad de leche, creando un café fuerte con un toque de cremosidad."
        },
        mocha: {
          name: "Mocha",
          description: "Un mocha es una bebida de café donde el espresso oscuro se encuentra con chocolate rico y leche cremosa."
        },
        "flat-white": {
          name: "Flat White",
          description: "Una bebida de café que consiste en espresso con microespuma, similar a un latte pero con un sabor a café más fuerte."
        },
        "cold-brew": {
          name: "Cold Brew",
          description: "Café preparado con agua fría durante un período extendido, resultando en un café suave y bajo en ácido."
        },
        affogato: {
          name: "Affogato",
          description: "Un simple postre-café italiano que consiste en gelato de vainilla cubierto con espresso caliente."
        },
        "irish-coffee": {
          name: "Irish Coffee",
          description: "Un cóctel que consiste en café caliente, whisky irlandés y azúcar, revuelto y cubierto con crema."
        },
        "turkish-coffee": {
          name: "Café Turco",
          description: "Un método de preparar café donde granos de café tostado finamente pulverizados se hierven en una olla con agua."
        },
        "vietnamese-coffee": {
          name: "Café Vietnamita",
          description: "Café fuerte con leche condensada endulzada, tradicionalmente preparado con un filtro de goteo metálico."
        },
        "nitro-cold-brew": {
          name: "Cold Brew Nitro",
          description: "Café cold brew infundido con gas nitrógeno, creando una textura cremosa similar a la cerveza."
        },
        frappe: {
          name: "Frappe",
          description: "Una bebida de café helado mezclada hecha con café instantáneo, agua, azúcar y leche, cubierta con crema batida."
        }
      },
      story: {
        title: "Nuestros Estándares",
        subtitle: "Compromiso con la excelencia",
        description1: "En Artisan Coffee, nos adherimos a los más altos estándares de la industria para entregar calidad excepcional en cada taza. Nuestros granos provienen de fincas orgánicas certificadas y pasan por un riguroso control de calidad en cada etapa.",
        description2: "Nuestro proceso de tostado utiliza control de temperatura de precisión y tiempo experto para desbloquear todo el potencial de cada grano. Mantenemos la trazabilidad de la granja a la taza, asegurando transparencia y sostenibilidad en nuestra cadena de suministro.",
        description3: "Cada lote se prueba para perfiles de sabor óptimos, y nuestros baristas están capacitados en las últimas técnicas de preparación. Creemos en la mejora continua e innovación para proporcionarle la experiencia perfecta de café."
      },
      checkout: {
        shipping: "Información de Envío",
        payment: "Detalles de Pago",
        review: "Revisar Su Pedido",
        name: "Nombre Completo",
        email: "Dirección de Correo",
        address: "Dirección de Envío",
        city: "Ciudad",
        zip: "Código Postal",
        cardInfo: "Información de Tarjeta",
        cardNumber: "Número de tarjeta",
        expiry: "MM / AA",
        cvc: "CVC",
        back: "Atrás",
        continue: "Continuar al Pago",
        reviewOrder: "Revisar Pedido",
        placeOrder: "Realizar Pedido",
        secure: "Los pagos son seguros y encriptados"
      },
      footer: {
        about: "Acerca de Nosotros",
        contact: "Contacto",
        privacy: "Política de Privacidad",
        terms: "Términos y Condiciones"
      }
    }
  },
};

export const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: false,

      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;