import { getOrders } from "./database.js";

export const Orders = async () => {
  const orders = await getOrders();

  return `${orders
    .map((order) => {
      return `<section class="order">
                <div class="order--description">
                  ${order.paintColor.color} car with
                  ${order.wheels.style} wheels,
                  ${order.interior.material} interior,
                  and the ${order.technology.package}
                  for a total cost of
                  ${order.totalCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div>
                  <input type="button" name="complete" id="${
                    order.id
                  }" value="Complete" class="order--button"/>
                </div>
            </section>`;
    })
    .join("")}`;
};

// original Orders component

// const paints = await getPaints();
// const interiors = await getInteriors();
// const techs = await getTechnologies();
// const wheels = await getWheels();

// export const Orders = async () => {
//   const orders = await getOrders();

//   return `${orders
//     .map((order) => {
//       const paint = paints.find((p) => p.id === order.paintId);
//       const technology = techs.find((t) => t.id === order.technologyId);
//       const interior = interiors.find((i) => i.id === order.interiorId);
//       const wheel = wheels.find((w) => w.id === order.wheelId);

//       return `<section class="order">
//                 ${paint.color} car with
//                 ${wheel.style} wheels,
//                 ${interior.material} interior,
//                 and the ${technology.package}
//                 for a total cost of
//                 ${
//                   order.paintColor.price +
//                   order.technology.price +
//                   order.interior.price +
//                   order.wheels.price
//                   .toLocaleString("en-US", {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                   <input type="button" name="complete" id="${
//                     order.id
//                   }" value="Complete"/>
//             </section>`;
//     })
//     .join("")}`;
// };
