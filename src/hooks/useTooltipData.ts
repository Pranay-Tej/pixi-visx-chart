import { useState } from "react";

function useTooltipData<T>() {
  const [tooltipData, setTooltipData] = useState<T | null>(null);

  const showTooltip = (data: T) => {
    setTooltipData(data);
  };

  const hideTooltip = () => {
    setTooltipData(null);
  };

  return {
    tooltipData,
    showTooltip,
    hideTooltip,
  };
}

export default useTooltipData;
