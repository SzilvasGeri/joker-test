import React from 'react';

const brands = [
  {
    id: 1,
    name: 'LEGO',
    logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/197_Lego_logo_logos-512.png'
  },
  {
    id: 2,
    name: 'Mattel',
    logo: 'https://cdn-icons-png.flaticon.com/512/871/871472.png'
  },
  {
    id: 3,
    name: 'Hasbro',
    logo: 'https://cdn-icons-png.flaticon.com/512/871/871378.png'
  },
  {
    id: 4,
    name: 'Fisher-Price',
    logo: 'https://cdn-icons-png.flaticon.com/512/871/871374.png'
  },
  {
    id: 5,
    name: 'Playmobil',
    logo: 'https://cdn-icons-png.flaticon.com/512/871/871494.png'
  },
  {
    id: 6,
    name: 'Nerf',
    logo: 'https://cdn-icons-png.flaticon.com/512/871/871487.png'
  }
];

const BrandsBanner: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Top Brands</h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {brands.map(brand => (
            <div key={brand.id} className="group flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-gray-100 rounded-full p-4 mb-2 transition-transform group-hover:scale-110 duration-300">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-gray-700">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsBanner;