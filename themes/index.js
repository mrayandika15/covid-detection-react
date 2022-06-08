import { extendTheme } from "@chakra-ui/react";

import { Button } from "./components/Button";

const overrides = {
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
};

export default extendTheme(overrides);
