
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hoodie Oversize Essential',
    category: 'Hoodies',
    price: 65.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKoRYLoOZmONnMgqKyh_jMW_05IkE7Fk7DciTKb60z9zIGQtwwHfQ0VXDRE_u-v3Z_cgP1BkpoyxytH3vyPVK11cQJpG_fSKPZcFW-qR2A8ct53dJt6oNYuAhUHrID9naU-TdIY_Ft6RBxu7hi7KS_pSqeeNJXvbPrbuWcrrUJkueDCoXtkRLw0ofQolUI5XNdZeS2WTlZbOfl-5lJmwswyT7Rjo0pTVFhzOjD2fLhNv3VeGLKw-hHrjJi1EGN5HY-RMo1znWmAGI3',
    description: 'Nuestra sudadera oversize icónica, confeccionada en algodón orgánico de 400gsm para un confort superior y un look relajado.',
    colors: ['#D2B48C', '#000000', '#9ca3af'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true
  },
  {
    id: '2',
    name: 'Cargo Pants Técnicos',
    category: 'Pantalones',
    price: 55.00,
    oldPrice: 69.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0y_6I_a7B22r4HZYISKQ8ap-G2x7tG7fo7WJpkYu6MykmJwFtOdvfZY5hUH5WTdZPrYW_-gYIqfLtS1iOblPjkzaGmZ80xJKnDvcvaVuK8nlH6I7mNRllSHfxz30qW4HGRrZDVYGo_lcSV-3HpcUuQ06QZCVBoZhGSv-jZv-6J6m7NR3oM9YqVNnji_ZN9zNmM2aDrZ5tGNbr0a-WqucaX4EAKMJMCH-IdsRUYGxLwpkKUB055rwuSeLJItEcGEH-UOwkRqHxqGnm',
    description: 'Pantalones cargo diseñados para la movilidad. Tejido técnico repelente al agua con bolsillos estratégicos.',
    colors: ['#4A5D23', '#1f2937'],
    sizes: ['S', 'M', 'L'],
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Crop Top Ribbed Sport',
    category: 'Ropa',
    price: 25.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGbjRJ4Tu6D1hByzTChoRq5DYzIw8BjXEbJ1aEA3JSjHzegrA90zjD7Ts51KbndebtkTKAML1_ASOa0ZJN0aTTueSJWnsv8oksB-RwbOX7J0Sf8J9zq-IBUwNS53NZli9sjBB1bdX3pgTSSeRUzo_505fwOjIw7CpDOETZMrJGw6k3a8h8JMqgQCMmdpX-G2AmdDIodbSWlh09H-NBNtirfH-wpYLpRumr4G2JUCuudW4ARQz8V9p9rgtyTIH68xYavBjg75vy7qeg',
    description: 'Top deportivo acanalado con ajuste compresivo. Perfecto para el gimnasio o un look de calle veraniego.',
    colors: ['#ffffff', '#000000', '#f9a8d4'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '4',
    name: 'Sneakers Air Flow X',
    category: 'Calzado',
    price: 89.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv22LJcJwDDwElRS8XXbhQQAut7KreSa5Orm8k9WwbM79dWi4jbU1VqTyifubD9_ynlXzp9AHck3cNa8iUvidVwvcfgP62KtToWmaHnGRo83BnPUXZEhQfdtnLkCGX72xpFdpjzmyXbY3iqWCQOnzmcEbdptipRjJd1oFJwYmT2DjtdIj0MplsvuOaEUzwAfq4WmiFp-yUb_gHtz5y0I1EMQXPtgKB3FyfZOy3xz4X1MISjuPuehz3GuV9KU6521zUVx6wXDnAIkqF',
    description: 'Zapatillas urbanas de alto rendimiento con suela de aire y materiales reciclados de alta resistencia.',
    colors: ['#ffffff', '#11d493'],
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: '5',
    name: 'Gorra Urbana Logo',
    category: 'Accesorios',
    price: 19.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFEnzA9YmiVyu1yzDkX9jtO6R6j8wIfs1PSKfu08f5BW0XHbQbUUqYuQdzRhMN3aJrbizF_oIzzMISu293C8YHhtqew4adU-k_ZwzeDSkpyYLlm7OIVZh878DD1ntNIkhTR3uSy60nNl8ecqoAhcTyEKrz-qkOEXtK8lQ2fCpHSg6HJl_GeF4vYj8gvEyCn39C4OIsiLFMW55ulFnxX2jMnfuRWPu5hs7-K7r4zWSKUunKX7yrceekXxR9MIh0_x0DkPYtedFUB8SF',
    description: 'Accesorio indispensable para completar tu outfit. 100% algodón con logo bordado.',
    colors: ['#000000', '#ffffff'],
    sizes: ['Única']
  },
  {
    id: '6',
    name: 'Denim Jacket Oversized',
    category: 'Ropa',
    price: 44.50,
    oldPrice: 89.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3MLvAhBGeccZhkyj7jiYlm_sfPP7g3cUMM7NgqD6oyR3jTapx7ism6-tkI_gGkm4d3IWUIB9oBpQWqaFXLUIM4Zry9QysaWuqVRYo7H7DW_pOV_wHyb7XpP09XKkAR1a193dlyEZCFdO6o4IgOKWd3ky1z1vL3y-Adc_NzPG51JKfjyKFUHrAWuZyvmRlROg0CwtlmwuGYQH0mQECjnuUnLgZ28rg4zJjUO6SteTcsWaE5t-8ahFyItitCurZFP9KWmzkPxXeuZ_g',
    description: 'Chaqueta vaquera de corte relajado. Un básico atemporal con un toque rebelde.',
    colors: ['#4a6fa5'],
    sizes: ['S', 'M', 'L']
  }
];
