export interface Puppy {
  id: string;
  name: string;
  emoji: string;
  besitzer: string;
  gender: 'Hündin' | 'Rüde';
  color: string;
  merkmale: string;
  stats: {
    geburtsgewicht?: string;
    nach24h?: string;
    wochen12: string;
  };
  quote?: string;
  tags: string[];
}

export const PUPPIES: Puppy[] = [
  {
    id: 'eve',
    name: 'Eve',
    emoji: '🖤',
    besitzer: 'Freundin von Clemens',
    gender: 'Hündin',
    color: 'Schwarz/Weiß',
    merkmale: 'Zeichnung von Trinity',
    stats: { geburtsgewicht: '391g', nach24h: '437g (+12%)', wochen12: '10,9kg' },
    quote: "Die Erstgeborene, das Mädchen, das ich mir behalten würde",
    tags: ['hündin', 'erstgeborene']
  },
  {
    id: 'dotty',
    name: 'Dotty',
    emoji: '⚫',
    besitzer: '+43 664 5107941',
    gender: 'Hündin',
    color: 'Fleckvieh',
    merkmale: 'Two-Eye, Fleckviehmuster, schwarzer Fleck am Schwanzansatz',
    stats: { geburtsgewicht: '382g', nach24h: '422g (+10%)', wochen12: '10kg' },
    tags: ['hündin', 'fleckvieh']
  },
  {
    id: 'boa',
    name: 'Boa',
    emoji: '🤍',
    besitzer: 'vergeben',
    gender: 'Hündin',
    color: 'Schwarz/Weiß',
    merkmale: 'Schwarz mit breitem weißen Kragen + Nasenstrich',
    stats: { geburtsgewicht: '357g', nach24h: '422g (+18%)', wochen12: '9,5kg' },
    tags: ['hündin']
  },
  {
    id: 'brownie',
    name: 'Brownie',
    emoji: '🤎',
    besitzer: 'Belinda & +43 676 6803735',
    gender: 'Rüde',
    color: 'Weiß/Braun',
    merkmale: 'Fast weiß mit kleinen Flecken, Schwanzspitze weiß',
    stats: { geburtsgewicht: '381g', nach24h: '447g (+17%)', wochen12: '10,2kg' },
    quote: "Genau die Zeichnung vom Papa Coffee",
    tags: ['rüde', 'coffee-look']
  },
  {
    id: 'pirate',
    name: 'Pirate',
    emoji: '🏴‍☠️',
    besitzer: 'vergeben',
    gender: 'Rüde',
    color: 'Fleckvieh',
    merkmale: 'Fleckviehmuster, Piratenaugenklappe rechts',
    stats: { geburtsgewicht: '376g', nach24h: '444g (+18%)', wochen12: '10,5kg' },
    tags: ['rüde', 'pirat']
  },
  {
    id: 'blacky',
    name: 'Blacky',
    emoji: '🖤',
    besitzer: 'vergeben',
    gender: 'Rüde',
    color: 'Schwarz',
    merkmale: 'Fast ganz schwarz',
    stats: { wochen12: '11,7kg' },
    quote: "Blacky ist bereits vergeben und wird zauberhaft aufwachsen...",
    tags: ['rüde', 'black']
  },
  {
    id: 'amor',
    name: 'Amor',
    emoji: '💘',
    besitzer: 'vergeben',
    gender: 'Rüde',
    color: 'Fleckvieh',
    merkmale: 'Fleckviehmuster',
    stats: { wochen12: '11kg' },
    quote: "Schlawiner vom Wurf, immer zum Spielen aufgelegt",
    tags: ['rüde', 'schlawiner']
  },
  {
    id: 'bounty',
    name: 'Bounty',
    emoji: '💜',
    besitzer: '+49 1525 1624676',
    gender: 'Rüde',
    color: 'Weiß',
    merkmale: 'Weiß mit Augenklappe rechts',
    stats: { wochen12: '10,8kg' },
    quote: "Herzerwärmend an Kopf und Hals beim Schlafen",
    tags: ['rüde', 'bounty']
  },
  {
    id: 'cora',
    name: 'Cora',
    emoji: '🧡',
    besitzer: '+43 699 17795928',
    gender: 'Hündin',
    color: 'Unbekannt',
    merkmale: 'Ehemals Beau',
    stats: { wochen12: '9,7kg' },
    tags: ['hündin', 'cora']
  }
];

export const WEIGHT_DATA = [
  { woche: '0', gewicht: 2.7 },
  { woche: '1', gewicht: 5.4 },
  { woche: '2', gewicht: 9.25 },
  { woche: '4', gewicht: 18.5 },
  { woche: '6', gewicht: 35.0 },
  { woche: '8', gewicht: 52.0 },
  { woche: '10', gewicht: 64.0 },
  { woche: '12', gewicht: 74.3 }
];

export const TIMELINE_EVENTS = [
  {
    date: '28.09.2025',
    title: 'Der große Tag',
    description: 'Trinity van Bella wird Mutter von 7 wunderbaren Welpen.',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=800',
    caption: 'Alles beginnt mit Trinity van Bella',
    quote: "Geduld zahlt sich aus. 💯❤️💯",
    author: "+43 664 4357110",
    tags: ['trinity', 'meilenstein']
  },
  {
    date: '28.09.2025',
    title: 'Die ersten Minuten',
    description: '7 kleine Wunder erblicken das Licht der Welt.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    caption: '7 kleine Wunder erblicken das Licht der Welt',
    quote: "Wow wie wundervoll das ist ja unglaublich so toll gemacht! Willkommen im Leben ihr süßen Welpen..",
    author: "+43 676 6803735",
    tags: ['geburt', 'meilenstein']
  },
  {
    date: '29.09.2025',
    title: 'Die Vorstellung',
    description: 'In dem Gewusel sind sie nicht gleich leicht zu unterscheiden.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?auto=format&fit=crop&q=80&w=800',
    caption: 'Die Rasselbande stellt sich vor',
    quote: "In dem Gewusel sind sie nicht gleich leicht zu unterscheiden...",
    author: "Clemens Sparowitz",
    tags: ['meilenstein']
  },
  {
    date: '06.10.2025',
    title: 'Eine Woche alt',
    description: 'Alle 7 haben ihr Geburtsgewicht verdoppelt.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    caption: 'Bilanz nach 1 Woche: Alle 7 haben sich gewichtsmäßig verdoppelt',
    quote: "Alle 7 zusammen hatten bei der Geburt 2.724g. 14 Tage später stolze 9.250g (+240%)",
    author: "Clemens Sparowitz",
    tags: ['meilenstein', 'statistik']
  },
  {
    date: '14.10.2025',
    title: 'Erstes Festfutter',
    description: 'Heute gab es zum ersten Mal etwas anderes als Muttermilch.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    caption: 'Heute haben alle 7 erstmals was anderes gegessen als Muttermilch!',
    quote: "Trinity hat aufmerksam und erstaunt zugeschaut...",
    author: "Clemens Sparowitz",
    tags: ['meilenstein']
  },
  {
    date: '15.10.2025',
    title: 'Welpenbad',
    description: 'Clemens lud zum "Welpenbaden" ein.',
    image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800',
    caption: 'Besuch im Welpenbad',
    quote: "So depressiv kannst' garnicht sein, dass du dann nicht voll happy bist",
    author: "+43 664 5107941",
    tags: ['welpenbad']
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=400', title: 'Trinity' },
  { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400', title: 'Kuscheln' },
  { url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?auto=format&fit=crop&q=80&w=400', title: 'Haufen' },
  { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400', title: 'Wachsen' },
  { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', title: 'Hunger' },
  { url: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=400', title: 'Welpenbad' },
  { url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400', title: 'Schlaf' },
  { url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=400', title: 'Entdecker' },
  { url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400', title: 'Garten' },
  { url: 'https://images.unsplash.com/photo-1503256207526-0df55635218b?auto=format&fit=crop&q=80&w=400', title: 'Freunde' },
];

export const WHATSAPP_CHATS = [
  { author: "Kat Au", message: "Überstanden...Halleluja! ✨🙏✨ Gratuliere, Trinity!", date: "28.09.2025" },
  { author: "+43 676 6803735", message: "Wow wie wundervoll das ist ja unglaublich so toll gemacht! Willkommen im Leben ihr süßen Welpen..", date: "28.09.2025" },
  { author: "Clemens Sparowitz", message: "7 kleine Wunder erblicken das Licht der Welt. Trinity ist müde aber stolz.", date: "28.09.2025" },
  { author: "+43 664 4357110", message: "Geduld zahlt sich aus. 💯❤️💯 Die Erstgeborene ist schon da!", date: "28.09.2025" },
  { author: "Susi G.", message: "Endlich sind sie da! 😍 Ich freue mich so für euch.", date: "28.09.2025" },
  { author: "+43 660 1234567", message: "Wie süß sie anfangen zu quieken... ein Wahnsinn.", date: "29.09.2025" },
  { author: "Helmut", message: "Gratulation zum Wurf! Schauen alle gesund aus.", date: "29.09.2025" },
  { author: "+43 676 9988776", message: "Gibt es schon Einzelfotos? 📸 Wir sind so neugierig!", date: "30.09.2025" },
  { author: "Maria T.", message: "Dotty ist mein Favorit, diese Flecken sind einmalig! ⚫⚪", date: "01.10.2025" },
  { author: "Petra B.", message: "Unglaublich, wie schnell sie wachsen. Man kann fast zuschauen.", date: "02.10.2025" },
  { author: "+43 664 5107941", message: "So depressiv kannst' garnicht sein, dass du dann nicht voll happy bist wenn man in Welpen badet.", date: "15.10.2025" },
  { author: "+43 660 7939630", message: "Sie ist Zucker! Voll lieb. Bounty Divinity Sweety ✨", date: "10.01.2026" },
  { author: "Andreas", message: "Pirate sieht aus wie ein kleiner Entdecker. 🏴‍☠️", date: "05.10.2025" },
  { author: "Gabi", message: "Hat jemand schon die Krallen geschnitten? 😅 Die sind wie Nadeln.", date: "07.10.2025" },
  { author: "Clemens Sparowitz", message: "Die erste Nacht war ruhig, Gott sei Dank. Trinity schläft viel.", date: "29.09.2025" },
  { author: "Family F.", message: "Brownie sieht genau aus wie Coffee! Ein echtes Ebenbild.", date: "10.10.2025" },
  { author: "Tom", message: "Alles Gute zum 1-Wochen-Jubiläum! 🎂", date: "05.10.2025" },
  { author: "Lisi", message: "Sie wiegen schon das Doppelte, Wahnsinn. Echte Kraftpakete.", date: "06.10.2025" },
  { author: "Clemens Sparowitz", message: "Welpenbaden war das Highlight der Woche! ✨ Danke fürs Kommen.", date: "15.10.2025" },
  { author: "Anita", message: "Einfach nur Liebe in diesem Raum. Man will gar nicht weg.", date: "15.10.2025" },
  { author: "Vet Dr. M.", message: "Wie geht es Trinity? Braucht sie noch Spezialfutter?", date: "03.10.2025" },
  { author: "Benni", message: "Blacky ist so ein kleiner Bär. Ganz in Schwarz, der Wahnsinn.", date: "12.10.2025" },
  { author: "Carina", message: "Die blauen Augen am Anfang sind so faszinierend. 💙", date: "08.10.2025" },
  { author: "+43 676 5544332", message: "Wann dürfen wir wieder vorbeikommen? 😍 Die Sucht hat begonnen.", date: "16.10.2025" },
  { author: "Markus", message: "Die erste Fleischmahlzeit - sie haben es geliebt! 🍖", date: "14.10.2025" },
  { author: "Clemens Sparowitz", message: "Trinity schaut so stolz auf ihre Rasselbande.", date: "30.09.2025" },
  { author: "Steffi", message: "Eve ist so eine kleine Anführerin. Die weiß was sie will.", date: "18.10.2025" },
  { author: "Paul", message: "Schon fast 10kg! Wohin wollen die noch wachsen? 📈", date: "01.01.2026" },
  { author: "Dani", message: "Zähne sind da! Aua beim Spielen 😂 Kleine Piraten.", date: "25.10.2025" },
  { author: "Hannes", message: "Sie fangen an zu bellen, so winzig und doch so laut.", date: "20.10.2025" },
  { author: "Claudia", message: "Boa hat so einen tollen Kragen. Sieht sehr edel aus.", date: "22.10.2025" },
  { author: "Wolfgang", message: "Amor ist ein echter Herzdieb. 💘 Wer kann da nein sagen?", date: "24.10.2025" },
  { author: "Sandra", message: "Das Video vom Spielen im Garten war herrlich. Pures Chaos!", date: "28.10.2025" },
  { author: "Clemens Sparowitz", message: "Danke an alle für die tollen Nachrichten und den Support!", date: "20.10.2025" },
  { author: "Julia", message: "Bounty schläft immer so lustig auf dem Rücken. 😂", date: "10.01.2026" },
  { author: "Rene", message: "Ich könnte den ganzen Tag zuschauen. Besser als Fernsehen.", date: "05.11.2025" },
  { author: "Psychologin E.", message: "Welpen-Therapie sollte auf Rezept kommen. Beruhigt sofort.", date: "15.11.2025" },
  { author: "Moni", message: "So viele bunte Halsbänder, jetzt erkennt man sie besser.", date: "10.10.2025" },
  { author: "Karli", message: "Cora sieht jetzt schon so elegant aus. Eine echte Dame.", date: "05.01.2026" },
  { author: "Clemens Sparowitz", message: "Gute Besserung an Trinity, die Kleinen fordern sie echt.", date: "12.11.2025" },
  { author: "Erich", message: "Diese Tapsen auf dem Flur... das werde ich vermissen.", date: "20.12.2025" },
  { author: "Doris", message: "Bald ziehen die ersten aus... ich werde weinen. 😭", date: "15.12.2025" },
  { author: "Bettina", message: "Danke für die schöne Zeit im Welpenbad. Unvergesslich.", date: "15.10.2025" },
  { author: "Fred", message: "Sie sind jetzt richtige kleine Hunde. Keine Babys mehr.", date: "01.01.2026" },
  { author: "Clemens Sparowitz", message: "Das Foto mit Coffee ist Weltklasse. Vater und Söhne.", date: "10.11.2025" },
  { author: "Bernd", message: "Wer hat den größten Hunger? Brownie, oder?", date: "18.11.2025" },
  { author: "Sabine", message: "Sie entdecken jetzt den ganzen Garten. Mutig!", date: "05.11.2025" },
  { author: "Manfred", message: "So viele kleine Wunder auf einem Haufen.", date: "28.09.2025" },
  { author: "Karin", message: "Passen sie noch alle in den Korb? Wohl kaum. 😂", date: "20.11.2025" },
  { author: "Opa Max", message: "Ein stolzer Wurf! Trinity hat das toll gemacht.", date: "28.09.2025" },
  { author: "Ulli", message: "Halleluja, alle gesund und munter. Was für ein Glück.", date: "29.09.2025" },
  { author: "Züchter-Kollege", message: "Die Zeichnungen sind so individuell und stark. Top!", date: "05.10.2025" },
  { author: "Nici", message: "Ich vermisse den Welpengeruch schon jetzt.", date: "10.12.2025" },
  { author: "Clemens Sparowitz", message: "Trinity macht das fantastisch, sie ist eine Naturtalent.", date: "05.10.2025" },
  { author: "Gerti", message: "Wie geht's den Ohren? Fangen sie an zu stehen?", date: "15.11.2025" },
  { author: "Sylvia", message: "Bester Start ins neue Jahr mit diesen Nachrichten. ✨", date: "01.01.2026" }
];
