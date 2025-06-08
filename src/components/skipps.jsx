import { useEffect, useState } from "react";
import { useGetSkipsByLocationQuery } from "../../store/services/skipsApi";
import { useSelector } from "react-redux";
import { Card, Col, Row, Skeleton, Empty, Tag } from "antd";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const Skipps = () => {
  const [filteredSkips, setFilteredSkips] = useState([]);

  const { data, error, isLoading } = useGetSkipsByLocationQuery({
    postcode: "NR32",
    area: "Lowestoft",
  });

  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (!data) return;

    let result = data.filter((skip) => {
      const matchesSearch =
        filters.searchQuery === "" ||
        skip.size.toString() === filters?.searchQuery
        ||
        skip.price_before_vat.toString() === filters?.searchQuery;

      const inPriceRange =
        skip.price_before_vat >= filters.priceRange[0] &&
        skip.price_before_vat <= filters.priceRange[1];

      const inSizeRange =
        skip.size >= filters.sizeRange[0] && skip.size <= filters.sizeRange[1];

      const matchesRoad = !filters.allowedOnRoad || skip.allowed_on_road;
      const matchesHeavy = !filters.allowsHeavyWaste || skip.allows_heavy_waste;

      return (
        matchesSearch &&
        inPriceRange &&
        inSizeRange &&
        matchesRoad &&
        matchesHeavy
      );
    });

    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price_before_vat - b.price_before_vat);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price_before_vat - a.price_before_vat);
    } else if (filters.sortBy === "size-asc") {
      result.sort((a, b) => a.size - b.size);
    } else if (filters.sortBy === "size-desc") {
      result.sort((a, b) => b.size - a.size);
    }

    // Add image URL
    const enriched = result.map((skip) => ({
      ...skip,
      img: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`,
    }));

    setFilteredSkips(enriched);
  }, [data, filters]);

  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
        {[...Array(4)].map((_, i) => (
          <Col xs={24} sm={12} md={8} lg={6} key={i}>
            <Card loading />
          </Col>
        ))}
      </Row>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  if (filteredSkips.length === 0)
    return <Empty description="No results found" />;

  return (
    <Row gutter={[16, 16]}>
      {filteredSkips.map((skip) => (
        <Col xs={24} sm={12} md={8} lg={6} key={skip.id}>
          <Card
            hoverable
            cover={
              <img
                alt={`Skip ${skip.size} yard`}
                src={skip.img}
                style={{ height: 200, objectFit: "cover" }}
              />
            }
          >
            <Row className="abs-top">
              <Col>
                {!skip.allowed_on_road && (
                  <Tag color="warning">
                    <Row align="middle">
                      <WarningAmberIcon />
                      <span className="px-1 exo2-light">Not Allowed On The Road</span>
                    </Row>
                  </Tag>
                )}
              </Col>

             
            </Row>
            <Card.Meta
              title={`${skip.size} Yard Skip`}
              description={
                <>
                  <p className="exo2-medium">Hire: {skip.hire_period_days} days</p>
                </>
              }
            />
            <div className="price-abs">
              <p className="exo2-black-italic">£{skip.price_before_vat}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Skipps;
