import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AgroVault Uncaught Component Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('kisan_active_tab');
      localStorage.removeItem('kisan_lang');
      localStorage.removeItem('kisan_custom_user');
      sessionStorage.clear();
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (e) {
      console.warn('Error clearing storage:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
              🌾
            </div>
            <h2 className="text-xl font-black text-white">AgroVault Platform Ready</h2>
            <p className="text-xs text-slate-300">
              An unexpected display issue occurred in a subcomponent. Click below to reset to the default clean state.
            </p>
            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-xl text-left text-[11px] font-mono text-rose-400 border border-slate-800 overflow-x-auto max-h-36">
                {this.state.error.message || this.state.error.toString()}
              </div>
            )}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-lg transition"
              >
                🔄 Reset Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
