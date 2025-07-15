import { Box, Loader } from "@mantine/core";
import styles from "./Loader.module.scss";

export const LoaderCircle = () => {
  return (
    <Box className={styles["loader-box"]}>
      <Loader m="auto" color="rgba(84, 180, 106)" />
    </Box>
  );
};
