
import React, { useState } from 'react';
import { Language } from '../types';

interface LoginProps {
  lang: Language;
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ lang, onLoginSuccess, onCancel }) => {
  const isEn = lang === Language.EN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated credentials: jayedmd112233@gmail.com / Abcd1234@
    if (email === 'jayedmd112233@gmail.com' && password === 'Abcd1234@') {
      onLoginSuccess();
    } else {
      setError(isEn ? 'Invalid credentials. Please check your email and password.' : 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <i className="fas fa-lock text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isEn ? 'Admin Login' : 'دخول المشرف'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isEn ? 'Please enter your credentials' : 'يرجى إدخال بيانات الاعتماد الخاصة بك'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 animate-shake">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">
              {isEn ? 'Email Address' : 'البريد الإلكتروني'}
            </label>
            <input 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" 
              placeholder="admin@xtremeplay.sa"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">
              {isEn ? 'Password' : 'كلمة المرور'}
            </label>
            <input 
              required 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" 
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4 flex flex-col space-y-4">
            <button 
              type="submit" 
              className="w-full py-5 bg-red-600 text-white rounded-2xl text-xl font-black shadow-xl hover:bg-red-700 transition-all active:scale-95"
            >
              {isEn ? 'SIGN IN' : 'تسجيل الدخول'}
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
      </div>
    </div>
  );
};

export default Login;
