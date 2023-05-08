# Szerveroldali webprogramozás - Node.js zárthelyi minta

Tartalom:

- [Szerveroldali webprogramozás - Node.js zárthelyi minta](#szerveroldali-webprogramozás---nodejs-zárthelyi-minta)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [I. rész: Sequelize (10 pont, min. 4 pont elérése szükséges!)](#i-rész-sequelize-10-pont-min-4-pont-elérése-szükséges)
      - [1. feladat: Modellek és kapcsolatok (5 pont)](#1-feladat-modellek-és-kapcsolatok-5-pont)
      - [2. feladat: Seeder (5 pont)](#2-feladat-seeder-5-pont)
    - [II. rész: REST API (20 pont, min. 8 pont elérése szükséges!)](#ii-rész-rest-api-20-pont-min-8-pont-elérése-szükséges)
      - [3. feladat: `GET /products` (1 pont)](#3-feladat-get-products-1-pont)
      - [4. feladat: `GET /products/:id` (1 pont)](#4-feladat-get-productsid-1-pont)
      - [5. feladat: `POST /products` (1,5 pont)](#5-feladat-post-products-15-pont)
      - [6. feladat: `PATCH /products/:id` (1,5 pont)](#6-feladat-patch-productsid-15-pont)
      - [7. feladat: `POST /login` (2 pont)](#7-feladat-post-login-2-pont)
      - [8. feladat: `GET /my-orders` (3 pont)](#8-feladat-get-my-orders-3-pont)
      - [9. feladat: `POST /my-orders` (5 pont)](#9-feladat-post-my-orders-5-pont)
      - [10. feladat: `POST /ship-orders` (5 pont)](#10-feladat-post-ship-orders-5-pont)
    - [III. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)](#iii-rész-graphql-20-pont-min-8-pont-elérése-szükséges)
      - [11. feladat: `Query.products` és `Query.orders` (2 pont)](#11-feladat-queryproducts-és-queryorders-2-pont)
      - [12. feladat: `Order.user` (1 pont)](#12-feladat-orderuser-1-pont)
      - [13. feladat: `Order.products` (1 pont)](#13-feladat-orderproducts-1-pont)
      - [14. feladat: `Mutation.createProduct` (3 pont)](#14-feladat-mutationcreateproduct-3-pont)
      - [15. feladat: `Query.priceBetween` (2 pont)](#15-feladat-querypricebetween-2-pont)
      - [16. feladat: `Order.totalPrice` (2 pont)](#16-feladat-ordertotalprice-2-pont)
      - [17. feladat: `Mutation.addProduct` (4 pont)](#17-feladat-mutationaddproduct-4-pont)
      - [18. feladat: `Query.statistics` (5 pont)](#18-feladat-querystatistics-5-pont)

## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **240 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban XX:YY-kor lezár, ezután nincs lehetőség beadásra!**
- A beadást és nyilatkozat kitöltését megkönnyítendő létrehoztunk egy parancsot a kezdőcsomagban, amely `npm run zip` hívásával futtatható. Igyekeztünk a legjobb tudásunk szerint elkészíteni csomagolót, de beadás előtt mindenképpen ellenőrizd a `zipfiles` mappában létrejött állomány tartalmát! **A helyes és hiánytalan feltöltés ellenőrzése a hallgató feladata, az ebből fakadó hibákért felelősséget nem vállalunk!**
- A `node_modules` könyvtár beadása **TILOS!**
- A megfelelően kitöltött `statement.txt` (nyilatkozat) nélküli megoldásokat **nem értékeljük**. Ha esetleg a nyilatkozat kimaradt vagy hibás, utólag Canvas hozzászólásban pótolható.
- A feladatok megoldásához **bármilyen segédanyag használható** (pl. dokumentáció, előadás, órai anyag, cheat sheet, stb.), viszont a **zárthelyi időtartamában emberi segítség** (pl. szinkron, aszinkron, chat, fórum, stb.) **és mesterséges intelligencia** (pl. ChatGPT, Bing AI, GitHub Copilot, Tabnine, stb.) igénybe vétele tilos! Ezek elfogadásáról nyilatkoztok az előző pontban említett nyilatkozatban, amelyben egyben tudomásul is veszitek az ELTE HKR szerinti következményeket.
- A feladatokat **Node.js** környezetben, **JavaScript** nyelven kell megoldani, a **tantárgy keretein belül tanult** technológiák használatával és a biztosított **kezdőcsomagból kiindulva**! 
</details>

## Hasznos hivatkozások

<details>
<summary>Hasznos hivatkozások megjelenítése</summary>

- Dokumentációk
  - [Sequelize dokumentáció](https://sequelize.org/master/)
  - [Model querying - basics](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
  - [Model querying - finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)
  - [Sequelize asszociációk](https://github.com/szerveroldali/leirasok/blob/main/SequelizeAsszociaciok.md) (tantárgyi leírás)
  - [GraphQL dokumentáció](https://graphql.org/learn/)
  - [GraphQL skalárok (kezdőcsomag tartalmazza)](https://www.graphql-scalars.dev/docs)
  - [Fastify dokumentáció](https://www.fastify.io/docs/latest/)
- Eszközök:
  - [SQLite Viewer (VS Code kiegészítő)](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)
  - [Firecamp (Chrome kiegészítő)](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
  - [Postman](https://www.postman.com/)

</details>

## Kezdőcsomag segédlet

<details>
<summary>Kezdőcsomag segédlet megjelenítése</summary>

A zárthelyihez kezdőcsomagot biztosítunk, amelynek használata **kötelező**. A csomagot GitHub-ról lehet letölteni, a függőségek telepítése után (`npm i`) kezdhető meg a fejlesztés.

- A kezdőcsomag elérhető ebben a GitHub repository-ban:
  - https://github.com/szerveroldali/zh_kezdocsomag
  - vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/zh_kezdocsomag/archive/refs/heads/main.zip) _(.zip fájl)_
- Hasznos parancsok:
  - `npm run db`˙- adatbázis migrációk futtatása (üres adatbázisból indulva) és seedelés
  - `npm run dev` - `server.js` futtatása watch módban (változtatásra a szerver újraindul)
  - `npm run zip` - zárthelyi becsomagolása
  - `npm run test` - automatikus tesztelő
- Az automatikus tesztelőről
  - **FONTOS! Nem az a feladat, hogy addig futtasd a tesztelőt, amíg minden át nem megy; hanem az, hogy a dolgozatot oldd meg a legjobb tudásod szerint! Ehhez a tesztelő csak egy segédlet, ami lehetőség szerint egy gyors visszajelzést ad a munkádról azáltal, hogy leteszteli a főbb eseteket, és ha azokon átmegy a megoldásod, akkor _valószínűleg_ jó.**
  - A tesztelő használata nem kötelező.
  - A tesztelő által adott eredmények csak tájékoztató jellegűek, melyektől a végleges értékelés pozitív és negatív irányba is eltérhet.
  - Használat módja:
    - `npm run test` - minden feladat tesztelése
    - pl. `npm run test 3 5` - csak a 3. és 5. feladat tesztelése
  - Természetesen a tesztelő csak akkor fog működni, ha a kezdőcsomag `test` könyvtárába elhelyezésre kerültek a zárthelyi idején közzétett fájlok!
  </details>

## Feladatok

Készíts _Node.js_ környezetben, _JavaScript_ nyelv használatával egy **REST API**-t és **GraphQL API**-t az alábbi pontoknak megfelelően! A tantárgy gyakorlati tematikájához illeszkedve adatbázisként _SQLite3_, ORM-ként _Sequelize_, kiszolgálóként pedig _Fastify_ keretrendszer használata kötelező. (A zárthelyihez kiadott [kezdőcsomagban](https://github.com/szerveroldali/restapi_kezdocsomag) ezen csomagok már inicializálva vannak.)

### I. rész: Sequelize (10 pont, min. 4 pont elérése szükséges!)

#### 1. feladat: Modellek és kapcsolatok (5 pont)

Hozd létre az alábbi modelleket Sequelize CLI használatával! Az `id`, `createdAt` és `updatedAt` mezők a alapértelmezetten létrejönnek, így ezeket a feladat bővebben nem fejti ki. Alapesetben egyik mező értéke sem lehet `null`, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migráció minden mezőjére
```js
allowNull: false
```
van érvényben, ahol a feladat ettől eltérően nem jelzi.

A következő modelleket kell kigenerálni/létrehozni: 

- `Product` - termék
  - `id`
  - `name` - string, a termék megnevezése
  - `description` - string, nullable, a termék rövid leírása
  - `price` - integer, a termék egységára forintban
  - `count` - integer, a termékből raktáron lévő darabszám
  - `createdAt`
  - `updatedAt`
- `User` - felhasználó
  - `id`
  - `email` - string, egyedi (unique)
  - `isWorker` - boolean, munkatárs esetén igaz, megrendelő esetén hamis
  - `createdAt`
  - `updatedAt`
- `Order` - megrendelés
  - `id`
  - `address` - string, kézbesítési cím
  - `UserId` - integer, hivatkozás a rendelést leadó felhasználó azonosítójára
  - `shipped` - boolean, teljesítésre került-e már a megrendelés?
  - `createdAt`
  - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- `User` 1 : N `Order`
- `Order` N : N `Product`

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk._

#### 2. feladat: Seeder (5 pont)

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal!

A megoldás akkor számít teljes értékűnek (tehát csak akkor jár a teljes pontszám), ha az alábbiak **mindegyike** teljesül:
1. a seeder mindegyik modellből generál észszerű számban
2. a generált modellek minden esetet lefednek (pl. egy nullable mező néhol ki van töltve adattal, néhol pedig `null` értékű; logikai mező változatosan igaz vagy hamis, stb.)
3. a kapcsolatok is megfelelően fel vannak töltve

A seedert az automatikus tesztelő nem tudja értékelni, minden esetben a gyakorlatvezető fogja kézzel pontozni.

### II. rész: REST API (20 pont, min. 8 pont elérése szükséges!)

#### 3. feladat: `GET /products` (1 pont)

Lekéri az összes létező terméket.

- Minta kérés: `GET http://localhost:4000/products`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Handcrafted Bronze Chips",
    "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    "price": 1990,
    "count": 42,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  {
    "id": 2,
    "name": "Recycled Fresh Shirt",
    "description": null,
    "price": 20431,
    "count": 5,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  stb.
]
```

#### 4. feladat: `GET /products/:id` (1 pont)

Lekéri a megadott azonosítójú termék adatait.

- Minta kérés: `GET http://localhost:4000/products/6`
- Válasz, ha az `id` paraméter hiányzik vagy nem egész szám: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik termék: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 6,
  "name": "Incredible Steel Gloves",
  "description": "The Football Is Good For Training And Recreational Purposes",
  "price": 9073,
  "count": 27,
  "createdAt": "2022-11-30T...",
  "updatedAt": "2022-11-30T..."
}
```

#### 5. feladat: `POST /products` (1,5 pont)

Létrehoz egy új terméket a kérés törzsében (body) megadott adatokkal. A törzsnek minden kötelezően kitöltendő mezőt tartalmaznia kell; viszont a `description` hiányozhat, amely esetben a visszaadott objektum ezen mezője `null` értéket kell tartalmazzon.

_(A valóságban nyilván hitelesített felhasználó hozna létre terméket, de a zárthelyi ezen feladatánál egyelőre nem szükséges ezzel foglalkozni, bárki meghívhatja a végpontot.)_

- Minta kérés: `POST http://localhost:4000/products`
```json
{
  "name": "A new product to create",
  "price": 9900,
  "count": 100
}
```
- Válasz, ha a kérés törzse (body) hiányos vagy hibás adatot tartalmaz: `400 BAD REQUEST`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": ...,
  "name": "A new product to create",
  "price": 9900,
  "count": 100,
  "description": null,
  "updatedAt": "2022-11-30T...",
  "createdAt": "2022-11-30T..."
}
```

#### 6. feladat: `PATCH /products/:id` (1,5 pont)

Az adott azonosítójú termék megadott mezőinek felülírása.

_(Hitelesítés ennél a feladatnál sem szükséges még.)_

- Minta kérés: `PATCH http://localhost:4000/products/13`
```json
{
  "price": 4200
}
```
- Válasz, ha a kérés bármelyik része (paraméter vagy törzs) hibás: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik termék: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 13,
  "name": "Incredible Steel Gloves",
  "description": "The Football Is Good For Training And Recreational Purposes",
  "price": 4200,
  "count": 57,
  "createdAt": "2022-11-30T...",
  "updatedAt": "2022-11-30T..."
}
```

#### 7. feladat: `POST /login` (2 pont)

**Hitelesítés.** Az egyszerűség kedvéért nincs jelszókezelés, csak egy létező felhasználó e-mail címét kell felküldeni a kérés törzsében (body). Ha a megadott e-mail címmel létezik fiók az adatbázisban, azt sikeres bejelentkezésnek vesszük és kiállítjuk a tokent. Ne felejtsd el a payload-ba a felhasználó adatait elhelyezni! 

_(Technikai részletek: A token aláírásához `HS256` algoritmust használj `secret` titkosító kulccsal! A kiadott kezdőcsomag alapbeállításon erre a működésre van konfigurálva, de ha szükségessé válna a [tokent ellenőrizni](https://jwt.io/), akkor hasznos ezekről tudni.)_

- Minta kérés: `POST http://localhost:4000/login`
```json
{
  "email": "gipsz.jakab@szerveroldali.hu"
}
```
- Válasz, ha a kérés hibás: `400 BAD REQUEST`
- Válasz, ha a megadott e-mail címmel nem létezik felhasználó: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "token": "ey..."
}
```

#### 8. feladat: `GET /my-orders` (3 pont)

**Hitelesített végpont!** Lekéri az összes olyan megrendelést, amely a hitelesített felhasználóhoz tartozik.

Emlékeztető! A hitelesített végpontokra a következő fejléccel kell kérést küldeni:
```
Authorization: Bearer <token>
```

- Minta kérés: `GET http://localhost:4000/my-orders`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "address": "521 Fisher Bypass Suite 169",
    "UserId": 4,
    "shipped": true,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  {
    "id": 5,
    "address": "62606 Ferry Ville Suite 221",
    "UserId": 4,
    "shipped": false,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  stb.
]
```

#### 9. feladat: `POST /my-orders` (5 pont)

**Hitelesített végpont!** Új megrendelést hoz létre a hitelesített felhasználó részére. Az adatok között meg kell adni a szállítási címet, illetve a rendeléshez tartozó termékek azonosítóit. Az újonnan felvett rendelés `shipped` tulajdonságra értelemszerűen hamis.

Az egyszerűség kedvéért minden terméket legfeljebb egyszer tartalmaz a rendelés, és nem kell azzal foglalkozni, hogy van-e a termékből raktáron.

Minden termékazonosító az alábbi két esetből pontosan egybe tartozik:
- `invalidProducts`: a megadott azonosítóval nem létezik termék
- `orderedProducts`: a termék létezik és hozzáadásra került a megrendeléshez 

A válaszobjektumban az egyes termékek azonosítóját a fenti két tömb egyikében vissza kell adni attól függően, hogy melyik eset lépett fel; illetve mellékelni kell a létrehozott megrendelés alapvető mezőit is (lásd mintaválasz).

- Minta kérés: `POST http://localhost:4000/my-orders`
```json
{
  "address": "1223 Nagytétényi út 162-164.",
  "products": [2, "kiskacsa", -3, 4]
}
```
- Válasz formailag helytelen kérés esetén: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": 26,
  "shipped": false,
  "address": "1223 Nagytétényi út 162-164.",
  "UserId": 4,
  "updatedAt": "2022-11-30T...",
  "createdAt": "2022-11-30T...",
  "invalidProducts": ["kiskacsa", -3],
  "orderedProducts": [2, 4]
}
```

#### 10. feladat: `POST /ship-orders` (5 pont)

**Hitelesített végpont!** Segítségével egy hitelesített **dolgozó** (`isWorker` mező igaz) tudja akár egyszerre több megrendelés `shipped` mezőjét hamisról igazra állítani a rendelések azonosítói alapján.

Minden megrendelés-azonosító az alábbi három esetből pontosan egybe tartozik:
- `invalidOrder`: a megadott azonosítóval nem létezik megrendelés
- `alreadyShipped`: a megrendelés már kiszállításra került (`shipped` mező eleve igaz volt)
- `justShipped`: a megrendelés `shipped` mezője most került átállításra hamisról igazra

A válaszobjektumban az egyes rendelések azonosítóját a fenti három tömb egyikében vissza kell adni attól függően, hogy melyik eset lépett fel.

- Minta kérés: `POST http://localhost:4000/ship-orders`
```json
{
  "orders": [2222, 1, 2, 3, "asd", -4, 5]
}
```
- Válasz hibás kérés esetén: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a felhasználó hitelesített, de nem dolgozó: `403 FORBIDDEN`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "invalidOrder": [2222, "asd", -4],
  "alreadyShipped": [1, 3],
  "justShipped": [2, 5]
}
```

### III. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)

#### 11. feladat: `Query.products` és `Query.orders` (2 pont)

Minden termék és rendelés adatmezőinek lekérése.

Kérés:
```graphql
query {
  products {
    id
    name
    description
    price
    count
    createdAt
    updatedAt
	}
  orders {
    id
    name
    description
    price
    count
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "products": [
      {
        "id": "1",
        "name": "Fantastic Fresh Car",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "price": 61564,
        "count": 87,
        "createdAt": "2022-11-30T...",
        "updatedAt": "2022-11-30T..."
      },
      stb.
    ],
    "orders": [
      {
        "id": "1",
        "address": "32233 Corwin Walks Apt. 349",
        "UserId": "2",
        "shipped": false,
        "createdAt": "2022-11-30T...",
        "updatedAt": "2022-11-30T..."
      },
      stb.
    ]
  }
}
```

#### 12. feladat: `Order.user` (1 pont)

Legyen lehetőség a rendelések felől indulva lekérdezni a rendelést leadó felhasználó adatait!

Kérés:
```graphql
query {
  orders {
    id
    address
    user {
      id
      email
      isWorker
    }
    shipped
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "orders": [
      {
        "id": "1",
        "address": "32233 Corwin Walks Apt. 349",
        "user": {
          "id": "2",
          "email": "Avery_Hagenes39@yahoo.com",
          "isWorker": false
        },
        "shipped": false
      },
      stb.
    ]
  }
}
```

#### 13. feladat: `Order.products` (1 pont)

Legyen lehetőség a rendelések felől indulva lekérdezni a rendeléshez tartozó összes termék adatmezőit!

Kérés:
```graphql
query {
  orders {
    id
    address
    products {
      id
      name
      price
    }
    shipped
	}
}
```

Mintaválasz:
```json
{
  "data": {
    "orders": [
      {
        "id": "1",
        "address": "32233 Corwin Walks Apt. 349",
        "products": [
          {
            "id": "1",
            "name": "Fantastic Fresh Car",
            "price": 61564
          },
          {
            "id": "2",
            "name": "Licensed Rubber Soap",
            "price": 62176
          },
          stb.
        ]
      }
    ]
  }
}
```

#### 14. feladat: `Mutation.createProduct` (3 pont)

Új termék létrehozása a megadott adatokkal. Siker esetén visszaadja a létrejött terméket, különben `null` értéket kap.

A bemenő adatoknak adj meg a sémában egy `CreateProductInput` definiciót, amely a modellben tárolt mezőket várja az automatikusan kitöltődő `id`, `createdAt` és `updatedAt` kivételével! Figyelem: a `description` mező vehet fel `null` értéket is!

Kérés:
```graphql
mutation {
  createProduct (input: {
    name: "Some name"
    description: null
    price: 45099
    count: 20
  }) {
    id
    name
    description
    price
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "createProduct": {
      "id": "23",
      "name": "Some name",
      "description": null,
      "price": 45099,
      "createdAt": "2022-11-30T...",
      "updatedAt": "2022-11-30T..."
    }
  }
}
```

#### 15. feladat: `Query.priceBetween` (2 pont)

Az összes legalább `min`, de legfeljebb `max` árú termék lekérése.

Kérés:
```graphql
query {
  priceBetween (min: 10000, max: 20000) {
    id
    name
    price
	}
}
```

Mintaválasz:
```json
{
  "data": {
    "priceBetween": [
      {
        "id": "9",
        "name": "Sleek Plastic Chips",
        "price": 15029
      },
      stb.
    ]
  }
}
```

#### 16. feladat: `Order.totalPrice` (2 pont)

Bővítsük a rendelésekről lekérhető adatokat a rendelés teljes összegével! 

Kérés:
```graphql
query {
  orders {
    id
    address
    totalPrice
    shipped
	}
}
```

Mintaválasz:
```json
{
  "data": {
    "orders": [
      {
        "id": "1",
        "address": "32233 Corwin Walks Apt. 349",
        "totalPrice": 866907,
        "shipped": false
      },
      stb.
    ]
  }
}
```

#### 17. feladat: `Mutation.addProduct` (4 pont)

A `ProductId` azonosítójú termék hozzáadása az `OrderId` azonosítójú rendeléshez. A válasz a pontosan egy string legyen a következő lehetőségek közül:

- `"INVALID PRODUCT"` - ha a beírt azonosítóval nem létezik termék (ilyenkor nem szükséges továbbmenni a rendelés ellenőrzésére)
- `"INVALID ORDER"` - ha a beírt azonosítóval nem létezik rendelés
- `"ALREADY ADDED"` - ha a termék már része a rendelésnek
- `"SUCCESS"` - ha a termék sikeresen hozzáadásra került a rendeléshez

Kérés:
```graphql
mutation {
  addProduct(ProductId: 3, OrderId: 5)
}
```

Mintaválasz:
```json
{
  "data": {
    "addProduct": "SUCCESS"
  }
}
```


#### 18. feladat: `Query.statistics` (5 pont)

Statisztika készítése, amely a következő mezőket tartalmazza:

- `registeredUsers`: a regisztrált felhasználók száma
- `unshippedOrders`: a még nem feladott rendelések száma
- `largeOrders`: az olyan rendelések száma, amelyek legalább 5 terméket tartalmaznak
- `mostExpensivePrice`: a legdrágább termék ára
- `averagePrice`: az átlagos termékár

Kérés:
```graphql
query {
  statistics {
    registeredUsers
    unshippedOrders
    largeOrders
    mostExpensivePrice
    averagePrice
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "statistics": {
      "registeredUsers": 6,
      "unshippedOrders": 2,
      "largeOrders": 4,
      "mostExpensivePrice": 95229,
      "averagePrice": 55327.55
    }
  }
}
```
