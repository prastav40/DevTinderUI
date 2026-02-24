const Footer = () => {
    return (
        /* Updated with bg-slate-900/80 and backdrop-blur for consistency */
        <footer className="footer footer-center p-10 bg-slate-950/80 backdrop-blur-md text-slate-400 rounded-t-[3rem] border-t border-white/5 shadow-2xl mt-auto">
            {/* 1. Brand Section */}
            <aside>
                <div className="flex items-center gap-2 mb-3 group cursor-default">
                    <span className="text-3xl transition-transform group-hover:rotate-12">🔥</span>
                    <p className="font-black text-2xl tracking-tighter text-white">
                        Dev<span className="text-primary italic">Tinder</span>
                    </p>
                </div>
                <p className="max-w-xs opacity-60 italic text-sm leading-relaxed">
                    Connecting developers across the globe. <br />
                    Swipe right on your next coding partner.
                </p>
            </aside>

            {/* 2. Nav Links */}
            <nav className="grid grid-flow-col gap-6 text-sm uppercase tracking-widest font-bold">
                <a className="hover:text-primary transition-colors cursor-pointer">About</a>
                <a className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
                <a className="hover:text-primary transition-colors cursor-pointer text-primary">GitHub</a>
                <a className="hover:text-primary transition-colors cursor-pointer">Support</a>
            </nav>

            {/* 3. Social Icons */}
            <nav>
                <div className="grid grid-flow-col gap-6">
                    {/* Twitter/X */}
                    <a className="text-slate-500 hover:text-blue-400 transition-all hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    {/* LinkedIn */}
                    <a className="text-slate-500 hover:text-primary transition-all hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
            </nav>

            {/* 4. Copyright Area */}
            <aside className="border-t border-white/5 w-full pt-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
                    &copy; {new Date().getFullYear()} &bull; Built with React & Nodejs
                </p>
            </aside>
        </footer>
    );
};

export default Footer;