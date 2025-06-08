import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  Row,
  Skeleton,
  Tag,
  Space,
} from "antd";
import { useGetSkipsByLocationQuery } from "../../store/services/skipsApi";
import { useEffect, useState } from "react";
import "../styles/filter.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const SkipSelectionStep = () => {
  const { data, error, isLoading } = useGetSkipsByLocationQuery({
    postcode: "NR32",
    area: "Lowestoft",
  });

  const [filteredSkips, setFilteredSkips] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (data) {
      const enriched = data.map((ele) => ({
        ...ele,
        img: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${ele?.size}-yarder-skip.jpg`,
      }));
      setFilteredSkips(enriched);
      setSizes([...new Set(enriched.map((ele) => ele.size))]);
      setSelectedSize(enriched[0]?.size);
    }
  }, [data]);

  const selectedSkip = filteredSkips.find((skip) => skip.size === selectedSize);

  return (
    <>
      <Row gutter={[16, 16]} align="top" justify="space-around" className=" margin-bottom-4">
        {/* Sizes Panel */}
        <Col sm={24} md={6} className="center">
          <Card className="size-card">
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <div className="my-1" key={idx}>
                    <Skeleton.Avatar
                      active
                      size={50}
                      shape="circle"
                      style={{ marginBottom: 8 }}
                    />
                  </div>
                ))
              : sizes.map((size) => (
                  <div className="my-1" key={size}>
                    <Button
                      shape="circle"
                      className="btns-size"
                      style={{
                       
                        backgroundColor:
                          selectedSize === size ? "#1890ff" : undefined,
                        color: selectedSize === size ? "white" : undefined,
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  </div>
                ))}
          </Card>
        </Col>

        <Col sm={24} md={18} className="center">
          {isLoading || !selectedSkip ? (
            <Skeleton.Image active style={{ width: 500, height: 500 }} />
          ) : (
            <div key={selectedSkip.img} className="fade-in w-100">
              <Col>
                <Badge.Ribbon
                  text={`${selectedSize} Yard`}
                  color="#434343"
                  className="exo2-semibold-italic"
                >
                  <div className="image-wrapper image-gradient-blur">
                    <Image
                      className="image-sk"
                      width={"100%"}
                      
                      src={selectedSkip.img}
                      alt={`Skip size ${selectedSize}`}
                    />
                  </div>
                </Badge.Ribbon>

                <Row className="mt-2">
                  <Col span={24} className="my-3 price-col">
                    <h1 className="exo2-extrabold price">
                      £{selectedSkip.price_before_vat}
                    </h1>
                  </Col>

                  <Row align="middle" justify="end" className="w-100">
                    <Col>
                      {!selectedSkip.allowed_on_road && (
                        <Tag color="warning" className="large-tag">
                          <Row align="middle">
                            <WarningAmberIcon />
                            <span className="px-1">Not Allowed On The Road</span>
                          </Row>
                        </Tag>
                      )}
                    </Col>

                    <Col>
                      {selectedSkip.allows_heavy_waste && (
                        <Tag color="success" className="large-tag">
                          <Row align="middle">
                            <EmojiEmotionsIcon />
                            <span className="px-1">Allow Heavy Waste</span>
                          </Row>
                        </Tag>
                      )}
                    </Col>
                  </Row>
                </Row>

                <Col>
                  <h1 className="text-grey">
                    {selectedSkip?.hire_period_days} Days hire period
                  </h1>
                </Col>
              </Col>
            </div>
          )}
        </Col>
      </Row>

      {/* Footer Section */}
      <Row justify="space-between" align="middle" className="abs-footer">
        <Col>
          <h3>You’ve selected: <strong>{selectedSize} Yard</strong></h3>
        </Col>
        <Col>
          <Space>
            <Button size="large">Back</Button>
            <Button size="large" type="primary">Next</Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default SkipSelectionStep;
