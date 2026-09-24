'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { offices } from '@/data/navigation';
import { practices } from '@/data/practices';
import Glass from '@/components/ui/Glass';
import { CONTACT_MESSAGE_MAX_LENGTH, CONTACT_MESSAGE_MIN_LENGTH } from '@/lib/contact';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    practice: practices[0].title,
    message: '',
    agreePrivacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.agreePrivacy) {
      alert('Vui lòng đồng ý với Chính sách bảo mật trước khi gửi thông tin.');
      return;
    }
    if (formData.message.trim().length < CONTACT_MESSAGE_MIN_LENGTH) {
      setSubmitError('Vui lòng mô tả yêu cầu tư vấn bằng ít nhất 20 ký tự.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSubmitError(payload.error || 'Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.');
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Không thể kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl pb-12 sm:pb-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            LIÊN HỆ VÀ ĐẶT LỊCH HẸN
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-normal tracking-tight mb-4">
            Khởi đầu cuộc trao đổi chiến lược.
          </h1>
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-light">
            Chúng tôi cam kết bảo mật toàn bộ thông tin trao đổi ban đầu và phản hồi trong vòng 24 giờ làm việc.
          </p>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Minimal Form (Col-span 7) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-brand flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-stone-900">
                    Cảm ơn quý khách đã gửi thông tin!
                  </h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                    Yêu cầu tư vấn của quý khách đã được chuyển trực tiếp tới Ban Pháp chế Phan Anh Law. Chúng tôi sẽ liên hệ lại qua email hoặc số điện thoại trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phone: '',
                        practice: practices[0].title,
                        message: '',
                        agreePrivacy: false,
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-stone-100 text-stone-800 text-xs font-medium hover:bg-stone-200 transition-colors"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Họ và tên */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={120}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors"
                      />
                    </div>

                    {/* Công ty */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Tên công ty / Tổ chức *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={160}
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Công ty TNHH..."
                        className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Email doanh nghiệp *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={180}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="example@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Số điện thoại liên hệ *
                      </label>
                      <input
                        type="tel"
                        required
                        minLength={7}
                        maxLength={40}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+84 9xx xxx xxx"
                        className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors"
                      />
                    </div>
                  </div>

                  {/* Lĩnh vực tư vấn Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Lĩnh vực cần tư vấn *
                    </label>
                    <select
                      value={formData.practice}
                      onChange={(e) =>
                        setFormData({ ...formData, practice: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors cursor-pointer"
                    >
                      {practices.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.number}. {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nội dung cần tư vấn */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Tóm tắt bối cảnh và yêu cầu pháp lý *
                    </label>
                    <textarea
                      rows={5}
                      required
                      minLength={20}
                      maxLength={CONTACT_MESSAGE_MAX_LENGTH}
                      aria-describedby="message-guidance"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        setSubmitError('');
                      }}
                      placeholder="Mô tả ngắn gọn về tình trạng hiện tại của doanh nghiệp, mục tiêu dự kiến và các mốc thời gian quan trọng..."
                      className="w-full px-4 py-3 rounded-xl bg-paper-subtle border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-brand transition-colors leading-relaxed"
                    />
                    <p id="message-guidance" className="text-xs text-stone-500">Ít nhất 20 ký tự, tối đa 20.000 ký tự.</p>
                  </div>

                  {/* Checkbox Bảo mật */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      checked={formData.agreePrivacy}
                      onChange={(e) =>
                        setFormData({ ...formData, agreePrivacy: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-brand focus:ring-emerald-brand cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-xs text-stone-600 cursor-pointer">
                      Tôi đồng ý với{' '}
                      <span className="text-stone-900 font-semibold underline">
                        Chính sách bảo mật
                      </span>{' '}
                      và cho phép Phan Anh Law sử dụng thông tin này để liên hệ tư vấn. Mọi thông tin cung cấp được bảo mật theo thỏa thuận luật sư - thân chủ.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#153E35] text-white text-sm font-semibold hover:bg-[#0E2923] transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Đang gửi yêu cầu…' : 'Gửi yêu cầu tư vấn chính thức'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Office Information (Col-span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-500">
              HỆ THỐNG VĂN PHÒNG
            </div>

            <div className="space-y-6">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <h3 className="font-serif text-2xl text-[#111111]">
                      Văn phòng {office.city}
                    </h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-brand" />
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-emerald-brand shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-emerald-brand shrink-0" />
                      <span className="font-mono text-stone-900">{office.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-brand shrink-0" />
                      <span>{office.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-emerald-brand shrink-0" />
                      <span>{office.workingHours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Confidentiality Box */}
            <div className="p-6 rounded-2xl bg-[#ECEAE4] border border-stone-300/80 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2 font-semibold text-stone-900 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-brand" />
                <span>Cam kết bảo mật thông tin</span>
              </div>
              <p className="leading-relaxed">
                Các trao đổi ban đầu giữa khách hàng và Phan Anh Law được quản lý theo quy định bảo mật bí mật nghề nghiệp của Liên đoàn Luật sư Việt Nam. Chúng tôi sẵn sàng ký thỏa thuận bảo mật thông tin (NDA) trước bất kỳ phiên làm việc chi tiết nào.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
