# Title-banner artwork

Sepia engraving-style illustrations shown behind each destination's title banner.
Drop the image files in this folder with these exact names (PNG or JPG re-named to .png):

| File | Destination | Artwork |
|------|-------------|---------|
| `australia.png` | Australia | Uluru, kangaroo, didgeridoo |
| `america.png` | America | Statue of Liberty, New York skyline |
| `south-asia.png` | South Asia | Taj Mahal |
| `middle-east-north-africa.png` | Middle East & North Africa | Minaret terrace with tea set |
| `europe.png` | Europe | River café with cathedral spires |
| `southeast-asia.png` | Southeast Asia | *still to be supplied* |
| `east-central-africa.png` | East & Central Africa | *still to be supplied* |
| `southern-africa.png` | Southern Africa | *still to be supplied* |

A destination with no file here (and no `banner` entry in `lib/destinations.tsx`) falls back
to the plain title block automatically. After adding the three outstanding images, add a
`banner: '<slug>.png'` line to the matching destination in `lib/destinations.tsx`.
