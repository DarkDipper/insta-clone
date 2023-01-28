import { motion } from "framer-motion";
import Avatar from "../Avatar";
import logo_svg from "../../public/instagram_adobe_express.svg";
export default function Loading() {
  return (
    <div className="loading-page">
      <motion.div
        className="border-1"
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ duration: 3.2, repeat: Infinity }}
      >
        <div className="logo">
          <Avatar src="/instagram.png" />
        </div>
      </motion.div>
      <motion.div
        className="border-2"
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
        }}
        style={{}}
      ></motion.div>
    </div>
  );
}
