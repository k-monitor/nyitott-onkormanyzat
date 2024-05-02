# onkormi map

### határok

A `kozig.geojson`-ban vannak a budapesti kerületek és a 30 000 fő feletti települések közigazgatási határai.

Forrás: openstreetmap.hu és [wikipédia](https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_legnagyobb_telep%C3%BCl%C3%A9sei_lak%C3%B3n%C3%A9pess%C3%A9g_szerint) a népességi adatokért.

```bash
wget http://data2.openstreetmap.hu/hatarok/kozighatarok.zip
unzip kozighatarok.zip
cd kozighatarok
ogr2ogr -f "GeoJSON" admin9.geojson -t_srs EPSG:4326 admin9.shp
ogr2ogr -f "GeoJSON" admin8.geojson -t_srs EPSG:4326 admin8.shp
```
