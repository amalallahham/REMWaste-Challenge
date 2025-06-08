import { Steps } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Skipps from "./skipps";
import Filter from "./filter";
import UI from "./skipSelectionStep";
import { useSelector } from "react-redux";

const StepperHorizontal = () => {
  const theme = useSelector((state) => state.theme);

  console.log(theme)
  const steps = [
    {
      key: "1",
      title: "Postcode",
      status: "finish",
      icon: <LocationOnIcon />,
    },
    {
      key: "2",
      title: "Waste Type",
      status: "finish",
      icon: <DeleteOutlineIcon />,
    },
    {
      key: "3",
      title: "Select Skip",
      status: "active",
      icon: <LocalShippingOutlinedIcon />,
      content: theme?.theme === "UX" ? <Skipps></Skipps> : <UI></UI>,
    },
    {
      key: "4",
      title: "Permit Check",
      status: "wait",
      icon: <ShieldOutlinedIcon />,
    },
    {
      key: "5",
      title: "Choose Date",
      status: "wait",
      icon: <CalendarTodayOutlinedIcon />,
    },
    {
      key: "6",
      title: "Payment",
      status: "wait",
      icon: <PaymentOutlinedIcon />,
    },
  ];

  return (
    <>
      <div className="mb-2">
        <Steps items={steps} direction="horizontal" responsive={false} />
        {theme?.theme === "UX" && <Filter></Filter>}
        <div className="my-3">{steps[2].content}</div>
      </div>
    </>
  );
};
export default StepperHorizontal;
