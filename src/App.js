import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronsDown, Beer, Newspaper, Users, Phone, MapPin, Mail, Menu, X, Sparkles, LoaderCircle, Leaf } from 'lucide-react';

// --- Dữ liệu giả lập (Mock Database) ---
const mockDatabase = {
  foodPairings: {
    'Bia Mật Ong Truyền Thống': `
• Gà nướng mật ong: Vị ngọt của mật ong trong bia sẽ cộng hưởng tuyệt vời với lớp da gà nướng vàng óng, tạo nên một bản giao hưởng hương vị.
• Nem lụi nướng sả: Vị bia nhẹ nhàng, sảng khoái giúp cân bằng vị béo của thịt và hương thơm nồng của sả.
• Gỏi ngó sen tôm thịt: Vị chua ngọt của gỏi kết hợp với hậu vị ngọt dịu của bia tạo cảm giác tươi mát, kích thích vị giác.
• Mực hấp gừng: Vị ngọt tự nhiên của mực và hương gừng ấm áp được tôn lên bởi sự thanh mát của dòng bia Lager này.
    `,
    'Bia Mật Ong Đen': `
• Sườn nướng BBQ: Vị mạch nha rang cháy của bia kết hợp hoàn hảo với vị khói và ngọt đậm của sốt BBQ.
• Bò bít tết sốt tiêu đen: Vị bia đậm đà giúp làm dịu vị cay nồng của tiêu và làm nổi bật vị ngọt của thịt bò.
• Phô mai dây hun khói: Vị béo và mặn của phô mai là người bạn đồng hành lý tưởng cho dòng bia đen sâu lắng.
• Bánh brownie sô cô la: Một sự kết hợp táo bạo nhưng tuyệt vời, vị đắng của sô cô la và bia đen hòa quyện tạo nên một món tráng miệng khó quên.
    `,
    'Xuân Thủy IPA': `
• Hải sản xào cay (Tôm, mực): Vị đắng đặc trưng của IPA sẽ làm dịu đi vị cay nồng, đồng thời hương trái cây trong bia làm tăng thêm hương vị cho hải sản.
• Cánh gà chiên nước mắm: Vị mặn mà của nước mắm và vị giòn của cánh gà được cân bằng bởi vị đắng và hương thơm của IPA.
• Đậu phụ Tứ Xuyên: Vị cay tê của món ăn sẽ trở nên thú vị hơn khi kết hợp với một dòng bia có vị đắng mạnh mẽ.
    `,
    'Xuân Thủy Pilsner': `
• Chả giò hải sản: Vị bia giòn tan, sảng khoái giúp làm sạch vòm miệng, giảm cảm giác dầu mỡ và làm nổi bật vị ngọt của nhân hải sản.
• Cá diêu hồng chiên xù: Lớp vỏ giòn rụm của cá và vị bia thanh mát là một sự kết hợp kinh điển.
• Salad Caesar: Vị bia nhẹ nhàng sẽ không lấn át vị tươi ngon của rau và sốt Caesar béo ngậy.
    `,
  },
  eventIdeas: [
    {
      eventType: 'Tiệc sinh nhật',
      idea: `
Chủ đề "Đêm Vàng Mật Ngọt": Trang trí không gian với tông màu vàng đồng và nâu gỗ, sử dụng đèn dây vàng ấm áp và các bình hoa tươi.
Hoạt động: Tổ chức một cuộc thi "Thử Bia Mù" (Blind Beer Tasting) vui nhộn. Khách mời sẽ thử các loại bia khác nhau và đoán tên.
Gợi ý bia: Bia Mật Ong Truyền Thống (dễ uống, phù hợp với mọi người), Xuân Thủy Pilsner (sảng khoái), Bia Mật Ong Đen (cho những ai thích vị đậm đà).
      `
    },
    {
      eventType: 'Họp lớp',
      idea: `
Chủ đề "Trở Về Ký Ức": Trang trí với những hình ảnh cũ của lớp, bảng đen và phấn.
Hoạt động: Chiếu một video ngắn tổng hợp lại những kỷ niệm xưa. Tổ chức các trò chơi tập thể quen thuộc thời đi học.
Gợi ý bia: Xuân Thủy Pilsner (cổ điển, gợi nhớ kỷ niệm), Bia Mật Ong Truyền Thống (thân thiện, dễ bắt chuyện), Xuân Thủy IPA (cho những câu chuyện thêm phần sôi nổi).
      `
    },
    {
      eventType: 'Tiệc công ty cuối năm',
      idea: `
Chủ đề "Đêm Gala Tỏa Sáng": Trang trí sang trọng với phông nền chụp ảnh, thảm đỏ.
Hoạt động: Trao giải thưởng "Nhân viên của năm". Tổ chức bốc thăm trúng thưởng với các phần quà hấp dẫn.
Gợi ý bia: Bia Mật Ong Đen (sang trọng, đẳng cấp), Xuân Thủy Pilsner (tinh tế), Bia Mật Ong Truyền Thống (để khai vị).
      `
    },
    {
      eventType: 'Tiệc chia tay độc thân',
      idea: `
Chủ đề "Chuyến Phiêu Lưu Cuối Cùng": Trang trí theo phong cách "khám phá", với bản đồ, la bàn.
Hoạt động: Thử thách uống bia theo set (Beer Flight Challenge). Tổ chức các trò chơi "nói thật hay làm thật" về chủ đề hôn nhân.
Gợi ý bia: Xuân Thủy IPA (mạnh mẽ, cho cuộc vui bùng nổ), Bia Mật Ong Đen (sâu lắng), Bia Mật Ong Truyền Thống (để "giải nhiệt").
      `
    },
    {
      eventType: 'Xem bóng đá',
      idea: `
Chủ đề "Sân Cỏ Rực Lửa": Trang trí với cờ của các đội bóng, màn hình chiếu lớn.
Hoạt động: Tổ chức dự đoán tỉ số có thưởng. Chuẩn bị các món ăn nhẹ dễ ăn như khoai tây chiên, cánh gà.
Gợi ý bia: Xuân Thủy Pilsner (sảng khoái, uống được nhiều), Bia Mật Ong Truyền Thống (dễ uống), Xuân Thủy IPA (cho những khoảnh khắc gay cấn).
      `
    },
    {
      eventType: 'Tiệc Halloween',
      idea: `
Chủ đề "Xưởng Bia Ma Quái": Trang trí với mạng nhện, bí ngô, ánh sáng mờ ảo.
Hoạt động: Cuộc thi hóa trang ấn tượng nhất. Kể chuyện kinh dị.
Gợi ý bia: Bia Mật Ong Đen (màu sắc bí ẩn, phù hợp chủ đề), Xuân Thủy IPA (vị đắng "gây sốc"), Bia Mật Ong Truyền Thống.
      `
    },
    {
      eventType: 'Tiệc Giáng Sinh',
      idea: `
Chủ đề "Giáng Sinh Ấm Áp": Trang trí với cây thông, hộp quà, lò sưởi giả.
Hoạt động: Trao đổi quà tặng (Secret Santa). Hát karaoke các bài hát Giáng Sinh.
Gợi ý bia: Bia Mật Ong Đen (vị ấm áp như ly rượu nóng), Xuân Thủy Pilsner (tươi mát như tuyết), Bia Mật Ong Truyền Thống.
      `
    },
     {
      eventType: 'Ra mắt sản phẩm mới',
      idea: `
Chủ đề "Tinh Hoa Hội Tụ": Trang trí thanh lịch, tập trung vào sân khấu và sản phẩm.
Hoạt động: Phần trình bày về sản phẩm mới. Cho khách mời dùng thử và cho nhận xét.
Gợi ý bia: Tất nhiên là sản phẩm mới, cùng với Xuân Thủy Pilsner và Bia Mật Ong Truyền Thống để so sánh.
      `
    },
    {
      eventType: 'Workshop về bia thủ công',
      idea: `
Chủ đề "Nghệ Thuật Ủ Men": Bố trí không gian như một lớp học, có bảng và dụng cụ.
Hoạt động: Mời nghệ nhân ủ bia chia sẻ về quy trình. Khách mời được tự tay thử một vài công đoạn đơn giản.
Gợi ý bia: Một set thử bia (tasting flight) gồm cả 4 loại để khách cảm nhận sự khác biệt.
      `
    },
    {
      eventType: 'Tiệc cảm ơn đối tác',
      idea: `
Chủ đề "Tri Ân Vàng": Trang trí tinh tế, sang trọng với hoa tươi và ánh sáng vàng.
Hoạt động: Bài phát biểu cảm ơn từ ban lãnh đạo. Tặng quà lưu niệm cho đối tác.
Gợi ý bia: Bia Mật Ong Đen (thể hiện sự trân trọng), Xuân Thủy Pilsner (tinh tế), Bia Mật Ong Truyền Thống.
      `
    }
  ]
};

// --- Bảng màu "Bia Ong Xuân Thủy" ---
// Vàng Mật Ong (Honey Gold): #FFB300 (amber-500)
// Nâu Gỗ Sồi (Oak Brown):   #4E342E (stone-800)
// Trắng Kem (Cream):        #FFF8E1 (amber-50)
// Đen (Onyx):               #212121 (neutral-900)

// --- CSS cho Animation ---
const GlobalStyles = () => (
  <style>
    {`
      @keyframes fadeInDown { from { opacity: 0; transform: translate3d(0, -20px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
      .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
      .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
      .animation-delay-300 { animation-delay: 300ms; }
      .animation-delay-600 { animation-delay: 600ms; }
    `}
  </style>
);

// --- Custom Hook để phát hiện component trên màn hình ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [ref, options]);
  return [ref, isIntersecting];
};

// --- Component Wrapper cho hiệu ứng cuộn ---
const ScrollAnimatedSection = ({ children, className = '' }) => {
  const [ref, isIntersecting] = useOnScreen({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-in-out ${className} ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {children}
    </div>
  );
};

// --- Component cuộn lên đầu trang ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- Component Modal ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-stone-800 flex items-center gap-2"><Sparkles className="text-amber-500" /> {title}</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800"><X size={28} /></button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// --- Logo "Bia Ong Xuân Thủy" bằng CSS ---
const CssLogo = () => (
  <Link to="/" className="flex items-center gap-3 text-xl font-bold text-amber-500">
    <div className="w-10 h-10 flex items-center justify-center">
      <div className="w-5 h-8 bg-amber-500 rounded-full rotate-12 relative">
        <div className="absolute top-2 left-0 w-full h-1 bg-stone-800"></div>
        <div className="absolute top-4 left-0 w-full h-1.5 bg-stone-800"></div>
        <div className="absolute top-0 left-0 w-4 h-4 bg-amber-50/50 rounded-full -translate-x-2 -rotate-45 border-2 border-amber-500/70"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-amber-50/50 rounded-full translate-x-2 rotate-45 border-2 border-amber-500/70"></div>
      </div>
    </div>
    <span className="text-amber-50 hidden sm:block">Bia Ong Xuân Thủy</span>
  </Link>
);

// --- Header ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Câu Chuyện Thương Hiệu', path: '/about' },
    { name: 'Dòng Sản Phẩm', path: '/products' },
    { name: 'Phát Triển Bền Vững', path: '/sustainability' },
    { name: 'Tin Tức', path: '/news' },
    { name: 'Liên Hệ', path: '/contact' },
  ];
  return (
    <header className="bg-stone-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <CssLogo />
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-amber-500 text-stone-800' : 'text-amber-50 hover:bg-stone-700'}`}>
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-amber-50"><Menu size={28} /></button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-stone-800">
          <nav className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `block w-full text-center px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-amber-500 text-stone-800' : 'text-amber-50 hover:bg-stone-700'}`}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-stone-800 text-neutral-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-amber-500">Bia Ong Xuân Thủy</h3>
          <p className="mt-2 text-sm">Hương vị độc đáo từ mật ong và tâm huyết người nghệ nhân.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Khám Phá</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/about" className="hover:text-amber-500">Câu Chuyện Thương Hiệu</Link></li>
            <li><Link to="/products" className="hover:text-amber-500">Dòng Sản Phẩm</Link></li>
            <li><Link to="/sustainability" className="hover:text-amber-500">Phát Triển Bền Vững</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Kết Nối</h3>
          <div className="flex mt-2 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">Instagram</a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Liên Hệ</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} /> xã Xuân Hồng, tỉnh Ninh Bình</li>
            <li className="flex items-center gap-2"><Mail size={16} /> contact@biaongxuanthuy.vn</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-stone-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Bia Ong Xuân Thủy. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const Home = () => (
  <div className="bg-amber-50">
    <section className="min-h-screen bg-stone-800 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://placehold.co/1920x1080/4E342E/FFFFFF?text=Trang+trại+ong')"}}></div>
        <div className="relative z-10 p-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in-down">BIA ONG XUÂN THỦY</h1>
            <p className="text-xl md:text-2xl text-amber-500 mb-8 animate-fade-in-up animation-delay-300">Vị ngọt từ tâm, chất men từ đất</p>
            <Link to="/products" className="bg-amber-500 text-stone-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-400 transition-transform transform hover:scale-105 animate-fade-in-up animation-delay-600">Khám Phá Sản Phẩm</Link>
        </div>
        <div className="absolute bottom-10 animate-bounce"><ChevronsDown size={48} className="text-white/50" /></div>
    </section>

    <ScrollAnimatedSection className="py-20">
      <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">Câu Chuyện Thương Hiệu</h2>
        <p className="text-lg text-neutral-700 leading-relaxed mb-6">Bắt nguồn từ vùng đất Xuân Thủy đầy nắng gió, Bia Ong Xuân Thủy là kết tinh của niềm đam mê với nghề nuôi ong truyền thống và nghệ thuật ủ bia thủ công. Mỗi giọt bia là một lời tri ân đến thiên nhiên và con người nơi đây.</p>
        <Link to="/about" className="text-amber-600 font-bold hover:underline">Tìm hiểu thêm về chúng tôi &rarr;</Link>
      </div>
    </ScrollAnimatedSection>

    <ScrollAnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-stone-800 mb-12">Các Dòng Sản Phẩm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-3xl font-bold text-stone-800">Dòng Bia Mật Ong</h3>
                    <p className="mt-2 text-neutral-700">Sự hòa quyện tinh tế giữa vị ngọt thanh của mật ong hoa rừng và hương thơm lúa mạch, tạo nên dòng bia đặc trưng, độc nhất.</p>
                    <img src="https://placehold.co/600x400/FFB300/4E342E?text=Bia+Mật+Ong" alt="Dòng Bia Mật Ong" className="w-full h-64 object-cover rounded-md mt-4"/>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-3xl font-bold text-stone-800">Dòng Bia Thủ Công</h3>
                    <p className="mt-2 text-neutral-700">Dành cho những người sành bia, với các công thức IPA, Stout, Pilsner được sáng tạo và ủ men bởi những nghệ nhân tài hoa.</p>
                    <img src="https://placehold.co/600x400/4E342E/FFF8E1?text=Bia+Thủ+Công" alt="Dòng Bia Thủ Công" className="w-full h-64 object-cover rounded-md mt-4"/>
                </div>
            </div>
             <div className="text-center mt-12">
                <Link to="/products" className="bg-stone-800 text-amber-50 py-3 px-8 rounded-full text-lg hover:bg-stone-700 transition-colors">Xem Tất Cả Sản Phẩm</Link>
            </div>
        </div>
    </ScrollAnimatedSection>
    
    <ScrollAnimatedSection className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-10 rounded-lg shadow-xl">
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold text-stone-800 mb-4">Phát Triển Bền Vững</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">Chúng tôi cam kết đồng hành cùng người nông dân địa phương, bảo vệ hệ sinh thái ong và phát triển các mô hình canh tác bền vững. Mỗi sản phẩm bạn thưởng thức đều góp phần vào sứ mệnh này.</p>
                    <Link to="/sustainability" className="text-amber-600 font-bold hover:underline">Khám phá cam kết của chúng tôi &rarr;</Link>
                </div>
                <div className="md:w-1/2">
                    <img src="https://placehold.co/600x400/a3e635/4E342E?text=Phát+Triển+Bền+Vững" alt="Phát triển bền vững" className="rounded-lg object-cover w-full h-full"/>
                </div>
            </div>
        </div>
    </ScrollAnimatedSection>
  </div>
);

const About = () => (
  <div className="bg-amber-50 py-16">
    <div className="container mx-auto px-4">
      <ScrollAnimatedSection>
        <h1 className="text-5xl font-bold text-center mb-8 text-stone-800">Câu Chuyện Bia Ong Xuân Thủy</h1>
        <p className="text-lg text-center max-w-3xl mx-auto text-neutral-700 leading-relaxed mb-12">Từ tình yêu với những đàn ong mật trên mảnh đất Xuân Thủy, ông Nguyễn Xuân Thủy đã ấp ủ giấc mơ tạo ra một loại bia mang đậm hương vị quê hương. Đó không chỉ là bia, đó là câu chuyện về sự kiên trì, về mối giao hòa giữa con người và thiên nhiên.</p>
      </ScrollAnimatedSection>
      <ScrollAnimatedSection>
        <img src="https://placehold.co/1200x500/4E342E/FFF8E1?text=Xưởng+Bia+Xuân+Thủy" alt="Xưởng Bia" className="rounded-lg shadow-xl mx-auto mb-12"/>
      </ScrollAnimatedSection>
      <ScrollAnimatedSection className="max-w-4xl mx-auto text-neutral-800">
        <h2 className="text-3xl font-bold mb-4">Quy trình từ Tổ ong đến Ly bia</h2>
        <p className="mb-8">Chúng tôi kiểm soát chặt chẽ từng công đoạn, từ việc thu hoạch mật ong nguyên chất, lựa chọn lúa mạch hảo hạng, cho đến quá trình ủ men theo công thức bí truyền để đảm bảo mỗi ly bia đều đạt chất lượng tuyệt hảo.</p>
      </ScrollAnimatedSection>
    </div>
  </div>
);

const Sustainability = () => (
    <div className="bg-amber-50 py-16">
        <div className="container mx-auto px-4">
            <ScrollAnimatedSection>
                <h1 className="text-5xl font-bold text-center mb-8 text-stone-800">Phát Triển Bền Vững</h1>
                <p className="text-lg text-center max-w-3xl mx-auto text-neutral-700 leading-relaxed mb-12">Tại Bia Ong Xuân Thủy, phát triển bền vững không phải là một lựa chọn, mà là cốt lõi trong mọi hoạt động của chúng tôi.</p>
            </ScrollAnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <ScrollAnimatedSection>
                    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                        <Leaf className="text-amber-500 w-12 h-12 mb-4"/>
                        <h3 className="text-2xl font-bold text-stone-800 mb-2">Bảo vệ hệ sinh thái Ong</h3>
                        <p className="text-neutral-700">Chúng tôi xây dựng các trang trại ong theo mô hình sinh học, không sử dụng hóa chất, đồng thời trồng thêm các loại cây hoa bản địa để tạo môi trường sống lý tưởng cho loài ong.</p>
                    </div>
                </ScrollAnimatedSection>
                 <ScrollAnimatedSection>
                    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                        <Users className="text-amber-500 w-12 h-12 mb-4"/>
                        <h3 className="text-2xl font-bold text-stone-800 mb-2">Đồng hành cùng Nông dân</h3>
                        <p className="text-neutral-700">Chúng tôi cam kết bao tiêu sản phẩm mật ong và lúa mạch cho các hộ nông dân địa phương với mức giá ổn định, giúp họ cải thiện đời sống và yên tâm sản xuất.</p>
                    </div>
                </ScrollAnimatedSection>
            </div>
        </div>
    </div>
);


const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const productList = [
        { name: 'Bia Mật Ong Truyền Thống', style: 'Honey Lager', abv: '4.5%', image: 'https://placehold.co/600x400/FFB300/4E342E?text=Mật+Ong+Lager', description: 'Vị bia sảng khoái, cân bằng, với hương thơm và vị ngọt dịu tự nhiên từ mật ong hoa rừng Ninh Bình.' },
        { name: 'Bia Mật Ong Đen', style: 'Honey Dark Lager', abv: '5.5%', image: 'https://placehold.co/600x400/7a5a4b/FFF8E1?text=Mật+Ong+Đen', description: 'Hương thơm nồng nàn của mạch nha rang cháy quyện với vị ngọt sâu lắng của mật ong sẫm màu, tạo nên một trải nghiệm đậm đà khó quên.' },
        { name: 'Xuân Thủy IPA', style: 'India Pale Ale', abv: '6.5%', image: 'https://placehold.co/600x400/f97316/FFF8E1?text=Xuân+Thủy+IPA', description: 'Bùng nổ hương thơm của các loại trái cây nhiệt đới. Vị đắng đặc trưng của hoa bia nhưng rất sảng khoái.' },
        { name: 'Xuân Thủy Pilsner', style: 'Classic Pilsner', abv: '5.0%', image: 'https://placehold.co/600x400/FDE68A/4E342E?text=Pilsner', description: 'Màu vàng rơm trong vắt, hương thơm thanh tao của hoa bia và vị mạch nha giòn tan. Một lựa chọn cổ điển và tinh tế.' },
    ];

    const handleGetFoodPairing = (beer) => {
      setModalTitle(`Gợi ý cho ${beer.name}`);
      const suggestion = mockDatabase.foodPairings[beer.name] || "Xin lỗi, hiện chưa có gợi ý cho sản phẩm này.";
      setModalContent(suggestion);
      setIsModalOpen(true);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
                <div className="text-neutral-700 whitespace-pre-wrap">{modalContent}</div>
            </Modal>
            <div className="bg-amber-50">
            <div className="container mx-auto px-4 py-16">
                <ScrollAnimatedSection>
                    <h1 className="text-5xl font-bold text-center mb-12 text-stone-800">Dòng Sản Phẩm Bia Ong Xuân Thủy</h1>
                </ScrollAnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {productList.map((p, index) => (
                        <ScrollAnimatedSection key={index}>
                            <div className="bg-white rounded-lg shadow-xl overflow-hidden group h-full flex flex-col">
                                <div className="overflow-hidden h-80"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-semibold text-stone-800">{p.name}</h3>
                                    <p className="text-amber-600 font-medium">{p.style}</p>
                                    <p className="mt-2 text-neutral-700 flex-grow">Nồng độ cồn: {p.abv}</p>
                                    <button onClick={() => handleGetFoodPairing(p)} className="mt-4 bg-amber-500 text-stone-800 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors w-full flex items-center justify-center gap-2">
                                        <Sparkles size={16} /> Gợi ý món ăn kèm
                                    </button>
                                </div>
                            </div>
                        </ScrollAnimatedSection>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};

const News = () => {
    const newsList = [
        { title: 'Bia Ong Xuân Thủy ra mắt dòng sản phẩm mới: Bia Mật Ong Đen', date: '15 Tháng 7, 2025', excerpt: 'Chúng tôi tự hào giới thiệu dòng bia Mật Ong Đen, một sự kết hợp táo bạo giữa mạch nha rang và mật ong sẫm màu...', image: 'https://placehold.co/800x500/7a5a4b/FFF8E1?text=Sự+Kiện' },
        { title: 'Lễ hội "Hương Vị Mật Ong" tại Ninh Bình thành công rực rỡ', date: '01 Tháng 7, 2025', excerpt: 'Sự kiện đã thu hút hàng ngàn du khách trong và ngoài tỉnh đến tham quan và thưởng thức các sản phẩm độc đáo từ mật ong...', image: 'https://placehold.co/800x500/f97316/FFF8E1?text=Lễ+Hội' },
    ];
    return (
        <div className="bg-amber-50 py-16">
        <div className="container mx-auto px-4">
            <ScrollAnimatedSection><h1 className="text-5xl font-bold text-center mb-12 text-stone-800">Tin Tức & Sự Kiện</h1></ScrollAnimatedSection>
            <div className="space-y-12 max-w-4xl mx-auto">
                {newsList.map((item, index) => (
                    <ScrollAnimatedSection key={index}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                            <div className="md:w-1/3"><img src={item.image} alt={item.title} className="w-full h-56 md:h-full object-cover"/></div>
                            <div className="p-6 md:w-2/3">
                                <p className="text-sm text-neutral-500">{item.date}</p>
                                <h2 className="text-2xl font-bold mt-2 text-stone-800">{item.title}</h2>
                                <p className="mt-4 text-neutral-700">{item.excerpt}</p>
                                <Link to={`/news/${index}`} className="text-amber-600 hover:text-amber-700 font-semibold mt-4 inline-block">Đọc tiếp &rarr;</Link>
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                ))}
            </div>
        </div>
        </div>
    );
};

const Contact = () => {
    const [eventType, setEventType] = useState('');
    const [eventIdea, setEventIdea] = useState('');

    const handleGetEventIdea = (e) => {
        e.preventDefault();
        if (!eventType.trim()) {
            // Lấy ngẫu nhiên một gợi ý nếu người dùng không nhập gì
            const randomIndex = Math.floor(Math.random() * mockDatabase.eventIdeas.length);
            setEventIdea(mockDatabase.eventIdeas[randomIndex].idea);
            return;
        };
        
        // Tìm gợi ý phù hợp nhất hoặc lấy ngẫu nhiên nếu không tìm thấy
        const foundIdea = mockDatabase.eventIdeas.find(idea => eventType.toLowerCase().includes(idea.eventType.toLowerCase()));
        if(foundIdea) {
            setEventIdea(foundIdea.idea);
        } else {
            const randomIndex = Math.floor(Math.random() * mockDatabase.eventIdeas.length);
            setEventIdea(mockDatabase.eventIdeas[randomIndex].idea);
        }
    };

    return (
    <div className="bg-amber-50 py-16">
    <div className="container mx-auto px-4">
        <ScrollAnimatedSection><h1 className="text-5xl font-bold text-center mb-12 text-stone-800">Liên Hệ & Hợp Tác</h1></ScrollAnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ScrollAnimatedSection>
                <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                    <h2 className="text-2xl font-bold mb-6 text-stone-800">Gửi Yêu Cầu Hợp Tác</h2>
                    <form>
                        <div className="mb-4"><label htmlFor="name" className="block text-neutral-700 mb-1">Tên của bạn</label><input type="text" id="name" className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"/></div>
                        <div className="mb-4"><label htmlFor="email" className="block text-neutral-700 mb-1">Email</label><input type="email" id="email" className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"/></div>
                        <div className="mb-4"><label htmlFor="message" className="block text-neutral-700 mb-1">Nội dung yêu cầu</label><textarea id="message" rows="5" className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea></div>
                        <button type="submit" className="w-full bg-amber-500 text-stone-800 font-bold py-3 rounded-md hover:bg-amber-600 transition-colors">Gửi đi</button>
                    </form>
                </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection>
                <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                     <h2 className="text-2xl font-bold mb-6 text-stone-800">Thông Tin Liên Lạc</h2>
                     <div className="space-y-4 text-neutral-800">
                        <p className="flex items-start gap-4"><MapPin className="text-amber-600 mt-1 flex-shrink-0"/><span>xã Xuân Hồng, tỉnh Ninh Bình, Việt Nam</span></p>
                        <p className="flex items-center gap-4"><Mail className="text-amber-600 flex-shrink-0"/><span>contact@biaongxuanthuy.vn</span></p>
                        <p className="flex items-center gap-4"><Phone className="text-amber-600 flex-shrink-0"/><span>(0232) 3888 999</span></p>
                     </div>
                     <div className="mt-8 w-full h-64 bg-neutral-200 rounded-md flex items-center justify-center"><p className="text-neutral-500">[Bản đồ Google Maps]</p></div>
                </div>
            </ScrollAnimatedSection>
        </div>
        <ScrollAnimatedSection className="mt-16">
            <div className="max-w-4xl mx-auto bg-stone-800 text-white p-8 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-2 text-amber-500 flex items-center justify-center gap-3">Tư Vấn Sự Kiện <Sparkles/></h2>
                <p className="text-center text-neutral-300 mb-6">Bạn muốn tổ chức một buổi tiệc? Hãy để chúng tôi giúp bạn lên ý tưởng!</p>
                <form onSubmit={handleGetEventIdea}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="Nhập loại sự kiện (VD: tiệc sinh nhật, họp lớp...)" className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-amber-500 text-neutral-800"/>
                        <button type="submit" className="bg-amber-500 text-stone-800 font-bold px-6 py-3 rounded-md hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                            ✨ Lấy ý tưởng
                        </button>
                    </div>
                </form>
                {eventIdea && (
                    <div className="mt-6 p-4 bg-stone-700 rounded-md border border-stone-600">
                        <h3 className="text-xl font-bold text-amber-500 mb-2">Gợi ý cho bạn:</h3>
                        <p className="text-neutral-200 whitespace-pre-wrap">{eventIdea}</p>
                    </div>
                )}
            </div>
        </ScrollAnimatedSection>
    </div>
    </div>
    );
};

// --- Main App Component ---
function App() {
  return (
    <HashRouter>
      <GlobalStyles />
      <ScrollToTop />
      <div className="bg-amber-50 text-neutral-900 font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
