# onkormi map

Ez egy next.js projekt, amiből egy github actions generál statikus oldalt és Vercelen publikálja: https://nyitottonkormanyzat.k-monitor.hu/ (dev változat: https://nyitott-onkormanyzat.vercel.app/)

Az oldalt a [nerhotel](https://github.com/Code-for-Hungary/nerhotel) ihlette és sok kód lett átvéve onnan.

Ahhoz hasonlóan ez a projekt is leaflet mapot használ.

Emellett segített az elindulásban a [next-leaflet-starter](https://next-leaflet-starter.netlify.app/) 

### határok

Az `assets/kozig.geojson`-ban vannak a budapesti kerületek és a 30 000 fő feletti települések közigazgatási határai.

Ezen felül hozzá lett adva: Esztergom, Szekszárd, Fót, Vámospércs, Tésa, Dunaharaszti

Újat hozzáadni úgy lehetséges, hogy a lenti geojson fájlokból átmásoljuk az adott település sorát ebbe.

Forrás: openstreetmap.hu és [wikipédia](https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_legnagyobb_telep%C3%BCl%C3%A9sei_lak%C3%B3n%C3%A9pess%C3%A9g_szerint) a népességi adatokért.

```bash
wget http://data2.openstreetmap.hu/hatarok/kozighatarok.zip
unzip kozighatarok.zip
cd kozighatarok
ogr2ogr -f "GeoJSON" admin9.geojson -t_srs EPSG:4326 admin9.shp
ogr2ogr -f "GeoJSON" admin8.geojson -t_srs EPSG:4326 admin8.shp
```
