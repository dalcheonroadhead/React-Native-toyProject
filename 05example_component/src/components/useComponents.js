import { useState } from "react";

export default () => {
  const [visibleBadge, setVisibleBadge] = useState(true);
  return {
    visibleBadge,
  };
};
