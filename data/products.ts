export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CoffeeProduct {
  id: string;
  slug?: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
  reviews: Review[];
  roastLevel: 'light' | 'medium' | 'dark';
  flavorNotes: string[];
  origin: string;
  acidity?: number;
  body?: number;
  strength?: number;
  sweetness?: number;
  milkCompatible?: boolean;
}
export const coffeeProducts: CoffeeProduct[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated coffee beverage brewed by forcing hot water through finely-ground coffee beans.',
    price: '$2.50',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=600',
    features: ['Concentrated', 'Bold Flavor', 'Quick Brew'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'nutty', 'caramel'],
    origin: 'Ethiopia',
    reviews: [
      { id: '1', user: 'John D.', rating: 5, comment: 'Perfect espresso every morning!', date: '2024-01-15' },
      { id: '2', user: 'Sarah M.', rating: 5, comment: 'Rich and smooth. Highly recommend.', date: '2024-01-10' }
    ]
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water, creating a lighter version of espresso with the same rich flavor.',
    price: '$3.00',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Hot Water', 'Balanced'],
    roastLevel: 'medium',
    flavorNotes: ['chocolate', 'caramel'],
    origin: 'Italy',
    reviews: [
      { id: '3', user: 'Mike R.', rating: 4, comment: 'Great balance of flavor.', date: '2024-01-12' }
    ]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Cappuccino is a latte made with more foam than steamed milk, often topped with cocoa powder.',
    price: '$3.50',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Steamed Milk', 'Foam'],
    roastLevel: 'medium',
    flavorNotes: ['chocolate', 'caramel', 'nutty'],
    origin: 'Colombia',
    reviews: [
      { id: '4', user: 'Emma L.', rating: 5, comment: 'Creamy and delicious!', date: '2024-01-14' },
      { id: '5', user: 'David K.', rating: 5, comment: 'Perfect foam texture.', date: '2024-01-08' }
    ]
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Latte is a coffee drink made with espresso and steamed milk. Rich, creamy, balanced.',
    price: '$4.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Steamed Milk', 'Light Foam'],
    roastLevel: 'medium',
    flavorNotes: ['caramel', 'nutty', 'chocolate'],
    origin: 'Brazil',
    reviews: [
      { id: '6', user: 'Lisa P.', rating: 5, comment: 'My favorite latte ever!', date: '2024-01-13' }
    ]
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'An espresso with a small amount of milk, creating a strong coffee with a hint of creaminess.',
    price: '$3.75',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Foam', 'Minimal Milk'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'nutty'],
    origin: 'Italy',
    reviews: [
      { id: '7', user: 'Tom H.', rating: 4, comment: 'Strong and flavorful.', date: '2024-01-11' }
    ]
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Mocha is a coffee beverage where dark espresso meets rich chocolate and creamy milk.',
    price: '$4.50',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1559599189-693a9712c41f?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Chocolate', 'Steamed Milk'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'caramel'],
    origin: 'Guatemala',
    reviews: [
      { id: '8', user: 'Anna W.', rating: 5, comment: 'Chocolate heaven!', date: '2024-01-09' }
    ]
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'A coffee drink consisting of espresso with microfoam, similar to a latte but with a stronger coffee flavor.',
    price: '$4.25',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Microfoam', 'Velvety Texture'],
    roastLevel: 'medium',
    flavorNotes: ['nutty', 'caramel'],
    origin: 'Australia',
    reviews: [
      { id: '9', user: 'Chris B.', rating: 5, comment: 'Silky smooth texture.', date: '2024-01-07' }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Coffee brewed with cold water over an extended period, resulting in a smooth, low-acid coffee.',
    price: '$3.25',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    features: ['Cold Brewed', 'Smooth', 'Low Acid'],
    roastLevel: 'medium',
    flavorNotes: ['chocolate', 'nutty'],
    origin: 'United States',
    reviews: [
      { id: '10', user: 'Rachel G.', rating: 4, comment: 'Refreshing and smooth.', date: '2024-01-06' }
    ]
  },
  {
    id: 'affogato',
    name: 'Affogato',
    description: 'A simple Italian dessert-coffee consisting of vanilla gelato topped with hot espresso.',
    price: '$4.75',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&q=80&w=600',
    features: ['Espresso', 'Gelato', 'Dessert Coffee'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'caramel'],
    origin: 'Italy',
    reviews: [
      { id: '11', user: 'Marco I.', rating: 5, comment: 'Perfect Italian treat!', date: '2024-01-05' }
    ]
  },
  {
    id: 'irish-coffee',
    name: 'Irish Coffee',
    description: 'A cocktail consisting of hot coffee, Irish whiskey, and sugar, stirred and topped with cream.',
    price: '$5.50',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
    features: ['Coffee', 'Whiskey', 'Cream'],
    roastLevel: 'medium',
    flavorNotes: ['caramel', 'nutty'],
    origin: 'Ireland',
    reviews: [
      { id: '12', user: 'Patrick O.', rating: 4, comment: 'Cozy and warming.', date: '2024-01-04' }
    ]
  },
  {
    id: 'turkish-coffee',
    name: 'Turkish Coffee',
    description: 'A method of preparing coffee where finely powdered roast coffee beans are boiled in a pot with water.',
    price: '$3.00',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600',
    features: ['Finely Ground', 'Boiled', 'Traditional'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'nutty'],
    origin: 'Turkey',
    reviews: [
      { id: '13', user: 'Fatima A.', rating: 4, comment: 'Authentic taste.', date: '2024-01-03' }
    ]
  },
  {
    id: 'vietnamese-coffee',
    name: 'Vietnamese Coffee',
    description: 'Strong coffee with sweetened condensed milk, traditionally brewed with a metal drip filter.',
    price: '$3.50',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600',
    features: ['Strong Brew', 'Condensed Milk', 'Drip Filter'],
    roastLevel: 'dark',
    flavorNotes: ['chocolate', 'caramel'],
    origin: 'Vietnam',
    reviews: [
      { id: '14', user: 'Nguyen T.', rating: 5, comment: 'Sweet and strong!', date: '2024-01-02' }
    ]
  },
  {
    id: 'nitro-cold-brew',
    name: 'Nitro Cold Brew',
    description: 'Cold brew coffee infused with nitrogen gas, creating a creamy texture similar to beer.',
    price: '$4.00',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    features: ['Nitrogen Infused', 'Creamy', 'Smooth'],
    roastLevel: 'medium',
    flavorNotes: ['chocolate', 'nutty', 'caramel'],
    origin: 'United States',
    reviews: [
      { id: '15', user: 'Alex J.', rating: 5, comment: 'Like drinking a cloud!', date: '2024-01-01' }
    ]
  },
  {
    id: 'frappe',
    name: 'Frappe',
    description: 'A blended iced coffee drink made with instant coffee, water, sugar, and milk, topped with whipped cream.',
    price: '$4.25',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    features: ['Blended', 'Iced', 'Whipped Cream'],
    roastLevel: 'medium',
    flavorNotes: ['caramel', 'chocolate'],
    origin: 'Greece',
    reviews: [
      { id: '16', user: 'Sophie L.', rating: 4, comment: 'Cool and refreshing.', date: '2023-12-31' }
    ]
  }
];
export interface FeatureHighlight {
  title: string;
  description: string;
  position: 'left' | 'right';
}
export const features: FeatureHighlight[] = [
  {
    title: 'High-Quality Beans',
    description: 'High-quality beans are a single told story about craft, dedication, and the culinary journey where every sip is unique.',
    position: 'left'
  },
  {
    title: 'Individual Approach',
    description: 'Most visitors expect coffee culture today is meticulously designed and economically managed. Individual approach.',
    position: 'right'
  },
  {
    title: 'Atmosphere of Inspiration',
    description: 'Lorem ipsum is dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus tempor incididunt ut.',
    position: 'left'
  },
  {
    title: 'Professional Baristas',
    description: 'Professional Baristas are server professional and deliver rich experiences with every custom coffee crafted perfectly.',
    position: 'right'
  }
];
