import {
  getWheels,
  getInteriors,
  getTechnologies,
  getPaints,
  getOrders,
} from "./database.js";

const paints = await getPaints();
const interiors = await getInteriors();
const techs = await getTechnologies();
const wheels = await getWheels();

export const Orders = async () => {
  const orders = await getOrders();

  return `${orders
    .map((order) => {
      const paint = paints.find((p) => p.id === order.paintId);
      const technology = techs.find((t) => t.id === order.technologyId);
      const interior = interiors.find((i) => i.id === order.interiorId);
      const wheel = wheels.find((w) => w.id === order.wheelId);

      return `<section class="order">
                ${paint.color} car with
                ${wheel.style} wheels,
                ${interior.material} interior,
                and the ${technology.package}
                for a total cost of
                ${(
                  paint.price +
                  technology.price +
                  interior.price +
                  wheel.price
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </section>`;
    })
    .join("")}`;
};
