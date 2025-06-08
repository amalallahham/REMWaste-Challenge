import { Drawer, Slider, Checkbox, Divider, Row, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilters, setFilters } from "../../store/reducers/filterSlice";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

const FilterDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [rawPriceRange, setRawPriceRange] = useState([0, 1500]);
  const [rawSizeRange, setRawSizeRange] = useState([0, 100]);
  const [allowedOnRoad, setAllowedOnRoad] = useState(false);
  const [allowsHeavyWaste, setAllowsHeavyWaste] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sizeRange, setSizeRange] = useState([0, 100]);

  const debouncedSetPriceRange = useDebouncedCallback(setPriceRange, 500);
  const debouncedSetSizeRange = useDebouncedCallback(setSizeRange, 500);

  const handlePriceChange = (value) => {
    setRawPriceRange(value);
    debouncedSetPriceRange(value);
  };

  const handleSizeChange = (value) => {
    setRawSizeRange(value);
    debouncedSetSizeRange(value);
  };

  useEffect(() => {
    dispatch(
      setFilters({
        priceRange,
        sizeRange,
        allowedOnRoad,
        allowsHeavyWaste,
      })
    );
  }, [priceRange, sizeRange, allowedOnRoad, allowsHeavyWaste, dispatch]);

  const handleReset = () => {
    dispatch(resetFilters());

    setRawPriceRange([0, 1500]);
    setRawSizeRange([0, 100]);
    setPriceRange([0, 1500]);
    setSizeRange([0, 100]);
    setAllowedOnRoad(false);
    setAllowsHeavyWaste(false);
  };

  return (
    <Drawer
      title="Filter Options"
      placement="left"
      onClose={() => setOpen(false)}
      open={open}
       footer={
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleReset}>Clear Filters</Button>
          <Button type="primary" onClick={() => setOpen(false)}>
            View Results
          </Button>
        </Space>
      }
    >
      <div>
        <p>
          <strong>Price Range (£)</strong>
        </p>
        <Row justify="space-between">
          <p className="m-0">1 £</p>
          <p className="m-0">1500 £</p>
        </Row>
        <Slider
          range
          min={0}
          max={1500}
          step={50}
          value={rawPriceRange}
          onChange={handlePriceChange}
        />

        <Divider />

        <p>
          <strong>Size Range (yards)</strong>
        </p>
        <Row justify="space-between">
          <p className="m-0">1</p>
          <p className="m-0">100</p>
        </Row>
        <Slider
          range
          min={0}
          max={100}
          step={5}
          value={rawSizeRange}
          onChange={handleSizeChange}
        />

        <Divider />

        <Checkbox
          checked={allowedOnRoad}
          onChange={(e) => setAllowedOnRoad(e.target.checked)}
        >
          Allowed on Road
        </Checkbox>

        <br />

        <Checkbox
          checked={allowsHeavyWaste}
          onChange={(e) => setAllowsHeavyWaste(e.target.checked)}
        >
          Allows Heavy Waste
        </Checkbox>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
