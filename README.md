# Shore Book · Hong Kong to Singapore

Offline shore-day guide for The Ritz-Carlton Yacht Collection voyage 13271228 aboard Luminara,
28 December 2027 – 11 January 2028. It is a copy of Shore Book · Adriatic with new port data.

| Day | Date | Port | Times |
|---|---|---|---|
| 1 | Tue 28 Dec | Hong Kong | sails 18:00 |
| 3–4 | 30–31 Dec | Halong Bay | 08:00, overnight, sails 20:00 |
| 7 | Mon 3 Jan | Ho Chi Minh City | 09:00–21:00 |
| 9 | Wed 5 Jan | Koh Kood | 09:00–17:00 |
| 10 | Thu 6 Jan | Koh Samui | 08:00–17:00 |
| 11–12 | 7–8 Jan | Bangkok (Laem Chabang) | 09:00, overnight, sails 18:00 |
| 15 | Tue 11 Jan | Singapore | arrives 07:00, disembark |

All-aboard times in the book are the published departure minus 30 minutes. Every clock can be
edited on the phone, and an edit is dropped automatically if the printed time in `index.html` changes later.

## How it differs from the Adriatic book

- Port fields that the Adriatic book does not have:
  - `back`: minutes needed to get from town back to the yacht, such as Phú Mỹ or Laem Chabang. The walk projection keeps this time in reserve.
  - `by`: sets how a leg is travelled, for example "by boat" or "by car".
  - `townKm`: the radius of the drawn chart for each port.
  - `tideLabel` and `aboardLabel`: rename the countdown, for example on embarkation and disembarkation days.
- Storage keys use `sbhk.` and cache names use `shore-book-hksg-`. That lets this book share a
  GitHub Pages origin with the other Shore Books without the two overwriting each other.

## Before it travels

The content was written without web access, so it has not been checked against live sources.
Before the trip, check the following:

- Opening hours and prices.
- Every pin, most importantly on Koh Kood, Koh Samui and in Halong Bay, where pins mark a village or a beach rather than a building.
- Terminal names (Ocean Terminal or Kai Tak, Phú Mỹ, Marina Bay Cruise Centre) against the yacht's daily programme.

Bump `CACHE` in `sw.js` whenever `index.html` changes.
