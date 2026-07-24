import React, { useState } from 'react';
import { Star, MessageSquare, Send, Check, User, X } from 'lucide-react';
import { Language, Review } from '../types';
import { initialReviews } from '../data/menuData';
import { translations } from '../data/translations';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang].reviewsSection;

  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form states
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tagsList = ['welcome', 'smile', 'clean', 'delicious', 'crepes'];

  const filteredReviews = filterTag
    ? reviewsList.filter((r) => r.tags?.includes(filterTag))
    : reviewsList;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !commentText) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: authorName,
      reviewCount: '1 review',
      rating,
      date: {
        sq: 'Sot',
        en: 'Just now',
      },
      comment: {
        sq: commentText,
        en: commentText,
      },
      tags: ['delicious', 'welcome'],
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setAuthorName('');
      setCommentText('');
      setRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-[#E5D3C0]/20 text-[#5E3023] border-t border-sep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5D3C0]/50 text-[#5E3023] text-xs font-bold uppercase tracking-[0.2em] border border-[#E5D3C0]">
            <Star className="w-3.5 h-3.5 text-[#D4A373] fill-[#D4A373]" />
            <span>4.4 ★ Google Rating</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5E3023] tracking-tight">
            {t.title}
          </h2>
          <p className="serif italic text-[#D4A373] text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Rating Breakdown & Tags Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5D3C0] shadow-xs mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#5E3023]/10">
            {/* Rating Number */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#5E3023]">
                4.4
              </span>
              <div>
                <div className="flex items-center gap-1 text-[#D4A373]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? 'fill-[#D4A373] text-[#D4A373]' : 'fill-[#E5D3C0] text-[#E5D3C0]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#5E3023]/70 mt-1">
                  {lang === 'sq' ? 'Bazuar në 30 vlerësime reale në Google Maps' : 'Based on 30 authentic Google Maps reviews'}
                </p>
              </div>
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-3.5 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#D4A373]" />
              <span>{t.writeReviewBtn}</span>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="text-[#5E3023]/70 mr-1">{t.popularTags}</span>
            <button
              onClick={() => setFilterTag(null)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filterTag === null
                  ? 'bg-[#5E3023] text-white border-[#5E3023]'
                  : 'bg-[#FAF7F2] text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
              }`}
            >
              {lang === 'sq' ? 'Të gjitha (30)' : 'All (30)'}
            </button>

            {tagsList.map((tag) => {
              const isSelected = filterTag === tag;
              const label = t.tags[tag as keyof typeof t.tags] || tag;
              return (
                <button
                  key={tag}
                  onClick={() => setFilterTag(isSelected ? null : tag)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[#5E3023] text-white border-[#5E3023]'
                      : 'bg-[#FAF7F2] text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373]'
                  }`}
                >
                  #{label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#E5D3C0] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#E5D3C0]/40 text-[#5E3023] font-bold flex items-center justify-center shrink-0 border border-[#E5D3C0]">
                    <User className="w-5 h-5 text-[#D4A373]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5E3023] text-sm flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.role && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E5D3C0]/40 text-[#5E3023] font-medium">
                          {rev.role}
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-[#5E3023]/60 block">
                      {rev.reviewCount} · {rev.date[lang]}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-[#D4A373]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="serif italic text-[#5E3023]/85 text-sm leading-relaxed">
                  &ldquo;{rev.comment[lang]}&rdquo;
                </p>
              </div>

              {/* Footer Tags */}
              {rev.tags && (
                <div className="flex flex-wrap gap-1 pt-3 border-t border-[#5E3023]/10">
                  {rev.tags.map((tg, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#E5D3C0]/30 text-[#5E3023] font-semibold border border-[#E5D3C0]"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl p-6 shadow-2xl border border-[#E5D3C0] space-y-5">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#E5D3C0]/50 hover:bg-[#E5D3C0] text-[#5E3023] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#5E3023]">
              {t.reviewModal.title}
            </h3>

            {submitted ? (
              <div className="py-8 text-center space-y-2 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-bold text-[#5E3023] text-lg">
                  {lang === 'sq' ? 'Faleminderit për vlerësimin!' : 'Thank you for your review!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.reviewModal.author}
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dajana"
                    className="w-full p-3 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.reviewModal.rating}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-[#D4A373] text-[#D4A373]'
                              : 'fill-[#E5D3C0] text-[#E5D3C0]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.reviewModal.comment}
                  </label>
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t.reviewModal.commentPlaceholder}
                    className="w-full p-3 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D4A373]" />
                  <span>{t.reviewModal.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

