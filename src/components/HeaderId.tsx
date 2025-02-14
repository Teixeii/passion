import React from "react";

export function Header() {
    return (
        <header className="bg-transparent py-5 px-8 fixed top-0 w-full z-10">
            <div className="max-w-7xl mx-auto flex justify-start items-center">
                <h1 className="text-4xl font-extrabold text-yellow-400">
                    🎬 CinéFlix
                </h1>
            </div>
        </header>
    );
}
