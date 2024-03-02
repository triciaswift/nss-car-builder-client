const database = {
  orderBuilder: {},
  paints: [
    { id: 1, color: "Silver", price: 500 },
    { id: 2, color: "Midnight Blue", price: 710 },
    { id: 3, color: "Firebrick Red", price: 965 },
    { id: 4, color: "Spring Green", price: 965 },
  ],
  technologies: [
    { id: 1, package: "Basic Package", price: 500 },
    { id: 2, package: "Navigation Package", price: 710 },
    { id: 3, package: "Visibility Package", price: 965 },
    { id: 4, package: "Ultra Package", price: 965 },
  ],
  interiors: [
    { id: 1, material: "Beige Fabric", price: 405 },
    { id: 2, material: "Charcoal Fabric", price: 782 },
    { id: 3, material: "White Leather", price: 1470 },
    { id: 4, material: "Black Leather", price: 1997 },
  ],
  wheels: [
    { id: 1, style: "17-inch Pair Radial", price: 12.42 },
    { id: 2, style: "17-inch Pair Radial Black", price: 736.4 },
    { id: 3, style: "18-inch Pair Spoke Silver", price: 1258.9 },
    { id: 4, style: "18-inch Pair Spoke Black", price: 795.45 },
  ],
  customOrders: [
    {
      id: 1,
      interiorId: 3,
      wheelId: 2,
      technologyId: 1,
      paintId: 3,
    },
  ],
};

export const setPaint = (id) => {
  database.orderBuilder.paintId = id;
  // document.dispatchEvent(new CustomEvent("stateChanged"))
};

export const getCurrentOrder = () => {
  return database.orderBuilder;
};

export const setWheel = (id) => {
  database.orderBuilder.wheelId = id;
  // document.dispatchEvent(new CustomEvent("stateChanged"))
};

export const setInterior = (id) => {
  database.orderBuilder.interiorId = id;
  // document.dispatchEvent(new CustomEvent("stateChanged"))
};

export const setTechnology = (id) => {
  database.orderBuilder.technologyId = id;
  // document.dispatchEvent(new CustomEvent("stateChanged"))
};

// NEW custom order POST

export const addCustomOrder = async () => {
  const newOrder = { ...database.orderBuilder };
  await fetch("http://localhost:5087/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });
  database.orderBuilder = {};
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

// NEW completeOrder - called when "complete" button on order in orders list is clicked

export const completeOrder = async (orderId) => {
  await fetch(`http://localhost:5087/orders/${orderId}/fulfill`, {
    method: "POST",
  });
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

//NEW API getters

export const getOrders = async () => {
  const res = await fetch("http://localhost:5087/orders");
  const data = await res.json();
  return data;
};

export const getWheels = async () => {
  const res = await fetch("http://localhost:5087/wheels");
  const data = await res.json();
  return data;
};

export const getInteriors = async () => {
  const res = await fetch("http://localhost:5087/interiors");
  const data = await res.json();
  return data;
};

export const getTechnologies = async () => {
  const res = await fetch("http://localhost:5087/technologies");
  const data = await res.json(); // waits for the promise returned by fetch; res is the server response object
  return data; // reads the server response object as JSON data. Returns another promise, resolves to parsed JSON data, stored in "data". "Await waits for this promise to resolve."
};

export const getPaints = async () => {
  const res = await fetch("http://localhost:5087/paintcolors");
  const data = await res.json();
  return data;
};

// original local database getters

// export const getOrders = () => {
//     return [...database.customOrders]
// }

// export const getWheels = () => {
//     return [...database.wheels]
// }

// export const getInteriors = () => {
//     return [...database.interiors]
// }

// export const getTechnologies = () => {
//     return [...database.technologies]
// }

// export const getPaints = () => {
//     return [...database.paints]
// }

// original database create order setter

// export const addCustomOrder = () => {
//     const newOrder = {...database.orderBuilder}
//     newOrder.timestamp = new Date().toLocaleDateString("en-US")
//     newOrder.id = database.customOrders[database.customOrders.length - 1].id + 1
//     database.customOrders.push(newOrder)

//     database.orderBuilder = {}
//     document.dispatchEvent(new CustomEvent("stateChanged"))
