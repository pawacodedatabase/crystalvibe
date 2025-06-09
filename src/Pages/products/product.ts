export interface Product {
    id: number;
    name: string;
    category: string;
    subCategories: string[];
    price?: number;
    originalPrice?: number; // For sale price comparison
    isOnSale?: boolean;
    description: string;
    images: string[];
    sizes?: string[];
    colors?: string[];
  }

  import hon from '../../assets/hon.jpg'
  import img2 from '../../assets/hfm.jpg'
  import img3 from '../../assets/hfmm.jpg'
  import img4 from '../../assets/rose.jpg'
  import img5 from '../../assets/belt1.jpg'
  import img6 from '../../assets/belt2.jpg'
  import wal from '../../assets/wal.jpg'
  import img7 from '../../assets/br1.jpg'
  import img8 from '../../assets/br2.jpg'
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Testing',
      category: 'Shoes',
      subCategories: ['Men'],
      price: 25000,
      originalPrice: 30000,
      isOnSale: true,
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [hon],
    },
    {
      id: 2,
      name: 'Out 3',
      category: 'Shoes',
      subCategories: ['Women'],
      price: 15000,
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [img2],
    },
    {
      id: 3,
      name: 'Riss Set',
      category: 'Shoes',
      subCategories: ['unisex'],
      price: 36500,
      isOnSale: false,
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [img3],
    },
    {
      id: 4,
      name: 'Riss Col v2',
      category: 'shoes',
      subCategories: ['Women'],
      price: 15000,
      
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [img4],
    },
    {
      id: 5,
      name: 'Riss Sum',
      category: 'Accessories',
      subCategories: ['male'],
      price: 13500,
     
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [img5, img6],
    },
    {
      id: 6,
      name: 'Honourable ',
      category: 'accessories',
      subCategories: ['unisex'],
      price: 10000,
      
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [wal],
    },
    {
      id: 7,
      name: 'Riss Aura Chro',
      category: 'Shoes',
      subCategories: ['Women'],
      price: 15000,
      
      description: `Riss is a contemporary clothing brand that blends style, comfort, and sophistication for the modern individual. Offering a wide range of high-quality garments, from trendy everyday wear to elegant occasion pieces, Riss is designed to make you feel confident and effortlessly stylish. With a focus on attention to detail, premium fabrics, and flattering cuts, each product is crafted to ensure a perfect fit and lasting durability. Whether you're dressing up for a special event or looking for a chic, casual look, Riss has something to elevate your wardrobe. Embrace timeless fashion with Riss, where style meets quality.`,
      images: [img7, img8],
    },
   
  ];
  