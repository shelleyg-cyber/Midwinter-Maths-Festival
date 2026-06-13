// Maths Around Our World — destination content (single source of truth).
// Copy lifted verbatim from the planning document via the design handoff.
import type { ReactNode } from 'react';

// Asset URLs need the deploy base path prepended so they resolve when the
// site is served from a sub-folder (GitHub Pages). Empty during local dev.
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/midwinter-maths-festival' : '');

export const ASSETS = `${BASE_PATH}/assets/`;

export function NumTable({
  head,
  rows,
  rtlCols = [],
}: {
  head: string[];
  rows: string[][];
  rtlCols?: number[];
}) {
  return (
    <table className="maw-table">
      <thead>
        <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} dir={rtlCols.includes(j) ? 'rtl' : undefined}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type ChallengeOption = { label: string; image: string };

export type Challenge = {
  level: 'Lower primary' | 'Upper primary';
  body: ReactNode;
  options?: ChallengeOption[];
  correct?: string;
  aside?: { image: string; alt: string; caption: string };
  hint?: string;
  answer?: ReactNode;
  open?: string; // open task note — rendered instead of a Reveal button
};

export type Destination = {
  slug: string;
  name: string;
  num: number;
  subtitle: string;
  hook: string;
  accent: string;
  mapPos: { left: number; top: number };
  video: { id?: string; driveId?: string; title?: string; note?: string };
  banner?: string; // engraving artwork behind the title banner — public/assets/banners/
  image?: string;
  imageAlt?: string;
  didYouKnow: string;
  outstanding?: string[];
  challenges: [Challenge, Challenge];
};

export const destinations: Destination[] = [
  {
    slug: 'australia',
    name: 'Australia',
    num: 1,
    subtitle: 'Welcome to Australia! Home of incredible First Nations mathematicians',
    hook: 'Kaurna numbers, animal tracks, symmetry and rotation',
    accent: '#A3879B',
    mapPos: { left: 86, top: 79 },
    video: { id: 'fv30IyZTwX4', title: 'Kaurna for Kids — numbers' },
    banner: 'australia.png',
    image: 'au-animal-tracks.png',
    imageAlt: 'Kangaroo tracks in red sand',
    didYouKnow:
      'First Nations people have long used sophisticated mathematical thinking, including counting, distance, ratio, symmetry and rotation. Animal tracks and symbols can help us explore symmetry, reflection and rotation — and animal tracks can be used to reason about direction.',
    outstanding: ['Final print visuals needed — the four handprint images below are placeholders from the draft.'],
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <p>
            Watch the Kaurna for Kids numbers video. Match number words to numerals 1–10, then count sets of
            animal tracks or stone groups. Here are <strong>3 kangaroo tracks</strong> — count the number of hops
            using Kaurna language.
          </p>
        ),
        hint: 'Listen for the first three numbers in the video and say them out loud as you point to each hop.',
        answer: <p><strong>Marnkutyi</strong> — three hops, counted in Kaurna!</p>,
      },
      {
        level: 'Upper primary',
        body: <p>Which handprints are <strong>not</strong> symmetrical? Click your guess, then reveal the answer.</p>,
        options: [
          { label: 'Kuma', image: 'au-handprints.png' },
          { label: 'Purlaityi', image: 'au-handprints.png' },
          { label: 'Marnkutyi', image: 'au-handprints.png' },
          { label: 'Yarapurla', image: 'au-handprints.png' },
        ],
        correct: 'Marnkutyi',
        hint: 'Symmetrical means both sides match exactly, like a mirror. Imagine folding each pair of handprints down the middle.',
        answer: <p>The handprints that are not symmetrical are <strong>Marnkutyi</strong>.</p>,
      },
    ],
  },
  {
    slug: 'america',
    name: 'America',
    num: 2,
    subtitle: 'Welcome to America! Here we measure using a different system!',
    hook: 'Feet, miles, gallons and Fahrenheit — metric to imperial',
    accent: '#5E94B8',
    mapPos: { left: 18, top: 38 },
    video: { note: 'Video to be added — placeholder for now.' },
    banner: 'america.png',
    didYouKnow:
      'Buying milk, filling up a car and checking the weather can all use different units in America. Many everyday measurements use the imperial system: length in inches and feet, long distances in miles, capacity in ounces and gallons, mass in pounds and temperature in degrees Fahrenheit.',
    outstanding: ['Video to be supplied later.'],
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <p>
            Pretend <em>I</em> am moving to America and need to learn the measurement system. Convert{' '}
            <strong>my height</strong> to feet and inches!
          </p>
        ),
        aside: {
          image: 'us-conversion-table.png',
          alt: 'Centimetres to feet and inches conversion chart',
          caption: 'Conversion chart — answer guide',
        },
        hint: '1 foot = 12 inches, and 1 foot is about 30 cm. Find the closest height on the chart.',
        open: 'No single answer — it depends on your teacher’s height! Check it on the chart.',
      },
      {
        level: 'Upper primary',
        body: (
          <p>
            Pretend <em>you</em> are moving to America and need to learn the measurement system. Convert{' '}
            <strong>your height</strong> to feet and inches.
          </p>
        ),
        hint: 'Divide your height in cm by 30 for a rough number of feet, then use the chart to be precise.',
        open: 'No single answer — students are different heights! Use the conversion chart to check.',
      },
    ],
  },
  {
    slug: 'south-asia',
    name: 'South Asia',
    num: 3,
    subtitle: 'Welcome to South Asia! Patterns that celebrate.',
    hook: 'Rangoli patterns and lines of symmetry',
    accent: '#A8A060',
    mapPos: { left: 68, top: 48 },
    video: { id: 'sGNGwH9UJZI', title: 'Big rangoli at mall — Diwali' },
    banner: 'south-asia.png',
    image: 'sa-rangoli.png',
    imageAlt: 'A colourful rangoli pattern on the ground',
    didYouKnow:
      'Rangoli patterns are decorative patterns often created for festivals and celebrations. They can include reflection symmetry, rotational symmetry, repeated shapes and colour patterns.',
    outstanding: ['Chosen rangoli pattern to confirm (answer assumes 6 rotations / 12 lines).'],
    challenges: [
      {
        level: 'Lower primary',
        body: <p>Your teacher has some <strong>Rangoli colouring pages</strong> for you to colour at another time!</p>,
        open: 'A colouring activity — no answer needed. Enjoy!',
      },
      {
        level: 'Upper primary',
        body: (
          <p>
            Identify all the <strong>lines of symmetry</strong> in a rangoli design. Then test for{' '}
            <strong>rotational symmetry</strong>: how many times does the design match itself in one full turn?
          </p>
        ),
        hint: 'Trace a line through the middle of the design — do both sides match? Then turn the design a little at a time and watch for a match.',
        answer: <p><strong>6 rotations</strong> and <strong>12 lines of symmetry</strong>.</p>,
      },
    ],
  },
  {
    slug: 'southeast-asia',
    name: 'Southeast Asia',
    num: 4,
    subtitle: 'Welcome to Southeast Asia! Vietnamese Tết recipe maths.',
    hook: 'Bánh Chưng rice cakes — doubling a recipe',
    accent: '#5FA89A',
    mapPos: { left: 77, top: 57 },
    video: { id: '7CTT_33b3Ug', title: 'Making Bánh Chưng' },
    banner: 'southeast-asia.png',
    didYouKnow:
      'During Lunar New Year, many Vietnamese families make Bánh Chưng — square rice cakes. This activity uses a recipe to practise reading numbers, doubling quantities and converting grams to kilograms.',
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <div>
            <p>Vietnamese number decode:</p>
            <NumTable
              head={['Vietnamese', 'Number']}
              rows={[
                ['Một', '1'], ['Hai', '2'], ['Ba', '3'], ['Bốn', '4'],
                ['Năm', '5'], ['Mười', '10'], ['Trăm', 'hundred'],
              ]}
            />
            <p>The chef wrote: “Add <strong>Hai</strong> teaspoons of salt.” How many teaspoons is Hai?</p>
          </div>
        ),
        hint: 'Find “Hai” in the number list above.',
        answer: <p>Secret spice: <strong>Hai = 2</strong>, so use 2 teaspoons of salt.</p>,
      },
      {
        level: 'Upper primary',
        body: (
          <div>
            <p>The recipe makes <strong>2 Bánh Chưng cakes</strong>:</p>
            <NumTable
              head={['Ingredient', 'For 2 cakes']}
              rows={[
                ['Sticky rice', '500 g'], ['Mung beans', '250 g'], ['Pork belly', '300 g'],
                ['Black pepper', '2 teaspoons'], ['Banana leaves', '12'],
              ]}
            />
            <p>Your class needs <strong>4 cakes</strong> — double every ingredient and record the new recipe.</p>
          </div>
        ),
        hint: 'Doubling means × 2. 500 g + 500 g = …? Remember: 1,000 g makes 1 kg.',
        answer: (
          <div>
            <p>The doubled recipe:</p>
            <NumTable
              head={['Ingredient', 'For 4 cakes']}
              rows={[
                ['Sticky rice', '1,000 g (1 kg)'], ['Mung beans', '500 g'], ['Pork belly', '600 g'],
                ['Black pepper', '4 teaspoons'], ['Banana leaves', '24'],
              ]}
            />
          </div>
        ),
      },
    ],
  },
  {
    slug: 'east-central-africa',
    name: 'East & Central Africa',
    num: 5,
    subtitle: 'Welcome to the Democratic Republic of Congo! Ancient counting mysteries.',
    hook: 'The Ishango Bone number mystery',
    accent: '#6CA987',
    mapPos: { left: 56, top: 58 },
    video: { id: 'oUPggWB5Efg', title: 'The Ishango Bone' },
    banner: 'east-central-africa.png',
    image: 'af-ishango-bone.png',
    imageAlt: 'The Ishango Bone, carved with tally notches',
    didYouKnow:
      'The Ishango Bone was found near the Semliki River in what is now the Democratic Republic of Congo. It contains groups of tally-like notches and is often discussed as an early mathematical object — the notch groups 11, 13, 17 and 19 hide an ancient number mystery.',
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <div>
            <p>
              Count the notch groups: <strong>11, 13, 17 and 19</strong>. Which group has the most? Which has the
              least? Put the numbers in order and make each number with counters or tally marks.
            </p>
            <figure className="maw-fig">
              <img src={ASSETS + 'af-ishango-notches.png'} alt="Diagram of the notch groups on the Ishango Bone" />
              <figcaption>The notch rows on the bone</figcaption>
            </figure>
          </div>
        ),
        hint: 'Start with the smallest number. Which two numbers are closest together?',
        answer: <p>Most: <strong>19</strong>. Least: <strong>11</strong>. In order: 11, 13, 17, 19.</p>,
      },
      {
        level: 'Upper primary',
        body: (
          <p>
            Ancient maths mystery: what number comes <strong>next</strong> after 11, 13, 17 and 19? What is the
            pattern?
          </p>
        ),
        hint: 'A prime number can only be divided exactly by 1 and itself. Test 20, 21, 22, 23…',
        answer: (
          <p>
            The notch numbers 11, 13, 17 and 19 are <strong>prime numbers</strong> — divisible only by 1 and
            themselves. The next prime is <strong>23</strong>. (20 divides by 2, 4, 5 and 10; 21 by 3 and 7; 22 by
            2 and 11.)
          </p>
        ),
      },
    ],
  },
  {
    slug: 'southern-africa',
    name: 'Southern Africa',
    num: 6,
    subtitle: 'Welcome to Southern Africa! Mbira pattern maths.',
    hook: 'Mbira rhythm and clapping patterns from Zimbabwe',
    accent: '#74955F',
    mapPos: { left: 57, top: 74 },
    video: { id: 'UJvOXxaJji4', title: 'Tarisiro — mbira' },
    banner: 'southern-africa.png',
    didYouKnow:
      'The mbira is a thumb piano strongly associated with Zimbabwean music traditions. Rhythm gives us a concrete way to experience repeating patterns, cycles, counting and prediction.',
    outstanding: ['Mbira audio clip (freesound_community-mbira-73623.mp3, ~47 s) to be uploaded.'],
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <p>
            Listen to the mbira sound clip. <strong>Clap a steady beat</strong> while listening. Then copy a simple
            repeating pattern, such as clap–rest–clap–rest. Circle the part that repeats.
          </p>
        ),
        hint: 'Say the pattern out loud as you clap: “clap, rest, clap, rest…” Which bit comes back again and again?',
        open: 'An open performance task — there is no single answer. Keep the beat together!',
      },
      {
        level: 'Upper primary',
        body: (
          <p>
            Represent a rhythm as a <strong>pattern string</strong>, for example <code>X – X – / X – X –</code> or{' '}
            <em>clap clap rest clap / clap clap rest clap</em>. Predict the 12th, 16th or 24th beat.
          </p>
        ),
        hint: 'Write the pattern out and circle the chunk that repeats. How long is the chunk? Count forward in chunks of that size.',
        open: 'Open task — answers depend on the rhythm your class invents. Check predictions by clapping it through!',
      },
    ],
  },
  {
    slug: 'middle-east-north-africa',
    name: 'Middle East & North Africa',
    num: 7,
    subtitle: 'Numbers travelling across cultures.',
    hook: 'Urdu / Persian-Arabic numerals mystery message',
    accent: '#C09A62',
    mapPos: { left: 51, top: 41 },
    video: { id: 'h0x8qEIt7Ro', title: 'Urdu Numbers 1–10 Sing-Along' },
    banner: 'middle-east-north-africa.png',
    didYouKnow:
      'Long ago, people used many different ways to record quantities and solve problems. Mathematical ideas about place value travelled between regions — including India and the Middle East — and helped shape the number system many people use today.',
    challenges: [
      {
        level: 'Lower primary',
        body: (
          <div>
            <p>Here are the numerals:</p>
            <NumTable
              head={['Number', 'Urdu', 'Say it in Urdu']}
              rtlCols={[1]}
              rows={[
                ['0', '٠', ''], ['1', '١', 'aik'], ['2', '٢', 'dou'], ['3', '٣', 'teen'],
                ['4', '۴', 'chaar'], ['5', '۵', 'panch'], ['6', '۶', 'chay'],
                ['7', '٧', 'saat'], ['8', '٨', 'aath'], ['9', '٩', 'naw'], ['10', '١٠', ''],
              ]}
            />
            <p>Use the table to solve:</p>
            <ul className="maw-problems">
              <li><span dir="rtl">۶ + ٧</span> = ?</li>
              <li><span dir="rtl">٩ + ١٢</span> = ?</li>
              <li><span dir="rtl">٨ + ٨ + ٩</span> = ?</li>
            </ul>
          </div>
        ),
        hint: 'Match each Urdu numeral to our numerals first, then add.',
        answer: (
          <NumTable
            head={['Problem', 'Answer']}
            rtlCols={[0]}
            rows={[['۶ + ٧', '13'], ['٩ + ١٢', '21'], ['٨ + ٨ + ٩', '25']]}
          />
        ),
      },
      {
        level: 'Upper primary',
        body: (
          <div>
            <p>
              Solve the Urdu numeral calculations. Each answer gives a <strong>word position</strong> in the
              paragraph below. Number every word from left to right, find each word, and record the words in order
              to reveal the message.
            </p>
            <blockquote className="maw-quote">
              Long ago people used many different ways to record quantities and solve problems. India developed
              important mathematical ideas about place value and scholars in the Middle East studied these ideas
              carefully and shared them with others. Their work helped knowledge travel between countries and
              cultures. Together these contributions continue to shape our numbers today.
            </blockquote>
            <p>Positions to find: <strong>14 · 22 · 25 · 26 · 27 · 39 · 51 · 52 · 53</strong></p>
          </div>
        ),
        hint: 'Number every word in the paragraph carefully — count twice! Tick each word as you go.',
        answer: (
          <div>
            <NumTable
              head={['Position', 'Word']}
              rows={[
                ['14', 'India'], ['22', 'and'], ['25', 'the'], ['26', 'Middle'], ['27', 'East'],
                ['39', 'helped'], ['51', 'shape'], ['52', 'our'], ['53', 'numbers'],
              ]}
            />
            <p className="maw-message">“India and the Middle East helped shape our numbers.”</p>
          </div>
        ),
      },
    ],
  },
  {
    slug: 'europe',
    name: 'Europe',
    num: 8,
    subtitle: 'Can you cross every bridge once?',
    hook: 'Bridge and route puzzle inspired by Euler',
    accent: '#C4849C',
    mapPos: { left: 49, top: 25 },
    video: { driveId: '1ppPNNEKm10rySYViMjXcqnaRBivMzn6N', title: 'Königsberg bridges' },
    banner: 'europe.png',
    image: 'eu-konigsberg-map.png',
    imageAlt: 'Historic map of Königsberg with its seven bridges marked',
    didYouKnow:
      'Germany is famous for bridge designs that changed the world of maths and engineering. German cities and engineers invented entirely new branches of mathematics and created formulas used to build modern bridges today.',
    outstanding: ['Video embeds from Google Drive — sharing must stay “Anyone with the link → Viewer” or it won’t play in class.'],
    challenges: [
      {
        level: 'Lower primary',
        body: <p>Count how many bridges meet each land area.</p>,
        aside: {
          image: 'eu-konigsberg-diagram.png',
          alt: 'Simple diagram of the river banks, islands and bridges',
          caption: 'River banks A & B, islands C & D',
        },
        hint: 'Count the bridges touching each piece of land. Is each number odd or even?',
        answer: (
          <p>
            Riverbank A: 3 bridges · Riverbank B: 3 bridges · Island C: 5 bridges · Island D: 3 bridges. Every land
            area has an <strong>odd</strong> number of bridges!
          </p>
        ),
      },
      {
        level: 'Upper primary',
        body: (
          <div>
            <p>
              <strong>The Riddle That Created Graph Theory.</strong> Legend has it that the ‘gentlefolk’ of
              Königsberg would spend Sunday afternoons walking the town, attempting to cross each of the seven
              bridges — joining the north and south of the river to the two islands — once and once only, without
              retracing their steps.
            </p>
            <p>Can you find a route around Königsberg which crosses each bridge exactly once?</p>
          </div>
        ),
        aside: {
          image: 'eu-konigsberg-diagram.png',
          alt: 'Simple diagram of the river banks, islands and bridges',
          caption: 'River banks A & B, islands C & D',
        },
        hint: 'Forget distances — only the connections matter. What happens at a land area where you must walk in and out again?',
        answer: (
          <div>
            <p>
              <strong>The maths:</strong> in 1736, a mathematician named Leonhard Euler used the city map to prove
              it was <strong>impossible</strong>.
            </p>
            <p>
              <strong>The legacy:</strong> Euler did not care about the length of the bridges or the size of the
              land — only how they connected. This simple puzzle started a massive branch of maths called{' '}
              <strong>graph theory</strong> and a field called <strong>topology</strong>. Today, this same maths
              runs the internet, Google Maps and airline flight paths.
            </p>
          </div>
        ),
      },
    ],
  },
];
