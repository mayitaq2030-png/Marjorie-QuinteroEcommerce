
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Product, CartItem } from './types.ts';
import { PRODUCTS } from './constants.tsx';
import { getShoppingAdviceStream } from './geminiService.ts';

// --- Shared Components ---

const Navbar: React.FC<{ cartCount: number; searchQuery: string; setSearchQuery: (q: string) => void }> = ({ cartCount, searchQuery, setSearchQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-16' : 'bg-[#f8fcfa] h-20'}`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="size-8 bg-[#11d493] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined font-bold">bolt</span>
          </div>
          <h2 className="text-[#0d1b17] text-xl font-bold tracking-tight group-hover:text-[#11d493] transition-colors hidden sm:block">URBANA</h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-sm font-semibold hover:text-[#11d493] transition-colors">Colección</Link>
          <Link to="/shop" className="text-sm font-semibold hover:text-[#11d493] transition-colors">Ropa</Link>
          <Link to="/about" className="text-sm font-semibold hover:text-[#11d493] transition-colors">Nosotros</Link>
        </nav>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden sm:block">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca tu estilo..."
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#11d493]/20"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
        </form>

        <div className="flex items-center gap-1">
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-[#11d493] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-8 flex flex-col gap-8 shadow-2xl animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-[#11d493]">URBANA</h2>
              <button onClick={() => setIsMenuOpen(false)} className="size-10 rounded-full bg-gray-50 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-xl font-bold">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Colección</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
            </nav>
            <div className="mt-auto border-t pt-8">
              <p className="text-sm text-gray-500 mb-4">Síguenos en redes</p>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center"><span className="material-symbols-outlined">brand_awareness</span></div>
                <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center"><span className="material-symbols-outlined">share</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-100 py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">URBANA</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Redefiniendo el estilo urbano para la mujer contemporánea. Moda que inspira movimiento y confianza.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase mb-4">Comprar</h4>
        <ul className="flex flex-col gap-2 text-sm text-gray-500">
          <li><Link to="/shop" className="hover:text-[#11d493]">Novedades</Link></li>
          <li><Link to="/shop" className="hover:text-[#11d493]">Ropa</Link></li>
          <li><Link to="/shop" className="hover:text-[#11d493]">Accesorios</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase mb-4">Ayuda</h4>
        <ul className="flex flex-col gap-2 text-sm text-gray-500">
          <li><Link to="/contact" className="hover:text-[#11d493]">Contacto</Link></li>
          <li><Link to="/about" className="hover:text-[#11d493]">Envíos</Link></li>
          <li><Link to="/about" className="hover:text-[#11d493]">Devoluciones</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase mb-4">Newsletter</h4>
        <p className="text-sm text-gray-500 mb-4">Únete para recibir ofertas exclusivas.</p>
        <div className="flex gap-2">
          <input className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#11d493]" placeholder="Tu email" type="email" />
          <button className="bg-[#11d493] text-white font-bold px-4 py-2 rounded-lg text-sm hover:brightness-110 transition-all">OK</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-gray-100 text-xs text-gray-400 text-center">
      © 2024 URBANA Store. Todos los derechos reservados.
    </div>
  </footer>
);

// --- Page Components ---

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="px-4 py-8 md:py-16 max-w-7xl mx-auto w-full">
        <div className="bg-[#e7f3ef] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center p-8 lg:p-16 gap-12 lg:min-h-[600px] relative">
          <div className="flex-1 space-y-6 lg:z-10 text-center lg:text-left">
            <span className="text-[#11d493] font-bold tracking-widest text-xs uppercase animate-pulse">Colección 2024</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0d1b17] leading-tight">Viste Tu Esencia <br/> Urbana.</h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">Diseñados para moverte por la ciudad. Confort premium y texturas técnicas en cada prenda.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[#11d493] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#11d493]/20 hover:scale-105 transition-transform">
              Ver Colección <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/5] md:aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARL-aJrZqId3UIvrNBNiwHB6joM91AkNqxmwqtLEBFlaJprV3xRLVkQb49Y_Ox2TZ9vJgMGjpUR3Aovh7FeLWA9pK7xMUQWhzI77b5ykoTVfdjZVA7m1RnEj9vVZfaDpcwP6aNKysAnNsa-wJpdXYkaqOIzuL0sdUYrClFxna04nfCCxQU_kZFruF91pwx0jqszJ3nXi83dbQBoQeWv_CLXFzpKGP9sGCtmPECS7jDNKUDbCwouKgGmv4AQP2dWTTzIoTmptspUsjc" alt="Urban style model" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold mb-10">Explora Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Hoodies & Sudaderas', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUOgskAARJkwE0T9WmhxSNzSo1paK9_VAQeyjUDRymT12BAMC2pni5ov2pcbMyAS-In-AeIUgozzZWaL_Y271jGt__ijn4XUjdxSkwa5S684FXfteIsSilu34pFQ4QoibeoWe0bI18zh2Ml9rsgqt2XvCb8WL7B_iPX6SJRCSYqBGoiYBpv1dPYnoir9hyldFcLsaBDTWycuPaojCuYwwpTagTru-6bxakKXe332RLlpvpX2mLIM3-dAJXIEGtKDbPM3H9Dg1ARZt' },
            { name: 'Joggers & Cargo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhTULHSkIrbI_mDJ21RTz9xsuhUw4prXPCtNvm0w9vJxGQcz66cex8b_MdLNKfliW7ijYoxciKqvQ91YfbDLOWmZhejMBmpP-1h8GNc1LrvfPeeALhBU-WbYH-PJdO7rKJZmeGehBMMFefXHl_RxWBzGsFwWqvOhH_s9i83roE78EzGqfhmD_ea61XKFL7UI99wvHbZsgRJrysfOiigGr2Sp4lRSa358gzCK7D1mTHgeiyWwmHiYBwH9X2NZhOepFykVQbxzvQjLWu' },
            { name: 'Sneakers & Accesorios', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEADtBSIzh4aJ8ikEaebdjPSlv5J-CexiFeTEvsvFNcSTIfVucc4GmC_l1iDPMKqM4s1W0Mer3FsQPgGgVck-rZC4rZQ2UmXiAYS7FctoU0LdZbrxCNsJsISchGfqnxMOXIidkTwAMWY7qHqi4c_eLvGOVmOQuRiKYJabXhicfndn0KdjUrCnJP7uBUhQ97Djp1RSB2gNtAiv83SzUfEOUNS7C5uCnNRicsLERk6NxA5uRl7hvk4g4M7tjB4i06pi9xGG4NrRo9zz1' }
          ].map(cat => (
            <Link key={cat.name} to="/shop" className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="group flex flex-col gap-3 animate-fade-in">
    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
      {product.isNew && <span className="absolute top-3 left-3 bg-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">Nuevo</span>}
      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button className="w-full bg-[#11d493] text-white py-2 rounded-lg font-bold shadow-lg">Ver Detalles</button>
      </div>
    </div>
    <div>
      <h3 className="font-bold truncate group-hover:text-[#11d493] transition-colors">{product.name}</h3>
      <p className="text-gray-500 text-xs uppercase tracking-tighter">{product.category}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-[#11d493] font-bold">${product.price.toFixed(2)}</span>
      </div>
    </div>
  </Link>
);

const ShopPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black">Nuestra Colección</h2>
          {searchQuery && <p className="text-gray-500 text-sm mt-1">Resultados para "{searchQuery}"</p>}
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-200">search_off</span>
          <p className="text-gray-500 mt-4">No encontramos lo que buscas. ¡Prueba otro término!</p>
        </div>
      )}
    </div>
  );
};

const ProductDetailPage: React.FC<{ addToCart: (p: Product, c: string, s: string) => void }> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return <div className="p-20 text-center font-bold">Producto no encontrado</div>;

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-1">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 sticky top-24">
             <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="space-y-4">
            <span className="bg-[#11d493]/10 text-[#11d493] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">{product.name}</h1>
            <p className="text-3xl font-bold text-[#11d493]">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold mb-2">Descripción</h4>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <span className="block text-sm font-bold uppercase tracking-wider mb-3">Color</span>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color} 
                    onClick={() => setSelectedColor(color)}
                    className={`size-12 rounded-full border-4 transition-all hover:scale-110 ${selectedColor === color ? 'border-[#11d493] shadow-lg' : 'border-transparent shadow-sm'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <span className="block text-sm font-bold uppercase tracking-wider mb-3">Talla</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 min-w-[3.5rem] px-4 rounded-xl font-bold border-2 transition-all ${selectedSize === size ? 'border-[#11d493] bg-[#11d493] text-white' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full h-16 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${isAdding ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-[#11d493] text-white hover:brightness-110 shadow-[#11d493]/30'}`}
          >
            {isAdding ? <span className="flex items-center gap-2">Añadido <span className="material-symbols-outlined">check_circle</span></span> : 'Añadir al Carrito'}
          </button>

          <div className="grid grid-cols-3 gap-4 border-t pt-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-[#11d493]">local_shipping</span>
              <p className="text-[10px] font-bold uppercase mt-1">Envío Gratis</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-[#11d493]">sync</span>
              <p className="text-[10px] font-bold uppercase mt-1">30 Días Devolución</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-[#11d493]">verified_user</span>
              <p className="text-[10px] font-bold uppercase mt-1">Pago Seguro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage: React.FC<{ cart: CartItem[], updateQty: (id: string, color: string, size: string, delta: number) => void }> = ({ cart, updateQty }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <h2 className="text-4xl font-black mb-10">Tu Carrito</h2>
      {cart.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
          <span className="material-symbols-outlined text-8xl text-gray-100 mb-6">shopping_cart</span>
          <p className="text-gray-400 text-xl font-medium">Parece que tu carrito está vacío.</p>
          <Link to="/shop" className="inline-flex mt-8 bg-[#11d493] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">Seguir Comprando</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 md:gap-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <img src={item.image} className="size-24 md:size-32 object-cover rounded-xl" alt={item.name} />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-black">{item.name}</h3>
                      <span className="font-bold text-[#11d493]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Talla: {item.selectedSize}</p>
                       <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Color:</p>
                          <div className="size-3 rounded-full shadow-sm border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <button onClick={() => updateQty(item.id, item.selectedColor, item.selectedSize, -1)} className="size-10 flex items-center justify-center hover:bg-gray-200 font-bold transition-colors">-</button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.selectedColor, item.selectedSize, 1)} className="size-10 flex items-center justify-center hover:bg-gray-200 font-bold transition-colors">+</button>
                    </div>
                    <button onClick={() => updateQty(item.id, item.selectedColor, item.selectedSize, -item.quantity)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-[450px]">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 sticky top-28">
              <h3 className="text-2xl font-black mb-8">Resumen</h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Costos de Envío</span>
                  <span className="font-bold text-[#11d493]">GRATIS</span>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xl font-black">TOTAL</span>
                  <span className="text-3xl font-black text-[#11d493]">${total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-[#11d493] text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">Pagar Ahora</button>
              <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest">Garantía de Satisfacción 100% URBANA</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-black">Detalles de Envío</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nombre" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
              <input placeholder="Apellidos" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
            </div>
            <input placeholder="Email" type="email" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
            <input placeholder="Dirección completa" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Ciudad" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
              <input placeholder="Código Postal" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#11d493]/20 focus:border-[#11d493] outline-none" />
            </div>
          </form>
        </div>
        <div className="space-y-8">
           <h2 className="text-3xl font-black">Pago Seguro</h2>
           <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
             <div className="flex gap-4 mb-4">
               <div className="p-2 border border-[#11d493] bg-[#11d493]/5 rounded-lg flex items-center justify-center flex-1">
                 <span className="material-symbols-outlined mr-2">credit_card</span>
                 <span className="text-sm font-bold">Tarjeta</span>
               </div>
               <div className="p-2 border border-gray-100 rounded-lg flex items-center justify-center flex-1 text-gray-400">
                 <span className="material-symbols-outlined mr-2">account_balance_wallet</span>
                 <span className="text-sm font-bold">Apple Pay</span>
               </div>
             </div>
             <input placeholder="Número de Tarjeta" className="w-full border border-gray-200 p-4 rounded-xl outline-none" />
             <div className="grid grid-cols-2 gap-4">
               <input placeholder="MM/YY" className="w-full border border-gray-200 p-4 rounded-xl outline-none" />
               <input placeholder="CVC" className="w-full border border-gray-200 p-4 rounded-xl outline-none" />
             </div>
             <button className="w-full bg-black text-white py-5 rounded-2xl font-black mt-8 hover:brightness-110 active:scale-95 transition-all">Confirmar Pedido</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Smart Assistant ---

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim() || isTyping) return;
    
    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setIsTyping(true);
    
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    try {
      const stream = await getShoppingAdviceStream(userMsg);
      let fullText = '';
      
      for await (const chunk of stream) {
        const text = chunk.text;
        fullText += text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'ai', text: fullText };
          return newMessages;
        });
      }
    } catch (err) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'ai', text: "Hubo un error al procesar tu solicitud. ¿Podrías repetirla?" };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 size-16 bg-black text-white rounded-full shadow-2xl z-[60] flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <div className="absolute -top-1 -right-1 size-5 bg-[#11d493] rounded-full border-2 border-white animate-bounce"></div>
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">{isOpen ? 'close' : 'smart_toy'}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] md:w-[420px] max-h-[600px] h-[80vh] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-[60] flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-[#11d493] p-8 text-white relative">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-black text-xl">Personal Shopper</h3>
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">En línea ahora</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-8xl">bolt</span>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#fcfdfd]">
            {messages.length === 0 && (
              <div className="space-y-4 py-8">
                <p className="text-center text-sm text-gray-400">¡Hola! Soy tu estilista digital URBANA. ¿Buscas algún outfit para un evento o quieres saber qué está en tendencia?</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["¿Qué me pongo para salir?", "Últimas tendencias", "Ayúdame con mi talla"].map(q => (
                    <button key={q} onClick={() => setPrompt(q)} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold hover:border-[#11d493] hover:text-[#11d493] transition-all">{q}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[90%] p-4 rounded-[24px] text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#11d493] text-white rounded-tr-none shadow-md shadow-[#11d493]/20' : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                  {m.text || (isTyping && i === messages.length - 1 ? <span className="flex gap-1"><span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></span> : '')}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-gray-100 flex gap-2">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#11d493]/10"
              placeholder="Escribe aquí..."
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="size-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#11d493] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- App Main ---

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Product, color: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedColor === color && i.selectedSize === size);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
  };

  const updateQty = (id: string, color: string, size: string, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id && i.selectedColor === color && i.selectedSize === size);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return prev.filter(i => i !== item);
      return prev.map(i => i === item ? { ...i, quantity: newQty } : i);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fcfa]">
      <Navbar cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={
            <div className="max-w-4xl mx-auto px-4 py-24 space-y-8 animate-fade-in">
              <h1 className="text-6xl font-black">Revolución <span className="text-[#11d493]">Urbana</span>.</h1>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">Nacimos en el corazón de la ciudad, inspirados por el ritmo frenético y la necesidad de comodidad sin sacrificar estilo. Lo que empezó como un pequeño proyecto de garaje se ha convertido en la voz de miles de mujeres que exigen más de su armario.</p>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCYhY_h8pG5R7mO0yD9K9_R8H7Z6Y5X4W3V2U1T0S9R8Q7P6O5N4M3L2K1J0I9H8G7" className="w-full h-[400px] object-cover rounded-3xl" alt="Urban vibes" />
            </div>
          } />
          <Route path="/contact" element={
            <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-12">
              <h1 className="text-5xl font-black">Conectemos.</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-[#11d493] mb-4">alternate_email</span>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-500 text-sm mt-2">hello@urbana-store.com</p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-[#11d493] mb-4">location_on</span>
                  <h3 className="font-bold text-lg">Tienda Física</h3>
                  <p className="text-gray-500 text-sm mt-2">Próximamente en tu ciudad</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>

      <AIAssistant />
      <Footer />
      
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
