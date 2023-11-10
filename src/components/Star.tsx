import { ImStarFull } from "react-icons/im";

export default function Star({ star }: any) {
  const renderStars = () => {
    // 별 개수에 따라 ImStarFull 아이콘을 반복하여 출력
    const stars = [];
    for (let i = 0; i < star; i++) {
      stars.push(<ImStarFull key={i} className="text-yellow-300" />);
    }
    return stars;
  };

  return <div className="inline-flex">{renderStars()}</div>;
}
