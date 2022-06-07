const random = (max) => Math.round(Math.random() * 1000) % max;
const adjectives = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy",
];
const colours = [
  "red",
  "yellow",
  "blue",
  "green",
  "pink",
  "brown",
  "purple",
  "brown",
  "white",
  "black",
  "orange",
];

const nouns = [
  "table",
  "chair",
  "house",
  "bbq",
  "desk",
  "car",
  "pony",
  "cookie",
  "sandwich",
  "burger",
  "pizza",
  "mouse",
  "keyboard",
];

let nextId = 1;

const buildData = (count) => {
  var data = [];
  for (var i = 0; i < count; i++)
    data.push({
      id: nextId++,
      label:
        adjectives[random(adjectives.length)] +
        " " +
        colours[random(colours.length)] +
        " " +
        nouns[random(nouns.length)],
    });
  return data;
};

export const initialState = { data: [], selected: 0 };

export const listReducer = (state, action) => {
  const { data, selected } = state;
  switch (action.type) {
    case "RUN":
      return { data: buildData(1000), selected: 0 };
    case "RUN_LOTS":
      return { data: buildData(10000), selected: 0 };
    case "ADD":
      return { data: data.concat(buildData(1000)), selected };
    case "UPDATE": {
      const newData = data.slice(0);

      for (let i = 0; i < newData.length; i += 10) {
        const r = newData[i];

        newData[i] = { id: r.id, label: r.label + " !!!" };
      }

      return { data: newData, selected };
    }
    case "CLEAR":
      return { data: [], selected: 0 };
    case "SWAP_ROWS":
      return data.length > 998
        ? {
            data: [
              data[0],
              data[998],
              ...data.slice(2, 998),
              data[1],
              data[999],
            ],
            selected,
          }
        : state;
    case "REMOVE": {
      const idx = data.findIndex((d) => d.id === action.id);

      return {
        data: [...data.slice(0, idx), ...data.slice(idx + 1)],
        selected,
      };
    }
    case "SELECT":
      return { data, selected: action.id };
    default:
      return state;
  }
};
