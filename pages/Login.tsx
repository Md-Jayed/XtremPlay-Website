
import React, { useState } from 'react';
import { Language } from '../types.ts';
import { supabase } from '../lib/supabase.ts';

interface LoginProps {
  lang: Language;
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ lang, onLoginSuccess, onCancel }) => {
  const isEn = lang === Language.EN;
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      console.log(`Attempting login for: ${cleanEmail}`);

      // Attempt to find the user by email first to provide better debug info
      const { data, error: queryError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (queryError) {
        console.error('Database Query Error:', queryError);
        throw new Error(queryError.message);
      }

      if (!data) {
        console.warn('Login Fail: Email not found in admins table.');
        setError(isEn ? 'Invalid email address.' : 'البريد الإلكتروني غير صحيح.');
      } else if (data.password !== cleanPassword) {
        console.warn('Login Fail: Password mismatch.');
        setError(isEn ? 'Incorrect password.' : 'كلمة المرور غير صحيحة.');
      } else {
        console.log('Login Success!');
        onLoginSuccess();
      }
    } catch (err: any) {
      console.error('Login Exception:', err);
      setError(isEn 
        ? `System Error: ${err.message || 'Check connection or Supabase keys'}` 
        : `خطأ في النظام: ${err.message || 'يرجى التحقق من الاتصال'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin,
      });

      if (resetError) throw resetError;

      setSuccess(isEn 
        ? 'A reset link has been sent to your email.' 
        : 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.');
    } catch (err: any) {
      setError(isEn 
        ? 'Failed to send reset link. Please check the email address.' 
        : 'فشل إرسال رابط إعادة التعيين. يرجى التحقق من البريد الإلكتروني.');
      console.error('Reset error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3" aria-hidden="true">
            <i className={`fas ${view === 'login' ? 'fa-lock' : 'fa-envelope-open-text'} text-3xl text-white`}></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {view === 'login' 
              ? (isEn ? 'Admin Login' : 'دخول المشرف')
              : (isEn ? 'Reset Password' : 'إعادة تعيين كلمة المرور')}
          </h2>
          <p className="text-slate-500 font-medium">
            {view === 'login' 
              ? (isEn ? 'Please enter your credentials' : 'يرجى إدخال بيانات الاعتماد الخاصة بك')
              : (isEn ? 'Enter your email to receive a link' : 'أدخل بريدك الإلكتروني لتلقي الرابط')}
          </p>
        </div>

        {view === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div 
                className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 animate-shake text-center whitespace-pre-line"
                role="alert"
              >
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-xs font-black uppercase text-slate-400 tracking-widest px-1 block">
                {isEn ? 'Email Address' : 'البريد الإلكتروني'}
              </label>
              <input 
                required 
                id="login-email"
                type="email" 
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" 
                placeholder="jayed@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="login-password" className="text-xs font-black uppercase text-slate-400 tracking-widest block">
                  {isEn ? 'Password' : 'كلمة المرور'}
                </label>
                <button 
                  type="button"
                  onClick={() => { setView('forgot'); setError(''); setSuccess(''); }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-widest"
                >
                  {isEn ? 'Forgot?' : 'نسيت؟'}
                </button>
              </div>
              <input 
                required 
                id="login-password"
                type="password" 
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" 
                placeholder="********"
              />
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-red-600 text-white rounded-2xl text-xl font-black shadow-xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                ) : (
                  isEn ? 'SIGN IN' : 'تسجيل الدخول'
                )}
              </button>
              <button 
                type="button" 
                onClick={onCancel}
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
              >
                {isEn ? 'Back to Home' : 'العودة للرئيسية'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 animate-shake text-center" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold border border-green-100 text-center" role="status">
                {success}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="reset-email" className="text-xs font-black uppercase text-slate-400 tracking-widest px-1 block">
                {isEn ? 'Email Address' : 'البريد الإلكتروني'}
              </label>
              <input 
                required 
                id="reset-email"
                type="email" 
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" 
                placeholder="jayed@gmail.com"
              />
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-red-600 text-white rounded-2xl text-xl font-black shadow-xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                ) : (
                  isEn ? 'SEND RESET LINK' : 'إرسال رابط التعيين'
                )}
              </button>
              <button 
                type="button" 
                onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
              >
                {isEn ? 'Back to Login' : 'العودة لتسجيل الدخول'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
