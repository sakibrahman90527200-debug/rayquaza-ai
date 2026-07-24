function Header() {
    return (
        <header className="header">

            <div className="header-top">

                <div className="header-left">

                    <div className="logo">🐉</div>

                    <div className="title-area">
                        <h1>Rayquaza AI</h1>
                        <p>The Legendary Sky Guardian</p>
                    </div>

                </div>

                <div className="status">

                    <span className="online-dot"></span>

                    <span>Online</span>

                </div>

            </div>

     <div className="header-bottom">
    <p className="powered">
        Powered by <span className="team-name">Team Arceus</span>
    </p>
</div>

        </header>
    );
}

export default Header;