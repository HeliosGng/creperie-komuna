import React, { useState, useMemo } from 'react';
import { Search, Utensils, Star, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { MenuItem, CategoryId, Language } from '../types';
import { menuItems } from '../data/menuData';
import { translations } from '../data/translations';

interface MenuSectionProps {
  lang: Language;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  onSelectItem,
}) => {
  const t = translations[lang].menuSection;
  const curr = t.currency;

  const [viewMode, setViewMode] = useState<'both' | 'photos' | 'text'>('both');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterVegetarian, setFilterVegetarian] = useState(false);

  const categories: Array<{ id: CategoryId; label: string; icon: string }> = [
    { id: 'all', label: t.categories.all, icon: '✨' },
    { id: 'sweet_classic', label: t.categories.sweet_classic, icon: '🥞' },
    { id: 'sweet_premium', label: t.categories.sweet_premium, icon: '👑' },
    { id: 'savory', label: t.categories.savory, icon: '🧀' },
    { id: 'special', label: t.categories.special, icon: '🍳' },
    { id: 'salads', label: t.categories.salads, icon: '🥗' },
    { id: 'sandwiches', label: t.categories.sandwiches, icon: '🥪' },
    { id: 'drinks', label: t.categories.drinks, icon: '☕' },
  ];

  const filteredItems = useMemo(() => {
    const categoryIds: CategoryId[] = [
      'sweet_classic',
      'sweet_premium',
      'savory',
      'special',
      'salads',
      'sandwiches',
      'drinks',
    ];

    // Helper to filter an array of items with current active query & checkboxes
    const filterFn = (item: MenuItem) => {
      if (filterPopular && !item.popular) return false;
      if (filterVegetarian && !item.isVegetarian) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(q);
        const descMatch = item.description[lang].toLowerCase().includes(q);
        const ingMatch = item.ingredients?.[lang].some((ing) =>
          ing.toLowerCase().includes(q)
        );
        if (!nameMatch && !descMatch && !ingMatch) return false;
      }
      return true;
    };

    if (activeCategory !== 'all') {
      const catItems = menuItems.filter((i) => i.category === activeCategory && filterFn(i));
      return catItems.slice(0, 3);
    }

    // When 'all' categories is selected: take max 3 products per category
    const result: MenuItem[] = [];
    for (const cat of categoryIds) {
      const catItems = menuItems.filter((i) => i.category === cat && filterFn(i));
      result.push(...catItems.slice(0, 3));
    }
    return result;
  }, [activeCategory, filterPopular, filterVegetarian, searchQuery, lang]);

  // Group items by category for the text menu board
  const textMenuCategories: Array<{ id: CategoryId; title: string; icon: string; items: MenuItem[] }> = useMemo(() => {
    return [
      {
        id: 'sweet_classic',
        title: t.categories.sweet_classic,
        icon: '🥞',
        items: menuItems.filter((i) => i.category === 'sweet_classic'),
      },
      {
        id: 'sweet_premium',
        title: t.categories.sweet_premium,
        icon: '👑',
        items: menuItems.filter((i) => i.category === 'sweet_premium'),
      },
      {
        id: 'savory',
        title: t.categories.savory,
        icon: '🧀',
        items: menuItems.filter((i) => i.category === 'savory'),
      },
      {
        id: 'special',
        title: t.categories.special,
        icon: '🍳',
        items: menuItems.filter((i) => i.category === 'special'),
      },
      {
        id: 'salads',
        title: t.categories.salads,
        icon: '🥗',
        items: menuItems.filter((i) => i.category === 'salads'),
      },
      {
        id: 'sandwiches',
        title: t.categories.sandwiches,
        icon: '🥪',
        items: menuItems.filter((i) => i.category === 'sandwiches'),
      },
      {
        id: 'drinks',
        title: t.categories.drinks,
        icon: '☕',
        items: menuItems.filter((i) => i.category === 'drinks'),
      },
    ];
  }, [t.categories]);

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#5E3023]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5D3C0]/50 text-[#5E3023] text-xs font-bold uppercase tracking-[0.2em] border border-[#E5D3C0]">
            <Utensils className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Fresh · Tasty · Creperie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5E3023] tracking-tight">
            {t.title}
          </h2>
          <p className="serif italic text-[#D4A373] text-base sm:text-lg">
            {t.subtitle}
          </p>

          {/* View Mode Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setViewMode('both')}
              className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                viewMode === 'both'
                  ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-md'
                  : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{lang === 'sq' ? 'Të Dyja Pamjet' : 'Show Both Views'}</span>
            </button>

            <button
              onClick={() => setViewMode('photos')}
              className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                viewMode === 'photos'
                  ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-md'
                  : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
              }`}
            >
              <span>🖼️</span>
              <span>{t.viewModePhotos}</span>
            </button>

            <button
              onClick={() => setViewMode('text')}
              className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                viewMode === 'text'
                  ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-md'
                  : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.viewModeText}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: DISA NGA PRODUKTET KRYESORE (ME FOTO & PERSHKRIM) */}
        {/* ======================================================== */}
        {(viewMode === 'photos' || viewMode === 'both') && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#5E3023]/15">
              <h3 className="serif text-2xl sm:text-3xl font-bold text-[#5E3023] flex items-center gap-2">
                <span>🖼️</span>
                <span>{t.viewModePhotos}</span>
              </h3>
            </div>

            {/* Search Bar & Filters */}
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4A373]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-[#E5D3C0] shadow-xs text-[#5E3023] placeholder-[#5E3023]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-[#D4A373] text-sm sm:text-base font-medium transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-[#5E3023] bg-[#E5D3C0]/50 hover:bg-[#E5D3C0] px-2.5 py-1 rounded-md"
                  >
                    {lang === 'sq' ? 'Pastro' : 'Clear'}
                  </button>
                )}
              </div>

              {/* Quick Dietary Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setFilterPopular(!filterPopular)}
                  className={`px-4 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    filterPopular
                      ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-xs'
                      : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${filterPopular ? 'fill-white' : 'text-[#D4A373]'}`} />
                  <span>{t.popular}</span>
                </button>

                <button
                  onClick={() => setFilterVegetarian(!filterVegetarian)}
                  className={`px-4 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    filterVegetarian
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
                  }`}
                >
                  🌱 <span>{t.vegetarian}</span>
                </button>
              </div>
            </div>

            {/* Category Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar max-w-full justify-start sm:justify-center">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? 'bg-[#5E3023] text-white shadow-md'
                        : 'bg-white hover:bg-[#E5D3C0]/40 text-[#5E3023] border border-[#E5D3C0]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Menu Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E5D3C0] p-8 shadow-xs">
                <Utensils className="w-12 h-12 text-[#D4A373] mx-auto mb-3" />
                <p className="text-[#5E3023] font-serif text-lg italic">{t.noResults}</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                    setFilterPopular(false);
                    setFilterVegetarian(false);
                  }}
                  className="mt-4 px-5 py-2.5 rounded-lg bg-[#5E3023] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#D4A373] transition-colors"
                >
                  {lang === 'sq' ? 'Kthehu te të gjitha' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5D3C0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#E5D3C0]/30 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5E3023]/60 via-transparent to-transparent opacity-60" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.popular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#5E3023] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            ★ {t.popular}
                          </span>
                        )}
                        {item.isChefSpecial && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4A373] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            ✨ {t.chefSpecial}
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            🌱 {t.vegetarian}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-xl font-bold text-[#5E3023] group-hover:text-[#D4A373] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#5E3023]/75 italic line-clamp-2 leading-relaxed">
                          {item.description[lang]}
                        </p>
                      </div>

                      {/* Ingredients Preview */}
                      {item.ingredients && item.ingredients[lang].length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.ingredients[lang].slice(0, 4).map((ing, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#E5D3C0]/40 text-[#5E3023] font-medium border border-[#E5D3C0]"
                            >
                              {ing}
                            </span>
                          ))}
                          {item.ingredients[lang].length > 4 && (
                            <span className="text-[10px] text-[#D4A373] font-bold self-center">
                              +{item.ingredients[lang].length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-3 border-t border-[#5E3023]/10 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="w-full py-2.5 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                        >
                          <span>{lang === 'sq' ? 'Shiko Përbërësit' : 'View Ingredients'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: MENUJA E PLOTË ME SHKRIM (TEXT MENU BOARD)     */}
        {/* ======================================================== */}
        {(viewMode === 'text' || viewMode === 'both') && (
          <div className="mt-8 bg-white/90 border border-[#E5D3C0] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            {/* Background Decorative Crest */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#D4A373]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Menu Board Header */}
            <div className="text-center pb-8 border-b border-[#5E3023]/15 mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-[#5E3023] text-white text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                Creperie Menu Board
              </div>
              <h3 className="serif text-3xl sm:text-4xl font-bold text-[#5E3023]">
                {t.textMenuHeading}
              </h3>
              <p className="serif italic text-[#D4A373] text-sm sm:text-base mt-1">
                {t.textMenuSubheading}
              </p>
            </div>

            {/* 2-Column Grid for Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {textMenuCategories.map((catGroup) => (
                <div
                  key={catGroup.id}
                  className="bg-[#FAF7F2]/80 border border-[#E5D3C0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#D4A373]/40">
                      <h4 className="serif text-xl sm:text-2xl font-bold text-[#5E3023] flex items-center gap-2">
                        <span>{catGroup.icon}</span>
                        <span>{catGroup.title}</span>
                      </h4>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] bg-[#5E3023]/10 px-2.5 py-1 rounded-md">
                        {catGroup.items.length} {lang === 'sq' ? 'Lloje' : 'Items'}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {catGroup.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectItem(item)}
                          className="group flex items-baseline justify-between gap-2 p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#E5D3C0] transition-all cursor-pointer"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif font-bold text-sm sm:text-base text-[#5E3023] group-hover:text-[#D4A373] transition-colors">
                                {item.name}
                              </span>
                              {item.popular && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#5E3023] px-1.5 py-0.2 rounded">
                                  ★ Popular
                                </span>
                              )}
                              {item.isChefSpecial && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#D4A373] px-1.5 py-0.2 rounded">
                                  Special
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] sm:text-xs text-[#5E3023]/70 font-medium line-clamp-1 mt-0.5">
                              {item.description[lang]}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="font-serif font-bold text-sm sm:text-base text-[#5E3023] bg-[#E5D3C0]/30 px-2.5 py-1 rounded-lg border border-[#E5D3C0]">
                              {item.price} {curr}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-8 text-center text-xs text-[#5E3023]/60 italic font-serif border-t border-[#5E3023]/15 pt-4">
              {lang === 'sq'
                ? '* Klikoni mbi çdo produkt me shkrim për të parë përbërësit e detajuar dhe fotot.'
                : '* Click on any item in the written list to view detailed ingredients and photos.'}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


