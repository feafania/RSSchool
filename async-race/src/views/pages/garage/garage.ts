import "./garage.css";
import GarageState from "../../../entities/garage";
import loadAndRenderCars from "../../../controllers/garage-controller";
import Car from "../../../entities/car";
import PageController from "../../../controllers/page-controller";
import CarControls from "../../common/elements/car-controls/car-controls";

export default async function renderGarageView(): Promise<HTMLElement> {
  const page = new PageController<Car>(GarageState, loadAndRenderCars);
  await GarageState.refreshTotalCount();
  page.element.append(page.title.element);
  page.element.append(page.pagination.element);
  const carControls = new CarControls(page);
  page.element.append(carControls.element);
  page.element.append(page.list);
  page.refresh();

  return page.element;
}
