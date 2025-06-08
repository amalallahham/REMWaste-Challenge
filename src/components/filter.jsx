import { Badge, Button, Col, Drawer, Dropdown, Input, Row } from "antd";
import { useState } from "react";
import FilterDrawer from "./filterDrawer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortBy } from "../../store/reducers/filterSlice";
import useDebouncedCallback from "../hooks/useDebouncedCallback"; 
import "../styles/filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const [sortLabel, setSortLabel] = useState("Sort By");
  const [open, setOpen] = useState(false);
  const filters = useSelector((state) => state.filters);

  const debouncedSearch = useDebouncedCallback((value) => {
    dispatch(setSearchQuery(value));
  }, 400); 

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.allowedOnRoad) count++;
    if (filters.allowsHeavyWaste) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1500) count++;
    if (filters.sizeRange[0] > 0 || filters.sizeRange[1] < 100) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();
  const sortOptions = [
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
    { key: "size-asc", label: "Size: Small to Large" },
    { key: "size-desc", label: "Size: Large to Small" },
  ];

  const handleSortSelect = ({ key }) => {
    const selected = sortOptions.find((option) => option.key === key);
    setSortLabel(selected?.label || "Sort By");
    dispatch(setSortBy(key));
  };

  return (
    <div className="my-3">
      <Row justify="space-between" align="middle">
        <Col className="my-1">
          <Badge
            count={activeFilterCount}
            size="small"
            offset={[0, 3]}
            color="#fbcc0b"
          >
            <Button size="large" onClick={() => setOpen(true)}>
              Filter
            </Button>
          </Badge>
        </Col>

        <Row gutter={[8, 8]} align={"middle"}>
          <Col className="my-1">
            <Input.Search
              className="search-input h-100"
              placeholder="Search..."
              allowClear
              size="large"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </Col>

          <Col className="my-1">
            <Dropdown
              menu={{ items: sortOptions, onClick: handleSortSelect }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button>{sortLabel}</Button>
            </Dropdown>
          </Col>
        </Row>
      </Row>

      <FilterDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Filter;
