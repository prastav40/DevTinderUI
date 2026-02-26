const Footer = () => {
    return (
        <footer className="footer footer-center p-12 bg-slate-950 text-slate-400 border-t border-white/5 mt-auto relative overflow-hidden">
            {/* Subtle Gradient Background for Depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-5xl w-full flex flex-col items-center gap-10">
                {/* 1. Brand Section */}
                <aside className="space-y-4">
                    <div className="flex items-center justify-center gap-3 group cursor-pointer">
                        <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">🔥</span>
                        <p className="font-bold text-3xl tracking-tight text-white">
                            Dev<span className="text-primary italic">Tinder</span>
                        </p>
                    </div>
                    <p className="max-w-sm opacity-50 text-sm leading-relaxed font-medium">
                        The premier community for developers to find their next collaboration. <br />
                        <span className="text-primary/80">Swipe. Code. Deploy.</span>
                    </p>
                </aside>

                {/* 2. Nav Links - Clean Horizontal List */}
                <nav>
                    <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.2em] font-black">
                        {["About", "Privacy", "GitHub", "Support"].map((link) => (
                            <a 
                                key={link} 
                                className="hover:text-white transition-all duration-300 relative group cursor-pointer"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                </nav>

                {/* 3. Social Icons - Minimalist Circle Style */}
                <nav className="flex gap-5">
                    {[
                        { name: 'Twitter', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                        { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
                    ].map((icon) => (
                        <a 
                            key={icon.name}
                            className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 hover:text-white transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                                <path d={icon.path} />
                            </svg>
                        </a>
                    ))}
                </nav>

                {/* 4. Copyright Area */}
                <aside className="border-t border-white/5 w-full pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-30">
                            &copy; {new Date().getFullYear()} &bull; Sydney, Australia
                        </p>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-30">
                            Handcrafted with ❤️ for Developers
                        </p>
                    </div>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;