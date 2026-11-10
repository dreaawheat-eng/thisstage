export type IndoorPlay = {
  id: string;
  title: string;
  line: string;
  tag: "Free" | "Sensory";
};

export const INDOOR: IndoorPlay[] = [
  {
    id: "tape",
    title: "Tape a road",
    line: "Painter’s tape on the floor. Cars you already own. Peel it up when you’re done.",
    tag: "Free",
  },
  {
    id: "water",
    title: "A dish of water",
    line: "A baking dish, a cup, and water. Stay in the room. A towel is the whole setup.",
    tag: "Sensory",
  },
  {
    id: "box",
    title: "The delivery box",
    line: "A cardboard box is a house, a car, or a boat. Markers if you want a door.",
    tag: "Free",
  },
  {
    id: "socks",
    title: "Sock toss",
    line: "Rolled socks and a laundry basket. They throw. You don’t keep score.",
    tag: "Free",
  },
  {
    id: "freeze",
    title: "One song, then freeze",
    line: "Dance for one song. Pause it. The freeze is the game.",
    tag: "Free",
  },
  {
    id: "pots",
    title: "Kitchen band",
    line: "A pot and a wooden spoon. Close a door if you need the rest of the place quiet.",
    tag: "Sensory",
  },
  {
    id: "fort",
    title: "Two-cushion fort",
    line: "Couch cushions on the floor. A blanket over two chairs if you have them. That’s a fort.",
    tag: "Free",
  },
  {
    id: "ice",
    title: "Ice on a tray",
    line: "A few ice cubes in a muffin tin. They melt, slide, and drip. Sensory, and free.",
    tag: "Sensory",
  },
  {
    id: "sort",
    title: "Sort the spoons",
    line: "Big spoons and little spoons into a muffin tin. Or socks into two piles.",
    tag: "Sensory",
  },
  {
    id: "light",
    title: "Flashlight fort",
    line: "Lights off, one flashlight, a blanket. Shine it on the ceiling. Stay close.",
    tag: "Sensory",
  },
];
