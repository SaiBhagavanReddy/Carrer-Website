import type { ElementType } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AirIcon from "@mui/icons-material/Air";
import LockIcon from "@mui/icons-material/Lock";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ThermostatIcon from "@mui/icons-material/Thermostat";
export interface HomeApp {
  name: string;
  location: string;
  icon: ElementType;
  status:string
}

export const homeApps: HomeApp[] = [
  {
    name: "Living Room Light",
    location: "Living Room",
    icon: LightbulbIcon,
    status:"On"
  },
  {
    name: "Bedroom AC",
    location: "Bedroom",
    icon: AirIcon,
     status:"Off"
  },
  {
    name: "Front Door Lock",
    location: "Entrance",
    icon: LockIcon,
     status:"On"
  },
  {
    name: "Kitchen Light",
    location: "Kitchen",
    icon: LightbulbIcon,
         status:"On"

  },
  {
    name: "Security Camera",
    location: "Front Yard",
    icon: CameraAltIcon,
         status:"Off"

  },
  {
    name: "Thermostat",
    location: "Living Room",
    icon: ThermostatIcon,
    status:"On"
  },
];
export default homeApps