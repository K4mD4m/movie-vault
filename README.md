# Movie Vault 🎬

**Movie Vault** to aplikacja webowa do przeglądania filmów, której celem jest umożliwienie użytkownikowi odkrywania różnych filmów na podstawie ich gatunków oraz wyszukiwania filmów po tytule. Aplikacja korzysta z API The Movie Database (TMDb) do pobierania szczegółów filmów oraz umożliwia przeglądanie filmów na szczegółowych stronach z opisami filmów.

## Cel projektu

Celem tego projektu było stworzenie interaktywnej aplikacji webowej, która umożliwia użytkownikowi łatwe odkrywanie filmów w różnych gatunkach, wyszukiwanie ich po tytule oraz przeglądanie szczegółowych informacji o filmach.

## Funkcje aplikacji

- **Wyszukiwanie filmów**: Użytkownicy mogą wyszukiwać filmy po tytule, a aplikacja wyświetli wyniki w postaci kart z filmami.
- **Gatunki filmowe**: Filmy są podzielone na różne gatunki, takie jak akcja, komedia, dramat, horror itp., a użytkownicy mogą przeglądać filmy w ramach tych kategorii.
- **Szczegóły filmu**: Klikając na film, użytkownicy mogą przejść do strony ze szczegółowymi informacjami, takimi jak tytuł, opis, ocena, data premiery i gatunki filmu.
- **Dostosowany interfejs użytkownika**: Aplikacja używa **React**, **TailwindCSS**, **React Slick** oraz **Material UI** do implementacji interaktywnych karuzeli, komponentów UI i stylizacji.

## Technologie

- **React**: Biblioteka do budowania interfejsów użytkownika.
- **Vite**: Narzędzie do szybkiego bundlowania aplikacji.
- **TailwindCSS**: Narzędzie do szybkiego tworzenia interfejsów za pomocą klas CSS.
- **Material UI**: Biblioteka komponentów UI do szybkiego budowania responsywnych i nowoczesnych interfejsów użytkownika.
- **React Router**: Do zarządzania nawigacją w aplikacji.
- **Slick Carousel**: Do implementacji karuzel z filmami.
- **The Movie Database (TMDb) API**: API do pobierania danych o filmach.

## Plany na przyszłość / Rozszerzenia

- Dodanie funkcji oceniania filmów przez użytkowników.
- Integracja z systemem logowania użytkowników.
- Możliwość dodawania filmów do listy ulubionych.
- Rozbudowa aplikacji o więcej funkcji związanych z interakcją użytkownika, takich jak komentarze czy oceny.

## Testowanie

Aplikacja nie zawiera jeszcze pełnego zestawu testów jednostkowych ani end-to-end. W przyszłości planuję dodać testy za pomocą **Jest** oraz **React Testing Library**, aby zapewnić wysoką jakość kodu i stabilność aplikacji.

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/yourusername/movie-vault.git
   ```

2. Zainstaluj zależności:

   ```bash
   cd movie-vault
   npm install
   ```

3. Uruchom aplikację lokalnie:

   ```bash
   npm run dev
   ```

4. Aplikacja powinna być dostępna pod adresem: http://localhost:5173/

## Plik `.env.local`

Aby aplikacja mogła komunikować się z API **The Movie Database (TMDb)**, potrzebujesz klucza API. Należy go umieścić w pliku `.env.local` w głównym katalogu projektu.

### Krok 1: Zdobądź klucz API

1. Zarejestruj się lub zaloguj na stronie [The Movie Database](https://www.themoviedb.org/).
2. Przejdź do swojego profilu i otwórz sekcję [API](https://www.themoviedb.org/settings/api).
3. Utwórz nowy klucz API.

### Krok 2: Skonfiguruj plik `.env.local`

W katalogu głównym projektu stwórz plik o nazwie `.env.local` i dodaj w nim następującą zmienną:
VITE_TMDB_API_KEY=your_api_key_here

Zastąp `your_api_key_here` swoim kluczem API, który uzyskałeś z TMDb.

### Krok 3: Uruchom aplikację

Po zapisaniu pliku `.env.local` możesz uruchomić aplikację lokalnie, a aplikacja będzie mogła komunikować się z API i pobierać dane o filmach.

## Autor

Projekt został stworzony przez **Damiana Kamyszka** jako część procesu rekrutacyjnego na stanowisko **Junior Front-End Developera.**.
