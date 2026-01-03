'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SearchBar } from '../SearchBar';

const titleMap: Record<string, string> = {
  '/meals': 'Meals',
  '/drinks': 'Drinks',
  '/favorite-recipes': 'Favorite Recipes',
  '/done-recipes': 'Done Recipes',
  '/profile': 'Profile',
};

export function Header() {
  const path = usePathname();
  const currentTitle = titleMap[path];
  const showSearchIcon = ['/meals', '/drinks'].includes(path);
  const [showSearchButton, setShowSearchButton] = useState(false);

  if (!currentTitle) return null;

  const handleSearchButton = () => {
    setShowSearchButton(!showSearchButton);
  };

  return (
    <header>
      <div className="flex h-13 bg-amber-400 justify-between items-center px-4">
        <Link href="/meals">
          <Image
            src="/icone-recipes-app.svg"
            alt="Logo do site"
            width={0}
            height={0}
            priority
            className="w-10 h-10"
          />
        </Link>
        <Image
          src="/name-recipes-app.svg"
          alt="Logo do site"
          width={0}
          height={0}
          priority
          className="w-27 h-auto"
        />
        <nav className="flex gap-4">
          {showSearchIcon && (
            <button onClick={handleSearchButton}>
              <Image
                src="/searchIcon.svg"
                alt="Botão de pesquisa"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </button>
          )}
          <Link href="/profile">
            <Image
              src="/profileIcon.svg"
              alt="Botão para perfil"
              width={24}
              height={24}
            />
          </Link>
        </nav>
      </div>

      {currentTitle && <h1>{currentTitle}</h1>}

      {showSearchButton && <SearchBar />}
    </header>
  );
}
