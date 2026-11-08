# Adding another game to Hearin's Brew

1. In GitHub, open `game-page-template.html`, copy its contents into a **new file** named for your game, e.g. `my-new-game.html`. Do not edit the template itself if you want to reuse it later.
2. Replace every `[placeholder]` with your own game title, description, features, and development notes.
3. Put screenshots and artwork in `assets/your-game/` (or use the public art repository's raw image URLs), then insert `<img>` tags into the sketches section. Always write meaningful alt text.
4. Add a link to the new page in the `nautlins-other-games` list near the top of `the-nautlins.html`, following the existing Easter Hunt entry. Add it to other game pages too if you want consistent navigation.
5. If you want the game featured on the homepage, add a new `work-card` to the selected-work grid in `index.html`.
6. Commit and preview the page before sharing.

**Template visibility:** `game-page-template.html` is deliberately not linked in the site's navigation and has a `noindex` meta tag. It is **not private**: anyone who knows or guesses the URL can open it on GitHub Pages. To keep drafts truly private, store them in a private repository instead.
