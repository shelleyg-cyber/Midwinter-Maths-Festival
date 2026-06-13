# Title-banner artwork

Sepia engraving-style illustrations shown behind each destination's title banner.
All eight destinations are wired up in `lib/destinations.tsx` — drop the image files
in this folder with these exact names:

| File | Destination | Artwork |
|------|-------------|---------|
| `australia.png` | Australia | Uluru, kangaroo, didgeridoo |
| `america.png` | America | Statue of Liberty, New York skyline |
| `south-asia.png` | South Asia | Taj Mahal |
| `southeast-asia.png` | Southeast Asia | Junk boat, pagoda, lotus and lantern |
| `east-central-africa.png` | East & Central Africa | Ishango Bone, Kilimanjaro, woven pot |
| `southern-africa.png` | Southern Africa | Mbira players outside thatched houses |
| `middle-east-north-africa.png` | Middle East & North Africa | Minaret terrace with tea set |
| `europe.png` | Europe | River café with cathedral spires |

A destination whose file is missing shows a plain parchment banner behind the title
until the file is added — nothing breaks, but upload all eight for the full effect.
PNG or JPG is fine; if using JPG, also change the extension in `lib/destinations.tsx`.
