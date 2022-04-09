import { createContext } from "react";

export const SaveData = {
	money: 350,
	level: 1,
	point: 0,
	energy: 100,
	supplyVehicle: null,
	supplyCount: 10,
	parkingMax: 1,
	parkingVehicles: [],
	workshopMax: 1,
	workshopVehicles: [],
	stockMax: 1,
	stockVehicles: [],
	sellingVehicle: null
};

const SaveContext = createContext(SaveData);

export default SaveContext;